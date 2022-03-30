import { CSSInterpolation, useStyleRegister } from '@ant-design/cssinjs';
import { GlobalToken, OverrideToken } from '../theme/interface';
import { UseComponentStyleResult, useToken } from '../theme';

type OverrideComponent = keyof Omit<OverrideToken, 'derivative'>;

const useComponentStyle = <Component extends OverrideComponent>(
  prefixCls: string,
  component: OverrideComponent,
  defaultComponentToken: OverrideToken[Component],
  styleFn: (token: GlobalToken & OverrideToken[Component], hashId: string) => CSSInterpolation,
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
