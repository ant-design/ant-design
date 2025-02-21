import { mergeToken } from '../../theme/internal';
import type { AliasToken, FullToken } from '../../theme/internal';

export interface SharedComponentToken {
  /**
   * @desc 输入框横向内边距
   * @descEN Horizontal padding of input
   */
  paddingInline: number;
  /**
   * @desc 小号输入框横向内边距
   * @descEN Horizontal padding of small input
   */
  paddingInlineSM: number;
  /**
   * @desc 大号输入框横向内边距
   * @descEN Horizontal padding of large input
   */
  paddingInlineLG: number;
  /**
   * @desc 输入框纵向内边距
   * @descEN Vertical padding of input
   */
  paddingBlock: number;
  /**
   * @desc 小号输入框纵向内边距
   * @descEN Vertical padding of small input
   */
  paddingBlockSM: number;
  /**
   * @desc 大号输入框纵向内边距
   * @descEN Vertical padding of large input
   */
  paddingBlockLG: number;
  /**
   * @desc 前/后置标签背景色
   * @descEN Background color of addon
   */
  addonBg: string;
  /**
   * @desc 悬浮态边框色
   * @descEN Hover border color
   */
  hoverBorderColor: string;
  /**
   * @desc 激活态边框色
   * @descEN Active border color
   */
  activeBorderColor: string;
  /**
   * @desc 激活态阴影
   * @descEN Box-shadow when active
   */
  activeShadow: string;
  /**
   * @desc 错误状态时激活态阴影
   * @descEN Box-shadow when active in error status
   */
  errorActiveShadow: string;
  /**
   * @desc 警告状态时激活态阴影
   * @descEN Box-shadow when active in warning status
   */
  warningActiveShadow: string;
  /**
   * @desc 输入框hover状态时背景颜色
   * @descEN Background color when the input box hovers
   */
  hoverBg: string;
  /**
   * @desc 输入框激活状态时背景颜色
   * @descEN Background color when the input box is activated
   */
  activeBg: string;
  /**
   * @desc 字体大小
   * @descEN Font size
   */
  inputFontSize: number;
  /**
   * @desc 大号字体大小
   * @descEN Font size of large
   */
  inputFontSizeLG: number;
  /**
   * @desc 小号字体大小
   * @descEN Font size of small
   */
  inputFontSizeSM: number;
}

export interface ComponentToken extends SharedComponentToken {}

export interface SharedInputToken {
  inputAffixPadding: number;
}

export interface InputToken extends FullToken<'Input'>, SharedInputToken {}

export function initInputToken(token: AliasToken): SharedInputToken {
  return mergeToken<InputToken>(token, {
    inputAffixPadding: token.paddingXXS,
  });
}

export const initComponentToken = (
  token: AliasToken & Partial<SharedComponentToken>,
): SharedComponentToken => {
  const {
    controlHeight,
    fontSize,
    lineHeight,
    lineWidth,
    controlHeightSM,
    controlHeightLG,
    fontSizeLG,
    lineHeightLG,
    paddingSM,
    controlPaddingHorizontalSM,
    controlPaddingHorizontal,
    colorFillAlter,
    colorPrimaryHover,
    colorPrimary,
    controlOutlineWidth,
    controlOutline,
    colorErrorOutline,
    colorWarningOutline,
    colorBgContainer,
    inputFontSize,
    inputFontSizeLG,
    inputFontSizeSM,
  } = token;

  const mergedFontSize = inputFontSize || fontSize;
  const mergedFontSizeSM = inputFontSizeSM || mergedFontSize;
  const mergedFontSizeLG = inputFontSizeLG || fontSizeLG;

  const paddingBlock =
    Math.round(((controlHeight - mergedFontSize * lineHeight) / 2) * 10) / 10 - lineWidth;
  const paddingBlockSM =
    Math.round(((controlHeightSM - mergedFontSizeSM * lineHeight) / 2) * 10) / 10 - lineWidth;
  const paddingBlockLG =
    Math.ceil(((controlHeightLG - mergedFontSizeLG * lineHeightLG) / 2) * 10) / 10 - lineWidth;

  return {
    paddingBlock: Math.max(paddingBlock, 0),
    paddingBlockSM: Math.max(paddingBlockSM, 0),
    paddingBlockLG: Math.max(paddingBlockLG, 0),
    paddingInline: paddingSM - lineWidth,
    paddingInlineSM: controlPaddingHorizontalSM - lineWidth,
    paddingInlineLG: controlPaddingHorizontal - lineWidth,
    addonBg: colorFillAlter,
    activeBorderColor: colorPrimary,
    hoverBorderColor: colorPrimaryHover,
    activeShadow: `0 0 0 ${controlOutlineWidth}px ${controlOutline}`,
    errorActiveShadow: `0 0 0 ${controlOutlineWidth}px ${colorErrorOutline}`,
    warningActiveShadow: `0 0 0 ${controlOutlineWidth}px ${colorWarningOutline}`,
    hoverBg: colorBgContainer,
    activeBg: colorBgContainer,
    inputFontSize: mergedFontSize,
    inputFontSizeLG: mergedFontSizeLG,
    inputFontSizeSM: mergedFontSizeSM,
  };
};
