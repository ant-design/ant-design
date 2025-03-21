import { unit } from '@ant-design/cssinjs';
import type { CSSObject } from '@ant-design/cssinjs';

import type { ColorPickerToken } from './index';

/**
 * @private Internal usage only
 * see: https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/conic-gradient#checkerboard
 */
export const getTransBg = (size: string, colorFill: string): CSSObject => ({
  backgroundImage: `conic-gradient(
    ${colorFill} 0.25turn,
    transparent 0.25turn 0.5turn,
    ${colorFill} 0.5turn 0.75turn,
    transparent 0.75turn 1turn
  )`,
  backgroundSize: `${size} ${size}`,
});

const genColorBlockStyle = (token: ColorPickerToken, size: number): CSSObject => {
  const { componentCls, borderRadiusSM, colorPickerInsetShadow, lineWidth, colorFillSecondary } =
    token;
  return {
    [`${componentCls}-color-block`]: {
      position: 'relative',
      borderRadius: borderRadiusSM,
      width: size,
      height: size,
      boxShadow: colorPickerInsetShadow,
      flex: 'none',

      ...getTransBg('50%', token.colorFillSecondary),
      [`${componentCls}-color-block-inner`]: {
        width: '100%',
        height: '100%',
        boxShadow: `inset 0 0 0 ${unit(lineWidth)} ${colorFillSecondary}`,
        borderRadius: 'inherit',
      },
    },
  };
};

export default genColorBlockStyle;
