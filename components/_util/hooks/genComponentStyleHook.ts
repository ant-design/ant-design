/* eslint-disable no-redeclare */
import { CSSInterpolation, useStyleRegister } from '@ant-design/cssinjs';
import { useContext } from 'react';
import { AliasToken, OverrideToken } from '../theme/interface';
import { UseComponentStyleResult, useToken } from '../theme';
import { ConfigContext } from '../../config-provider';

type OverrideTokenWithoutDerivative = Omit<OverrideToken, 'derivative'>;
type OverrideComponent = keyof OverrideTokenWithoutDerivative;
type StyleInfo = {
  hashId: string;
  rootPrefixCls: string;
  iconPrefixCls: string;
};
type TokenWithComponentCls<T> = T & { componentCls: string };

function genComponentStyleHook(
  styleFn: (
    prefixCls: string,
    token: TokenWithComponentCls<AliasToken>,
    info: StyleInfo,
  ) => CSSInterpolation,
): (prefixCls: string) => UseComponentStyleResult;
function genComponentStyleHook<ComponentName extends OverrideComponent>(
  styleFn: (
    prefixCls: string,
    token: TokenWithComponentCls<AliasToken & OverrideToken[ComponentName]>,
    info: StyleInfo,
  ) => CSSInterpolation,
  component: ComponentName,
  defaultComponentToken:
    | OverrideTokenWithoutDerivative[ComponentName]
    | ((token: AliasToken) => OverrideTokenWithoutDerivative[ComponentName]),
): (prefixCls: string) => UseComponentStyleResult;
function genComponentStyleHook<ComponentName extends OverrideComponent>(
  styleFn: (
    prefixCls: string,
    token: TokenWithComponentCls<AliasToken & OverrideToken[ComponentName]>,
    info: StyleInfo,
  ) => CSSInterpolation,
  component?: ComponentName,
  defaultComponentToken?:
    | OverrideTokenWithoutDerivative[ComponentName]
    | ((token: AliasToken) => OverrideTokenWithoutDerivative[ComponentName]),
) {
  return (prefixCls: string): UseComponentStyleResult => {
    const [theme, token, hashId] = useToken();
    const { getPrefixCls, iconPrefixCls } = useContext(ConfigContext);

    const tokenWithCls: TokenWithComponentCls<AliasToken> = {
      ...token,
      componentCls: `.${prefixCls}`,
    };
    let mergedToken = tokenWithCls;
    if (component) {
      let componentToken: OverrideTokenWithoutDerivative[ComponentName];
      if (typeof defaultComponentToken === 'function') {
        componentToken = defaultComponentToken(token);
      } else {
        componentToken = defaultComponentToken;
      }
      const overrideComponentToken = token[component] as any;
      if (componentToken && overrideComponentToken) {
        Object.keys(componentToken).forEach(key => {
          if (overrideComponentToken[key] !== undefined) {
            (componentToken as any)[key] = overrideComponentToken[key];
          }
        });
      }
      mergedToken = {
        ...tokenWithCls,
        ...componentToken,
      };
    }

    return [
      useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () =>
        styleFn(
          prefixCls,
          mergedToken as TokenWithComponentCls<AliasToken & OverrideToken[ComponentName]>,
          {
            hashId,
            rootPrefixCls: getPrefixCls(),
            iconPrefixCls,
          },
        ),
      ),
      hashId,
    ];
  };
}

export default genComponentStyleHook;
