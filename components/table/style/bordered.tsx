import type { CSSObject } from '@ant-design/cssinjs';
import type { GenerateStyle } from '../../_util/theme';
import type { TableToken } from './index';

const genStyle: GenerateStyle<TableToken, CSSObject> = token => {
  const { componentCls } = token;
  const tableBorder = `${token.controlLineWidth}px ${token.controlLineType} ${token.tableBorderColor}`;
  return {
    [`${componentCls}-wrapper`]: {
      [`${componentCls}${componentCls}-bordered`]: {
        // ============================ Title =============================
        [`> ${componentCls}-title`]: {
          border: tableBorder,
          borderBottom: '0',
        },

        [`> ${componentCls}-container`]: {
          // ============================ Content ============================
          borderLeft: tableBorder,

          [`
            > ${componentCls}-content,
            > ${componentCls}-header,
            > ${componentCls}-body,
            > ${componentCls}-summary
          `]: {
            '> table': {
              // ============================= Cell =============================
              [`
                > thead > tr > th,
                > tbody > tr > td,
                > tfoot > tr > th,
                > tfoot > tr > td
              `]: {
                borderRight: tableBorder,
              },

              // ============================ Header ============================
              '> thead': {
                '> tr:not(:last-child) > th': {
                  borderBottom: tableBorder,
                },

                '> tr > th::before': {
                  backgroundColor: 'transparent !important',
                },
              },

              // Fixed right should provides additional border
              [`
                > thead > tr,
                > tbody > tr,
                > tfoot > tr
              `]: {
                [`> ${componentCls}-cell-fix-right-first::after`]: {
                  borderRight: tableBorder,
                },
              },

              // ========================== Expandable ==========================
              '> table > tbody > tr > td': {
                [`> ${componentCls}-expanded-row-fixed`]: {
                  margin:
                    '-@table-padding-vertical (-@table-padding-horizontal - @border-width-base)',

                  '&::after': {
                    position: 'absolute',
                    top: '0',
                    right: token.controlLineWidth,
                    bottom: '0',
                    borderRight: tableBorder,
                    content: '""',
                  },
                },
              },
            },
          },

          [`
            > ${componentCls}-content,
            > ${componentCls}-header
          `]: {
            '> table': {
              borderTop: tableBorder,
            },
          },
        },
      },
    },
  };
};

export default genStyle;
