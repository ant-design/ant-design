import { unit } from '@ant-design/cssinjs';
import type { CSSObject } from '@ant-design/cssinjs';
import { FastColor } from '@ant-design/fast-color';

import { clearFix, resetComponent } from '../../style';
import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';
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
import genVirtualStyle from './virtual';

export interface ComponentToken {
  /**
   * @desc 表头背景
   * @descEN Background of table header
   */
  headerBg: string;
  /**
   * @desc 表头文字颜色
   * @descEN Color of table header text
   */
  headerColor: string;
  /**
   * @desc 表头排序激活态背景色
   * @descEN Background color of table header when sorted
   */
  headerSortActiveBg: string;
  /**
   * @desc 表头排序激活态悬浮背景色
   * @descEN Background color of table header when sorted and hovered
   */
  headerSortHoverBg: string;
  /**
   * @desc 表格排序列背景色
   * @descEN Background color of table sorted column
   */
  bodySortBg: string;
  /**
   * @desc 表格行悬浮背景色
   * @descEN Background color of table hovered row
   */
  rowHoverBg: string;
  /**
   * @desc 表格行选中背景色
   * @descEN Background color of table selected row
   */
  rowSelectedBg: string;
  /**
   * @desc 表格行选中悬浮背景色
   * @descEN Background color of table selected row when hovered
   */
  rowSelectedHoverBg: string;
  /**
   * @desc 表格行展开背景色
   * @descEN Background color of table expanded row
   */
  rowExpandedBg: string;
  /**
   * @desc 单元格纵向内间距
   * @descEN Vertical padding of table cell
   */
  cellPaddingBlock: number;
  /**
   * @desc 单元格横向内间距（默认大尺寸）
   * @descEN Horizontal padding of table cell (large size by default)
   */
  cellPaddingInline: number;
  /**
   * @desc 单元格纵向内间距（中等尺寸）
   * @descEN Vertical padding of table cell (middle size)
   */
  cellPaddingBlockMD: number;
  /**
   * @desc 单元格横向内间距（中等尺寸）
   * @descEN Horizontal padding of table cell (middle size)
   */
  cellPaddingInlineMD: number;
  /**
   * @desc 单元格纵向内间距（小尺寸）
   * @descEN Vertical padding of table cell (small size)
   */
  cellPaddingBlockSM: number;
  /**
   * @desc 单元格横向内间距（小尺寸）
   * @descEN Horizontal padding of table cell (small size)
   */
  cellPaddingInlineSM: number;
  /**
   * @desc 表格边框/分割线颜色
   * @descEN Border color of table
   */
  borderColor: string;
  /**
   * @desc 表头圆角
   * @descEN Border radius of table header
   */
  headerBorderRadius: number;
  /**
   * @desc 表格底部背景色
   * @descEN Background of footer
   */
  footerBg: string;
  /**
   * @desc 表格底部文字颜色
   * @descEN Color of footer text
   */
  footerColor: string;
  /**
   * @desc 单元格文字大小（默认大尺寸）
   * @descEN Font size of table cell (large size by default)
   */
  cellFontSize: number;
  /**
   * @desc 单元格文字大小（中等尺寸）
   * @descEN Font size of table cell (middle size)
   */
  cellFontSizeMD: number;
  /**
   * @desc 单元格文字大小（小尺寸）
   * @descEN Font size of table cell (small size)
   */
  cellFontSizeSM: number;
  /**
   * @desc 表头分割线颜色
   * @descEN Split border color of table header
   */
  headerSplitColor: string;
  /**
   * @desc 固定表头排序激活态背景色
   * @descEN Background color of fixed table header when sorted
   */
  fixedHeaderSortActiveBg: string;
  /**
   * @desc 表头过滤按钮悬浮背景色
   * @descEN Background color of table header filter button when hovered
   */
  headerFilterHoverBg: string;
  /**
   * @desc 过滤下拉菜单选项背景
   * @descEN Background of filter dropdown menu item
   */
  filterDropdownMenuBg: string;
  /**
   * @desc 过滤下拉菜单颜色
   * @descEN Color of filter dropdown
   */
  filterDropdownBg: string;
  /**
   * @desc 展开按钮背景色
   * @descEN Background of expand button
   */
  expandIconBg: string;
  /**
   * @desc 选择列宽度
   * @descEN Width of selection column
   */
  selectionColumnWidth: number | string;
  /**
   * @desc Sticky 模式下滚动条背景色
   * @descEN Background of sticky scrollbar
   */
  stickyScrollBarBg: string;
  /**
   * @desc Sticky 模式下滚动条圆角
   * @descEN Border radius of sticky scrollbar
   */
  stickyScrollBarBorderRadius: number;

  /** @internal */
  expandIconMarginTop: number;
  /** @internal */
  expandIconHalfInner: number;
  /** @internal */
  expandIconSize: number;
  /** @internal */
  expandIconScale: number;
  /** @internal */
  headerIconColor: string;
  /** @internal */
  headerIconHoverColor: string;
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
  tableBodySortBg: string;
  tableFixedHeaderSortActiveBg: string;
  tableHeaderFilterActiveBg: string;
  tableFilterDropdownBg: string;
  tableFilterDropdownHeight: number | string;
  tableRowHoverBg: string;
  tableSelectedRowBg: string;
  tableSelectedRowHoverBg: string;

  tableFontSizeMiddle: number;
  tableFontSizeSmall: number;
  tableSelectionColumnWidth: number | string;
  tableExpandIconBg: string;
  tableExpandColumnWidth: number | string;
  tableExpandedRowBg: string;
  tableFilterDropdownWidth: number;
  tableFilterDropdownSearchWidth: number;

  // Z-Index
  zIndexTableFixed: number;
  zIndexTableSticky: number | string;

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
    tableExpandColumnWidth,
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
    tableFooterTextColor,
    tableFooterBg,
    calc,
  } = token;
  const tableBorder = `${unit(lineWidth)} ${lineType} ${tableBorderColor}`;
  return {
    [`${componentCls}-wrapper`]: {
      clear: 'both',
      maxWidth: '100%',
      ...clearFix(),

      [componentCls]: {
        ...resetComponent(token),
        fontSize: tableFontSize,
        background: tableBg,
        borderRadius: `${unit(tableRadius)} ${unit(tableRadius)} 0 0`,
        // https://github.com/ant-design/ant-design/issues/47486
        scrollbarColor: `${token.tableScrollThumbBg} ${token.tableScrollBg}`,
      },
      // https://github.com/ant-design/ant-design/issues/17611
      table: {
        width: '100%',
        textAlign: 'start',
        borderRadius: `${unit(tableRadius)} ${unit(tableRadius)} 0 0`,
        borderCollapse: 'separate',
        borderSpacing: 0,
      },

      // ============================= Cell ==============================
      [`
          ${componentCls}-cell,
          ${componentCls}-thead > tr > th,
          ${componentCls}-tbody > tr > th,
          ${componentCls}-tbody > tr > td,
          tfoot > tr > th,
          tfoot > tr > td
        `]: {
        position: 'relative',
        padding: `${unit(tablePaddingVertical)} ${unit(tablePaddingHorizontal)}`,
        overflowWrap: 'break-word',
      },

      // ============================ Title =============================
      [`${componentCls}-title`]: {
        padding: `${unit(tablePaddingVertical)} ${unit(tablePaddingHorizontal)}`,
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
          '> th, > td': {
            transition: `background ${motionDurationMid}, border-color ${motionDurationMid}`,
            borderBottom: tableBorder,

            // ========================= Nest Table ===========================
            [`
              > ${componentCls}-wrapper:only-child,
              > ${componentCls}-expanded-row-fixed > ${componentCls}-wrapper:only-child
            `]: {
              [componentCls]: {
                marginBlock: unit(calc(tablePaddingVertical).mul(-1).equal()),
                marginInline: `${unit(
                  calc(tableExpandColumnWidth).sub(tablePaddingHorizontal).equal(),
                )}
                ${unit(calc(tablePaddingHorizontal).mul(-1).equal())}`,
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
        },
      },

      // ============================ Footer ============================
      [`${componentCls}-footer`]: {
        padding: `${unit(tablePaddingVertical)} ${unit(tablePaddingHorizontal)}`,
        color: tableFooterTextColor,
        background: tableFooterBg,
      },
    },
  };
};

export const prepareComponentToken: GetDefaultToken<'Table'> = (token) => {
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
    controlHeight,
    colorTextPlaceholder,
    fontSize,
    fontSizeSM,
    lineHeight,
    lineWidth,
    colorIcon,
    colorIconHover,
    opacityLoading,
    controlInteractiveSize,
  } = token;

  const colorFillSecondarySolid = new FastColor(colorFillSecondary)
    .onBackground(colorBgContainer)
    .toHexString();
  const colorFillContentSolid = new FastColor(colorFillContent)
    .onBackground(colorBgContainer)
    .toHexString();
  const colorFillAlterSolid = new FastColor(colorFillAlter)
    .onBackground(colorBgContainer)
    .toHexString();

  const baseColorAction = new FastColor(colorIcon);
  const baseColorActionHover = new FastColor(colorIconHover);

  const expandIconHalfInner = controlInteractiveSize / 2 - lineWidth;
  const expandIconSize = expandIconHalfInner * 2 + lineWidth * 3;

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
    expandIconMarginTop:
      (fontSize * lineHeight - lineWidth * 3) / 2 -
      Math.ceil((fontSizeSM * 1.4 - lineWidth * 3) / 2),
    headerIconColor: baseColorAction
      .clone()
      .setA(baseColorAction.a * opacityLoading)
      .toRgbString(),
    headerIconHoverColor: baseColorActionHover
      .clone()
      .setA(baseColorActionHover.a * opacityLoading)
      .toRgbString(),
    expandIconHalfInner,
    expandIconSize,
    expandIconScale: controlInteractiveSize / expandIconSize,
  };
};

const zIndexTableFixed = 2;

// ============================== Export ==============================
export default genStyleHooks(
  'Table',
  (token) => {
    const {
      colorTextHeading,
      colorSplit,
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
      calc,
    } = token;

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
      tableBodySortBg: bodySortBg,
      tableFixedHeaderSortActiveBg: fixedHeaderSortActiveBg,
      tableHeaderFilterActiveBg: headerFilterHoverBg,
      tableFilterDropdownBg: filterDropdownBg,
      tableRowHoverBg: rowHoverBg,
      tableSelectedRowBg: rowSelectedBg,
      tableSelectedRowHoverBg: rowSelectedHoverBg,
      zIndexTableFixed,
      zIndexTableSticky: calc(zIndexTableFixed).add(1).equal({ unit: false }),
      tableFontSizeMiddle: cellFontSizeMD,
      tableFontSizeSmall: cellFontSizeSM,
      tableSelectionColumnWidth: selectionColumnWidth,
      tableExpandIconBg: expandIconBg,
      tableExpandColumnWidth: calc(checkboxSize).add(calc(token.padding).mul(2)).equal(),
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
      genVirtualStyle(tableToken),
    ];
  },
  prepareComponentToken,
  {
    unitless: {
      expandIconScale: true,
    },
  },
);
