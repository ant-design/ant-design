import type { CSSObject } from '@ant-design/cssinjs';
import type { ColorPickerToken } from './index';

/**
 * @private Internal usage only
 */
export const getTransBg = (size: string, colorFill: string): CSSObject => ({
  backgroundImage: `conic-gradient(${colorFill} 0 25%, transparent 0 50%, ${colorFill} 0 75%, transparent 0)`,
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
      ...getTransBg('50%', token.colorFillSecondary),
      [`${componentCls}-color-block-inner`]: {
        width: '100%',
        height: '100%',
        border: `${lineWidth}px solid ${colorFillSecondary}`,
        borderRadius: 'inherit',
      },
    },
  };
};

export default genColorBlockStyle;
