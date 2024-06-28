/* eslint-disable no-redeclare */
import type { ComponentType, FC, ReactElement } from 'react';
import React, { useContext } from 'react';
import type { AbstractCalculator, CSSInterpolation } from '@ant-design/cssinjs';
import { genCalc, token2CSSVar, useCSSVarRegister, useStyleRegister } from '@ant-design/cssinjs';
import { warning } from 'rc-util';

import useUniqueMemo from '../../_util/hooks/useUniqueMemo';
import { ConfigContext } from '../../config-provider/context';
import { genCommonStyle, genLinkStyle } from '../../style';
import type {
  AliasToken,
  ComponentTokenMap,
  GlobalToken,
  OverrideToken,
  UseComponentStyleResult,
} from '../interface';
import useToken, { ignore, unitless } from '../useToken';
import genMaxMin from './maxmin';
import statisticToken, { merge as mergeToken } from './statistic';
import useResetIconStyle from './useResetIconStyle';

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
  max: (...values: (number | string)[]) => number | string;
  min: (...values: (number | string)[]) => number | string;
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
  | ((
      token: AliasToken & Partial<OverrideTokenWithoutDerivative[C]>,
    ) => OverrideTokenWithoutDerivative[C]);

const getDefaultComponentToken = <C extends OverrideComponent>(
  component: C,
  token: GlobalToken,
  getDefaultToken: GetDefaultToken<C>,
) => {
  if (typeof getDefaultToken === 'function') {
    return getDefaultToken(mergeToken<any>(token, token[component] ?? {}));
  }
  return getDefaultToken ?? {};
};

const getComponentToken = <C extends OverrideComponent>(
  component: C,
  token: GlobalToken,
  defaultToken: OverrideTokenWithoutDerivative[C],
  options?: {
    deprecatedTokens?: [ComponentTokenKey<C>, ComponentTokenKey<C>][];
  },
) => {
  const customToken = { ...(token[component] as ComponentToken<C>) };
  if (options?.deprecatedTokens) {
    const { deprecatedTokens } = options;
    deprecatedTokens.forEach(([oldTokenKey, newTokenKey]) => {
      if (process.env.NODE_ENV !== 'production') {
        warning(
          !customToken?.[oldTokenKey],
          `Component Token \`${String(
            oldTokenKey,
          )}\` of ${component} is deprecated. Please use \`${String(newTokenKey)}\` instead.`,
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
  getDefaultToken?: GetDefaultToken<C>,
  options: {
    resetStyle?: boolean;
    resetFont?: boolean;
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
    injectStyle?: boolean;
    unitless?: {
      [key in ComponentTokenKey<C>]: boolean;
    };
  } = {},
) {
  const cells = (Array.isArray(componentName) ? componentName : [componentName, componentName]) as [
    C,
    string,
  ];

  const [component] = cells;
  const concatComponent = cells.join('-');

  // Return new style hook
  return (prefixCls: string, rootCls: string = prefixCls): UseComponentStyleResult => {
    const [theme, realToken, hashId, token, cssVar] = useToken();
    const { getPrefixCls, iconPrefixCls, csp } = useContext(ConfigContext);
    const rootPrefixCls = getPrefixCls();

    const type = cssVar ? 'css' : 'js';

    // Use unique memo to share the result across all instances
    const calc = useUniqueMemo(() => {
      const unitlessCssVar = new Set<string>();
      if (cssVar) {
        Object.keys(options.unitless || {}).forEach((key) => {
          // Some component proxy the AliasToken (e.g. Image) and some not (e.g. Modal)
          // We should both pass in `unitlessCssVar` to make sure the CSSVar can be unitless.
          unitlessCssVar.add(token2CSSVar(key, cssVar.prefix));
          unitlessCssVar.add(token2CSSVar(key, getCompVarPrefix(component, cssVar.prefix)));
        });
      }

      return genCalc(type, unitlessCssVar);
    }, [type, component, cssVar?.prefix]);
    const { max, min } = genMaxMin(type);

    // Shared config
    const sharedConfig: Omit<Parameters<typeof useStyleRegister>[0], 'path'> = {
      theme,
      token,
      hashId,
      nonce: () => csp?.nonce!,
      clientOnly: options.clientOnly,
      layer: {
        name: 'antd',
      },

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
        if (options.injectStyle === false) {
          return [];
        }

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
            calc,
            // @ts-ignore
            max,
            // @ts-ignore
            min,
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
          options.resetStyle === false
            ? null
            : genCommonStyle(mergedToken, prefixCls, rootCls, options.resetFont),
          styleInterpolation,
        ];
      },
    );

    return [wrapSSR as any, hashId];
  };
}

export interface SubStyleComponentProps {
  prefixCls: string;
  rootCls?: string;
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
    rootCls = prefixCls,
  }: SubStyleComponentProps) => {
    useStyle(prefixCls, rootCls);
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

const genCSSVarRegister = <C extends OverrideComponent>(
  component: C,
  getDefaultToken: GetDefaultToken<C> | undefined,
  options: {
    unitless?: {
      [key in ComponentTokenKey<C>]: boolean;
    };
    deprecatedTokens?: [ComponentTokenKey<C>, ComponentTokenKey<C>][];
    injectStyle?: boolean;
    prefixToken: (key: string) => string;
  },
) => {
  const { unitless: compUnitless, injectStyle = true, prefixToken } = options;

  const CSSVarRegister: FC<CSSVarRegisterProps> = ({ rootCls, cssVar }) => {
    const [, realToken] = useToken();
    useCSSVarRegister(
      {
        path: [component],
        prefix: cssVar.prefix,
        key: cssVar?.key!,
        unitless: compUnitless,
        ignore,
        token: realToken,
        scope: rootCls,
      },
      () => {
        const defaultToken = getDefaultComponentToken(component, realToken, getDefaultToken);
        const componentToken = getComponentToken(component, realToken, defaultToken, {
          deprecatedTokens: options?.deprecatedTokens,
        });
        Object.keys(defaultToken).forEach((key) => {
          componentToken[prefixToken(key)] = componentToken[key];
          delete componentToken[key];
        });
        return componentToken;
      },
    );
    return null;
  };

  const useCSSVar = (rootCls: string) => {
    const [, , , , cssVar] = useToken();

    return [
      (node: ReactElement): ReactElement =>
        injectStyle && cssVar ? (
          <>
            <CSSVarRegister rootCls={rootCls} cssVar={cssVar} component={component} />
            {node}
          </>
        ) : (
          node
        ),
      cssVar?.key,
    ] as const;
  };

  return useCSSVar;
};

export const genStyleHooks = <C extends OverrideComponent>(
  component: C | [C, string],
  styleFn: GenStyleFn<C>,
  getDefaultToken?: GetDefaultToken<C>,
  options?: {
    resetStyle?: boolean;
    resetFont?: boolean;
    deprecatedTokens?: [ComponentTokenKey<C>, ComponentTokenKey<C>][];
    /**
     * Component tokens that do not need unit.
     */
    unitless?: {
      [key in ComponentTokenKey<C>]: boolean;
    };
    /**
     * Only use component style in client side. Ignore in SSR.
     */
    clientOnly?: boolean;
    /**
     * Set order of component style.
     * @default -999
     */
    order?: number;
    /**
     * Whether generate styles
     * @default true
     */
    injectStyle?: boolean;
  },
) => {
  const componentName = Array.isArray(component) ? component[0] : component;

  function prefixToken(key: string) {
    return `${componentName}${key.slice(0, 1).toUpperCase()}${key.slice(1)}`;
  }

  // Fill unitless
  const originUnitless = options?.unitless || {};
  const compUnitless: any = {
    ...unitless,
    [prefixToken('zIndexPopup')]: true,
  };
  Object.keys(originUnitless).forEach((key) => {
    compUnitless[prefixToken(key)] = originUnitless[key as keyof ComponentTokenKey<C>];
  });

  // Options
  const mergedOptions = {
    ...options,
    unitless: compUnitless,
    prefixToken,
  };

  // Hooks
  const useStyle = genComponentStyleHook(component, styleFn, getDefaultToken, mergedOptions);

  const useCSSVar = genCSSVarRegister(componentName, getDefaultToken, mergedOptions);

  return (prefixCls: string, rootCls: string = prefixCls) => {
    const [, hashId] = useStyle(prefixCls, rootCls);
    const [wrapCSSVar, cssVarCls] = useCSSVar(rootCls);

    return [wrapCSSVar, hashId, cssVarCls] as const;
  };
};
