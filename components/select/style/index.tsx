import type { CSSObject } from '@ant-design/cssinjs';
import type { CSSProperties } from 'react';
import { resetComponent, resetIcon, textEllipsis } from '../../style';
import { genCompactItemStyle } from '../../style/compact-item';
import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';
import genDropdownStyle from './dropdown';
import genMultipleStyle from './multiple';
import genSingleStyle from './single';

export interface ComponentToken {
  /**
   * @desc 下拉菜单 z-index
   * @descEN z-index of dropdown
   */
  zIndexPopup: number;
  /**
   * @desc 选项选中时文本颜色
   * @descEN Text color when option is selected
   */
  optionSelectedColor: string;
  /**
   * @desc 选项选中时文本字重
   * @descEN Font weight when option is selected
   */
  optionSelectedFontWeight: CSSProperties['fontWeight'];
  /**
   * @desc 选项选中时背景色
   * @descEN Background color when option is selected
   */
  optionSelectedBg: string;
  /**
   * @desc 选项激活态时背景色
   * @descEN Background color when option is active
   */
  optionActiveBg: string;
  /**
   * @desc 选项内间距
   * @descEN Padding of option
   */
  optionPadding: CSSProperties['padding'];
  /**
   * @desc 选项字体大小
   * @descEN Font size of option
   */
  optionFontSize: number;
  /**
   * @desc 选项行高
   * @descEN Line height of option
   */
  optionLineHeight: CSSProperties['lineHeight'];
  /**
   * @desc 选项高度
   * @descEN Height of option
   */
  optionHeight: number;
  /**
   * @desc 选框背景色
   * @descEN Background color of selector
   */
  selectorBg: string;
  /**
   * @desc 清空按钮背景色
   * @descEN Background color of clear button
   */
  clearBg: string;
  /**
   * @desc 单选大号回填项高度
   * @descEN Height of single selected item with large size
   */
  singleItemHeightLG: number;
  /**
   * @desc 多选标签背景色
   * @descEN Background color of multiple tag
   */
  multipleItemBg: string;
  /**
   * @desc 多选标签边框色
   * @descEN Border color of multiple tag
   */
  multipleItemBorderColor: string;
  /**
   * @desc 多选标签高度
   * @descEN Height of multiple tag
   */
  multipleItemHeight: number;
  /**
   * @desc 大号多选标签高度
   * @descEN Height of multiple tag with large size
   */
  multipleItemHeightLG: number;
  /**
   * @desc 多选框禁用背景
   * @descEN Background color of multiple selector when disabled
   */
  multipleSelectorBgDisabled: string;
  /**
   * @desc 多选标签禁用文本颜色
   * @descEN Text color of multiple tag when disabled
   */
  multipleItemColorDisabled: string;
  /**
   * @desc 多选标签禁用边框色
   * @descEN Border color of multiple tag when disabled
   */
  multipleItemBorderColorDisabled: string;
}

export interface SelectToken extends FullToken<'Select'> {
  rootPrefixCls: string;
  inputPaddingHorizontalBase: number;
  multipleSelectItemHeight: number;
  selectHeight: number;
}

// ============================= Selector =============================
const genSelectorStyle: GenerateStyle<SelectToken, CSSObject> = (token) => {
  const { componentCls, selectorBg } = token;

  return {
    position: 'relative',
    backgroundColor: selectorBg,
    border: `${token.lineWidth}px ${token.lineType} ${token.colorBorder}`,
    transition: `all ${token.motionDurationMid} ${token.motionEaseInOut}`,

    input: {
      cursor: 'pointer',
    },

    [`${componentCls}-show-search&`]: {
      cursor: 'text',

      input: {
        cursor: 'auto',
        color: 'inherit',
        height: '100%',
      },
    },

    [`${componentCls}-disabled&`]: {
      color: token.colorTextDisabled,
      background: token.colorBgContainerDisabled,
      cursor: 'not-allowed',

      [`${componentCls}-multiple&`]: {
        background: token.multipleSelectorBgDisabled,
      },

      input: {
        cursor: 'not-allowed',
      },
    },
  };
};

// ============================== Status ==============================
const genStatusStyle = (
  rootSelectCls: string,
  token: SelectToken & {
    borderHoverColor: string;
    borderActiveColor: string;
    outlineColor: string;
  },
  overwriteDefaultBorder: boolean = false,
): CSSObject => {
  const {
    componentCls,
    borderHoverColor,
    antCls,
    borderActiveColor,
    outlineColor,
    controlOutlineWidth,
  } = token;

  const overwriteStyle: CSSObject = overwriteDefaultBorder
    ? {
        [`${componentCls}-selector`]: {
          borderColor: borderActiveColor,
        },
      }
    : {};

  return {
    [rootSelectCls]: {
      [`&:not(${componentCls}-disabled):not(${componentCls}-customize-input):not(${antCls}-pagination-size-changer)`]:
        {
          ...overwriteStyle,

          [`&:hover ${componentCls}-selector`]: {
            borderColor: borderHoverColor,
          },

          [`${componentCls}-focused& ${componentCls}-selector`]: {
            borderColor: borderActiveColor,
            boxShadow: `0 0 0 ${controlOutlineWidth}px ${outlineColor}`,
            outline: 0,
          },
        },
    },
  };
};

// ============================== Styles ==============================
// /* Reset search input style */
const getSearchInputWithoutBorderStyle: GenerateStyle<SelectToken, CSSObject> = (token) => {
  const { componentCls } = token;

  return {
    [`${componentCls}-selection-search-input`]: {
      margin: 0,
      padding: 0,
      background: 'transparent',
      border: 'none',
      outline: 'none',
      appearance: 'none',
      fontFamily: 'inherit',

      '&::-webkit-search-cancel-button': {
        display: 'none',
        '-webkit-appearance': 'none',
      },
    },
  };
};

// =============================== Base ===============================
const genBaseStyle: GenerateStyle<SelectToken> = (token) => {
  const { antCls, componentCls, inputPaddingHorizontalBase, iconCls } = token;

  return {
    [componentCls]: {
      ...resetComponent(token),
      position: 'relative',
      display: 'inline-block',
      cursor: 'pointer',

      [`&:not(${componentCls}-customize-input) ${componentCls}-selector`]: {
        ...genSelectorStyle(token),
        ...getSearchInputWithoutBorderStyle(token),
      },

      // [`&:not(&-disabled):hover ${selectCls}-selector`]: {
      //   ...genHoverStyle(token),
      // },

      // ======================== Selection ========================
      [`${componentCls}-selection-item`]: {
        flex: 1,
        fontWeight: 'normal',
        position: 'relative',
        userSelect: 'none',
        ...textEllipsis,

        // https://github.com/ant-design/ant-design/issues/40421
        [`> ${antCls}-typography`]: {
          display: 'inline',
        },
      },

      // ======================= Placeholder =======================
      [`${componentCls}-selection-placeholder`]: {
        ...textEllipsis,
        flex: 1,
        color: token.colorTextPlaceholder,
        pointerEvents: 'none',
      },

      // ========================== Arrow ==========================
      [`${componentCls}-arrow`]: {
        ...resetIcon(),
        position: 'absolute',
        top: '50%',
        insetInlineStart: 'auto',
        insetInlineEnd: inputPaddingHorizontalBase,
        height: token.fontSizeIcon,
        marginTop: -token.fontSizeIcon / 2,
        color: token.colorTextQuaternary,
        fontSize: token.fontSizeIcon,
        lineHeight: 1,
        textAlign: 'center',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',

        [iconCls]: {
          verticalAlign: 'top',
          transition: `transform ${token.motionDurationSlow}`,

          '> svg': {
            verticalAlign: 'top',
          },

          [`&:not(${componentCls}-suffix)`]: {
            pointerEvents: 'auto',
          },
        },

        [`${componentCls}-disabled &`]: {
          cursor: 'not-allowed',
        },

        '> *:not(:last-child)': {
          marginInlineEnd: 8, // FIXME: magic
        },
      },

      // ========================== Clear ==========================
      [`${componentCls}-clear`]: {
        position: 'absolute',
        top: '50%',
        insetInlineStart: 'auto',
        insetInlineEnd: inputPaddingHorizontalBase,
        zIndex: 1,
        display: 'inline-block',
        width: token.fontSizeIcon,
        height: token.fontSizeIcon,
        marginTop: -token.fontSizeIcon / 2,
        color: token.colorTextQuaternary,
        fontSize: token.fontSizeIcon,
        fontStyle: 'normal',
        lineHeight: 1,
        textAlign: 'center',
        textTransform: 'none',
        background: token.clearBg,
        cursor: 'pointer',
        opacity: 0,
        transition: `color ${token.motionDurationMid} ease, opacity ${token.motionDurationSlow} ease`,
        textRendering: 'auto',

        '&:before': {
          display: 'block',
        },

        '&:hover': {
          color: token.colorTextTertiary,
        },
      },

      '&:hover': {
        [`${componentCls}-clear`]: {
          opacity: 1,
        },
      },
    },

    // ========================= Feedback ==========================
    [`${componentCls}-has-feedback`]: {
      [`${componentCls}-clear`]: {
        insetInlineEnd: inputPaddingHorizontalBase + token.fontSize + token.paddingXS,
      },
    },
  };
};

// ============================== Styles ==============================
const genSelectStyle: GenerateStyle<SelectToken> = (token) => {
  const { componentCls } = token;

  return [
    {
      [componentCls]: {
        // ==================== BorderLess ====================
        [`&-borderless ${componentCls}-selector`]: {
          backgroundColor: `transparent !important`,
          borderColor: `transparent !important`,
          boxShadow: `none !important`,
        },

        // ==================== In Form ====================
        [`&${componentCls}-in-form-item`]: {
          width: '100%',
        },
      },
    },

    // =====================================================
    // ==                       LTR                       ==
    // =====================================================
    // Base
    genBaseStyle(token),

    // Single
    genSingleStyle(token),

    // Multiple
    genMultipleStyle(token),

    // Dropdown
    genDropdownStyle(token),

    // =====================================================
    // ==                       RTL                       ==
    // =====================================================
    {
      [`${componentCls}-rtl`]: {
        direction: 'rtl',
      },
    },

    // =====================================================
    // ==                     Status                      ==
    // =====================================================
    genStatusStyle(
      componentCls,
      mergeToken<any>(token, {
        borderHoverColor: token.colorPrimaryHover,
        borderActiveColor: token.colorPrimary,
        outlineColor: token.controlOutline,
      }),
    ),
    genStatusStyle(
      `${componentCls}-status-error`,
      mergeToken<any>(token, {
        borderHoverColor: token.colorErrorHover,
        borderActiveColor: token.colorError,
        outlineColor: token.colorErrorOutline,
      }),
      true,
    ),
    genStatusStyle(
      `${componentCls}-status-warning`,
      mergeToken<any>(token, {
        borderHoverColor: token.colorWarningHover,
        borderActiveColor: token.colorWarning,
        outlineColor: token.colorWarningOutline,
      }),
      true,
    ),
    // =====================================================
    // ==             Space Compact                       ==
    // =====================================================
    genCompactItemStyle(token, {
      borderElCls: `${componentCls}-selector`,
      focusElCls: `${componentCls}-focused`,
    }),
  ];
};

// ============================== Export ==============================
export default genComponentStyleHook(
  'Select',
  (token, { rootPrefixCls }) => {
    const selectToken: SelectToken = mergeToken<SelectToken>(token, {
      rootPrefixCls,
      inputPaddingHorizontalBase: token.paddingSM - 1,
      multipleSelectItemHeight: token.multipleItemHeight,
      selectHeight: token.controlHeight,
    });

    return [genSelectStyle(selectToken)];
  },
  (token) => {
    const {
      fontSize,
      lineHeight,
      controlHeight,
      controlPaddingHorizontal,
      zIndexPopupBase,
      colorText,
      fontWeightStrong,
      controlItemBgActive,
      controlItemBgHover,
      colorBgContainer,
      colorFillSecondary,
      controlHeightLG,
      controlHeightSM,
      colorBgContainerDisabled,
      colorTextDisabled,
    } = token;

    return {
      zIndexPopup: zIndexPopupBase + 50,
      optionSelectedColor: colorText,
      optionSelectedFontWeight: fontWeightStrong,
      optionSelectedBg: controlItemBgActive,
      optionActiveBg: controlItemBgHover,
      optionPadding: `${
        (controlHeight - fontSize * lineHeight) / 2
      }px ${controlPaddingHorizontal}px`,
      optionFontSize: fontSize,
      optionLineHeight: lineHeight,
      optionHeight: controlHeight,
      selectorBg: colorBgContainer,
      clearBg: colorBgContainer,
      singleItemHeightLG: controlHeightLG,
      multipleItemBg: colorFillSecondary,
      multipleItemBorderColor: 'transparent',
      multipleItemHeight: controlHeightSM,
      multipleItemHeightLG: controlHeight,
      multipleSelectorBgDisabled: colorBgContainerDisabled,
      multipleItemColorDisabled: colorTextDisabled,
      multipleItemBorderColorDisabled: 'transparent',
    };
  },
);
