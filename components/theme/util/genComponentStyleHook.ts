/* eslint-disable no-redeclare */
import type { CSSInterpolation } from '@ant-design/cssinjs';
import { useStyleRegister } from '@ant-design/cssinjs';
import { useContext } from 'react';
import { ConfigContext } from '../../config-provider/context';
import { genCommonStyle, genLinkStyle } from '../../style';
import type { ComponentTokenMap, GlobalToken } from '../interface';
import type { UseComponentStyleResult } from '../internal';
import { mergeToken, statisticToken, useToken } from '../internal';

export type OverrideTokenWithoutDerivative = ComponentTokenMap;
export type OverrideComponent = keyof OverrideTokenWithoutDerivative;
export type GlobalTokenWithComponent<ComponentName extends OverrideComponent> = GlobalToken &
  ComponentTokenMap[ComponentName];

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

        const defaultComponentToken =
          typeof getDefaultToken === 'function' ? getDefaultToken(proxyToken) : getDefaultToken;
        const mergedComponentToken = { ...defaultComponentToken, ...token[component] };

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
          overrideComponentToken: token[component],
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
