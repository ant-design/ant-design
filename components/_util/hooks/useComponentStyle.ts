import { CSSInterpolation, useStyleRegister } from '@ant-design/cssinjs';
import { AliasToken, OverrideToken } from '../theme/interface';
import { UseComponentStyleResult, useToken } from '../theme';

type OverrideTokenWithoutDerivative = Omit<OverrideToken, 'derivative'>;
type OverrideComponent = keyof OverrideTokenWithoutDerivative;

const useComponentStyle = <ComponentName extends OverrideComponent>(
  prefixCls: string,
  component: ComponentName,
  defaultComponentToken: OverrideTokenWithoutDerivative[ComponentName],
  styleFn: (token: AliasToken & OverrideToken[ComponentName], hashId: string) => CSSInterpolation,
): UseComponentStyleResult => {
  const [theme, token, hashId] = useToken();

  const overrideComponentToken = token[component] || {};
  const mergedToken = {
    ...token,
    ...defaultComponentToken,
    ...overrideComponentToken,
  };

  return [
    useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () =>
      styleFn(mergedToken, hashId),
    ),
    hashId,
  ];
};

export default useComponentStyle;
