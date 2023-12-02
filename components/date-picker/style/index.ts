import type { CSSObject } from '@ant-design/cssinjs';
import { unit } from '@ant-design/cssinjs';
import { TinyColor } from '@ctrl/tinycolor';

import type { SharedComponentToken, SharedInputToken } from '../../input/style';
import {
  genActiveStyle,
  genBasicInputStyle,
  genHoverStyle,
  initComponentToken,
  initInputToken,
} from '../../input/style';
import { resetComponent, textEllipsis } from '../../style';
import { genCompactItemStyle } from '../../style/compact-item';
import {
  initMoveMotion,
  initSlideMotion,
  slideDownIn,
  slideDownOut,
  slideUpIn,
  slideUpOut,
} from '../../style/motion';
import type { GlobalToken } from '../../theme/interface';
import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';
import type { TokenWithCommonCls } from '../../theme/util/genComponentStyleHook';
import type { ArrowToken } from '../../style/roundedArrow';
import { genRoundedArrow, getArrowToken } from '../../style/roundedArrow';

export interface PanelComponentToken {
  /**
   * @desc 单元格悬浮态背景色
   * @descEN Background color of cell hover state
   */
  cellHoverBg: string;
  /**
   * @desc 选取范围内的单元格背景色
   * @descEN Background color of cell in range
   */
  cellActiveWithRangeBg: string;
  /**
   * @desc 选取范围内的单元格悬浮态背景色
   * @descEN Background color of hovered cell in range
   */
  cellHoverWithRangeBg: string;
  /**
   * @desc 单元格禁用态背景色
   * @descEN Background color of disabled cell
   */
  cellBgDisabled: string;
  /**
   * @desc 选取范围时单元格边框色
   * @descEN Border color of cell in range when picking
   */
  cellRangeBorderColor: string;
  /**
   * @desc 时间列宽度
   * @descEN Width of time column
   */
  timeColumnWidth: number;
  /**
   * @desc 时间列高度
   * @descEN Height of time column
   */
  timeColumnHeight: number;
  /**
   * @desc 时间单元格高度
   * @descEN Height of time cell
   */
  timeCellHeight: number;
  /**
   * @desc 单元格高度
   * @descEN Height of cell
   */
  cellHeight: number;
  /**
   * @desc 单元格宽度
   * @descEN Width of cell
   */
  cellWidth: number;
  /**
   * @desc 单元格文本高度
   * @descEN Height of cell text
   */
  textHeight: number;
  /**
   * @desc 十年/年/季/月/周单元格高度
   * @descEN Height of decade/year/quarter/month/week cell
   */
  withoutTimeCellHeight: number;
}

export interface ComponentToken
  extends Exclude<SharedComponentToken, 'addonBg'>,
    PanelComponentToken,
    ArrowToken {
  /**
   * @desc 预设区域宽度
   * @descEN Width of preset area
   */
  presetsWidth: number;
  /**
   * @desc 预设区域最大宽度
   * @descEN Max width of preset area
   */
  presetsMaxWidth: number;
  /**
   * @desc 弹窗 z-index
   * @descEN z-index of popup
   */
  zIndexPopup: number;
}

export type PickerPanelToken = {
  pickerCellCls: string;
  pickerCellInnerCls: string;
  pickerDatePanelPaddingHorizontal: number | string;
  pickerYearMonthCellWidth: number | string;
  pickerCellPaddingVertical: number | string;
  pickerQuarterPanelContentHeight: number | string;
  pickerCellBorderGap: number;
  pickerControlIconSize: number;
  pickerControlIconMargin: number;
  pickerControlIconBorderWidth: number;
};

type PickerToken = FullToken<'DatePicker'> & PickerPanelToken & SharedInputToken;

type SharedPickerToken = TokenWithCommonCls<GlobalToken> & PickerPanelToken & PanelComponentToken;

const genPikerPadding = (
  token: PickerToken,
  inputHeight: number,
  fontHeight: number,
  paddingHorizontal: number,
): CSSObject => {
  const height = token.calc(fontHeight).add(2).equal();
  const paddingTop = token.max(token.calc(inputHeight).sub(height).div(2).equal(), 0);
  const paddingBottom = token.max(token.calc(inputHeight).sub(height).sub(paddingTop).equal(), 0);

  return {
    padding: `${unit(paddingTop)} ${unit(paddingHorizontal)} ${unit(paddingBottom)}`,
  };
};

const genPickerCellInnerStyle = (token: SharedPickerToken): CSSObject => {
  const {
    componentCls,
    pickerCellCls,
    pickerCellInnerCls,
    cellHeight,
    motionDurationSlow,
    borderRadiusSM,
    motionDurationMid,
    cellHoverBg,
    lineWidth,
    lineType,
    colorPrimary,
    cellActiveWithRangeBg,
    colorTextLightSolid,
    controlHeightSM,
    cellRangeBorderColor,
    pickerCellBorderGap,
    cellHoverWithRangeBg,
    cellWidth,
    colorTextDisabled,
    cellBgDisabled,
  } = token;

  return {
    '&::before': {
      position: 'absolute',
      top: '50%',
      insetInlineStart: 0,
      insetInlineEnd: 0,
      zIndex: 1,
      height: cellHeight,
      transform: 'translateY(-50%)',
      transition: `all ${motionDurationSlow}`,
      content: '""',
    },

    // >>> Default
    [pickerCellInnerCls]: {
      position: 'relative',
      zIndex: 2,
      display: 'inline-block',
      minWidth: cellHeight,
      height: cellHeight,
      lineHeight: unit(cellHeight),
      borderRadius: borderRadiusSM,
      transition: `background ${motionDurationMid}, border ${motionDurationMid}`,
    },
    [`&-range-hover-start, &-range-hover-end`]: {
      [pickerCellInnerCls]: {
        borderStartEndRadius: 0,
        borderEndEndRadius: 0,
      },
    },

    // >>> Hover
    [`&:hover:not(${pickerCellCls}-in-view),
    &:hover:not(${pickerCellCls}-selected):not(${pickerCellCls}-range-start):not(${pickerCellCls}-range-end):not(${pickerCellCls}-range-hover-start):not(${pickerCellCls}-range-hover-end)`]:
      {
        [pickerCellInnerCls]: {
          background: cellHoverBg,
        },
      },

    // >>> Today
    [`&-in-view${pickerCellCls}-today ${pickerCellInnerCls}`]: {
      '&::before': {
        position: 'absolute',
        top: 0,
        insetInlineEnd: 0,
        bottom: 0,
        insetInlineStart: 0,
        zIndex: 1,
        border: `${unit(lineWidth)} ${lineType} ${colorPrimary}`,
        borderRadius: borderRadiusSM,
        content: '""',
      },
    },

    // >>> In Range
    [`&-in-view${pickerCellCls}-in-range`]: {
      position: 'relative',

      '&::before': {
        background: cellActiveWithRangeBg,
      },
    },

    // >>> Selected
    [`&-in-view${pickerCellCls}-selected ${pickerCellInnerCls},
      &-in-view${pickerCellCls}-range-start ${pickerCellInnerCls},
      &-in-view${pickerCellCls}-range-end ${pickerCellInnerCls}`]: {
      color: colorTextLightSolid,
      background: colorPrimary,
    },

    [`&-in-view${pickerCellCls}-range-start:not(${pickerCellCls}-range-start-single),
      &-in-view${pickerCellCls}-range-end:not(${pickerCellCls}-range-end-single)`]: {
      '&::before': {
        background: cellActiveWithRangeBg,
      },
    },

    [`&-in-view${pickerCellCls}-range-start::before`]: {
      insetInlineStart: '50%',
    },

    [`&-in-view${pickerCellCls}-range-end::before`]: {
      insetInlineEnd: '50%',
    },

    // >>> Range Hover
    [`&-in-view${pickerCellCls}-range-hover-start:not(${pickerCellCls}-in-range):not(${pickerCellCls}-range-start):not(${pickerCellCls}-range-end),
      &-in-view${pickerCellCls}-range-hover-end:not(${pickerCellCls}-in-range):not(${pickerCellCls}-range-start):not(${pickerCellCls}-range-end),
      &-in-view${pickerCellCls}-range-hover-start${pickerCellCls}-range-start-single,
      &-in-view${pickerCellCls}-range-hover-start${pickerCellCls}-range-start${pickerCellCls}-range-end${pickerCellCls}-range-end-near-hover,
      &-in-view${pickerCellCls}-range-hover-end${pickerCellCls}-range-start${pickerCellCls}-range-end${pickerCellCls}-range-start-near-hover,
      &-in-view${pickerCellCls}-range-hover-end${pickerCellCls}-range-end-single,
      &-in-view${pickerCellCls}-range-hover:not(${pickerCellCls}-in-range)`]: {
      '&::after': {
        position: 'absolute',
        top: '50%',
        zIndex: 0,
        height: controlHeightSM,
        borderTop: `${unit(lineWidth)} dashed ${cellRangeBorderColor}`,
        borderBottom: `${unit(lineWidth)} dashed ${cellRangeBorderColor}`,
        transform: 'translateY(-50%)',
        transition: `all ${motionDurationSlow}`,
        content: '""',
      },
    },

    // Add space for stash
    [`&-range-hover-start::after,
      &-range-hover-end::after,
      &-range-hover::after`]: {
      insetInlineEnd: 0,
      insetInlineStart: pickerCellBorderGap,
    },

    // Hover with in range
    [`&-in-view${pickerCellCls}-in-range${pickerCellCls}-range-hover::before,
      &-in-view${pickerCellCls}-in-range${pickerCellCls}-range-hover-start::before,
      &-in-view${pickerCellCls}-in-range${pickerCellCls}-range-hover-end::before,
      &-in-view${pickerCellCls}-range-start${pickerCellCls}-range-hover::before,
      &-in-view${pickerCellCls}-range-end${pickerCellCls}-range-hover::before,
      &-in-view${pickerCellCls}-range-start:not(${pickerCellCls}-range-start-single)${pickerCellCls}-range-hover-start::before,
      &-in-view${pickerCellCls}-range-end:not(${pickerCellCls}-range-end-single)${pickerCellCls}-range-hover-end::before,
      ${componentCls}-panel
      > :not(${componentCls}-date-panel)
      &-in-view${pickerCellCls}-in-range${pickerCellCls}-range-hover-start::before,
      ${componentCls}-panel
      > :not(${componentCls}-date-panel)
      &-in-view${pickerCellCls}-in-range${pickerCellCls}-range-hover-end::before`]: {
      background: cellHoverWithRangeBg,
    },

    // range start border-radius
    [`&-in-view${pickerCellCls}-range-start:not(${pickerCellCls}-range-start-single):not(${pickerCellCls}-range-end) ${pickerCellInnerCls}`]:
      {
        borderStartStartRadius: borderRadiusSM,
        borderEndStartRadius: borderRadiusSM,
        borderStartEndRadius: 0,
        borderEndEndRadius: 0,
      },

    // range end border-radius
    [`&-in-view${pickerCellCls}-range-end:not(${pickerCellCls}-range-end-single):not(${pickerCellCls}-range-start) ${pickerCellInnerCls}`]:
      {
        borderStartStartRadius: 0,
        borderEndStartRadius: 0,
        borderStartEndRadius: borderRadiusSM,
        borderEndEndRadius: borderRadiusSM,
      },

    [`&-range-hover${pickerCellCls}-range-end::after`]: {
      insetInlineStart: '50%',
    },

    // Edge start
    [`tr > &-in-view${pickerCellCls}-range-hover:first-child::after,
      tr > &-in-view${pickerCellCls}-range-hover-end:first-child::after,
      &-in-view${pickerCellCls}-start${pickerCellCls}-range-hover-edge-start${pickerCellCls}-range-hover-edge-start-near-range::after,
      &-in-view${pickerCellCls}-range-hover-edge-start:not(${pickerCellCls}-range-hover-edge-start-near-range)::after,
      &-in-view${pickerCellCls}-range-hover-start::after`]: {
      insetInlineStart: token.calc(cellWidth).sub(cellHeight).div(2).equal(),
      borderInlineStart: `${unit(lineWidth)} dashed ${cellRangeBorderColor}`,
      borderStartStartRadius: borderRadiusSM,
      borderEndStartRadius: borderRadiusSM,
    },

    // Edge end
    [`tr > &-in-view${pickerCellCls}-range-hover:last-child::after,
      tr > &-in-view${pickerCellCls}-range-hover-start:last-child::after,
      &-in-view${pickerCellCls}-end${pickerCellCls}-range-hover-edge-end${pickerCellCls}-range-hover-edge-end-near-range::after,
      &-in-view${pickerCellCls}-range-hover-edge-end:not(${pickerCellCls}-range-hover-edge-end-near-range)::after,
      &-in-view${pickerCellCls}-range-hover-end::after`]: {
      insetInlineEnd: token.calc(cellWidth).sub(cellHeight).div(2).equal(),
      borderInlineEnd: `${unit(lineWidth)} dashed ${cellRangeBorderColor}`,
      borderStartEndRadius: borderRadiusSM,
      borderEndEndRadius: borderRadiusSM,
    },

    // >>> Disabled
    '&-disabled': {
      color: colorTextDisabled,
      pointerEvents: 'none',

      [pickerCellInnerCls]: {
        background: 'transparent',
      },

      '&::before': {
        background: cellBgDisabled,
      },
    },
    [`&-disabled${pickerCellCls}-today ${pickerCellInnerCls}::before`]: {
      borderColor: colorTextDisabled,
    },
  };
};

export const genPanelStyle = (token: SharedPickerToken): CSSObject => {
  const {
    componentCls,
    pickerCellCls,
    pickerCellInnerCls,
    pickerYearMonthCellWidth,
    pickerControlIconSize,
    cellWidth,
    paddingSM,
    paddingXS,
    paddingXXS,
    colorBgContainer,
    lineWidth,
    lineType,
    borderRadiusLG,
    colorPrimary,
    colorTextHeading,
    colorSplit,
    pickerControlIconBorderWidth,
    colorIcon,
    textHeight,
    motionDurationMid,
    colorIconHover,
    fontWeightStrong,
    cellHeight,
    pickerCellPaddingVertical,
    colorTextDisabled,
    colorText,
    fontSize,
    cellHoverWithRangeBg,
    motionDurationSlow,
    withoutTimeCellHeight,
    pickerQuarterPanelContentHeight,
    colorLink,
    colorLinkActive,
    colorLinkHover,
    cellRangeBorderColor,
    borderRadiusSM,
    colorTextLightSolid,
    cellHoverBg,
    timeColumnHeight,
    timeColumnWidth,
    timeCellHeight,
    controlItemBgActive,
    marginXXS,
    pickerDatePanelPaddingHorizontal,
    pickerControlIconMargin,
  } = token;

  const pickerPanelWidth = token
    .calc(cellWidth)
    .mul(7)
    .add(token.calc(pickerDatePanelPaddingHorizontal).mul(2))
    .equal();
  const commonHoverCellFixedDistance = token
    .calc(pickerPanelWidth)
    .sub(token.calc(paddingXS).mul(2))
    .div(3)
    .sub(token.pickerYearMonthCellWidth)
    .sub(paddingSM)
    .equal();
  const quarterHoverCellFixedDistance = token
    .calc(pickerPanelWidth)
    .sub(token.calc(paddingXS).mul(2))
    .div(4)
    .sub(token.pickerYearMonthCellWidth)
    .equal();

  return {
    [componentCls]: {
      '&-panel': {
        display: 'inline-flex',
        flexDirection: 'column',
        textAlign: 'center',
        background: colorBgContainer,
        border: `${unit(lineWidth)} ${lineType} ${colorSplit}`,
        borderRadius: borderRadiusLG,
        outline: 'none',

        '&-focused': {
          borderColor: colorPrimary,
        },

        '&-rtl': {
          direction: 'rtl',

          [`${componentCls}-prev-icon,
              ${componentCls}-super-prev-icon`]: {
            transform: 'rotate(45deg)',
          },

          [`${componentCls}-next-icon,
              ${componentCls}-super-next-icon`]: {
            transform: 'rotate(-135deg)',
          },
        },
      },

      // ========================================================
      // =                     Shared Panel                     =
      // ========================================================
      [`&-decade-panel,
        &-year-panel,
        &-quarter-panel,
        &-month-panel,
        &-week-panel,
        &-date-panel,
        &-time-panel`]: {
        display: 'flex',
        flexDirection: 'column',
        width: pickerPanelWidth,
      },

      // ======================= Header =======================
      '&-header': {
        display: 'flex',
        padding: `0 ${unit(paddingXS)}`,
        color: colorTextHeading,
        borderBottom: `${unit(lineWidth)} ${lineType} ${colorSplit}`,

        '> *': {
          flex: 'none',
        },

        button: {
          padding: 0,
          color: colorIcon,
          lineHeight: unit(textHeight),
          background: 'transparent',
          border: 0,
          cursor: 'pointer',
          transition: `color ${motionDurationMid}`,
          fontSize: 'inherit',
        },

        '> button': {
          minWidth: '1.6em',
          fontSize,

          '&:hover': {
            color: colorIconHover,
          },
        },

        '&-view': {
          flex: 'auto',
          fontWeight: fontWeightStrong,
          lineHeight: unit(textHeight),

          button: {
            color: 'inherit',
            fontWeight: 'inherit',
            verticalAlign: 'top',

            '&:not(:first-child)': {
              marginInlineStart: paddingXS,
            },

            '&:hover': {
              color: colorPrimary,
            },
          },
        },
      },
      // Arrow button
      [`&-prev-icon,
        &-next-icon,
        &-super-prev-icon,
        &-super-next-icon`]: {
        position: 'relative',
        display: 'inline-block',
        width: pickerControlIconSize,
        height: pickerControlIconSize,

        '&::before': {
          position: 'absolute',
          top: 0,
          insetInlineStart: 0,
          display: 'inline-block',
          width: pickerControlIconSize,
          height: pickerControlIconSize,
          border: `0 solid currentcolor`,
          borderBlockStartWidth: pickerControlIconBorderWidth,
          borderBlockEndWidth: 0,
          borderInlineStartWidth: pickerControlIconBorderWidth,
          borderInlineEndWidth: 0,
          content: '""',
        },
      },

      [`&-super-prev-icon,
        &-super-next-icon`]: {
        '&::after': {
          position: 'absolute',
          top: pickerControlIconMargin,
          insetInlineStart: pickerControlIconMargin,
          display: 'inline-block',
          width: pickerControlIconSize,
          height: pickerControlIconSize,
          border: '0 solid currentcolor',
          borderBlockStartWidth: pickerControlIconBorderWidth,
          borderBlockEndWidth: 0,
          borderInlineStartWidth: pickerControlIconBorderWidth,
          borderInlineEndWidth: 0,
          content: '""',
        },
      },

      [`&-prev-icon,
        &-super-prev-icon`]: {
        transform: 'rotate(-45deg)',
      },

      [`&-next-icon,
        &-super-next-icon`]: {
        transform: 'rotate(135deg)',
      },

      // ======================== Body ========================
      '&-content': {
        width: '100%',
        tableLayout: 'fixed',
        borderCollapse: 'collapse',

        'th, td': {
          position: 'relative',
          minWidth: cellHeight,
          fontWeight: 'normal',
        },

        th: {
          height: token.calc(cellHeight).add(token.calc(pickerCellPaddingVertical).mul(2)).equal(),
          color: colorText,
          verticalAlign: 'middle',
        },
      },

      '&-cell': {
        padding: `${unit(pickerCellPaddingVertical)} 0`,
        color: colorTextDisabled,
        cursor: 'pointer',

        // In view
        '&-in-view': {
          color: colorText,
        },

        ...genPickerCellInnerStyle(token),
      },

      // DatePanel only
      [`&-date-panel ${componentCls}-cell-in-view${componentCls}-cell-in-range${componentCls}-cell-range-hover-start ${pickerCellInnerCls},
        &-date-panel ${componentCls}-cell-in-view${componentCls}-cell-in-range${componentCls}-cell-range-hover-end ${pickerCellInnerCls}`]:
        {
          '&::after': {
            position: 'absolute',
            top: 0,
            bottom: 0,
            zIndex: -1,
            background: cellHoverWithRangeBg,
            transition: `all ${motionDurationSlow}`,
            content: '""',
          },
        },

      [`&-date-panel
        ${componentCls}-cell-in-view${componentCls}-cell-in-range${componentCls}-cell-range-hover-start
        ${pickerCellInnerCls}::after`]: {
        insetInlineEnd: token.calc(cellWidth).sub(cellHeight).mul(-1).div(2).equal(),
        insetInlineStart: 0,
      },

      [`&-date-panel ${componentCls}-cell-in-view${componentCls}-cell-in-range${componentCls}-cell-range-hover-end ${pickerCellInnerCls}::after`]:
        {
          insetInlineEnd: 0,
          insetInlineStart: token.calc(cellWidth).sub(cellHeight).mul(-1).div(2).equal(),
        },

      // Hover with range start & end
      [`&-range-hover${componentCls}-range-start::after`]: {
        insetInlineEnd: '50%',
      },

      [`&-decade-panel,
        &-year-panel,
        &-quarter-panel,
        &-month-panel`]: {
        [`${componentCls}-content`]: {
          height: token.calc(withoutTimeCellHeight).mul(4).equal(),
        },

        [pickerCellInnerCls]: {
          padding: `0 ${unit(paddingXS)}`,
        },
      },

      '&-quarter-panel': {
        [`${componentCls}-content`]: {
          height: pickerQuarterPanelContentHeight,
        },

        // Quarter Panel Special Style
        [`${componentCls}-cell-range-hover-start::after`]: {
          insetInlineStart: quarterHoverCellFixedDistance,
          borderInlineStart: `${unit(lineWidth)} dashed ${cellRangeBorderColor}`,

          [`${componentCls}-panel-rtl &`]: {
            insetInlineEnd: quarterHoverCellFixedDistance,
            borderInlineEnd: `${unit(lineWidth)} dashed ${cellRangeBorderColor}`,
          },
        },
        [`${componentCls}-cell-range-hover-end::after`]: {
          insetInlineEnd: quarterHoverCellFixedDistance,
          borderInlineEnd: `${unit(lineWidth)} dashed ${cellRangeBorderColor}`,

          [`${componentCls}-panel-rtl &`]: {
            insetInlineStart: quarterHoverCellFixedDistance,
            borderInlineStart: `${unit(lineWidth)} dashed ${cellRangeBorderColor}`,
          },
        },
      },

      // ======================== Footer ========================
      [`&-panel ${componentCls}-footer`]: {
        borderTop: `${unit(lineWidth)} ${lineType} ${colorSplit}`,
      },

      '&-footer': {
        width: 'min-content',
        minWidth: '100%',
        lineHeight: unit(token.calc(textHeight).sub(token.calc(lineWidth).mul(2)).equal()),
        textAlign: 'center',

        '&-extra': {
          padding: `0 ${unit(paddingSM)}`,
          lineHeight: unit(token.calc(textHeight).sub(token.calc(lineWidth).mul(2)).equal()),
          textAlign: 'start',

          '&:not(:last-child)': {
            borderBottom: `${unit(lineWidth)} ${lineType} ${colorSplit}`,
          },
        },
      },

      '&-now': {
        textAlign: 'start',
      },

      '&-today-btn': {
        color: colorLink,

        '&:hover': {
          color: colorLinkHover,
        },

        '&:active': {
          color: colorLinkActive,
        },

        [`&${componentCls}-today-btn-disabled`]: {
          color: colorTextDisabled,
          cursor: 'not-allowed',
        },
      },

      // ========================================================
      // =                       Special                        =
      // ========================================================

      // ===================== Decade Panel =====================
      '&-decade-panel': {
        [pickerCellInnerCls]: {
          padding: `0 ${unit(token.calc(paddingXS).div(2).equal())}`,
        },

        [`${componentCls}-cell::before`]: {
          display: 'none',
        },
      },

      // ============= Year & Quarter & Month Panel =============
      [`&-year-panel,
        &-quarter-panel,
        &-month-panel`]: {
        [`${componentCls}-body`]: {
          padding: `0 ${unit(paddingXS)}`,
        },

        [pickerCellInnerCls]: {
          width: pickerYearMonthCellWidth,
        },

        [`${componentCls}-cell-range-hover-start::after`]: {
          borderStartStartRadius: borderRadiusSM,
          borderEndStartRadius: borderRadiusSM,
          borderStartEndRadius: 0,
          borderEndEndRadius: 0,

          [`${componentCls}-panel-rtl &`]: {
            borderStartStartRadius: 0,
            borderEndStartRadius: 0,
            borderStartEndRadius: borderRadiusSM,
            borderEndEndRadius: borderRadiusSM,
          },
        },
        [`${componentCls}-cell-range-hover-end::after`]: {
          borderStartStartRadius: 0,
          borderEndStartRadius: 0,
          borderStartEndRadius: borderRadiusSM,
          borderEndEndRadius: borderRadiusSM,

          [`${componentCls}-panel-rtl &`]: {
            borderStartStartRadius: borderRadiusSM,
            borderEndStartRadius: borderRadiusSM,
            borderStartEndRadius: 0,
            borderEndEndRadius: 0,
          },
        },
      },

      [`&-year-panel,
        &-month-panel`]: {
        [`${componentCls}-cell-range-hover-start::after`]: {
          insetInlineStart: commonHoverCellFixedDistance,
          borderInlineStart: `${unit(lineWidth)} dashed ${cellRangeBorderColor}`,

          [`${componentCls}-panel-rtl &`]: {
            insetInlineEnd: commonHoverCellFixedDistance,
            borderInlineEnd: `${unit(lineWidth)} dashed ${cellRangeBorderColor}`,
          },
        },
        [`${componentCls}-cell-range-hover-end::after`]: {
          insetInlineEnd: commonHoverCellFixedDistance,
          borderInlineEnd: `${unit(lineWidth)} dashed ${cellRangeBorderColor}`,

          [`${componentCls}-panel-rtl &`]: {
            insetInlineStart: commonHoverCellFixedDistance,
            borderInlineStart: `${unit(lineWidth)} dashed ${cellRangeBorderColor}`,
          },
        },
      },

      // ====================== Week Panel ======================
      '&-week-panel': {
        [`${componentCls}-body`]: {
          padding: `${unit(paddingXS)} ${unit(paddingSM)}`,
        },

        // Clear cell style
        [`${componentCls}-cell`]: {
          [`&:hover ${pickerCellInnerCls},
            &-selected ${pickerCellInnerCls},
            ${pickerCellInnerCls}`]: {
            background: 'transparent !important',
          },
        },

        '&-row': {
          td: {
            '&:before': {
              transition: `background ${motionDurationMid}`,
            },

            '&:first-child:before': {
              borderStartStartRadius: borderRadiusSM,
              borderEndStartRadius: borderRadiusSM,
            },

            '&:last-child:before': {
              borderStartEndRadius: borderRadiusSM,
              borderEndEndRadius: borderRadiusSM,
            },
          },

          [`&:hover td`]: {
            '&:before': {
              background: cellHoverBg,
            },
          },

          [`&-range-start td,
            &-range-end td,
            &-selected td`]: {
            // Rise priority to override hover style
            [`&${pickerCellCls}`]: {
              '&:before': {
                background: colorPrimary,
              },

              [`&${componentCls}-cell-week`]: {
                color: new TinyColor(colorTextLightSolid).setAlpha(0.5).toHexString(),
              },

              [pickerCellInnerCls]: {
                color: colorTextLightSolid,
              },
            },
          },

          [`&-range-hover td:before`]: {
            background: controlItemBgActive,
          },
        },
      },

      // ====================== Date Panel ======================
      '&-date-panel': {
        [`${componentCls}-body`]: {
          padding: `${unit(paddingXS)} ${unit(pickerDatePanelPaddingHorizontal)}`,
        },

        [`${componentCls}-content`]: {
          width: token.calc(cellWidth).mul(7).equal(),

          th: {
            width: cellWidth,
            boxSizing: 'border-box',
            padding: 0,
          },
        },
      },

      // ==================== Datetime Panel ====================
      '&-datetime-panel': {
        display: 'flex',

        [`${componentCls}-time-panel`]: {
          borderInlineStart: `${unit(lineWidth)} ${lineType} ${colorSplit}`,
        },

        [`${componentCls}-date-panel,
          ${componentCls}-time-panel`]: {
          transition: `opacity ${motionDurationSlow}`,
        },

        // Keyboard
        '&-active': {
          [`${componentCls}-date-panel,
            ${componentCls}-time-panel`]: {
            opacity: 0.3,

            '&-active': {
              opacity: 1,
            },
          },
        },
      },

      // ====================== Time Panel ======================
      '&-time-panel': {
        width: 'auto',
        minWidth: 'auto',
        direction: 'ltr',

        [`${componentCls}-content`]: {
          display: 'flex',
          flex: 'auto',
          height: timeColumnHeight,
        },

        '&-column': {
          flex: '1 0 auto',
          width: timeColumnWidth,
          margin: `${unit(paddingXXS)} 0`,
          padding: 0,
          overflowY: 'hidden',
          textAlign: 'start',
          listStyle: 'none',
          transition: `background ${motionDurationMid}`,
          overflowX: 'hidden',

          '&::-webkit-scrollbar': {
            width: 8,
            backgroundColor: 'transparent',
          },

          '&::-webkit-scrollbar-thumb': {
            backgroundColor: token.colorTextTertiary,
            borderRadius: 4,
          },

          // For Firefox
          '&': {
            scrollbarWidth: 'thin',
            scrollbarColor: `${token.colorTextTertiary} transparent`,
          },

          '&::after': {
            display: 'block',
            height: token.calc(timeColumnHeight).sub(timeCellHeight).equal(),
            content: '""',
          },

          '&:not(:first-child)': {
            borderInlineStart: `${unit(lineWidth)} ${lineType} ${colorSplit}`,
          },

          '&-active': {
            background: new TinyColor(controlItemBgActive).setAlpha(0.2).toHexString(),
          },

          '&:hover': {
            overflowY: 'auto',
          },

          '> li': {
            margin: 0,
            padding: 0,

            [`&${componentCls}-time-panel-cell`]: {
              marginInline: marginXXS,
              [`${componentCls}-time-panel-cell-inner`]: {
                display: 'block',
                width: token.calc(timeColumnWidth).sub(token.calc(marginXXS).mul(2)).equal(),
                height: timeCellHeight,
                margin: 0,
                paddingBlock: 0,
                paddingInlineEnd: 0,
                paddingInlineStart: token.calc(timeColumnWidth).sub(timeCellHeight).div(2).equal(),
                color: colorText,
                lineHeight: unit(timeCellHeight),
                borderRadius: borderRadiusSM,
                cursor: 'pointer',
                transition: `background ${motionDurationMid}`,

                '&:hover': {
                  background: cellHoverBg,
                },
              },

              '&-selected': {
                [`${componentCls}-time-panel-cell-inner`]: {
                  background: controlItemBgActive,
                },
              },

              '&-disabled': {
                [`${componentCls}-time-panel-cell-inner`]: {
                  color: colorTextDisabled,
                  background: 'transparent',
                  cursor: 'not-allowed',
                },
              },
            },
          },
        },
      },
      // https://github.com/ant-design/ant-design/issues/39227
      [`&-datetime-panel ${componentCls}-time-panel-column:after`]: {
        height: token
          .calc(timeColumnHeight)
          .sub(timeCellHeight)
          .add(token.calc(paddingXXS).mul(2))
          .equal(),
      },
    },
  };
};

const genPickerStatusStyle: GenerateStyle<PickerToken> = (token) => {
  const {
    componentCls,
    colorBgContainer,
    colorError,
    errorActiveShadow,
    colorWarning,
    warningActiveShadow,
    colorErrorHover,
    colorWarningHover,
  } = token;

  return {
    [`${componentCls}:not(${componentCls}-disabled):not([disabled])`]: {
      [`&${componentCls}-status-error`]: {
        backgroundColor: colorBgContainer,
        borderColor: colorError,

        '&:hover': {
          borderColor: colorErrorHover,
        },

        [`&${componentCls}-focused, &:focus`]: {
          ...genActiveStyle(
            mergeToken<PickerToken>(token, {
              activeBorderColor: colorError,
              activeShadow: errorActiveShadow,
            }),
          ),
        },

        [`${componentCls}-active-bar`]: {
          background: colorError,
        },
      },

      [`&${componentCls}-status-warning`]: {
        backgroundColor: colorBgContainer,
        borderColor: colorWarning,

        '&:hover': {
          borderColor: colorWarningHover,
        },

        [`&${componentCls}-focused, &:focus`]: {
          ...genActiveStyle(
            mergeToken<PickerToken>(token, {
              activeBorderColor: colorWarning,
              activeShadow: warningActiveShadow,
            }),
          ),
        },

        [`${componentCls}-active-bar`]: {
          background: colorWarning,
        },
      },
    },
  };
};

const genPickerStyle: GenerateStyle<PickerToken> = (token) => {
  const {
    componentCls,
    antCls,
    controlHeight,
    paddingInline,
    colorBgContainer,
    lineWidth,
    lineType,
    colorBorder,
    borderRadius,
    motionDurationMid,
    colorBgContainerDisabled,
    colorTextDisabled,
    colorTextPlaceholder,
    controlHeightLG,
    fontSizeLG,
    controlHeightSM,
    paddingInlineSM,
    paddingXS,
    marginXS,
    colorTextDescription,
    lineWidthBold,
    colorPrimary,
    motionDurationSlow,
    zIndexPopup,
    paddingXXS,
    paddingSM,
    textHeight,
    cellActiveWithRangeBg,
    colorPrimaryBorder,
    sizePopupArrow,
    colorBgElevated,
    borderRadiusLG,
    boxShadowSecondary,
    borderRadiusSM,
    colorSplit,
    cellHoverBg,
    presetsWidth,
    presetsMaxWidth,
    boxShadowPopoverArrow,
    colorTextQuaternary,
    fontHeight,
    fontHeightLG,
    lineHeightLG,
  } = token;

  return [
    {
      [componentCls]: {
        ...resetComponent(token),
        ...genPikerPadding(token, controlHeight, fontHeight, paddingInline),
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        background: colorBgContainer,
        lineHeight: 1,
        border: `${unit(lineWidth)} ${lineType} ${colorBorder}`,
        borderRadius,
        transition: `border ${motionDurationMid}, box-shadow ${motionDurationMid}`,

        '&:hover': {
          ...genHoverStyle(token),
        },

        [`&-focused${componentCls}`]: {
          ...genActiveStyle(token),
        },

        [`&${componentCls}-disabled`]: {
          background: colorBgContainerDisabled,
          borderColor: colorBorder,
          cursor: 'not-allowed',

          [`${componentCls}-suffix`]: {
            color: colorTextQuaternary,
          },
        },

        [`&${componentCls}-borderless`]: {
          backgroundColor: 'transparent !important',
          borderColor: 'transparent !important',
          boxShadow: 'none !important',
        },

        // ======================== Input =========================
        [`${componentCls}-input`]: {
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          width: '100%',

          '> input': {
            ...genBasicInputStyle(token),
            flex: 'auto',

            // Fix Firefox flex not correct:
            // https://github.com/ant-design/ant-design/pull/20023#issuecomment-564389553
            minWidth: 1,
            height: 'auto',
            padding: 0,
            background: 'transparent',
            border: 0,
            borderRadius: 0,
            fontFamily: 'inherit',

            '&:focus': {
              boxShadow: 'none',
            },

            '&[disabled]': {
              background: 'transparent',
            },
          },

          '&:hover': {
            [`${componentCls}-clear`]: {
              opacity: 1,
            },
          },

          '&-placeholder': {
            '> input': {
              color: colorTextPlaceholder,
            },
          },
        },

        // Size
        '&-large': {
          ...genPikerPadding(token, controlHeightLG, fontHeightLG, paddingInline),

          [`${componentCls}-input > input`]: {
            fontSize: fontSizeLG,
            lineHeight: lineHeightLG,
          },
        },

        '&-small': {
          ...genPikerPadding(token, controlHeightSM, fontHeight, paddingInlineSM),
        },

        [`${componentCls}-suffix`]: {
          display: 'flex',
          flex: 'none',
          alignSelf: 'center',
          marginInlineStart: token.calc(paddingXS).div(2).equal(),
          color: colorTextDisabled,
          lineHeight: 1,
          pointerEvents: 'none',

          '> *': {
            verticalAlign: 'top',

            '&:not(:last-child)': {
              marginInlineEnd: marginXS,
            },
          },
        },

        [`${componentCls}-clear`]: {
          position: 'absolute',
          top: '50%',
          insetInlineEnd: 0,
          color: colorTextDisabled,
          lineHeight: 1,
          background: colorBgContainer,
          transform: 'translateY(-50%)',
          cursor: 'pointer',
          opacity: 0,
          transition: `opacity ${motionDurationMid}, color ${motionDurationMid}`,

          '> *': {
            verticalAlign: 'top',
          },

          '&:hover': {
            color: colorTextDescription,
          },
        },

        [`${componentCls}-separator`]: {
          position: 'relative',
          display: 'inline-block',
          width: '1em',
          height: fontSizeLG,
          color: colorTextDisabled,
          fontSize: fontSizeLG,
          verticalAlign: 'top',
          cursor: 'default',

          [`${componentCls}-focused &`]: {
            color: colorTextDescription,
          },

          [`${componentCls}-range-separator &`]: {
            [`${componentCls}-disabled &`]: {
              cursor: 'not-allowed',
            },
          },
        },

        // ======================== Range =========================
        '&-range': {
          position: 'relative',
          display: 'inline-flex',

          // Clear
          [`${componentCls}-clear`]: {
            insetInlineEnd: paddingInline,
          },

          '&:hover': {
            [`${componentCls}-clear`]: {
              opacity: 1,
            },
          },

          // Active bar
          [`${componentCls}-active-bar`]: {
            bottom: token.calc(lineWidth).mul(-1).equal(),
            height: lineWidthBold,
            marginInlineStart: paddingInline,
            background: colorPrimary,
            opacity: 0,
            transition: `all ${motionDurationSlow} ease-out`,
            pointerEvents: 'none',
          },

          [`&${componentCls}-focused`]: {
            [`${componentCls}-active-bar`]: {
              opacity: 1,
            },
          },

          [`${componentCls}-range-separator`]: {
            alignItems: 'center',
            padding: `0 ${unit(paddingXS)}`,
            lineHeight: 1,
          },

          [`&${componentCls}-small`]: {
            [`${componentCls}-clear`]: {
              insetInlineEnd: paddingInlineSM,
            },

            [`${componentCls}-active-bar`]: {
              marginInlineStart: paddingInlineSM,
            },
          },
        },

        // ======================= Dropdown =======================
        '&-dropdown': {
          ...resetComponent(token),
          ...genPanelStyle(token),
          position: 'absolute',
          // Fix incorrect position of picker popup
          // https://github.com/ant-design/ant-design/issues/35590
          top: -9999,
          left: {
            _skip_check_: true,
            value: -9999,
          },
          zIndex: zIndexPopup,

          [`&${componentCls}-dropdown-hidden`]: {
            display: 'none',
          },

          [`&${componentCls}-dropdown-placement-bottomLeft`]: {
            [`${componentCls}-range-arrow`]: {
              top: 0,
              display: 'block',
              transform: 'translateY(-100%)',
            },
          },

          [`&${componentCls}-dropdown-placement-topLeft`]: {
            [`${componentCls}-range-arrow`]: {
              bottom: 0,
              display: 'block',
              transform: 'translateY(100%) rotate(180deg)',
            },
          },

          [`&${antCls}-slide-up-enter${antCls}-slide-up-enter-active${componentCls}-dropdown-placement-topLeft,
          &${antCls}-slide-up-enter${antCls}-slide-up-enter-active${componentCls}-dropdown-placement-topRight,
          &${antCls}-slide-up-appear${antCls}-slide-up-appear-active${componentCls}-dropdown-placement-topLeft,
          &${antCls}-slide-up-appear${antCls}-slide-up-appear-active${componentCls}-dropdown-placement-topRight`]:
            {
              animationName: slideDownIn,
            },

          [`&${antCls}-slide-up-enter${antCls}-slide-up-enter-active${componentCls}-dropdown-placement-bottomLeft,
          &${antCls}-slide-up-enter${antCls}-slide-up-enter-active${componentCls}-dropdown-placement-bottomRight,
          &${antCls}-slide-up-appear${antCls}-slide-up-appear-active${componentCls}-dropdown-placement-bottomLeft,
          &${antCls}-slide-up-appear${antCls}-slide-up-appear-active${componentCls}-dropdown-placement-bottomRight`]:
            {
              animationName: slideUpIn,
            },

          [`&${antCls}-slide-up-leave${antCls}-slide-up-leave-active${componentCls}-dropdown-placement-topLeft,
          &${antCls}-slide-up-leave${antCls}-slide-up-leave-active${componentCls}-dropdown-placement-topRight`]:
            {
              animationName: slideDownOut,
            },

          [`&${antCls}-slide-up-leave${antCls}-slide-up-leave-active${componentCls}-dropdown-placement-bottomLeft,
          &${antCls}-slide-up-leave${antCls}-slide-up-leave-active${componentCls}-dropdown-placement-bottomRight`]:
            {
              animationName: slideUpOut,
            },

          // Time picker with additional style
          [`${componentCls}-panel > ${componentCls}-time-panel`]: {
            paddingTop: paddingXXS,
          },

          // ======================== Ranges ========================
          [`${componentCls}-ranges`]: {
            marginBottom: 0,
            padding: `${unit(paddingXXS)} ${unit(paddingSM)}`,
            overflow: 'hidden',
            lineHeight: unit(
              token
                .calc(textHeight)
                .sub(token.calc(lineWidth).mul(2))
                .sub(token.calc(paddingXS).div(2))
                .equal(),
            ),
            textAlign: 'start',
            listStyle: 'none',
            display: 'flex',
            justifyContent: 'space-between',

            '> li': {
              display: 'inline-block',
            },

            // https://github.com/ant-design/ant-design/issues/23687
            [`${componentCls}-preset > ${antCls}-tag-blue`]: {
              color: colorPrimary,
              background: cellActiveWithRangeBg,
              borderColor: colorPrimaryBorder,
              cursor: 'pointer',
            },

            [`${componentCls}-ok`]: {
              marginInlineStart: 'auto',
            },
          },

          [`${componentCls}-range-wrapper`]: {
            display: 'flex',
            position: 'relative',
          },

          [`${componentCls}-range-arrow`]: {
            position: 'absolute',
            zIndex: 1,
            display: 'none',
            marginInlineStart: token.calc(paddingInline).mul(1.5).equal(),
            transition: `left ${motionDurationSlow} ease-out`,
            ...genRoundedArrow(token, colorBgElevated, boxShadowPopoverArrow),
          },

          [`${componentCls}-panel-container`]: {
            overflow: 'hidden',
            verticalAlign: 'top',
            background: colorBgElevated,
            borderRadius: borderRadiusLG,
            boxShadow: boxShadowSecondary,
            transition: `margin ${motionDurationSlow}`,

            // ======================== Layout ========================
            [`${componentCls}-panel-layout`]: {
              display: 'flex',
              flexWrap: 'nowrap',
              alignItems: 'stretch',
            },

            // ======================== Preset ========================
            [`${componentCls}-presets`]: {
              display: 'flex',
              flexDirection: 'column',
              minWidth: presetsWidth,
              maxWidth: presetsMaxWidth,

              ul: {
                height: 0,
                flex: 'auto',
                listStyle: 'none',
                overflow: 'auto',
                margin: 0,
                padding: paddingXS,
                borderInlineEnd: `${unit(lineWidth)} ${lineType} ${colorSplit}`,

                li: {
                  ...textEllipsis,
                  borderRadius: borderRadiusSM,
                  paddingInline: paddingXS,
                  paddingBlock: token.calc(controlHeightSM).sub(fontHeight).div(2).equal(),
                  cursor: 'pointer',
                  transition: `all ${motionDurationSlow}`,

                  '+ li': {
                    marginTop: marginXS,
                  },

                  '&:hover': {
                    background: cellHoverBg,
                  },
                },
              },
            },

            // ======================== Panels ========================
            [`${componentCls}-panels`]: {
              display: 'inline-flex',
              flexWrap: 'nowrap',
              direction: 'ltr',

              [`${componentCls}-panel`]: {
                borderWidth: `0 0 ${unit(lineWidth)}`,
              },

              '&:last-child': {
                [`${componentCls}-panel`]: {
                  borderWidth: 0,
                },
              },
            },

            [`${componentCls}-panel`]: {
              verticalAlign: 'top',
              background: 'transparent',
              borderRadius: 0,
              borderWidth: 0,

              [`${componentCls}-content,
            table`]: {
                textAlign: 'center',
              },

              '&-focused': {
                borderColor: colorBorder,
              },
            },
          },
        },

        '&-dropdown-range': {
          padding: `${unit(token.calc(sizePopupArrow).mul(2).div(3).equal())} 0`,

          '&-hidden': {
            display: 'none',
          },
        },

        '&-rtl': {
          direction: 'rtl',

          [`${componentCls}-separator`]: {
            transform: 'rotate(180deg)',
          },

          [`${componentCls}-footer`]: {
            '&-extra': {
              direction: 'rtl',
            },
          },
        },
      },
    },

    // Follow code may reuse in other components
    initSlideMotion(token, 'slide-up'),
    initSlideMotion(token, 'slide-down'),
    initMoveMotion(token, 'move-up'),
    initMoveMotion(token, 'move-down'),
  ];
};

export const initPickerPanelToken = (token: TokenWithCommonCls<GlobalToken>): PickerPanelToken => {
  const { componentCls, controlHeightLG, paddingXXS, padding } = token;

  return {
    pickerCellCls: `${componentCls}-cell`,
    pickerCellInnerCls: `${componentCls}-cell-inner`,
    pickerYearMonthCellWidth: token.calc(controlHeightLG).mul(1.5).equal(),
    pickerQuarterPanelContentHeight: token.calc(controlHeightLG).mul(1.4).equal(),
    pickerCellPaddingVertical: token.calc(paddingXXS).add(token.calc(paddingXXS).div(2)).equal(),
    pickerCellBorderGap: 2, // Magic for gap between cells
    pickerControlIconSize: 7,
    pickerControlIconMargin: 4,
    pickerControlIconBorderWidth: 1.5,
    pickerDatePanelPaddingHorizontal: token
      .calc(padding)
      .add(token.calc(paddingXXS).div(2))
      .equal(), // 18 in normal
  };
};

export const initPanelComponentToken = (token: GlobalToken): PanelComponentToken => ({
  cellHoverBg: token.controlItemBgHover,
  cellActiveWithRangeBg: token.controlItemBgActive,
  cellHoverWithRangeBg: new TinyColor(token.colorPrimary).lighten(35).toHexString(),
  cellRangeBorderColor: new TinyColor(token.colorPrimary).lighten(20).toHexString(),
  cellBgDisabled: token.colorBgContainerDisabled,
  timeColumnWidth: token.controlHeightLG * 1.4,
  timeColumnHeight: 28 * 8,
  timeCellHeight: 28,
  cellWidth: token.controlHeightSM * 1.5,
  cellHeight: token.controlHeightSM,
  textHeight: token.controlHeightLG,
  withoutTimeCellHeight: token.controlHeightLG * 1.65,
});

export const prepareComponentToken: GetDefaultToken<'DatePicker'> = (token) => ({
  ...initComponentToken(token),
  ...initPanelComponentToken(token),
  ...getArrowToken(token),
  presetsWidth: 120,
  presetsMaxWidth: 200,
  zIndexPopup: token.zIndexPopupBase + 50,
});

// ============================== Export ==============================
export default genStyleHooks(
  'DatePicker',
  (token) => {
    const pickerToken = mergeToken<PickerToken>(initInputToken(token), initPickerPanelToken(token));
    return [
      genPickerStyle(pickerToken),
      genPickerStatusStyle(pickerToken),
      // =====================================================
      // ==             Space Compact                       ==
      // =====================================================
      genCompactItemStyle(token, {
        focusElCls: `${token.componentCls}-focused`,
      }),
    ];
  },
  prepareComponentToken,
);
