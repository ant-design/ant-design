import { unit } from '@ant-design/cssinjs';
import type { CSSObject } from '@ant-design/cssinjs';

import type { GenerateStyle } from '../../theme/internal';
import { genCssVar } from '../../theme/util/genStyleUtils';
import type { TableToken } from './index';

const genBorderedStyle: GenerateStyle<TableToken, CSSObject> = (token) => {
  const {
    antCls,
    componentCls,
    lineWidth,
    lineType,
    tableBorderColor,
    tableHeaderBg,
    tablePaddingVertical,
    tablePaddingHorizontal,
    calc,
  } = token;
  const tableBorder = `${unit(lineWidth)} ${lineType} ${tableBorderColor}`;
  const [varName, varRef] = genCssVar(antCls, 'table');

  const getSizeBorderStyle = (
    size: 'small' | 'medium',
    paddingVertical: number,
    paddingHorizontal: number,
  ) => ({
    [`&${componentCls}-${size}`]: {
      [`> ${componentCls}-container`]: {
        [`> ${componentCls}-content, > ${componentCls}-body`]: {
          '> table > tbody > tr > th, > table > tbody > tr > td': {
            [`> ${componentCls}-expanded-row-fixed`]: {
              margin: `${unit(calc(paddingVertical).mul(-1).equal())}
              ${unit(calc(calc(paddingHorizontal).add(lineWidth)).mul(-1).equal())}`,
            },
          },
        },
      },
    },
  });

  return {
    [`${componentCls}-wrapper`]: {
      [varName('nested-border-top')]: tableBorder,

      [`${componentCls}${componentCls}-bordered`]: {
        // ============================ Title =============================
        [`> ${componentCls}-title`]: {
          border: tableBorder,
          borderBottom: 0,
        },

        // ============================ Content ============================
        [`> ${componentCls}-container`]: {
          borderInlineStart: tableBorder,
          borderTop: tableBorder,

          '&:first-child': {
            borderTop: varRef('nested-border-top', tableBorder),
          },

          [`> ${componentCls}-header${componentCls}-sticky-holder`]: {
            marginTop: calc(lineWidth).mul(-1).equal(),
            borderTop: tableBorder,
          },

          [`> ${componentCls}-content, > ${componentCls}-header, > ${componentCls}-body, > ${componentCls}-summary`]:
            {
              '> table': {
                // ============================= Cell =============================
                '> thead > tr > th, > thead > tr > td, > tbody > tr > th, > tbody > tr > td, > tfoot > tr > th, > tfoot > tr > td':
                  {
                    borderInlineEnd: tableBorder,
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
                // Only add separator border when there are multiple fixed-right columns
                // (i.e. fix-right-first is not also fix-right-last), otherwise the
                // ::after border doubles up with the cell's own borderInlineEnd and
                // creates a spurious extra vertical line. See #56287.
                '> thead > tr, > tbody > tr, > tfoot > tr': {
                  [`> ${componentCls}-cell-fix-right-first:not(${componentCls}-cell-fix-right-last)::after`]:
                    {
                      borderInlineEnd: tableBorder,
                    },
                },

                // ========================== Expandable ==========================
                '> tbody > tr > th, > tbody > tr > td': {
                  [`> ${componentCls}-expanded-row-fixed`]: {
                    margin: `${unit(calc(tablePaddingVertical).mul(-1).equal())} ${unit(
                      calc(calc(tablePaddingHorizontal).add(lineWidth)).mul(-1).equal(),
                    )}`,
                    '&::after': {
                      position: 'absolute',
                      top: 0,
                      insetInlineEnd: lineWidth,
                      bottom: 0,
                      borderInlineEnd: tableBorder,
                      content: '""',
                    },
                  },
                },
              },
            },
        },

        // ============================ Scroll ============================
        [`&${componentCls}-scroll-horizontal`]: {
          [`> ${componentCls}-container > ${componentCls}-body`]: {
            '> table > tbody': {
              [`
                > tr${componentCls}-expanded-row,
                > tr${componentCls}-placeholder
              `]: {
                '> th, > td': {
                  borderInlineEnd: 0,
                },
              },
            },
          },
        },

        // ============================ Size ============================
        ...getSizeBorderStyle(
          'medium',
          token.tablePaddingVerticalMiddle,
          token.tablePaddingHorizontalMiddle,
        ),
        ...getSizeBorderStyle(
          'small',
          token.tablePaddingVerticalSmall,
          token.tablePaddingHorizontalSmall,
        ),

        // ============================ Footer ============================
        [`> ${componentCls}-footer`]: {
          border: tableBorder,
          borderTop: 0,
        },
      },

      // ============================ Nested ============================
      [`${componentCls}-cell`]: {
        [`
          > ${componentCls}-wrapper:only-child,
          > ${componentCls}-expanded-row-fixed > ${componentCls}-wrapper:only-child
        `]: {
          [varName('nested-border-top')]: 0,
        },
        // https://github.com/ant-design/ant-design/issues/35577
        '&-scrollbar:not([rowspan])': {
          boxShadow: `0 ${unit(lineWidth)} 0 ${unit(lineWidth)} ${tableHeaderBg}`,
        },
      },

      [`${componentCls}-bordered ${componentCls}-cell-scrollbar`]: {
        borderInlineEnd: tableBorder,
      },
    },
  };
};

export default genBorderedStyle;
