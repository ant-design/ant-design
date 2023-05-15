import type { CSSObject } from '@ant-design/cssinjs';
import type { ColorPickerToken } from './index';

const TRANSPARENT_DOT_COLOR = '#EEE';

/**
 * @private Internal usage only
 */
export const getTransBg = (size: number): CSSObject => ({
  backgroundImage: `conic-gradient(${TRANSPARENT_DOT_COLOR} 0 25%, transparent 0 50%, ${TRANSPARENT_DOT_COLOR} 0 75%, transparent 0)`,
  backgroundSize: `${size}px ${size}px`,
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
      ...getTransBg(size / 2),
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
