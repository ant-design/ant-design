import type { CSSObject } from '@ant-design/cssinjs';
import type { GenerateStyle } from '../../theme';
import type { TableToken } from './index';

const genSummaryStyle: GenerateStyle<TableToken, CSSObject> = token => {
  const { componentCls, controlLineWidth, tableBorderColor } = token;
  const tableBorder = `${controlLineWidth}px ${token.controlLineType} ${tableBorderColor}`;
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
        boxShadow: `0 -${controlLineWidth}px 0 ${tableBorderColor}`,
      },
    },
  };
};

export default genSummaryStyle;
