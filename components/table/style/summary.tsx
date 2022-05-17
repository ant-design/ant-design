import type { CSSObject } from '@ant-design/cssinjs';
import type { GenerateStyle } from '../../_util/theme';
import type { TableToken } from './index';

const genSummaryStyle: GenerateStyle<TableToken, CSSObject> = token => {
  const { componentCls } = token;
  const tableBorder = `${token.controlLineWidth}px ${token.controlLineType} ${token.tableBorderColor}`;
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
        boxShadow: `0 -${token.controlLineWidth}px 0 ${token.tableBorderColor}`,
      },
    },
  };
};

export default genSummaryStyle;
