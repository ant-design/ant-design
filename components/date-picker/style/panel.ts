import { unit, type CSSObject } from '@ant-design/cssinjs';
import { TinyColor } from '@ctrl/tinycolor';

import type { GenerateStyle } from '../../theme/internal';
import type { PickerToken, SharedPickerToken } from './token';

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
        // border: `${unit(lineWidth)} ${lineType} ${colorSplit}`,
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
      // [`&-panel ${componentCls}-footer`]: {
      //   borderTop: `${unit(lineWidth)} ${lineType} ${colorSplit}`,
      // },

      // '&-footer': {
      //   width: 'min-content',
      //   minWidth: '100%',
      //   lineHeight: unit(token.calc(textHeight).sub(token.calc(lineWidth).mul(2)).equal()),
      //   textAlign: 'center',

      //   '&-extra': {
      //     padding: `0 ${unit(paddingSM)}`,
      //     lineHeight: unit(token.calc(textHeight).sub(token.calc(lineWidth).mul(2)).equal()),
      //     textAlign: 'start',

      //     '&:not(:last-child)': {
      //       borderBottom: `${unit(lineWidth)} ${lineType} ${colorSplit}`,
      //     },
      //   },
      // },

      // '&-now': {
      //   textAlign: 'start',
      // },

      // '&-today-btn': {
      //   color: colorLink,

      //   '&:hover': {
      //     color: colorLinkHover,
      //   },

      //   '&:active': {
      //     color: colorLinkActive,
      //   },

      //   [`&${componentCls}-today-btn-disabled`]: {
      //     color: colorTextDisabled,
      //     cursor: 'not-allowed',
      //   },
      // },

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

const genPickerPanelStyle: GenerateStyle<PickerToken> = (token) => {
  const {
    componentCls,
    paddingXXS,
    textHeight,
    lineWidth,
    paddingXS,
    paddingSM,
    antCls,
    colorPrimary,
    cellActiveWithRangeBg,
    colorPrimaryBorder,
    lineType,
    colorSplit,
  } = token;

  return {
    [`${componentCls}-dropdown`]: {
      // ======================== Footer ========================
      [`${componentCls}-footer`]: {
        borderTop: `${unit(lineWidth)} ${lineType} ${colorSplit}`,
      },

      // ==================== Footer > Ranges ===================
      [`${componentCls}-panels + ${componentCls}-footer ${componentCls}-ranges`]: {
        justifyContent: 'space-between',
      },

      [`${componentCls}-ranges`]: {
        marginBlock: 0,
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
        justifyContent: 'center',
        // justifyContent: 'space-between',

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
    },
  };
};

export default genPickerPanelStyle;
