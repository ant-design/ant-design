import type { CSSObject } from '@ant-design/cssinjs';

import type { GenerateStyle } from '../../theme/internal';
import type { TableToken } from './index';

const genVirtualStyle: GenerateStyle<TableToken, CSSObject> = (token) => {
  const { componentCls, motionDurationMid } = token;

  const tableBorder = `${token.lineWidth}px ${token.lineType} ${token.tableBorderColor}`;

  const rowCellCls = `${componentCls}-expanded-row-cell`;

  return {
    [`${componentCls}-wrapper`]: {
      // ========================== Row ==========================
      [`${componentCls}-tbody-virtual`]: {
        [`${componentCls}-row`]: {
          display: 'flex',
          boxSizing: 'border-box',
          width: '100%',
        },

        [`${componentCls}-cell`]: {
          borderBottom: tableBorder,
          transition: `background ${motionDurationMid}`,
        },

        [`${componentCls}-expanded-row`]: {
          [`${rowCellCls}${rowCellCls}-fixed`]: {
            position: 'sticky',
            insetInlineStart: 0,
            overflow: 'hidden',
            width: `calc(var(--virtual-width) - ${token.lineWidth}px)`,
            borderInlineEnd: 'none',
          },
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

            [`&${componentCls}-cell-fix-right-first:before`]: {
              content: '""',
              position: 'absolute',
              insetBlock: 0,
              insetInlineStart: -token.lineWidth,
              borderInlineStart: tableBorder,
            },
          },
        },

        // Empty placeholder
        [`&${componentCls}-virtual`]: {
          [`${componentCls}-placeholder ${componentCls}-cell`]: {
            borderInlineEnd: tableBorder,
            borderBottom: tableBorder,
          },
        },
      },
    },
  };
};

export default genVirtualStyle;
