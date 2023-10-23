import type { CSSObject } from '@ant-design/cssinjs';
import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';
import genColorBlockStyle from './color-block';
import genInputStyle from './input';
import genPickerStyle from './picker';
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

export const genActiveStyle = (
  token: ColorPickerToken,
  borderColor: string,
  outlineColor: string,
) => ({
  borderInlineEndWidth: token.lineWidth,
  borderColor,
  boxShadow: `0 0 0 ${token.controlOutlineWidth}px ${outlineColor}`,
  outline: 0,
});

const genRtlStyle = (token: ColorPickerToken): CSSObject => {
  const { componentCls } = token;
  return {
    '&-rtl': {
      [`${componentCls}-presets-color`]: {
        '&::after': {
          direction: 'ltr',
        },
      },
      [`${componentCls}-clear`]: {
        '&::after': {
          direction: 'ltr',
        },
      },
    },
  };
};

const genClearStyle = (
  token: ColorPickerToken,
  size: number,
  extraStyle?: CSSObject,
): CSSObject => {
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
      ...extraStyle,
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

const genStatusStyle = (token: ColorPickerToken): CSSObject => {
  const {
    componentCls,
    colorError,
    colorWarning,
    colorErrorHover,
    colorWarningHover,
    colorErrorOutline,
    colorWarningOutline,
  } = token;
  return {
    [`&${componentCls}-status-error`]: {
      borderColor: colorError,
      '&:hover': {
        borderColor: colorErrorHover,
      },
      [`&${componentCls}-trigger-active`]: {
        ...genActiveStyle(token, colorError, colorErrorOutline),
      },
    },
    [`&${componentCls}-status-warning`]: {
      borderColor: colorWarning,
      '&:hover': {
        borderColor: colorWarningHover,
      },
      [`&${componentCls}-trigger-active`]: {
        ...genActiveStyle(token, colorWarning, colorWarningOutline),
      },
    },
  };
};
const genSizeStyle = (token: ColorPickerToken): CSSObject => {
  const {
    componentCls,
    controlHeightLG,
    controlHeightSM,
    controlHeight,
    controlHeightXS,
    borderRadius,
    borderRadiusSM,
    borderRadiusXS,
    borderRadiusLG,
    fontSizeLG,
  } = token;
  return {
    [`&${componentCls}-lg`]: {
      minWidth: controlHeightLG,
      height: controlHeightLG,
      borderRadius: borderRadiusLG,
      [`${componentCls}-color-block, ${componentCls}-clear`]: {
        width: controlHeight,
        height: controlHeight,
        borderRadius,
      },
      [`${componentCls}-trigger-text`]: {
        fontSize: fontSizeLG,
      },
    },
    [`&${componentCls}-sm`]: {
      minWidth: controlHeightSM,
      height: controlHeightSM,
      borderRadius: borderRadiusSM,
      [`${componentCls}-color-block, ${componentCls}-clear`]: {
        width: controlHeightXS,
        height: controlHeightXS,
        borderRadius: borderRadiusXS,
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
    colorText,
    colorBgContainerDisabled,
    borderRadius,
    marginXS,
    marginSM,
    controlHeight,
    controlHeightSM,
    colorBgTextActive,
    colorPickerPresetColorSize,
    colorPickerPreviewSize,
    lineWidth,
    colorBorder,
    paddingXXS,
    fontSize,
    colorPrimaryHover,
    controlOutline,
  } = token;

  return [
    {
      [componentCls]: {
        [`${componentCls}-inner-content`]: {
          display: 'flex',
          flexDirection: 'column',
          width: colorPickerWidth,

          '&-divider': {
            margin: `${marginSM}px 0 ${marginXS}px`,
          },
          [`${componentCls}-panel`]: {
            ...genPickerStyle(token),
          },
          ...genColorBlockStyle(token, colorPickerPreviewSize),
          ...genInputStyle(token),
          ...genPresetsStyle(token),
          ...genClearStyle(token, colorPickerPresetColorSize, {
            marginInlineStart: 'auto',
            marginBottom: marginXS,
          }),
        },

        '&-trigger': {
          minWidth: controlHeight,
          height: controlHeight,
          borderRadius,
          border: `${lineWidth}px solid ${colorBorder}`,
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: `all ${motionDurationMid}`,
          background: colorBgElevated,
          padding: paddingXXS - lineWidth,
          [`${componentCls}-trigger-text`]: {
            marginInlineStart: marginXS,
            marginInlineEnd: marginXS - (paddingXXS - lineWidth),
            fontSize,
            color: colorText,
          },
          '&:hover': {
            borderColor: colorPrimaryHover,
          },
          [`&${componentCls}-trigger-active`]: {
            ...genActiveStyle(token, colorPrimary, controlOutline),
          },
          '&-disabled': {
            color: colorTextDisabled,
            background: colorBgContainerDisabled,
            cursor: 'not-allowed',
            '&:hover': {
              borderColor: colorBgTextActive,
            },
            [`${componentCls}-trigger-text`]: {
              color: colorTextDisabled,
            },
          },
          ...genClearStyle(token, controlHeightSM),
          ...genColorBlockStyle(token, controlHeightSM),
          ...genStatusStyle(token),
          ...genSizeStyle(token),
        },
        ...genRtlStyle(token),
      },
    },
  ];
};

export default genComponentStyleHook('ColorPicker', (token) => {
  const { colorTextQuaternary, marginSM } = token;

  const colorPickerSliderHeight = 8;

  const colorPickerToken = mergeToken<ColorPickerToken>(token, {
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

  return [genColorPickerStyle(colorPickerToken)];
});
