import { unit } from '@ant-design/cssinjs';
import type { CSSObject } from '@ant-design/cssinjs';

import type { GenerateStyle } from '../../theme/internal';
import type { TableToken } from './index';

const genPaginationStyle: GenerateStyle<TableToken, CSSObject> = (token) => {
  const { componentCls, antCls, margin } = token;
  return {
    [`${componentCls}-wrapper ${componentCls}-pagination${antCls}-pagination`]: {
      margin: `${unit(margin)} 0`,
    },
  };
};

export default genPaginationStyle;
