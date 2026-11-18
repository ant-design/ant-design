import { unit } from '@ant-design/cssinjs';
import type { CSSObject } from '@ant-design/cssinjs';

import { genFocusStyle } from '../../style';
import type { ColorPickerToken } from './index';

/**
 * @private Internal usage only
 * see: https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/conic-gradient#checkerboard
 */
export const getTransBg = (size: string, colorFill: string): CSSObject => ({
  backgroundImage: `conic-gradient(${colorFill} 25%, transparent 25% 50%, ${colorFill} 50% 75%, transparent 75% 100%)`,
  backgroundSize: `${size} ${size}`,
});

const genColorBlockStyle = (token: ColorPickerToken, size: number): CSSObject => {
  const { componentCls, borderRadiusSM, colorPickerInsetShadow, lineWidth, colorFillSecondary } =
    token;
  return {
    [`${componentCls}-color-block`]: {
      appearance: 'none',
      padding: 0,
      border: 0,
      backgroundColor: 'transparent',
      position: 'relative',
      borderRadius: borderRadiusSM,
      width: size,
      height: size,
      boxShadow: colorPickerInsetShadow,
      flex: 'none',

      ...genFocusStyle(token),
      ...getTransBg('50%', token.colorFillSecondary),
      [`${componentCls}-color-block-inner`]: {
        display: 'block',
        width: '100%',
        height: '100%',
        boxShadow: `inset 0 0 0 ${unit(lineWidth)} ${colorFillSecondary}`,
        borderRadius: 'inherit',
      },
    },
  };
};

export default genColorBlockStyle;
