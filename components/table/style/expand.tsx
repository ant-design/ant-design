import type { CSSObject } from '@ant-design/cssinjs';
import type { GenerateStyle } from '../../_util/theme';
import type { TableToken } from './index';

const genExpandStyle: GenerateStyle<TableToken, CSSObject> = token => {
  const { componentCls } = token;
  return {
    [`${componentCls}-wrapper`]: {},
  };
};

export default genExpandStyle;
