import { unit } from '@ant-design/cssinjs';
import type { CSSObject } from '@ant-design/cssinjs';

import type { GenerateStyle } from '../../theme/internal';
import type { ColorPickerToken } from './index';

const genPresetsStyle: GenerateStyle<ColorPickerToken, CSSObject> = (token) => {
  const {
    componentCls,
    antCls,
    colorTextQuaternary,
    paddingXXS,
    colorPickerPresetColorSize,
    fontSizeSM,
    colorText,
    lineHeightSM,
    lineWidth,
    borderRadius,
    colorFill,
    colorWhite,
    marginXXS,
    paddingXS,
    fontHeightSM,
  } = token;

  return {
    [`${componentCls}-presets`]: {
      [`${antCls}-collapse-item > ${antCls}-collapse-header`]: {
        padding: 0,
        [`${antCls}-collapse-expand-icon`]: {
          height: fontHeightSM,
          color: colorTextQuaternary,
          paddingInlineEnd: paddingXXS,
        },
      },
      [`${antCls}-collapse`]: {
        display: 'flex',
        flexDirection: 'column',
        gap: marginXXS,
      },
      [`${antCls}-collapse-item > ${antCls}-collapse-content > ${antCls}-collapse-content-box`]: {
        padding: `${unit(paddingXS)} 0`,
      },
      '&-label': {
        fontSize: fontSizeSM,
        color: colorText,
        lineHeight: lineHeightSM,
      },
      '&-items': {
        display: 'flex',
        flexWrap: 'wrap',
        gap: token.calc(marginXXS).mul(1.5).equal(),
        [`${componentCls}-presets-color`]: {
          position: 'relative',
          cursor: 'pointer',
          width: colorPickerPresetColorSize,
          height: colorPickerPresetColorSize,

          '&::before': {
            content: '""',
            pointerEvents: 'none',
            width: token.calc(colorPickerPresetColorSize).add(token.calc(lineWidth).mul(4)).equal(),
            height: token
              .calc(colorPickerPresetColorSize)
              .add(token.calc(lineWidth).mul(4))
              .equal(),
            position: 'absolute',
            top: token.calc(lineWidth).mul(-2).equal(),
            insetInlineStart: token.calc(lineWidth).mul(-2).equal(),
            borderRadius,
            border: `${unit(lineWidth)} solid transparent`,
            transition: `border-color ${token.motionDurationMid} ${token.motionEaseInBack}`,
          },
          '&:hover::before': {
            borderColor: colorFill,
          },

          '&::after': {
            boxSizing: 'border-box',
            position: 'absolute',
            top: '50%',
            insetInlineStart: '21.5%',
            display: 'table',
            width: token.calc(colorPickerPresetColorSize).div(13).mul(5).equal(),
            height: token.calc(colorPickerPresetColorSize).div(13).mul(8).equal(),
            border: `${unit(token.lineWidthBold)} solid ${token.colorWhite}`,
            borderTop: 0,
            borderInlineStart: 0,
            transform: 'rotate(45deg) scale(0) translate(-50%,-50%)',
            opacity: 0,
            content: '""',
            transition: `all ${token.motionDurationFast} ${token.motionEaseInBack}, opacity ${token.motionDurationFast}`,
          },

          [`&${componentCls}-presets-color-checked`]: {
            '&::after': {
              opacity: 1,
              borderColor: colorWhite,
              transform: 'rotate(45deg) scale(1) translate(-50%,-50%)',
              transition: `transform ${token.motionDurationMid} ${token.motionEaseOutBack} ${token.motionDurationFast}`,
            },
            [`&${componentCls}-presets-color-bright`]: {
              '&::after': {
                borderColor: 'rgba(0, 0, 0, 0.45)',
              },
            },
          },
        },
      },
      '&-empty': {
        fontSize: fontSizeSM,
        color: colorTextQuaternary,
      },
    },
  };
};

export default genPresetsStyle;
