import type { CSSObject } from '@ant-design/cssinjs';
import { TinyColor } from '@ctrl/tinycolor';
import { clearFix, resetComponent } from '../../style';
import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';
import genBorderedStyle from './bordered';
import genEllipsisStyle from './ellipsis';
import genEmptyStyle from './empty';
import genExpandStyle from './expand';
import genFilterStyle from './filter';
import genFixedStyle from './fixed';
import genPaginationStyle from './pagination';
import genRadiusStyle from './radius';
import genRtlStyle from './rtl';
import genSelectionStyle from './selection';
import genSizeStyle from './size';
import genSorterStyle from './sorter';
import genStickyStyle from './sticky';
import genSummaryStyle from './summary';

export interface ComponentToken {
  headerBg: string;
  headerColor: string;
  headerSortActiveBg: string;
  headerSortHoverBg: string;
  bodySortBg: string;
  rowHoverBg: string;
  rowSelectedBg: string;
  rowSelectedHoverBg: string;
  rowExpandedBg: string;
  cellPaddingBlock: number;
  cellPaddingInline: number;
  cellPaddingBlockMD: number;
  cellPaddingInlineMD: number;
  cellPaddingBlockSM: number;
  cellPaddingInlineSM: number;
  borderColor: string;
  headerBorderRadius: number;
  footerBg: string;
  footerColor: string;
  cellFontSize: number;
  cellFontSizeMD: number;
  cellFontSizeSM: number;
  headerSplitColor: string;
  fixedHeaderSortActiveBg: string;
  headerFilterHoverBg: string;
  filterDropdownMenuBg: string;
  filterDropdownBg: string;
  expandIconBg: string;
  selectionColumnWidth: number;
  stickyScrollBarBg: string;
  stickyScrollBarBorderRadius: number;
}

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
  tableHeaderIconColorHover: string;
  tableBodySortBg: string;
  tableFixedHeaderSortActiveBg: string;
  tableHeaderFilterActiveBg: string;
  tableFilterDropdownBg: string;
  tableFilterDropdownHeight: number;
  tableRowHoverBg: string;
  tableSelectedRowBg: string;
  tableSelectedRowHoverBg: string;

  tableFontSizeMiddle: number;
  tableFontSizeSmall: number;
  tableSelectionColumnWidth: number;
  tableExpandIconBg: string;
  tableExpandColumnWidth: number;
  tableExpandedRowBg: string;
  tableFilterDropdownWidth: number;
  tableFilterDropdownSearchWidth: number;

  // Z-Index
  zIndexTableFixed: number;
  zIndexTableSticky: number;

  // Virtual Scroll Bar
  tableScrollThumbSize: number;
  tableScrollThumbBg: string;
  tableScrollThumbBgHover: string;
  tableScrollBg: string;
}

const genTableStyle: GenerateStyle<TableToken, CSSObject> = (token) => {
  const {
    componentCls,
    fontWeightStrong,
    tablePaddingVertical,
    tablePaddingHorizontal,
    lineWidth,
    lineType,
    tableBorderColor,
    tableFontSize,
    tableBg,
    tableRadius,
    tableHeaderTextColor,
    motionDurationMid,
    tableHeaderBg,
    tableHeaderCellSplitColor,
    tableRowHoverBg,
    tableSelectedRowBg,
    tableSelectedRowHoverBg,
    tableFooterTextColor,
    tableFooterBg,
    paddingContentVerticalLG,
  } = token;
  const tableBorder = `${lineWidth}px ${lineType} ${tableBorderColor}`;
  return {
    [`${componentCls}-wrapper`]: {
      clear: 'both',
      maxWidth: '100%',
      ...clearFix(),

      [componentCls]: {
        ...resetComponent(token),
        fontSize: tableFontSize,
        background: tableBg,
        borderRadius: `${tableRadius}px ${tableRadius}px 0 0`,
      },
      // https://github.com/ant-design/ant-design/issues/17611
      table: {
        width: '100%',
        textAlign: 'start',
        borderRadius: `${tableRadius}px ${tableRadius}px 0 0`,
        borderCollapse: 'separate',
        borderSpacing: 0,
      },

      // ============================= Cell =============================
      [`
          ${componentCls}-thead > tr > th,
          ${componentCls}-tbody > tr > th,
          ${componentCls}-tbody > tr > td,
          tfoot > tr > th,
          tfoot > tr > td
        `]: {
        position: 'relative',
        padding: `${paddingContentVerticalLG}px ${tablePaddingHorizontal}px`,
        overflowWrap: 'break-word',
      },

      // ============================ Title =============================
      [`${componentCls}-title`]: {
        padding: `${tablePaddingVertical}px ${tablePaddingHorizontal}px`,
      },

      // ============================ Header ============================
      [`${componentCls}-thead`]: {
        [`
          > tr > th,
          > tr > td
        `]: {
          position: 'relative',
          color: tableHeaderTextColor,
          fontWeight: fontWeightStrong,
          textAlign: 'start',
          background: tableHeaderBg,
          borderBottom: tableBorder,
          transition: `background ${motionDurationMid} ease`,

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
              backgroundColor: tableHeaderCellSplitColor,
              transform: 'translateY(-50%)',
              transition: `background-color ${motionDurationMid}`,
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
          [`> th, > td`]: {
            transition: `background ${motionDurationMid}, border-color ${motionDurationMid}`,
            borderBottom: tableBorder,

            // ========================= Nest Table ===========================
            [`
              > ${componentCls}-wrapper:only-child,
              > ${componentCls}-expanded-row-fixed > ${componentCls}-wrapper:only-child
            `]: {
              [componentCls]: {
                marginBlock: `-${tablePaddingVertical}px`,
                marginInline: `${
                  token.tableExpandColumnWidth - tablePaddingHorizontal
                }px -${tablePaddingHorizontal}px`,
                [`${componentCls}-tbody > tr:last-child > td`]: {
                  borderBottom: 0,
                  '&:first-child, &:last-child': {
                    borderRadius: 0,
                  },
                },
              },
            },
          },

          '> th': {
            position: 'relative',
            color: tableHeaderTextColor,
            fontWeight: fontWeightStrong,
            textAlign: 'start',
            background: tableHeaderBg,
            borderBottom: tableBorder,
            transition: `background ${motionDurationMid} ease`,
          },

          [`
            &${componentCls}-row:hover > th,
            &${componentCls}-row:hover > td,
            > th${componentCls}-cell-row-hover,
            > td${componentCls}-cell-row-hover
          `]: {
            background: tableRowHoverBg,
          },

          [`&${componentCls}-row-selected`]: {
            [`> th, > td`]: {
              background: tableSelectedRowBg,
            },

            [`&:hover > th, &:hover > td`]: {
              background: tableSelectedRowHoverBg,
            },
          },
        },
      },

      // ============================ Footer ============================
      [`${componentCls}-footer`]: {
        padding: `${tablePaddingVertical}px ${tablePaddingHorizontal}px`,
        color: tableFooterTextColor,
        background: tableFooterBg,
      },
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook(
  'Table',
  (token) => {
    const {
      colorTextHeading,
      colorSplit,
      colorIcon,
      colorIconHover,
      opacityLoading,
      colorBgContainer,
      controlInteractiveSize: checkboxSize,
      headerBg,
      headerColor,
      headerSortActiveBg,
      headerSortHoverBg,
      bodySortBg,
      rowHoverBg,
      rowSelectedBg,
      rowSelectedHoverBg,
      rowExpandedBg,
      cellPaddingBlock,
      cellPaddingInline,
      cellPaddingBlockMD,
      cellPaddingInlineMD,
      cellPaddingBlockSM,
      cellPaddingInlineSM,
      borderColor,
      footerBg,
      footerColor,
      headerBorderRadius,
      cellFontSize,
      cellFontSizeMD,
      cellFontSizeSM,
      headerSplitColor,
      fixedHeaderSortActiveBg,
      headerFilterHoverBg,
      filterDropdownBg,
      expandIconBg,
      selectionColumnWidth,
      stickyScrollBarBg,
    } = token;

    const baseColorAction = new TinyColor(colorIcon);
    const baseColorActionHover = new TinyColor(colorIconHover);

    const zIndexTableFixed: number = 2;

    const tableToken = mergeToken<TableToken>(token, {
      tableFontSize: cellFontSize,
      tableBg: colorBgContainer,
      tableRadius: headerBorderRadius,

      tablePaddingVertical: cellPaddingBlock,
      tablePaddingHorizontal: cellPaddingInline,
      tablePaddingVerticalMiddle: cellPaddingBlockMD,
      tablePaddingHorizontalMiddle: cellPaddingInlineMD,
      tablePaddingVerticalSmall: cellPaddingBlockSM,
      tablePaddingHorizontalSmall: cellPaddingInlineSM,
      tableBorderColor: borderColor,
      tableHeaderTextColor: headerColor,
      tableHeaderBg: headerBg,
      tableFooterTextColor: footerColor,
      tableFooterBg: footerBg,
      tableHeaderCellSplitColor: headerSplitColor,
      tableHeaderSortBg: headerSortActiveBg,
      tableHeaderSortHoverBg: headerSortHoverBg,
      tableHeaderIconColor: baseColorAction
        .clone()
        .setAlpha(baseColorAction.getAlpha() * opacityLoading)
        .toRgbString(),
      tableHeaderIconColorHover: baseColorActionHover
        .clone()
        .setAlpha(baseColorActionHover.getAlpha() * opacityLoading)
        .toRgbString(),
      tableBodySortBg: bodySortBg,
      tableFixedHeaderSortActiveBg: fixedHeaderSortActiveBg,
      tableHeaderFilterActiveBg: headerFilterHoverBg,
      tableFilterDropdownBg: filterDropdownBg,
      tableRowHoverBg: rowHoverBg,
      tableSelectedRowBg: rowSelectedBg,
      tableSelectedRowHoverBg: rowSelectedHoverBg,
      zIndexTableFixed,
      zIndexTableSticky: zIndexTableFixed + 1,
      tableFontSizeMiddle: cellFontSizeMD,
      tableFontSizeSmall: cellFontSizeSM,
      tableSelectionColumnWidth: selectionColumnWidth,
      tableExpandIconBg: expandIconBg,
      tableExpandColumnWidth: checkboxSize + 2 * token.padding,
      tableExpandedRowBg: rowExpandedBg,

      // Dropdown
      tableFilterDropdownWidth: 120,
      tableFilterDropdownHeight: 264,
      tableFilterDropdownSearchWidth: 140,

      // Virtual Scroll Bar
      tableScrollThumbSize: 8, // Mac scroll bar size
      tableScrollThumbBg: stickyScrollBarBg,
      tableScrollThumbBgHover: colorTextHeading,
      tableScrollBg: colorSplit,
    });

    return [
      genTableStyle(tableToken),
      genPaginationStyle(tableToken),
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
  },
  (token) => {
    const {
      colorFillAlter,
      colorBgContainer,
      colorTextHeading,
      colorFillSecondary,
      colorFillContent,
      controlItemBgActive,
      controlItemBgActiveHover,
      padding,
      paddingSM,
      paddingXS,
      colorBorderSecondary,
      borderRadiusLG,
      fontSize,
      controlHeight,
      colorTextPlaceholder,
    } = token;

    const colorFillSecondarySolid = new TinyColor(colorFillSecondary)
      .onBackground(colorBgContainer)
      .toHexShortString();
    const colorFillContentSolid = new TinyColor(colorFillContent)
      .onBackground(colorBgContainer)
      .toHexShortString();
    const colorFillAlterSolid = new TinyColor(colorFillAlter)
      .onBackground(colorBgContainer)
      .toHexShortString();

    return {
      headerBg: colorFillAlterSolid,
      headerColor: colorTextHeading,
      headerSortActiveBg: colorFillSecondarySolid,
      headerSortHoverBg: colorFillContentSolid,
      bodySortBg: colorFillAlterSolid,
      rowHoverBg: colorFillAlterSolid,
      rowSelectedBg: controlItemBgActive,
      rowSelectedHoverBg: controlItemBgActiveHover,
      rowExpandedBg: colorFillAlter,
      cellPaddingBlock: padding,
      cellPaddingInline: padding,
      cellPaddingBlockMD: paddingSM,
      cellPaddingInlineMD: paddingXS,
      cellPaddingBlockSM: paddingXS,
      cellPaddingInlineSM: paddingXS,
      borderColor: colorBorderSecondary,
      headerBorderRadius: borderRadiusLG,
      footerBg: colorFillAlterSolid,
      footerColor: colorTextHeading,
      cellFontSize: fontSize,
      cellFontSizeMD: fontSize,
      cellFontSizeSM: fontSize,
      headerSplitColor: colorBorderSecondary,
      fixedHeaderSortActiveBg: colorFillSecondarySolid,
      headerFilterHoverBg: colorFillContent,
      filterDropdownMenuBg: colorBgContainer,
      filterDropdownBg: colorBgContainer,
      expandIconBg: colorBgContainer,
      selectionColumnWidth: controlHeight,
      stickyScrollBarBg: colorTextPlaceholder,
      stickyScrollBarBorderRadius: 100,
    };
  },
);
