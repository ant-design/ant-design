/* eslint-disable no-redeclare */
import { useContext, type ComponentType } from 'react';
import type { CSSInterpolation } from '@ant-design/cssinjs';
import { useStyleRegister, useCSSVarRegister, token2CSSVar } from '@ant-design/cssinjs';
import { warning } from 'rc-util';

import { ConfigContext } from '../../config-provider/context';
import { genCommonStyle, genLinkStyle } from '../../style';
import type {
  ComponentTokenMap,
  GlobalToken,
  OverrideToken,
  UseComponentStyleResult,
} from '../interface';
import useToken, { unitless, ignore } from '../useToken';
import statisticToken, { merge as mergeToken } from './statistic';
import useResetIconStyle from './useResetIconStyle';
import calc from './calc';
import type AbstractCalculator from './util/calc/calculator';
import classNames from 'classnames';

export type OverrideTokenWithoutDerivative = ComponentTokenMap;
export type OverrideComponent = keyof OverrideTokenWithoutDerivative;
export type GlobalTokenWithComponent<ComponentName extends OverrideComponent> = GlobalToken &
  ComponentTokenMap[ComponentName];

type ComponentToken<ComponentName extends OverrideComponent> = Exclude<
  OverrideToken[ComponentName],
  undefined
>;
type ComponentTokenKey<ComponentName extends OverrideComponent> =
  keyof ComponentToken<ComponentName>;

export interface StyleInfo {
  hashId: string;
  prefixCls: string;
  rootPrefixCls: string;
  iconPrefixCls: string;
}

export type CSSUtil = {
  calc: (number: any) => AbstractCalculator<any>;
};

export type TokenWithCommonCls<T> = T & {
  /** Wrap component class with `.` prefix */
  componentCls: string;
  /** Origin prefix which do not have `.` prefix */
  prefixCls: string;
  /** Wrap icon class with `.` prefix */
  iconCls: string;
  /** Wrap ant prefixCls class with `.` prefix */
  antCls: string;
} & CSSUtil;

export type FullToken<ComponentName extends OverrideComponent> = TokenWithCommonCls<
  GlobalTokenWithComponent<ComponentName>
>;

export type GenStyleFn<ComponentName extends OverrideComponent> = (
  token: FullToken<ComponentName>,
  info: StyleInfo,
) => CSSInterpolation;

export default function genComponentStyleHook<ComponentName extends OverrideComponent>(
  componentName: ComponentName | [ComponentName, string],
  styleFn: GenStyleFn<ComponentName>,
  getDefaultToken?:
    | null
    | OverrideTokenWithoutDerivative[ComponentName]
    | ((token: GlobalToken) => OverrideTokenWithoutDerivative[ComponentName]),
  options: {
    resetStyle?: boolean;
    // Deprecated token key map [["oldTokenKey", "newTokenKey"], ["oldTokenKey", "newTokenKey"]]
    deprecatedTokens?: [ComponentTokenKey<ComponentName>, ComponentTokenKey<ComponentName>][];
    /**
     * Only use component style in client side. Ignore in SSR.
     */
    clientOnly?: boolean;
    /**
     * Set order of component style. Default is -999.
     */
    order?: number;
  } = {},
) {
  const cells = (Array.isArray(componentName) ? componentName : [componentName, componentName]) as [
    ComponentName,
    string,
  ];

  const [component] = cells;
  const concatComponent = cells.join('-');

  return (prefixCls: string, rootCls = prefixCls): UseComponentStyleResult => {
    const [theme, token, hashId, realToken, cssVarKey] = useToken();
    const { getPrefixCls, iconPrefixCls, csp } = useContext(ConfigContext);
    const rootPrefixCls = getPrefixCls();

    const calculator = cssVarKey ? calc('css') : calc('js');

    // Shared config
    const sharedConfig: Omit<Parameters<typeof useStyleRegister>[0], 'path'> = {
      theme,
      token,
      hashId,
      nonce: () => csp?.nonce!,
      clientOnly: options.clientOnly,

      // antd is always at top of styles
      order: options.order || -999,
    };

    // Generate style for all a tags in antd component.
    useStyleRegister(
      { ...sharedConfig, clientOnly: false, path: ['Shared', rootPrefixCls] },
      () => [
        {
          // Link
          '&': genLinkStyle(token),
        },
      ],
    );

    // Generate style for icons
    useResetIconStyle(iconPrefixCls, csp);

    const customComponentToken = { ...(realToken[component] as ComponentToken<ComponentName>) };
    const getDefaultComponentToken = () =>
      typeof getDefaultToken === 'function'
        ? getDefaultToken(mergeToken<GlobalToken>(realToken, customComponentToken ?? {}))
        : getDefaultToken ?? {};

    const getComponentToken = (prefix = false) => {
      if (options.deprecatedTokens) {
        const { deprecatedTokens } = options;
        deprecatedTokens.forEach(([oldTokenKey, newTokenKey]) => {
          if (process.env.NODE_ENV !== 'production') {
            warning(
              !customComponentToken?.[oldTokenKey],
              `The token '${String(oldTokenKey)}' of ${component} had deprecated, use '${String(
                newTokenKey,
              )}' instead.`,
            );
          }

          // Should wrap with `if` clause, or there will be `undefined` in object.
          if (customComponentToken?.[oldTokenKey] || customComponentToken?.[newTokenKey]) {
            customComponentToken[newTokenKey] ??= customComponentToken?.[oldTokenKey];
          }
        });
      }
      const defaultComponentToken = getDefaultComponentToken();
      const mergedComponentToken = { ...defaultComponentToken, ...customComponentToken };

      if (prefix) {
        Object.keys(defaultComponentToken).forEach((key) => {
          const newKey = `${component}${key.slice(0, 1).toUpperCase()}${key.slice(1)}`;
          mergedComponentToken[newKey] = mergedComponentToken[key];
          delete mergedComponentToken[key];
        });
      }

      return mergedComponentToken;
    };

    // TODO: need optimization, should not call this hook if no `cssVar` config
    useCSSVarRegister(
      {
        path: [concatComponent, prefixCls, iconPrefixCls],
        prefix: `antd`,
        key: cssVarKey!,
        unitless,
        ignore,
        token: realToken,
        scope: rootCls,
      },
      cssVarKey
        ? () => {
            if (component === 'Wave') {
              return {};
            }
            return getComponentToken(true);
          }
        : () => ({}),
    );

    const wrapSSR = useStyleRegister(
      { ...sharedConfig, path: [concatComponent, prefixCls, iconPrefixCls] },
      () => {
        const { token: proxyToken, flush } = statisticToken(token);

        const defaultComponentToken = getDefaultComponentToken();
        Object.keys(defaultComponentToken).forEach((key) => {
          defaultComponentToken[key] = `var(${token2CSSVar(key, `antd-${component}`)})`;
        });

        const componentCls = `.${prefixCls}`;
        const componentToken = getComponentToken();
        const mergedToken = mergeToken<
          TokenWithCommonCls<GlobalTokenWithComponent<OverrideComponent>>
        >(
          proxyToken,
          {
            componentCls,
            prefixCls,
            iconCls: `.${iconPrefixCls}`,
            antCls: `.${rootPrefixCls}`,
            calc: calculator,
          },
          cssVarKey ? defaultComponentToken : componentToken,
        );

        const styleInterpolation = styleFn(mergedToken as unknown as FullToken<ComponentName>, {
          hashId,
          prefixCls,
          rootPrefixCls,
          iconPrefixCls,
        });
        flush(component, componentToken);
        return [
          options.resetStyle === false ? null : genCommonStyle(token, prefixCls),
          styleInterpolation,
        ];
      },
    );

    return [wrapSSR, classNames(hashId, cssVarKey)];
  };
}

export interface SubStyleComponentProps {
  prefixCls: string;
}

// Get from second argument
type RestParameters<T extends any[]> = T extends [any, ...infer Rest] ? Rest : never;

export const genSubStyleComponent: <ComponentName extends OverrideComponent>(
  componentName: [ComponentName, string],
  ...args: RestParameters<Parameters<typeof genComponentStyleHook<ComponentName>>>
) => ComponentType<SubStyleComponentProps> = (componentName, styleFn, getDefaultToken, options) => {
  const useStyle = genComponentStyleHook(componentName, styleFn, getDefaultToken, {
    resetStyle: false,

    // Sub Style should default after root one
    order: -998,
    ...options,
  });

  const StyledComponent: ComponentType<SubStyleComponentProps> = ({
    prefixCls,
  }: SubStyleComponentProps) => {
    useStyle(prefixCls);
    return null;
  };

  if (process.env.NODE_ENV !== 'production') {
    StyledComponent.displayName = `SubStyle_${
      Array.isArray(componentName) ? componentName.join('.') : componentName
    }`;
  }

  return StyledComponent;
};
