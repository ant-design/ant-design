/* eslint-disable no-redeclare */
import { CSSInterpolation, useStyleRegister } from '@ant-design/cssinjs';
import { AliasToken, OverrideToken } from '../theme/interface';
import { UseComponentStyleResult, useToken } from '../theme';

type OverrideTokenWithoutDerivative = Omit<OverrideToken, 'derivative'>;
type OverrideComponent = keyof OverrideTokenWithoutDerivative;

function useComponentStyle(
  prefixCls: string,
  styleFn: (token: AliasToken, hashId: string) => CSSInterpolation,
): UseComponentStyleResult;
function useComponentStyle<ComponentName extends OverrideComponent>(
  prefixCls: string,
  styleFn: (token: AliasToken & OverrideToken[ComponentName], hashId: string) => CSSInterpolation,
  component: ComponentName,
  defaultComponentToken: OverrideTokenWithoutDerivative[ComponentName],
): UseComponentStyleResult;
function useComponentStyle<ComponentName extends OverrideComponent>(
  prefixCls: string,
  styleFn: (token: AliasToken & OverrideToken[ComponentName], hashId: string) => CSSInterpolation,
  component?: ComponentName,
  defaultComponentToken?: OverrideTokenWithoutDerivative[ComponentName],
): UseComponentStyleResult {
  const [theme, token, hashId] = useToken();

  let mergedToken = token;
  if (component) {
    const componentToken = defaultComponentToken as any;
    const overrideComponentToken = token[component] as any;
    if (componentToken && overrideComponentToken) {
      Object.keys(componentToken).forEach(key => {
        if (overrideComponentToken[key] !== undefined) {
          componentToken[key] = overrideComponentToken[key];
        }
      });
    }
    mergedToken = {
      ...token,
      ...componentToken,
    };
  }

  return [
    useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () =>
      styleFn(mergedToken as AliasToken & OverrideToken[ComponentName], hashId),
    ),
    hashId,
  ];
}

export default useComponentStyle;
