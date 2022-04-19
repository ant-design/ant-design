// deps-lint-skip-all
import { CSSObject } from '@ant-design/cssinjs';
import { TinyColor } from '@ctrl/tinycolor';
import {
  FullToken,
  genComponentStyleHook,
  GenerateStyle,
  mergeToken,
  resetComponent,
  roundedArrow,
  slideDownIn,
  slideDownOut,
  slideUpIn,
  slideUpOut,
} from '../../_util/theme';
import {
  genActiveStyle,
  genBasicInputStyle,
  genHoverStyle,
  initInputToken,
  InputToken,
} from '../../input/style';

// FIXME: need full token check
export interface ComponentToken {
  zIndexDropdown: number;
  pickerTextHeight: number;
  pickerPanelCellWidth: number;
  pickerPanelCellHeight: number;
  pickerDateHoverRangeBorderColor: string;
  pickerBasicCellHoverWithRangeColor: string;
  pickerPanelWithoutTimeCellHeight: number;
  pickerTimePanelColumnHeight: number;
  pickerTimePanelColumnWidth: number;
  pickerTimePanelCellHeight: number;
}

type PickerToken = InputToken<FullToken<'DatePicker'>> & {
  arrowWidth: number;
  pickerCellInnerCls: string;
  hashId?: string;
};

const genPikerPadding = (
  token: PickerToken,
  inputHeight: number,
  fontSize: number,
  paddingHorizontal: number,
): CSSObject => {
  const fontHeight = Math.floor(fontSize * token.lineHeight) + 2;
  const paddingTop = Math.max((inputHeight - fontHeight) / 2, 0);
  const paddingBottom = Math.max(inputHeight - fontHeight - paddingTop, 0);

  return {
    padding: `${paddingTop}px ${paddingHorizontal}px ${paddingBottom}px`,
  };
};

const genPickerStyle: GenerateStyle<PickerToken> = token => {
  const { componentCls, antCls } = token;

  return {
    [componentCls]: {
      ...resetComponent(token),
      ...genPikerPadding(token, token.controlHeight, token.fontSize, token.inputPaddingHorizontal),
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      background: token.colorBgComponent,
      border: `${token.controlLineWidth}px ${token.controlLineType} ${token.colorBorder}`,
      borderRadius: token.radiusBase,
      transition: `border ${token.motionDurationSlow}, box-shadow ${token.motionDurationSlow}`,

      '&:hover, &-focused': {
        ...genHoverStyle(token),
      },

      '&-focused': {
        ...genActiveStyle(token),
      },

      '&&-disabled': {
        background: token.colorBgComponentDisabled,
        borderColor: token.colorBorder,
        cursor: 'not-allowed',

        [`${componentCls}-suffix`]: {
          color: token.colorTextDisabled,
        },
      },

      '&&-borderless': {
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
            color: token.colorPlaceholder,
          },
        },
      },

      // Size
      '&-large': {
        ...genPikerPadding(
          token,
          token.controlHeightLG,
          token.fontSizeLG,
          token.inputPaddingHorizontal,
        ),

        [`${componentCls}-input > input`]: {
          fontSize: token.fontSizeLG,
        },
      },

      '&-small': {
        ...genPikerPadding(
          token,
          token.controlHeightSM,
          token.fontSize,
          token.inputPaddingHorizontalSM,
        ),
      },

      [`${componentCls}-suffix`]: {
        display: 'flex',
        flex: 'none',
        alignSelf: 'center',
        marginInlineStart: token.paddingXS / 2,
        color: token.colorTextDisabled,
        lineHeight: 1,
        pointerEvents: 'none',

        '> *': {
          verticalAlign: 'top',

          '&:not(:last-child)': {
            marginInlineEnd: token.marginXS,
          },
        },
      },

      [`${componentCls}-clear`]: {
        position: 'absolute',
        top: '50%',
        insetInlineEnd: 0,
        color: token.colorTextDisabled,
        lineHeight: 1,
        background: token.colorBgComponent,
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        opacity: 0,
        transition: `opacity ${token.motionDurationSlow}, color ${token.motionDurationSlow}`,

        '> *': {
          verticalAlign: 'top',
        },

        '&:hover': {
          color: token.colorTextSecondary,
        },
      },

      [`${componentCls}-separator`]: {
        position: 'relative',
        display: 'inline-block',
        width: '1em',
        height: token.fontSizeLG,
        color: token.colorTextDisabled,
        fontSize: token.fontSizeLG,
        verticalAlign: 'top',
        cursor: 'default',

        [`${componentCls}-focused &`]: {
          color: token.colorTextSecondary,
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
          insetInlineEnd: token.inputPaddingHorizontal,
        },

        '&:hover': {
          [`${componentCls}-clear`]: {
            opacity: 1,
          },
        },

        // Active bar
        [`${componentCls}-active-bar`]: {
          bottom: -token.controlLineWidth,
          height: 2, // FIXME: v4 magic number
          marginInlineStart: token.inputPaddingHorizontal,
          background: token.colorPrimary,
          opacity: 0,
          transition: `all ${token.motionDurationSlow} ease-out`,
          pointerEvents: 'none',
        },

        [`&${componentCls}-focused`]: {
          [`${componentCls}-active-bar`]: {
            opacity: 1,
          },
        },

        [`${componentCls}-range-separator`]: {
          alignItems: 'center',
          padding: `0 ${token.paddingXS}px`,
          lineHeight: 1,
        },

        [`&${componentCls}-small`]: {
          [`${componentCls}-clear`]: {
            insetInlineEnd: token.inputPaddingHorizontalSM,
          },

          [`${componentCls}-active-bar`]: {
            marginInlineStart: token.inputPaddingHorizontalSM,
          },
        },
      },

      // ======================= Dropdown =======================
      '&-dropdown': {
        ...resetComponent(token),
        position: 'absolute',
        zIndex: token.zIndexDropdown,

        '&&-hidden': {
          display: 'none',
        },

        '&&-placement-bottomLeft': {
          [`${componentCls}-range-arrow`]: {
            top: `${token.arrowWidth / 2 - token.arrowWidth / 3 + 0.7}px`,
            display: 'block',
            transform: 'rotate(-135deg) translateY(1px)',
          },
        },

        '&&-placement-topLeft': {
          [`${componentCls}-range-arrow`]: {
            bottom: `${token.arrowWidth / 2 - token.arrowWidth / 3 + 0.7}px`,
            display: 'block',
            transform: 'rotate(45deg)',
          },
        },

        [`&${antCls}-slide-up-enter${antCls}-slide-up-enter-active&-placement-topLeft,
          &${antCls}-slide-up-enter${antCls}-slide-up-enter-active&-placement-topRight,
          &${antCls}-slide-up-appear${antCls}-slide-up-appear-active&-placement-topLeft,
          &${antCls}-slide-up-appear${antCls}-slide-up-appear-active&-placement-topRight`]: {
          animationName: slideDownIn.getName(token.hashId),
        },

        [`&${antCls}-slide-up-enter${antCls}-slide-up-enter-active&-placement-bottomLeft,
          &${antCls}-slide-up-enter${antCls}-slide-up-enter-active&-placement-bottomRight,
          &${antCls}-slide-up-appear${antCls}-slide-up-appear-active&-placement-bottomLeft,
          &${antCls}-slide-up-appear${antCls}-slide-up-appear-active&-placement-bottomRight`]: {
          animationName: slideUpIn.getName(token.hashId),
        },

        [`&${antCls}-slide-up-leave${antCls}-slide-up-leave-active&-placement-topLeft,
          &${antCls}-slide-up-leave${antCls}-slide-up-leave-active&-placement-topRight`]: {
          animationName: slideDownOut.getName(token.hashId),
        },

        [`&${antCls}-slide-up-leave${antCls}-slide-up-leave-active&-placement-bottomLeft,
          &${antCls}-slide-up-leave${antCls}-slide-up-leave-active&-placement-bottomRight`]: {
          animationName: slideUpOut.getName(token.hashId),
        },

        // Time picker with additional style
        [`${componentCls}-panel > ${componentCls}-time-panel`]: {
          paddingTop: token.paddingXS / 2,
        },

        // ======================== Ranges ========================
        [`${componentCls}-ranges`]: {
          marginBottom: 0,
          padding: `${token.paddingXS / 2}px ${token.paddingSM}px`,
          overflow: 'hidden',
          lineHeight: `${
            token.pickerTextHeight - 2 * token.controlLineWidth - token.paddingXS / 2
          }px`,
          textAlign: 'start',
          listStyle: 'none',
          display: 'flex',
          justifyContent: 'space-between',

          '> li': {
            display: 'inline-block',
          },

          // https://github.com/ant-design/ant-design/issues/23687
          [`${componentCls}-preset > ${antCls}-tag-blue`]: {
            color: token.colorPrimary,
            background: token.controlItemBgActive,
            borderColor: token.colorPrimarySecondary,
            cursor: 'pointer',
          },

          [`${componentCls}-ok`]: {
            marginInlineStart: 'auto',
          },
        },

        [`${componentCls}-range-wrapper`]: {
          display: 'flex',
        },

        [`${componentCls}-range-arrow`]: {
          position: 'absolute',
          zIndex: 1,
          display: 'none',
          width: token.arrowWidth,
          height: token.arrowWidth,
          marginInlineStart: token.inputPaddingHorizontal * 1.5,
          background: `linear-gradient(135deg, transparent 40%, ${token.colorBgComponent} 40%)`, // Use linear-gradient to prevent arrow from covering text
          boxShadow: `2px 2px 6px -2px fade(#000, 10%)`, // use spread radius to hide shadow over popover, FIXME: v4 magic
          transition: `left ${token.motionDurationSlow} ease-out`,
          ...roundedArrow(token.arrowWidth, 5, token.colorBgComponent),
        },

        [`${componentCls}-panel-container`]: {
          overflow: 'hidden',
          verticalAlign: 'top',
          background: token.colorBgComponent,
          borderRadius: token.radiusBase,
          boxShadow: token.boxShadow,
          transition: `margin ${token.motionDurationSlow}`,

          [`${componentCls}-panels`]: {
            display: 'inline-flex',
            flexWrap: 'nowrap',
            direction: 'ltr',
          },

          [`${componentCls}-panel`]: {
            verticalAlign: 'top',
            background: 'transparent',
            borderWidth: `0 0 ${token.controlLineWidth}px`,
            borderRadius: 0,

            [`${componentCls}-content,
            table`]: {
              textAlign: 'center',
            },

            '&-focused': {
              borderColor: token.colorBorder,
            },
          },
        },
      },

      '&-dropdown-range': {
        padding: `${(token.arrowWidth * 2) / 3}px 0`,

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
  };
};

const genPickerCellInnerStyle = (token: PickerToken, cellClassName: string): CSSObject => {
  const { componentCls } = token;

  return {
    '&::before': {
      position: 'absolute',
      top: '50%',
      insetInlineStart: 0,
      insetInlineEnd: 0,
      zIndex: 1,
      height: token.pickerPanelCellHeight,
      transform: 'translateY(-50%)',
      transition: `all ${token.motionDurationSlow}`,
      content: '""',
    },

    // >>> Default
    [cellClassName]: {
      position: 'relative',
      zIndex: 2,
      display: 'inline-block',
      minWidth: token.pickerPanelCellHeight,
      height: token.pickerPanelCellHeight,
      lineHeight: `${token.pickerPanelCellHeight}px`,
      borderRadius: token.radiusBase,
      transition: `background ${token.motionDurationSlow}, border ${token.motionDurationSlow}`,
    },

    // >>> Hover
    [`&:hover:not(&-in-view),
    &:hover:not(&-selected):not(&-range-start):not(&-range-end):not(&-range-hover-start):not(&-range-hover-end)`]:
      {
        [cellClassName]: {
          background: token.controlItemBgHover,
        },
      },

    // >>> Today
    [`&-in-view:is(&-today) ${cellClassName}`]: {
      '&::before': {
        position: 'absolute',
        top: 0,
        insetInlineEnd: 0,
        bottom: 0,
        insetInlineStart: 0,
        zIndex: 1,
        border: `${token.controlLineWidth}px ${token.controlLineType} ${token.colorPrimary}`,
        borderRadius: token.radiusBase,
        content: '""',
      },
    },

    // >>> In Range
    '&-in-view:is(&-in-range)': {
      position: 'relative',

      '&::before': {
        background: token.controlItemBgActive,
      },
    },

    // >>> Selected
    [`&-in-view:is(&-selected) ${cellClassName},
    &-in-view:is(&-range-start) ${cellClassName},
    &-in-view:is(&-range-end) ${cellClassName}`]: {
      color: '#fff', // FIXME: text-color-invert
      background: token.colorPrimary,
    },

    [`&-in-view:is(&-range-start):not(&-range-start-single),
      &-in-view:is(&-range-end):not(&-range-end-single)`]: {
      '&::before': {
        background: token.controlItemBgActive,
      },
    },

    '&-in-view:is(&-range-start)::before': {
      insetInlineStart: '50%',
    },

    '&-in-view:is(&-range-end)::before': {
      insetInlineEnd: '50%',
    },

    // >>> Range Hover
    [`&-in-view:is(&-range-hover-start):not(&-in-range):not(&-range-start):not(&-range-end),
      &-in-view:is(&-range-hover-end):not(&-in-range):not(&-range-start):not(&-range-end),
      &-in-view:is(&-range-hover-start):is(&-range-start-single),
      &-in-view:is(&-range-hover-start):is(&-range-start):is(&-range-end):is(&-range-end-near-hover),
      &-in-view:is(&-range-hover-end):is(&-range-start):is(&-range-end):is(&-range-start-near-hover),
      &-in-view:is(&-range-hover-end):is(&-range-end-single),
      &-in-view:is(&-range-hover):not(&-in-range)`]: {
      '&::after': {
        position: 'absolute',
        top: '50%',
        zIndex: 0,
        height: token.controlHeightSM,
        borderTop: `${token.controlLineWidth}px dashed ${token.pickerDateHoverRangeBorderColor}`,
        borderBottom: `${token.controlLineWidth}px dashed ${token.pickerDateHoverRangeBorderColor}`,
        transform: 'translateY(-50%)',
        transition: `all ${token.motionDurationSlow}`,
        content: '""',
      },
    },

    // Add space for stash
    [`&-range-hover-start::after,
    &-range-hover-end::after,
    &-range-hover::after`]: {
      insetInlineEnd: 0,
      insetInlineStart: 2, // FIXME: v4 magic number
    },

    // Hover with in range
    [`&-in-view:is(&-in-range):is(&-range-hover)::before,
    &-in-view:is(&-range-start):is(&-range-hover)::before,
    &-in-view:is(&-range-end):is(&-range-hover)::before,
    &-in-view:is(&-range-start):not(&-range-start-single):is(&-range-hover-start)::before,
    &-in-view:is(&-range-end):not(&-range-end-single):is(&-range-hover-end)::before,
    ${componentCls}-panel
      > :not(${componentCls}-date-panel)
    &-in-view:is(&-in-range):is(&-range-hover-start)::before,
    ${componentCls}-panel
      > :not(${componentCls}-date-panel)
    &-in-view:is(&-in-range):is(&-range-hover-end)::before`]: {
      background: token.pickerBasicCellHoverWithRangeColor,
    },

    // range start border-radius
    [`&-in-view:is(&-range-start):not(&-range-start-single):not(&-range-end) ${cellClassName}`]: {
      borderStartStartRadius: token.radiusBase,
      borderEndStartRadius: token.radiusBase,
      borderStartEndRadius: 0,
      borderEndEndRadius: 0,
    },

    // range end border-radius
    [`&-in-view:is(&-range-end):not(&-range-end-single):not(&-range-start) ${cellClassName}`]: {
      borderStartStartRadius: 0,
      borderEndStartRadius: 0,
      borderStartEndRadius: token.radiusBase,
      borderEndEndRadius: token.radiusBase,
    },

    // DatePanel only
    [`${componentCls}-date-panel &-in-view:is(&-in-range):is(&-range-hover-start) ${cellClassName},
    ${componentCls}-date-panel &-in-view:is(&-in-range):is(&-range-hover-end) ${cellClassName}`]: {
      '&::after': {
        position: 'absolute',
        top: 0,
        bottom: 0,
        zIndex: -1,
        background: token.pickerBasicCellHoverWithRangeColor,
        transition: `all ${token.motionDurationSlow}`,
        content: '""',
      },
    },

    [`${componentCls}-date-panel
    &-in-view:is(&-in-range):is(&-range-hover-start)
    ${cellClassName}::after`]: {
      insetInlineEnd: -5 - token.controlLineWidth, // FIXME: v4 magic number
      insetInlineStart: 0,
    },

    [`${componentCls}-date-panel &-in-view:is(&-in-range):is(&-range-hover-end) ${cellClassName}::after`]:
      {
        insetInlineEnd: 0,
        insetInlineStart: -5 - token.controlLineWidth, // FIXME: v4 magic number
      },

    // Hover with range start & end
    '&-range-hover:is(&-range-start)::after': {
      insetInlineEnd: '50%',
    },

    '&-range-hover:is(&-range-end)::after': {
      insetInlineStart: '50%',
    },

    // Edge start
    [`tr > &-in-view:is(&-range-hover):first-child::after,
      tr > &-in-view:is(&-range-hover-end):first-child::after,
      &-in-view:is(&-start):is(&-range-hover-edge-start):is(&-range-hover-edge-start-near-range)::after,
      &-in-view:is(&-range-hover-edge-start):not(&-range-hover-edge-start-near-range)::after,
      &-in-view:is(&-range-hover-start)::after`]: {
      insetInlineStart: 6, // FIXME: v4 magic number
      borderInlineStart: `${token.controlLineWidth}px dashed ${token.pickerDateHoverRangeBorderColor}`,
      borderStartStartRadius: token.controlLineWidth,
      borderEndStartRadius: token.controlLineWidth,
    },

    // Edge end
    [`tr > &-in-view:is(&-range-hover):last-child::after,
      tr > &-in-view:is(&-range-hover-start):last-child::after,
      &-in-view:is(&-end):is(&-range-hover-edge-end):is(&-range-hover-edge-end-near-range)::after,
      &-in-view:is(&-range-hover-edge-end):not(&-range-hover-edge-end-near-range)::after,
      &-in-view:is(&-range-hover-end)::after`]: {
      insetInlineEnd: 6, // FIXME: v4 magic number
      borderInlineEnd: `${token.controlLineWidth}px dashed ${token.pickerDateHoverRangeBorderColor}`,
      borderStartEndRadius: token.controlLineWidth,
      borderEndEndRadius: token.controlLineWidth,
    },

    // >>> Disabled
    '&-disabled': {
      color: token.colorTextDisabled,
      pointerEvents: 'none',

      [cellClassName]: {
        background: 'transparent',
      },

      '&::before': {
        background: new TinyColor({ r: 0, g: 0, b: 0, a: 0.04 }).toRgbString(),
      },
    },
    [`&-disabled:is(&-today) ${cellClassName}::before`]: {
      borderColor: token.colorTextDisabled,
    },
  };
};

const genPanelStyle: GenerateStyle<PickerToken> = token => {
  const { componentCls, pickerCellInnerCls } = token;

  const pickerArrowSize = 7; // FIXME: v4 magic number
  const pickerYearMonthCellWidth = 60; // FIXME: v4 magic number
  const pickerPanelWidth = token.pickerPanelCellWidth * 7 + token.paddingSM * 2 + 4;
  const hoverCellFixedDistance =
    (pickerPanelWidth - token.paddingXS * 2) / 3 - pickerYearMonthCellWidth / 2;

  return {
    [`${componentCls}-dropdown`]: {
      [componentCls]: {
        '&-panel': {
          display: 'inline-flex',
          flexDirection: 'column',
          textAlign: 'center',
          background: token.colorBgComponent,
          border: `${token.controlLineWidth}px ${token.controlLineType} ${token.colorBorder}`,
          borderRadius: token.radiusBase,
          outline: 'none',

          '&-focused': {
            borderColor: token.colorPrimary,
          },

          '&-rtl': {
            direction: 'rtl',

            [`${componentCls}-prev-icon,
              ${componentCls}-super-prev-icon`]: {
              transform: 'rotate(135deg)',
            },

            [`${componentCls}-next-icon,
              ${componentCls}-super-next-icon`]: {
              transform: 'rotate(-45deg)',
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
          padding: `0 ${token.paddingXS}px`,
          color: token.colorTextHeading,
          borderBottom: `${token.controlLineWidth}px ${token.controlLineType} ${token.colorBorder}`,

          '> *': {
            flex: 'none',
          },

          button: {
            padding: 0,
            color: token.colorTextDisabled,
            lineHeight: `${token.pickerTextHeight}px`,
            background: 'transparent',
            border: 0,
            cursor: 'pointer',
            transition: `color ${token.motionDurationSlow}`,
          },

          '> button': {
            minWidth: '1.6em',
            fontSize: token.fontSize,

            '&:hover': {
              color: token.colorText,
            },
          },

          '&-view': {
            flex: 'auto',
            fontWeight: 500,
            lineHeight: `${token.pickerTextHeight}px`,

            button: {
              color: 'inherit',
              fontWeight: 'inherit',

              '&:not(:first-child)': {
                marginInlineStart: token.paddingXS,
              },

              '&:hover': {
                color: token.colorPrimary,
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
          width: pickerArrowSize,
          height: pickerArrowSize,

          '&::before': {
            position: 'absolute',
            top: 0,
            insetInlineStart: 0,
            display: 'inline-block',
            width: pickerArrowSize,
            height: pickerArrowSize,
            border: `0 solid currentcolor`,
            borderBlockStart: 1.5, // FIXME: v4 magic
            borderBlockEnd: 0,
            borderInlineStart: 1.5, // FIXME: v4 magic
            borderInlineEnd: 0,
            content: '""',
          },
        },

        [`&-super-prev-icon,
        &-super-next-icon`]: {
          '&::after': {
            position: 'absolute',
            top: Math.ceil(pickerArrowSize / 2),
            insetInlineStart: Math.ceil(pickerArrowSize / 2),
            display: 'inline-block',
            width: pickerArrowSize,
            height: pickerArrowSize,
            border: '0 solid currentcolor',
            borderBlockStart: 1.5, // FIXME: v4 magic
            borderBlockEnd: 0,
            borderInlineStart: 1.5, // FIXME: v4 magic
            borderInlineEnd: 0,
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
            minWidth: 24, // FIXME: v4 magic number
            fontWeight: 400,
          },

          th: {
            height: 30, // FIXME: v4 magic number
            color: token.colorText,
            lineHeight: '30px', // FIXME: v4 magic string
          },
        },

        '&-cell': {
          padding: `3px 0`, // FIXME: v4 magic string
          color: token.colorTextDisabled,
          cursor: 'pointer',

          // In view
          '&-in-view': {
            color: token.colorText,
          },

          ...genPickerCellInnerStyle(token, pickerCellInnerCls),
        },

        [`&-decade-panel,
          &-year-panel,
          &-quarter-panel,
          &-month-panel`]: {
          [`${componentCls}-content`]: {
            height: token.pickerPanelWithoutTimeCellHeight * 4,
          },

          [pickerCellInnerCls]: {
            padding: `0 ${token.paddingXS}px`,
          },
        },

        '&-quarter-panel': {
          [`${componentCls}-content`]: {
            height: 56, // FIXME: v4 magic number
          },
        },

        // ======================== Footer ========================
        [`&-panel ${componentCls}-footer`]: {
          borderTop: `${token.controlLineWidth}px ${token.controlLineType} ${token.colorSplit}`,
        },

        '&-footer': {
          width: 'min-content',
          minWidth: '100%',
          lineHeight: `${token.pickerTextHeight - 2 * token.controlLineWidth}px`,
          textAlign: 'center',
          borderBottom: `${token.controlLineWidth}px ${token.controlLineType} ${token.colorSplit}`,

          '&-extra': {
            padding: `0 ${token.paddingSM}`,
            lineHeight: `${token.pickerTextHeight - 2 * token.controlLineWidth}px`,
            textAlign: 'start',

            '&:not(:last-child)': {
              borderBottom: `${token.controlLineWidth}px ${token.controlLineType} ${token.colorBorder}`,
            },
          },
        },

        '&-now': {
          textAlign: 'start',
        },

        '&-today-btn': {
          color: token.colorLink,

          '&:hover': {
            color: token.colorLinkHover,
          },

          '&:active': {
            color: token.colorLinkActive,
          },

          '&:is(&-disabled)': {
            color: token.colorTextDisabled,
            cursor: 'not-allowed',
          },
        },

        // ========================================================
        // =                       Special                        =
        // ========================================================

        // ===================== Decade Panel =====================
        '&-decade-panel': {
          [pickerCellInnerCls]: {
            padding: `0 ${token.paddingXS / 2}px`,
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
            padding: `0 ${token.paddingXS}px`,
          },

          [pickerCellInnerCls]: {
            width: pickerYearMonthCellWidth,
          },

          [`${componentCls}-cell-range-hover-start::after`]: {
            insetInlineStart: hoverCellFixedDistance,
            borderInlineStart: `${token.controlLineWidth}px dashed ${token.pickerDateHoverRangeBorderColor}`,
            borderStartStartRadius: token.radiusBase,
            borderBottomStartRadius: token.radiusBase,
            borderStartEndRadius: 0,
            borderBottomEndRadius: 0,

            [`${componentCls}-panel-rtl &`]: {
              insetInlineEnd: hoverCellFixedDistance,
              borderInlineEnd: `${token.controlLineWidth}px dashed ${token.pickerDateHoverRangeBorderColor}`,
              borderStartStartRadius: 0,
              borderBottomStartRadius: 0,
              borderStartEndRadius: token.radiusBase,
              borderBottomEndRadius: token.radiusBase,
            },
          },
          [`${componentCls}-cell-range-hover-end::after`]: {
            insetInlineEnd: hoverCellFixedDistance,
            borderInlineEnd: `${token.controlLineWidth}px dashed ${token.pickerDateHoverRangeBorderColor}`,
            borderStartStartRadius: 0,
            borderBottomStartRadius: 0,
            borderStartEndRadius: token.radiusBase,
            borderBottomEndRadius: token.radiusBase,

            [`${componentCls}-panel-rtl &`]: {
              insetInlineStart: hoverCellFixedDistance,
              borderInlineStart: `${token.controlLineWidth}px dashed ${token.pickerDateHoverRangeBorderColor}`,
              borderStartStartRadius: token.radiusBase,
              borderBottomStartRadius: token.radiusBase,
              borderStartEndRadius: 0,
              borderBottomEndRadius: 0,
            },
          },
        },

        // ====================== Week Panel ======================
        '&-week-panel': {
          [`${componentCls}-body`]: {
            padding: `${token.paddingXS}px ${token.paddingSM}px`,
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
              transition: `background ${token.motionDurationSlow}`,
            },

            '&:hover td': {
              background: token.controlItemBgHover,
            },

            [`&-selected td,
      &-selected:hover td`]: {
              background: token.colorPrimary,

              [`&${componentCls}-cell-week`]: {
                color: new TinyColor({ r: 255, g: 255, b: 255, a: 0.5 }).toRgbString(), // FIXME: fade(@text-color-inverse, 50%)
              },

              [`&${componentCls}-cell-today ${pickerCellInnerCls}::before`]: {
                borderColor: '#fff', // FIXME: text color inverse
              },

              [pickerCellInnerCls]: {
                color: '#fff', // FIXME: text color inverse
              },
            },
          },
        },

        // ====================== Date Panel ======================
        '&-date-panel': {
          [`${componentCls}-body`]: {
            padding: `${token.paddingXS}px ${token.paddingSM}px`,
          },

          [`${componentCls}-content`]: {
            width: token.pickerPanelCellWidth * 7,

            th: {
              width: token.pickerPanelCellWidth,
            },
          },
        },

        // ==================== Datetime Panel ====================
        '&-datetime-panel': {
          display: 'flex',

          [`${componentCls}-time-panel`]: {
            borderInlineStart: `${token.controlLineWidth}px ${token.controlLineType} ${token.colorBorder}`,
          },

          [`${componentCls}-date-panel,
    ${componentCls}-time-panel`]: {
            transition: `opacity ${token.motionDurationSlow}`,
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
            height: token.pickerTimePanelColumnHeight,
          },

          '&-column': {
            flex: '1 0 auto',
            width: token.pickerTimePanelColumnWidth,
            margin: 0,
            padding: 0,
            overflowY: 'hidden',
            textAlign: 'start',
            listStyle: 'none',
            transition: `background ${token.motionDurationSlow}`,

            '&::after': {
              display: 'block',
              height: token.pickerTimePanelColumnHeight - token.pickerTimePanelCellHeight,
              content: '""',
              [`${componentCls}-datetime-panel &`]: {
                height:
                  token.pickerTimePanelColumnHeight -
                  token.pickerPanelWithoutTimeCellHeight +
                  2 * token.controlLineWidth,
              },
            },

            '&:not(:first-child)': {
              borderInlineStart: `${token.controlLineWidth}px ${token.controlLineType} ${token.colorSplit}`,
            },

            '&-active': {
              background: token.controlItemBgActive, // FIXME: fade(@calendar-item-active-bg, 20%)
            },

            '&:hover': {
              overflowY: 'auto',
            },

            '> li': {
              margin: 0,
              padding: 0,

              [`&${componentCls}-time-panel-cell`]: {
                [`${componentCls}-time-panel-cell-inner`]: {
                  display: 'block',
                  width: '100%',
                  height: token.pickerTimePanelCellHeight,
                  margin: 0,
                  paddingBlock: 0,
                  paddingInlineEnd: 0,
                  paddingInlineStart:
                    (token.pickerTimePanelColumnWidth - token.pickerTimePanelCellHeight) / 2,
                  color: token.colorText,
                  lineHeight: `${token.pickerTimePanelCellHeight}px`,
                  borderRadius: 0,
                  cursor: 'pointer',
                  transition: `background ${token.motionDurationSlow}`,

                  '&:hover': {
                    background: token.controlItemBgHover,
                  },
                },

                '&-selected': {
                  [`${componentCls}-time-panel-cell-inner`]: {
                    background: token.controlItemBgActive,
                  },
                },

                '&-disabled': {
                  [`${componentCls}-time-panel-cell-inner`]: {
                    color: token.colorTextDisabled,
                    background: 'transparent',
                    cursor: 'not-allowed',
                  },
                },
              },
            },
          },
        },
      },
    },
  };
};

const genPickerStatusStyle: GenerateStyle<PickerToken> = token => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      '&-status-error&': {
        '&, &:not([disabled]):hover': {
          backgroundColor: token.colorBgComponent,
          borderColor: token.colorError,
        },

        '&-focused, &:focus': {
          ...genActiveStyle(
            mergeToken<PickerToken>(token, {
              inputBorderActiveColor: token.colorError,
              inputBorderHoverColor: token.colorError,
              colorPrimaryOutline: token.colorErrorOutline,
            }),
          ),
        },
      },

      '&-status-warning&': {
        '&, &:not([disabled]):hover': {
          backgroundColor: token.colorBgComponent,
          borderColor: token.colorWarning,
        },

        '&-focused, &:focus': {
          ...genActiveStyle(
            mergeToken<PickerToken>(token, {
              inputBorderActiveColor: token.colorWarning,
              inputBorderHoverColor: token.colorWarning,
              colorPrimaryOutline: token.colorWarningOutline,
            }),
          ),
        },
      },
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook(
  'DatePicker',
  (token, { hashId }) => {
    const pickerToken = mergeToken<PickerToken>(initInputToken<FullToken<'DatePicker'>>(token), {
      arrowWidth: 8 * Math.sqrt(2),
      pickerCellInnerCls: `${token.componentCls}-cell-inner`,
      hashId,
    });
    return [
      genPickerStyle(pickerToken),
      genPanelStyle(pickerToken),
      genPickerStatusStyle(pickerToken),
    ];
  },
  token => ({
    zIndexDropdown: token.zIndexPopup + 50,
    pickerTextHeight: 40,
    pickerPanelCellWidth: 36,
    pickerPanelCellHeight: 24,
    pickerDateHoverRangeBorderColor: new TinyColor(token.colorPrimary).lighten(20).toRgbString(),
    pickerBasicCellHoverWithRangeColor: new TinyColor(token.colorPrimary).lighten(35).toRgbString(),
    pickerPanelWithoutTimeCellHeight: 66,
    pickerTimePanelColumnHeight: 224,
    pickerTimePanelColumnWidth: 56,
    pickerTimePanelCellHeight: 28,
  }),
);
