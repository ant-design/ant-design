import type { CSSObject } from '@ant-design/cssinjs';
import type { GenerateStyle } from '../../theme/internal';
import genColorBlockStyle, { getTransBg } from './color-block';
import type { ColorPickerToken } from './index';

const genPickerStyle: GenerateStyle<ColorPickerToken, CSSObject> = (token) => {
  const {
    componentCls,
    controlHeightLG,
    borderRadiusSM,
    colorPickerInsetShadow,
    marginSM,
    colorBgElevated,
    colorFillSecondary,
    lineWidthBold,
    colorPickerHandlerSize,
    colorPickerHandlerSizeSM,
    colorPickerSliderHeight,
    colorPickerPreviewSize,
  } = token;

  return {
    [`${componentCls}-select`]: {
      [`${componentCls}-palette`]: {
        minHeight: controlHeightLG * 4,
        overflow: 'hidden',
        borderRadius: borderRadiusSM,
      },
      [`${componentCls}-saturation`]: {
        position: 'absolute',
        borderRadius: 'inherit',
        boxShadow: colorPickerInsetShadow,
        inset: 0,
      },
      marginBottom: marginSM,
    },

    [`${componentCls}-handler`]: {
      width: colorPickerHandlerSize,
      height: colorPickerHandlerSize,
      border: `${lineWidthBold}px solid ${colorBgElevated}`,
      position: 'relative',
      borderRadius: '50%',
      cursor: 'pointer',
      boxShadow: `${colorPickerInsetShadow}, 0 0 0 1px ${colorFillSecondary}`,
      '&-sm': {
        width: colorPickerHandlerSizeSM,
        height: colorPickerHandlerSizeSM,
      },
    },

    [`${componentCls}-slider`]: {
      borderRadius: colorPickerSliderHeight / 2,
      [`${componentCls}-palette`]: {
        height: colorPickerSliderHeight,
      },
      [`${componentCls}-gradient`]: {
        borderRadius: colorPickerSliderHeight / 2,
        boxShadow: colorPickerInsetShadow,
      },
      '&-alpha': getTransBg(`${colorPickerSliderHeight}px`, token.colorFillSecondary),
      marginBottom: marginSM,
    },

    [`${componentCls}-slider-container`]: {
      display: 'flex',
      gap: marginSM,
      [`${componentCls}-slider-group`]: {
        flex: 1,
      },
    },

    ...genColorBlockStyle(token, colorPickerPreviewSize),
  };
};

export default genPickerStyle;
