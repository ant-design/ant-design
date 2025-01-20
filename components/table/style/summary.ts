import { unit } from '@ant-design/cssinjs';
import type { CSSObject } from '@ant-design/cssinjs';

import type { GenerateStyle } from '../../theme/internal';
import type { TableToken } from './index';

const genSummaryStyle: GenerateStyle<TableToken, CSSObject> = (token) => {
  const { componentCls, lineWidth, tableBorderColor, calc } = token;
  const tableBorder = `${unit(lineWidth)} ${token.lineType} ${tableBorderColor}`;
  return {
    [`${componentCls}-wrapper`]: {
      [`${componentCls}-summary`]: {
        position: 'relative',
        zIndex: token.zIndexTableFixed,
        background: token.tableBg,
        '> tr': {
          '> th, > td': {
            borderBottom: tableBorder,
          },
        },
      },

      [`div${componentCls}-summary`]: {
        boxShadow: `0 ${unit(calc(lineWidth).mul(-1).equal())} 0 ${tableBorderColor}`,
      },
    },
  };
};

export default genSummaryStyle;
