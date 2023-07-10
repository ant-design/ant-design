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
  } = token;

  return {
    [`${componentCls}-presets`]: {
      [`${antCls}-collapse-item > ${antCls}-collapse-header`]: {
        padding: 0,
        [`${antCls}-collapse-expand-icon`]: {
          height: fontSizeSM * lineHeightSM,
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
        padding: `${paddingXS}px 0`,
      },
      '&-label': {
        fontSize: fontSizeSM,
        color: colorText,
        lineHeight: lineHeightSM,
      },
      '&-items': {
        display: 'flex',
        flexWrap: 'wrap',
        gap: marginXXS * 1.5,
        [`${componentCls}-presets-color`]: {
          position: 'relative',
          cursor: 'pointer',
          width: colorPickerPresetColorSize,
          height: colorPickerPresetColorSize,

          '&::before': {
            content: '""',
            pointerEvents: 'none',
            width: colorPickerPresetColorSize + 4 * lineWidth,
            height: colorPickerPresetColorSize + 4 * lineWidth,
            position: 'absolute',
            top: -2 * lineWidth,
            insetInlineStart: -2 * lineWidth,
            borderRadius,
            border: `${lineWidth}px solid transparent`,
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
            width: (colorPickerPresetColorSize / 13) * 5,
            height: (colorPickerPresetColorSize / 13) * 8,
            border: `${token.lineWidthBold}px solid ${token.colorWhite}`,
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
