import { unit } from '@ant-design/cssinjs';
import type { CSSObject } from '@ant-design/cssinjs';

import type { GenerateStyle } from '../../theme/internal';
import { getTransBg } from './color-block';
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
  } = token;

  const handleInnerSize = token
    .calc(colorPickerHandlerSizeSM)
    .sub(token.calc(lineWidthBold).mul(2).equal())
    .equal();

  return {
    [`${componentCls}-select`]: {
      [`${componentCls}-palette`]: {
        minHeight: token.calc(controlHeightLG).mul(4).equal(),
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

    // ======================== Slider ========================
    [`${componentCls}-slider-container`]: {
      display: 'flex',
      gap: marginSM,
      marginBottom: marginSM,

      // Group
      [`${componentCls}-slider-group`]: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        display: 'flex',

        '&-disabled-alpha': {
          justifyContent: 'center',
          //   display: 'flex',
          //   alignItems: 'center',
          //   [`${componentCls}-slider`]: {
          //     flex: 1,
          //     marginBottom: 0,
          //   },
        },
      },
    },

    // Slider
    [`${componentCls}-slider`]: [
      getTransBg(`${unit(colorPickerSliderHeight)}`, token.colorFillSecondary),

      {
        margin: 0,
        padding: 0,
        height: colorPickerSliderHeight,
        borderRadius: token.calc(colorPickerSliderHeight).div(2).equal(),

        '&-rail': {
          height: colorPickerSliderHeight,
          borderRadius: token.calc(colorPickerSliderHeight).div(2).equal(),
          boxShadow: colorPickerInsetShadow,
        },

        '&-handle': {
          width: handleInnerSize,
          height: handleInnerSize,
          top: 0,

          '&:before': {
            display: 'none',
          },

          '&:after': {
            width: colorPickerHandlerSizeSM,
            height: colorPickerHandlerSizeSM,
            border: `${unit(lineWidthBold)} solid ${colorBgElevated}`,
            boxShadow: `${colorPickerInsetShadow}, 0 0 0 1px ${colorFillSecondary}`,
            left: token.calc(lineWidthBold).mul(-1).equal(),
            top: token.calc(lineWidthBold).mul(-1).equal(),
            background: 'transparent',
          },
        },
      },
    ],

    // ======================== Panel =========================
    [`${componentCls}-handler`]: {
      width: colorPickerHandlerSize,
      height: colorPickerHandlerSize,
      border: `${unit(lineWidthBold)} solid ${colorBgElevated}`,
      position: 'relative',
      borderRadius: '50%',
      cursor: 'pointer',
      boxShadow: `${colorPickerInsetShadow}, 0 0 0 1px ${colorFillSecondary}`,
    },

    // [`${componentCls}-handler`]: {
    //   width: colorPickerHandlerSize,
    //   height: colorPickerHandlerSize,
    //   border: `${unit(lineWidthBold)} solid ${colorBgElevated}`,
    //   position: 'relative',
    //   borderRadius: '50%',
    //   cursor: 'pointer',
    //   boxShadow: `${colorPickerInsetShadow}, 0 0 0 1px ${colorFillSecondary}`,
    //   '&-sm': {
    //     width: colorPickerHandlerSizeSM,
    //     height: colorPickerHandlerSizeSM,
    //   },
    // },

    // [`${componentCls}-slider`]: {
    //   borderRadius: token.calc(colorPickerSliderHeight).div(2).equal(),
    //   [`${componentCls}-palette`]: {
    //     height: colorPickerSliderHeight,
    //   },
    //   [`${componentCls}-gradient`]: {
    //     borderRadius: token.calc(colorPickerSliderHeight).div(2).equal(),
    //     boxShadow: colorPickerInsetShadow,
    //   },
    //   '&-alpha': getTransBg(`${unit(colorPickerSliderHeight)}`, token.colorFillSecondary),
    //   '&-hue': { marginBottom: marginSM },
    // },
  };
};

export default genPickerStyle;
