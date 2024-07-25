import { unit } from '@ant-design/cssinjs';
import type { CSSObject } from '@ant-design/cssinjs';

import type { GenerateStyle } from '../../theme/internal';
import { getTransBg } from './color-block';
import type { ColorPickerToken } from './index';

const genSliderStyle: GenerateStyle<ColorPickerToken, CSSObject> = (token) => {
  const {
    componentCls,
    colorPickerInsetShadow,
    colorBgElevated,
    colorFillSecondary,
    lineWidthBold,
    colorPickerHandlerSizeSM,
    colorPickerSliderHeight,
    marginSM,
    marginXS,
  } = token;

  const handleInnerSize = token
    .calc(colorPickerHandlerSizeSM)
    .sub(token.calc(lineWidthBold).mul(2).equal())
    .equal();

  return {
    // ======================== Slider ========================
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

        [`& ${componentCls}-slider-handle`]: {
          width: handleInnerSize,
          height: handleInnerSize,
          top: 0,
          borderRadius: '100%',

          '&:before': {
            display: 'none',
          },

          '&:after': {
            width: colorPickerHandlerSizeSM,
            height: colorPickerHandlerSizeSM,
            border: `${unit(lineWidthBold)} solid ${colorBgElevated}`,
            boxShadow: `${colorPickerInsetShadow}, 0 0 0 1px ${colorFillSecondary}`,
            outline: 'none',
            insetInlineStart: token.calc(lineWidthBold).mul(-1).equal(),
            top: token.calc(lineWidthBold).mul(-1).equal(),
            background: 'transparent',
            transform: 'scale(0.8)',
            transition: `transform ${token.motionDurationSlow}`,
          },

          '&-active, &:focus': {
            '&:after': {
              transform: 'scale(1)',
            },
          },
        },
      },
    ],

    // ======================== Layout ========================
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
        },
      },
    },

    [`${componentCls}-gradient-slider`]: {
      marginBottom: marginXS,
    },
  };
};

export default genSliderStyle;
