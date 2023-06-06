/* eslint-disable no-redeclare */
import type { CSSInterpolation } from '@ant-design/cssinjs';
import { useStyleRegister } from '@ant-design/cssinjs';
import { warning } from 'rc-util';
import { useContext } from 'react';
import { ConfigContext } from '../../config-provider/context';
import { genCommonStyle, genLinkStyle } from '../../style';
import type { ComponentTokenMap, GlobalToken, OverrideToken } from '../interface';
import type { UseComponentStyleResult } from '../internal';
import { mergeToken, statisticToken, useToken } from '../internal';

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

export interface StyleInfo<ComponentName extends OverrideComponent> {
  hashId: string;
  prefixCls: string;
  rootPrefixCls: string;
  iconPrefixCls: string;
  overrideComponentToken: ComponentTokenMap[ComponentName];
}

export type TokenWithCommonCls<T> = T & {
  /** Wrap component class with `.` prefix */
  componentCls: string;
  /** Origin prefix which do not have `.` prefix */
  prefixCls: string;
  /** Wrap icon class with `.` prefix */
  iconCls: string;
  /** Wrap ant prefixCls class with `.` prefix */
  antCls: string;
};
export type FullToken<ComponentName extends OverrideComponent> = TokenWithCommonCls<
  GlobalTokenWithComponent<ComponentName>
>;

export default function genComponentStyleHook<ComponentName extends OverrideComponent>(
  component: ComponentName,
  styleFn: (token: FullToken<ComponentName>, info: StyleInfo<ComponentName>) => CSSInterpolation,
  getDefaultToken?:
    | OverrideTokenWithoutDerivative[ComponentName]
    | ((token: GlobalToken) => OverrideTokenWithoutDerivative[ComponentName]),
  options?: {
    resetStyle?: boolean;
    // Deprecated token key map [["oldTokenKey", "newTokenKey"], ["oldTokenKey", "newTokenKey"]]
    deprecatedTokens?: [ComponentTokenKey<ComponentName>, ComponentTokenKey<ComponentName>][];
  },
) {
  return (prefixCls: string): UseComponentStyleResult => {
    const [theme, token, hashId] = useToken();
    const { getPrefixCls, iconPrefixCls, csp } = useContext(ConfigContext);
    const rootPrefixCls = getPrefixCls();

    // Shared config
    const sharedConfig: Omit<Parameters<typeof useStyleRegister>[0], 'path'> = {
      theme,
      token,
      hashId,
      nonce: () => csp?.nonce!,
    };

    // Generate style for all a tags in antd component.
    useStyleRegister({ ...sharedConfig, path: ['Shared', rootPrefixCls] }, () => [
      {
        // Link
        '&': genLinkStyle(token),
      },
    ]);

    return [
      useStyleRegister({ ...sharedConfig, path: [component, prefixCls, iconPrefixCls] }, () => {
        const { token: proxyToken, flush } = statisticToken(token);

        const customComponentToken = { ...(token[component] as ComponentToken<ComponentName>) };
        if (options?.deprecatedTokens) {
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
        const defaultComponentToken =
          typeof getDefaultToken === 'function'
            ? getDefaultToken(mergeToken(proxyToken, customComponentToken ?? {}))
            : getDefaultToken;

        const mergedComponentToken = { ...defaultComponentToken, ...customComponentToken };

        const componentCls = `.${prefixCls}`;
        const mergedToken = mergeToken<
          TokenWithCommonCls<GlobalTokenWithComponent<OverrideComponent>>
        >(
          proxyToken,
          {
            componentCls,
            prefixCls,
            iconCls: `.${iconPrefixCls}`,
            antCls: `.${rootPrefixCls}`,
          },
          mergedComponentToken,
        );

        const styleInterpolation = styleFn(mergedToken as unknown as FullToken<ComponentName>, {
          hashId,
          prefixCls,
          rootPrefixCls,
          iconPrefixCls,
          overrideComponentToken: customComponentToken as any,
        });
        flush(component, mergedComponentToken);
        return [
          options?.resetStyle === false ? null : genCommonStyle(token, prefixCls),
          styleInterpolation,
        ];
      }),
      hashId,
    ];
  };
}
