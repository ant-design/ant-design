/* eslint-disable no-redeclare */
import type { ComponentType, FC, ReactElement } from 'react';
import React, { useContext } from 'react';
import type { CSSInterpolation } from '@ant-design/cssinjs';
import { token2CSSVar, useCSSVarRegister, useStyleRegister } from '@ant-design/cssinjs';
import { warning } from 'rc-util';

import { ConfigContext } from '../../config-provider/context';
import { genCommonStyle, genLinkStyle } from '../../style';
import type {
  ComponentTokenMap,
  GlobalToken,
  OverrideToken,
  UseComponentStyleResult,
} from '../interface';
import useToken, { ignore, unitless } from '../useToken';
import statisticToken, { merge as mergeToken } from './statistic';
import useResetIconStyle from './useResetIconStyle';
import genCalc from './calc';
import type AbstractCalculator from './calc/calculator';
import classNames from 'classnames';

export type OverrideTokenWithoutDerivative = ComponentTokenMap;
export type OverrideComponent = keyof OverrideTokenWithoutDerivative;
export type GlobalTokenWithComponent<C extends OverrideComponent> = GlobalToken &
  ComponentTokenMap[C];

type ComponentToken<C extends OverrideComponent> = Exclude<OverrideToken[C], undefined>;
type ComponentTokenKey<C extends OverrideComponent> = keyof ComponentToken<C>;

export interface StyleInfo {
  hashId: string;
  prefixCls: string;
  rootPrefixCls: string;
  iconPrefixCls: string;
}

export type CSSUtil = {
  calc: (number: any) => AbstractCalculator;
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

export type FullToken<C extends OverrideComponent> = TokenWithCommonCls<
  GlobalTokenWithComponent<C>
>;

export type GenStyleFn<C extends OverrideComponent> = (
  token: FullToken<C>,
  info: StyleInfo,
) => CSSInterpolation;

export type GetDefaultToken<C extends OverrideComponent> =
  | null
  | OverrideTokenWithoutDerivative[C]
  | ((token: GlobalToken) => OverrideTokenWithoutDerivative[C]);

const getDefaultComponentToken = <C extends OverrideComponent>(
  component: C,
  token: GlobalToken,
  getDefaultToken: GetDefaultToken<C>,
) => {
  if (typeof getDefaultToken === 'function') {
    return getDefaultToken(mergeToken<GlobalToken>(token, token[component] ?? {}));
  }
  return getDefaultToken ?? {};
};

const getComponentToken = <C extends OverrideComponent>(
  component: C,
  token: GlobalToken,
  defaultToken: OverrideTokenWithoutDerivative[C],
  options?: { deprecatedTokens?: [ComponentTokenKey<C>, ComponentTokenKey<C>][] },
) => {
  const customToken = { ...(token[component] as ComponentToken<C>) };
  if (options?.deprecatedTokens) {
    const { deprecatedTokens } = options;
    deprecatedTokens.forEach(([oldTokenKey, newTokenKey]) => {
      if (process.env.NODE_ENV !== 'production') {
        warning(
          !customToken?.[oldTokenKey],
          `The token '${String(oldTokenKey)}' of ${component} had deprecated, use '${String(
            newTokenKey,
          )}' instead.`,
        );
      }

      // Should wrap with `if` clause, or there will be `undefined` in object.
      if (customToken?.[oldTokenKey] || customToken?.[newTokenKey]) {
        customToken[newTokenKey] ??= customToken?.[oldTokenKey];
      }
    });
  }
  const mergedToken: any = { ...defaultToken, ...customToken };

  // Remove same value as global token to minimize size
  Object.keys(mergedToken).forEach((key) => {
    if (mergedToken[key] === token[key as keyof GlobalToken]) {
      delete mergedToken[key];
    }
  });

  return mergedToken;
};

const getCompVarPrefix = (component: string, prefix?: string) =>
  `${[
    prefix,
    component.replace(/([A-Z]+)([A-Z][a-z]+)/g, '$1-$2').replace(/([a-z])([A-Z])/g, '$1-$2'),
  ]
    .filter(Boolean)
    .join('-')}`;

export default function genComponentStyleHook<C extends OverrideComponent>(
  componentName: C | [C, string],
  styleFn: GenStyleFn<C>,
  getDefaultToken?:
    | null
    | OverrideTokenWithoutDerivative[C]
    | ((token: GlobalToken) => OverrideTokenWithoutDerivative[C]),
  options: {
    resetStyle?: boolean;
    // Deprecated token key map [["oldTokenKey", "newTokenKey"], ["oldTokenKey", "newTokenKey"]]
    deprecatedTokens?: [ComponentTokenKey<C>, ComponentTokenKey<C>][];
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
    C,
    string,
  ];

  const [component] = cells;
  const concatComponent = cells.join('-');

  return (prefixCls: string): UseComponentStyleResult => {
    const [theme, realToken, hashId, token, cssVar] = useToken();
    const { getPrefixCls, iconPrefixCls, csp } = useContext(ConfigContext);
    const rootPrefixCls = getPrefixCls();

    const calculator = genCalc(cssVar ? 'css' : 'js');

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

    const wrapSSR = useStyleRegister(
      { ...sharedConfig, path: [concatComponent, prefixCls, iconPrefixCls] },
      () => {
        const { token: proxyToken, flush } = statisticToken(token);

        const defaultComponentToken = getDefaultComponentToken(
          component,
          realToken,
          getDefaultToken,
        );

        const componentCls = `.${prefixCls}`;
        const componentToken = getComponentToken(component, realToken, defaultComponentToken, {
          deprecatedTokens: options.deprecatedTokens,
        });

        if (cssVar) {
          Object.keys(defaultComponentToken).forEach((key) => {
            defaultComponentToken[key] = `var(${token2CSSVar(
              key,
              getCompVarPrefix(component, cssVar.prefix),
            )})`;
          });
        }
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
          cssVar ? defaultComponentToken : componentToken,
        );

        const styleInterpolation = styleFn(mergedToken as unknown as FullToken<C>, {
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

    return [wrapSSR, classNames(hashId, cssVar?.key)];
  };
}

export interface SubStyleComponentProps {
  prefixCls: string;
}

// Get from second argument
type RestParameters<T extends any[]> = T extends [any, ...infer Rest] ? Rest : never;

export const genSubStyleComponent: <C extends OverrideComponent>(
  componentName: [C, string],
  ...args: RestParameters<Parameters<typeof genComponentStyleHook<C>>>
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

export type CSSVarRegisterProps = {
  rootCls: string;
  component: string;
  cssVar: {
    prefix?: string;
    key?: string;
  };
};

export const genCSSVarRegister = <C extends OverrideComponent>(
  component: C,
  getDefaultToken: GetDefaultToken<C>,
) => {
  const CSSVarRegister: FC<CSSVarRegisterProps> = ({ rootCls, cssVar }) => {
    const [, realToken] = useToken();
    useCSSVarRegister(
      {
        path: [component],
        prefix: getCompVarPrefix(component, cssVar.prefix),
        key: cssVar?.key!,
        unitless: {
          ...unitless,
          zIndexPopup: true,
        },
        ignore,
        token: realToken,
        scope: rootCls,
      },
      () => {
        const defaultToken = getDefaultComponentToken(component, realToken, getDefaultToken);
        return getComponentToken(component, realToken, defaultToken);
      },
    );
    return null;
  };

  const useCSSVar = (rootCls: string) => {
    const [, , , , cssVar] = useToken();

    return (node: ReactElement): ReactElement =>
      cssVar ? (
        <>
          <CSSVarRegister rootCls={rootCls} cssVar={cssVar} component={component} />
          {node}
        </>
      ) : (
        node
      );
  };

  return useCSSVar;
};
