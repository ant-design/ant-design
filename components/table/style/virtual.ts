import type { CSSObject } from '@ant-design/cssinjs';
import type { GenerateStyle } from '../../theme/internal';
import type { TableToken } from './index';

const genVirtualStyle: GenerateStyle<TableToken, CSSObject> = (token) => {
  const { componentCls } = token;

  const tableBorder = `${token.lineWidth}px ${token.lineType} ${token.tableBorderColor}`;

  return {
    [`${componentCls}-wrapper`]: {
      // ========================== Row ==========================
      [`${componentCls}-tbody-virtual`]: {
        [`${componentCls}-row`]: {
          display: 'flex',
          boxSizing: 'border-box',
          width: '100%',
        },
      },

      // ======================== Border =========================
      [`${componentCls}-bordered`]: {
        [`${componentCls}-tbody-virtual`]: {
          '&:after': {
            content: '""',
            insetInline: 0,
            bottom: 0,
            borderBottom: tableBorder,
            position: 'absolute',
          },

          [`${componentCls}-cell`]: {
            borderInlineEnd: tableBorder,
            borderBottom: tableBorder,

            [`&${componentCls}-cell-fix-right-first:before`]: {
              content: '""',
              position: 'absolute',
              insetBlock: 0,
              insetInlineStart: -token.lineWidth,
              borderInlineStart: tableBorder,
            },
          },
        },
      },
    },
  };
};

export default genVirtualStyle;
