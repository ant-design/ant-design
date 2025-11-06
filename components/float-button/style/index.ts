import { initFadeMotion } from '../../style/motion/fade';
import type { FullToken, GetDefaultToken } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';
import genFloatButtonStyle from './button';
import genGroupStyle from './group';

/** Component only token. Which will handle additional calculation of alias token */
export type ComponentToken = object;

/**
 * @desc FloatButton 组件的 Token
 * @descEN Token for FloatButton component
 */
export type FloatButtonToken = FullToken<'FloatButton'> & {
  /**
   * @desc FloatButton 尺寸
   * @descEN Size of FloatButton
   */
  floatButtonSize: number;
  /**
   * @desc FloatButton 图标尺寸
   * @descEN Icon size of FloatButton
   */
  floatButtonIconSize: number | string;

  // Position
  /**
   * @desc FloatButton 底部内边距
   * @descEN Bottom inset of FloatButton
   */
  floatButtonInsetBlockEnd: number;
  /**
   * @desc FloatButton 右侧内边距
   * @descEN Right inset of FloatButton
   */
  floatButtonInsetInlineEnd: number;
};

// ============================== Export ==============================
export const prepareComponentToken: GetDefaultToken<'FloatButton'> = () => ({});

export default genStyleHooks(
  'FloatButton',
  (token) => {
    const { controlHeightLG, marginXXL, marginLG, fontSizeIcon, calc } = token;

    const floatButtonToken = mergeToken<FloatButtonToken>(token, {
      floatButtonIconSize: calc(fontSizeIcon).mul(1.5).equal(),
      floatButtonSize: controlHeightLG,
      floatButtonInsetBlockEnd: marginXXL,
      floatButtonInsetInlineEnd: marginLG,
    });
    return [
      genFloatButtonStyle(floatButtonToken),
      genGroupStyle(floatButtonToken),
      initFadeMotion(token),
    ];
  },
  prepareComponentToken,
  {
    // Should be higher than Button (-999)
    order: -998,
  },
);
