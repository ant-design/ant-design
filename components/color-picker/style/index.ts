import type { CSSObject } from '@ant-design/cssinjs';
import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';
import genPickerStyle from './picker';
import genInputStyle from './input';
import genPresetsStyle from './presets';

export interface ComponentToken {}

export interface ColorPickerToken extends FullToken<'ColorPicker'> {
  colorPickerWidth: number;
  colorPickerInsetShadow: string;
  colorPickerHandlerSize: number;
  colorPickerHandlerSizeSM: number;
  colorPickerSliderHeight: number;
  colorPickerPreviewSize: number;
  colorPickerAlphaInputWidth: number;
  colorPickerInputNumberHandleWidth: number;
  colorPickerPresetColorSize: number;
}

export const genActiveStyle = (token: ColorPickerToken) => ({
  boxShadow: `0 0 0 ${token.controlOutlineWidth}px ${token.controlOutline}`,
  borderInlineEndWidth: token.lineWidth,
  outline: 0,
});

const genClearStyle = (token: ColorPickerToken, size: number): CSSObject => {
  const { componentCls, borderRadiusSM, lineWidth, colorSplit, red6 } = token;

  return {
    [`${componentCls}-clear`]: {
      width: size,
      height: size,
      borderRadius: borderRadiusSM,
      border: `${lineWidth}px solid ${colorSplit}`,
      position: 'relative',
      cursor: 'pointer',
      overflow: 'hidden',
      '&::after': {
        content: '""',
        position: 'absolute',
        insetInlineEnd: lineWidth,
        top: 0,
        display: 'block',
        width: 40, // maximum
        height: 2, // fixed
        transformOrigin: 'right',
        transform: 'rotate(-45deg)',
        backgroundColor: red6,
      },
    },
  };
};

const genColorPickerStyle: GenerateStyle<ColorPickerToken> = (token) => {
  const {
    componentCls,
    colorPickerWidth,
    colorPrimary,
    motionDurationMid,
    colorBgElevated,
    colorTextDisabled,
    colorBgContainerDisabled,
    borderRadius,
    borderRadiusSM,
    marginXS,
    marginSM,
    controlHeight,
    controlHeightSM,
    colorPickerInsetShadow,
    colorBgTextActive,
    colorPickerPresetColorSize,
    lineWidth,
    colorBorder,
  } = token;

  return [
    {
      [componentCls]: {
        [`${componentCls}-panel`]: {
          display: 'flex',
          flexDirection: 'column',
          width: colorPickerWidth,

          [`${componentCls}-inner-panel`]: {
            [`${componentCls}-clear`]: {
              marginInlineStart: 'auto',
              marginBottom: marginXS,
            },
            '&-divider': {
              margin: `${marginSM}px 0 ${marginXS}px`,
            },
          },

          ...genPickerStyle(token),
          ...genInputStyle(token),
          ...genPresetsStyle(token),
          ...genClearStyle(token, colorPickerPresetColorSize),
        },

        '&-trigger': {
          width: controlHeight,
          height: controlHeight,
          borderRadius,
          border: `${lineWidth}px solid ${colorBorder}`,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: `all ${motionDurationMid}`,
          background: colorBgElevated,
          '&-active': {
            ...genActiveStyle(token),
            borderColor: colorPrimary,
          },
          '&:hover': {
            borderColor: colorPrimary,
          },
          '&-disabled': {
            color: colorTextDisabled,
            background: colorBgContainerDisabled,
            cursor: 'not-allowed',
            '&:hover': {
              borderColor: colorBgTextActive,
            },
          },
          [`${componentCls}-trigger-container`]: {
            position: 'relative',
            borderRadius: borderRadiusSM,
            overflow: 'hidden',
            width: controlHeightSM,
            height: controlHeightSM,
            backgroundSize: controlHeightSM,
            backgroundImage:
              'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAAFpJREFUWAntljEKADAIA23p6v//qQ+wfUEcCu1yriEgp0FHRJSJcnehmmWm1Dv/lO4HIg1AAAKjTqm03ea88zMCCEDgO4HV5bS757f+7wRoAAIQ4B9gByAAgQ3pfiDmXmAeEwAAAABJRU5ErkJggg==")',

            [`${componentCls}-trigger-layer`]: {
              boxShadow: colorPickerInsetShadow,
              width: '100%',
              height: '100%',
            },
          },
          ...genClearStyle(token, controlHeightSM),
        },
      },
    },
  ];
};

export default genComponentStyleHook('ColorPicker', (token) => {
  const { colorTextQuaternary, marginSM } = token;

  const colorPickerSliderHeight = 8;

  const ColorPickerToken = mergeToken<ColorPickerToken>(token, {
    colorPickerWidth: 234,
    colorPickerHandlerSize: 16,
    colorPickerHandlerSizeSM: 12,
    colorPickerAlphaInputWidth: 44,
    colorPickerInputNumberHandleWidth: 16,
    colorPickerPresetColorSize: 18,
    colorPickerInsetShadow: `inset 0 0 1px 0 ${colorTextQuaternary}`,
    colorPickerSliderHeight,
    colorPickerPreviewSize: colorPickerSliderHeight * 2 + marginSM,
  });

  return [genColorPickerStyle(ColorPickerToken)];
});
