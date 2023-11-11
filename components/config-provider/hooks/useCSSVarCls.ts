import { useToken } from '../../theme/internal';

const useCSSVarCls = (prefixCls: string) => {
  const [, , , , cssVar] = useToken();

  return cssVar ? `${prefixCls}-css-var` : '';
};

export default useCSSVarCls;
