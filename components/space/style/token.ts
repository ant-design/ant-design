import type { FullToken, GetDefaultToken } from '../../theme/internal';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  /**
   * @desc 横向内边距
   * @descEN Horizontal padding
   */
  paddingInline: number;
  /**
   * @desc 小号横向内边距
   * @descEN Horizontal padding of small size
   */
  paddingInlineSM: number;
  /**
   * @desc 边框圆角
   * @descEN Border radius
   */
  borderRadius: number;
  /**
   * @desc 小号边框圆角
   * @descEN Border radius of small size
   */
  borderRadiusSM: number;
  /**
   * @desc 大号边框圆角
   * @descEN Border radius of large size
   */
  borderRadiusLG: number;
  /**
   * @desc 边框宽度
   * @descEN Border width
   */
  lineWidth: number;
}

export interface AddonToken extends FullToken<'Addon'> {}

export const prepareComponentToken: GetDefaultToken<'Addon'> = (token) => ({
  paddingInline: token.paddingSM,
  paddingInlineSM: token.paddingXS,
  borderRadius: token.borderRadius,
  borderRadiusSM: token.borderRadiusSM,
  borderRadiusLG: token.borderRadiusLG,
  lineWidth: token.lineWidth,
});
