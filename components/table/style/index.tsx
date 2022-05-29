// deps-lint-skip-all
import type { CSSObject } from '@ant-design/cssinjs';
import { TinyColor } from '@ctrl/tinycolor';
import type { FullToken, GenerateStyle } from '../../_util/theme';
import { clearFix, genComponentStyleHook, mergeToken, resetComponent } from '../../_util/theme';
import genBorderedStyle from './bordered';
import genEllipsisStyle from './ellipsis';
import genEmptyStyle from './empty';
import genExpandStyle from './expand';
import genFilterStyle from './filter';
import genFixedStyle from './fixed';
import genPagniationStyle from './pagination';
import genRadiusStyle from './radius';
import genRtlStyle from './rtl';
import genSelectionStyle from './selection';
import genSizeStyle from './size';
import genSorterStyle from './sorter';
import genStickyStyle from './sticky';
import genSummaryStyle from './summary';

export interface TableToken extends FullToken<'Table'> {
  tableFontSize: number;
  tableBg: string;
  tableRadius: number;
  tablePaddingHorizontal: number;
  tablePaddingVertical: number;
  tablePaddingHorizontalMiddle: number;
  tablePaddingVerticalMiddle: number;
  tablePaddingHorizontalSmall: number;
  tablePaddingVerticalSmall: number;
  tableBorderColor: string;
  tableHeaderTextColor: string;
  tableHeaderBg: string;
  tableFooterTextColor: string;
  tableFooterBg: string;
  tableHeaderCellSplitColor: string;
  tableHeaderSortBg: string;
  tableHeaderSortHoverBg: string;
  tableHeaderIconColor: string;
  tableBodySortBg: string;
  tableFixedHeaderSortActiveBg: string;
  tableHeaderFilterActiveBg: string;
  tableFilterDropdownBg: string;
  tableFilterDropdownMaxHeight: number;
  tableRowHoverBg: string;
  tableSelectedRowBg: string;
  tableSelectedRowHoverBg: string;
  // FIXME: zIndexXxxx 统一提到一个地方
  zIndexTableFixed: number;
  zIndexTableSticky: number;
  tabelFontSizeMiddle: number;
  tabelFontSizeSmall: number;
  tableSelectionColumnWidth: number;
  tableExpandIconBg: string;
  tableExpandedRowBg: string;
}

const genTableStyle: GenerateStyle<TableToken, CSSObject> = token => {
  const { componentCls } = token;
  const tableBorder = `${token.controlLineWidth}px ${token.controlLineType} ${token.tableBorderColor}`;
  return {
    [`${componentCls}-wrapper`]: {
      clear: 'both',
      maxWidth: '100%',
      ...clearFix(),

      [componentCls]: {
        ...resetComponent(token),
        fontSize: token.tableFontSize,
        background: token.tableBg,
        borderRadius: token.tableRadius,
      },
      // https://github.com/ant-design/ant-design/issues/17611
      table: {
        width: '100%',
        textAlign: 'start',
        borderRadius: `${token.tableRadius}px ${token.tableRadius}px 0 0`,
        borderCollapse: 'separate',
        borderSpacing: 0,
      },

      // ============================= Cell =============================
      [`
          ${componentCls}-thead > tr > th,
          ${componentCls}-tbody > tr > td,
          tfoot > tr > th,
          tfoot > tr > td
        `]: {
        position: 'relative',
        padding: `${token.tablePaddingVertical}px ${token.tablePaddingHorizontal}px`,
        overflowWrap: 'break-word',
      },

      // ============================ Title =============================
      [`${componentCls}-title`]: {
        padding: `${token.tablePaddingVertical}px ${token.tablePaddingHorizontal}px`,
      },

      // ============================ Header ============================
      [`${componentCls}-thead`]: {
        '> tr > th': {
          position: 'relative',
          color: token.tableHeaderTextColor,
          fontWeight: 500,
          textAlign: 'start',
          background: token.tableHeaderBg,
          borderBottom: tableBorder,
          transition: `background ${token.motionDurationSlow} ease`,

          "&[colspan]:not([colspan='1'])": {
            textAlign: 'center',
          },

          [`&:not(:last-child):not(${componentCls}-selection-column):not(${componentCls}-row-expand-icon-cell):not([colspan])::before`]:
            {
              position: 'absolute',
              top: '50%',
              insetInlineEnd: 0,
              width: 1,
              height: '1.6em',
              backgroundColor: token.tableHeaderCellSplitColor,
              transform: 'translateY(-50%)',
              transition: `background-color ${token.motionDurationSlow}`,
              content: '""',
            },
        },

        '> tr:not(:last-child) > th[colspan]': {
          borderBottom: 0,
        },
      },

      // ============================ Body ============================
      [`${componentCls}-tbody`]: {
        '> tr': {
          '> td': {
            borderBottom: tableBorder,
            transition: `background ${token.motionDurationSlow}`,

            // ========================= Nest Table ===========================
            [`
              > ${componentCls}-wrapper:only-child,
              > ${componentCls}-expanded-row-fixed > ${componentCls}-wrapper:only-child
            `]: {
              [componentCls]: {
                marginBlock: `-${token.tablePaddingVertical}px`,
                marginInline: `${
                  token.tablePaddingHorizontal + Math.ceil(token.fontSizeSM * 1.4)
                }px -${token.tablePaddingHorizontal}px`,
                [`${componentCls}-tbody > tr:last-child > td`]: {
                  borderBottom: 0,
                  '&:first-child, &:last-child': {
                    borderRadius: 0,
                  },
                },
              },
            },
          },

          [`
            &${componentCls}-row:hover > td,
            > td${componentCls}-cell-row-hover
          `]: {
            background: token.tableRowHoverBg,
          },

          [`&${componentCls}-row-selected`]: {
            '> td': {
              background: token.tableSelectedRowBg,
              // FIXME
              borderColor: 'rgba(0, 0, 0, 0.03)',
            },

            '&:hover > td': {
              background: token.tableSelectedRowHoverBg,
            },
          },
        },
      },

      // ============================ Footer ============================
      [`${componentCls}-footer`]: {
        padding: `${token.tablePaddingVertical}px ${token.tablePaddingHorizontal}px`,
        color: token.tableFooterTextColor,
        background: token.tableFooterBg,
      },
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook('Table', token => {
  // FIXME: missing tokens
  const tableSelectedRowBg = token.controlItemBgActive;
  const zIndexTableFixed: number = 2;
  const tableToken = mergeToken<TableToken>(token, {
    tableFontSize: token.fontSizeBase,
    tableBg: token.colorBgComponent,
    tableRadius: token.radiusBase,
    /*
    @table-padding-vertical: 16px;
    @table-padding-horizontal: 16px;
    @table-padding-vertical-md: (@table-padding-vertical * 3 / 4);
    @table-padding-horizontal-md: (@table-padding-horizontal / 2);
    @table-padding-vertical-sm: (@table-padding-vertical / 2);
    @table-padding-horizontal-sm: (@table-padding-horizontal / 2);
    */
    tablePaddingVertical: token.padding,
    tablePaddingHorizontal: token.padding,
    tablePaddingVerticalMiddle: (token.padding * 3) / 4,
    tablePaddingHorizontalMiddle: token.padding / 2,
    tablePaddingVerticalSmall: token.padding / 2,
    tablePaddingHorizontalSmall: token.padding / 2,
    tableBorderColor: token.colorSplit,
    tableHeaderTextColor: token.colorTextHeading,
    tableHeaderBg: token.colorBgComponentSecondary,
    tableFooterTextColor: token.colorTextHeading,
    tableFooterBg: token.colorBgComponentSecondary,
    tableHeaderCellSplitColor: 'rgba(0, 0, 0, 0.06)',
    tableHeaderSortBg: token.colorBgContainer,
    tableHeaderSortHoverBg: 'rgba(0, 0, 0, 0.04)',
    tableHeaderIconColor: '#bfbfbf',
    tableBodySortBg: '#fafafa',
    tableFixedHeaderSortActiveBg: 'hsv(0, 0, 96%)',
    tableHeaderFilterActiveBg: 'rgba(0, 0, 0, 0.04)',
    tableFilterDropdownBg: token.colorBgComponent,
    tableFilterDropdownMaxHeight: 264,
    tableRowHoverBg: token.colorBgComponentSecondary,
    tableSelectedRowBg,
    tableSelectedRowHoverBg: new TinyColor(tableSelectedRowBg).darken(2).toHexString(),
    zIndexTableFixed,
    zIndexTableSticky: zIndexTableFixed + 1,
    tabelFontSizeMiddle: token.fontSizeBase,
    tabelFontSizeSmall: token.fontSizeBase,
    tableSelectionColumnWidth: 32,
    tableExpandIconBg: token.colorBgComponent,
    tableExpandedRowBg: token.colorBgComponentSecondary,
  });

  return [
    genTableStyle(tableToken),
    genPagniationStyle(tableToken),
    genSummaryStyle(tableToken),
    genSorterStyle(tableToken),
    genFilterStyle(tableToken),
    genBorderedStyle(tableToken),
    genRadiusStyle(tableToken),
    genExpandStyle(tableToken),
    genSummaryStyle(tableToken),
    genEmptyStyle(tableToken),
    genSelectionStyle(tableToken),
    genFixedStyle(tableToken),
    genStickyStyle(tableToken),
    genEllipsisStyle(tableToken),
    genSizeStyle(tableToken),
    genRtlStyle(tableToken),
  ];
});
