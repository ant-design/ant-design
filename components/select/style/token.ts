import type { CSSProperties } from 'react';
import type { FullToken, GetDefaultToken } from 'antd/es/theme/util/genComponentStyleHook';

export interface MultipleSelectorToken {
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
   * @desc 小号多选标签高度
   * @descEN Height of multiple tag with small size
   */
  multipleItemHeightSM: number;
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
  /**
   * @internal
   */
}

export interface ComponentToken extends MultipleSelectorToken {
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

  showArrowPaddingInlineEnd: number;
}

export interface SelectorToken {
  inputPaddingHorizontalBase: number | string;
  multipleSelectItemHeight: number;
  selectHeight: number;
}

export interface SelectToken extends FullToken<'Select'>, SelectorToken {
  rootPrefixCls: string;
}

export const prepareComponentToken: GetDefaultToken<'Select'> = (token) => {
  const {
    fontSize,
    lineHeight,

    controlHeight,
    controlHeightSM,
    controlHeightLG,

    paddingXXS,

    controlPaddingHorizontal,
    zIndexPopupBase,
    colorText,
    fontWeightStrong,
    controlItemBgActive,
    controlItemBgHover,
    colorBgContainer,
    colorFillSecondary,

    colorBgContainerDisabled,
    colorTextDisabled,
  } = token;

  const multipleItemHeight = controlHeight - paddingXXS * 2;
  const multipleItemHeightSM = controlHeightSM - paddingXXS * 2;
  const multipleItemHeightLG = controlHeightLG - paddingXXS * 2;

  return {
    zIndexPopup: zIndexPopupBase + 50,
    optionSelectedColor: colorText,
    optionSelectedFontWeight: fontWeightStrong,
    optionSelectedBg: controlItemBgActive,
    optionActiveBg: controlItemBgHover,
    optionPadding: `${(controlHeight - fontSize * lineHeight) / 2}px ${controlPaddingHorizontal}px`,
    optionFontSize: fontSize,
    optionLineHeight: lineHeight,
    optionHeight: controlHeight,
    selectorBg: colorBgContainer,
    clearBg: colorBgContainer,
    singleItemHeightLG: controlHeightLG,
    multipleItemBg: colorFillSecondary,
    multipleItemBorderColor: 'transparent',
    multipleItemHeight,
    multipleItemHeightSM,
    multipleItemHeightLG,
    multipleSelectorBgDisabled: colorBgContainerDisabled,
    multipleItemColorDisabled: colorTextDisabled,
    multipleItemBorderColorDisabled: 'transparent',
    showArrowPaddingInlineEnd: Math.ceil(token.fontSize * 1.25),
  };
};
