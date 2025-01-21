import { unit } from '@ant-design/cssinjs';
import type { CSSObject } from '@ant-design/cssinjs';

import { genCompactItemStyle } from '../../style/compact-item';
import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';
import genColorBlockStyle from './color-block';
import genInputStyle from './input';
import genPickerStyle from './picker';
import genPresetsStyle from './presets';
import genSliderStyle from './slider';

// biome-ignore lint/suspicious/noEmptyInterface: ComponentToken need to be empty by default
export interface ComponentToken {}

/**
 * @desc ColorPicker 组件的 Token
 * @descEN Token for ColorPicker component
 */
export interface ColorPickerToken extends FullToken<'ColorPicker'> {
  /**
   * @desc ColorPicker 宽度
   * @descEN Width of ColorPicker
   */
  colorPickerWidth: number;
  /**
   * @desc ColorPicker 内嵌阴影
   * @descEN Inset shadow of ColorPicker
   */
  colorPickerInsetShadow: string;
  /**
   * @desc ColorPicker 处理器尺寸
   * @descEN Handler size of ColorPicker
   */
  colorPickerHandlerSize: number;
  /**
   * @desc ColorPicker 小号处理器尺寸
   * @descEN Small handler size of ColorPicker
   */
  colorPickerHandlerSizeSM: number;
  /**
   * @desc ColorPicker 滑块高度
   * @descEN Slider height of ColorPicker
   */
  colorPickerSliderHeight: number;
  /**
   * @desc ColorPicker 预览尺寸
   * @descEN Preview size of ColorPicker
   */
  colorPickerPreviewSize: number;
  /**
   * @desc ColorPicker Alpha 输入宽度
   * @descEN Alpha input width of ColorPicker
   */
  colorPickerAlphaInputWidth: number;
  /**
   * @desc ColorPicker 输入数字处理器宽度
   * @descEN Input number handle width of ColorPicker
   */
  colorPickerInputNumberHandleWidth: number;
  /**
   * @desc ColorPicker 预设颜色尺寸
   * @descEN Preset color size of ColorPicker
   */
  colorPickerPresetColorSize: number;
}

export const genActiveStyle = (
  token: ColorPickerToken,
  borderColor: string,
  outlineColor: string,
) => ({
  borderInlineEndWidth: token.lineWidth,
  borderColor,
  boxShadow: `0 0 0 ${unit(token.controlOutlineWidth)} ${outlineColor}`,
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
  const { componentCls, borderRadiusSM, lineWidth, colorSplit, colorBorder, red6 } = token;

  return {
    [`${componentCls}-clear`]: {
      width: size,
      height: size,
      borderRadius: borderRadiusSM,
      border: `${unit(lineWidth)} solid ${colorSplit}`,
      position: 'relative',
      overflow: 'hidden',
      cursor: 'inherit',
      transition: `all ${token.motionDurationFast}`,

      ...extraStyle,
      '&::after': {
        content: '""',
        position: 'absolute',
        insetInlineEnd: token.calc(lineWidth).mul(-1).equal(),
        top: token.calc(lineWidth).mul(-1).equal(),
        display: 'block',
        width: 40, // maximum
        height: 2, // fixed
        transformOrigin: `calc(100% - 1px) 1px`,
        transform: 'rotate(-45deg)',
        backgroundColor: red6,
      },

      '&:hover': {
        borderColor: colorBorder,
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
      minHeight: controlHeightLG,
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
      minHeight: controlHeightSM,
      borderRadius: borderRadiusSM,
      [`${componentCls}-color-block, ${componentCls}-clear`]: {
        width: controlHeightXS,
        height: controlHeightXS,
        borderRadius: borderRadiusXS,
      },

      [`${componentCls}-trigger-text`]: {
        lineHeight: unit(controlHeightXS),
      },
    },
  };
};

const genColorPickerStyle: GenerateStyle<ColorPickerToken> = (token) => {
  const {
    antCls,
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
        [`${componentCls}-inner`]: {
          '&-content': {
            display: 'flex',
            flexDirection: 'column',
            width: colorPickerWidth,

            [`& > ${antCls}-divider`]: {
              margin: `${unit(marginSM)} 0 ${unit(marginXS)}`,
            },
          },

          [`${componentCls}-panel`]: {
            ...genPickerStyle(token),
          },
          ...genSliderStyle(token),
          ...genColorBlockStyle(token, colorPickerPreviewSize),
          ...genInputStyle(token),
          ...genPresetsStyle(token),
          ...genClearStyle(token, colorPickerPresetColorSize, {
            marginInlineStart: 'auto',
          }),

          // Operation bar
          [`${componentCls}-operation`]: {
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: marginXS,
          },
        },

        '&-trigger': {
          minWidth: controlHeight,
          minHeight: controlHeight,
          borderRadius,
          border: `${unit(lineWidth)} solid ${colorBorder}`,
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          transition: `all ${motionDurationMid}`,
          background: colorBgElevated,
          padding: token.calc(paddingXXS).sub(lineWidth).equal(),
          [`${componentCls}-trigger-text`]: {
            marginInlineStart: marginXS,
            marginInlineEnd: token
              .calc(marginXS)
              .sub(token.calc(paddingXXS).sub(lineWidth))
              .equal(),
            fontSize,
            color: colorText,
            alignSelf: 'center',

            '&-cell': {
              '&:not(:last-child):after': {
                content: '", "',
              },

              '&-inactive': {
                color: colorTextDisabled,
              },
            },
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

    genCompactItemStyle(token, {
      focusElCls: `${componentCls}-trigger-active`,
    }),
  ];
};

export default genStyleHooks('ColorPicker', (token) => {
  const { colorTextQuaternary, marginSM } = token;

  const colorPickerSliderHeight = 8;

  const colorPickerToken = mergeToken<ColorPickerToken>(token, {
    colorPickerWidth: 234,
    colorPickerHandlerSize: 16,
    colorPickerHandlerSizeSM: 12,
    colorPickerAlphaInputWidth: 44,
    colorPickerInputNumberHandleWidth: 16,
    colorPickerPresetColorSize: 24,
    colorPickerInsetShadow: `inset 0 0 1px 0 ${colorTextQuaternary}`,
    colorPickerSliderHeight,
    colorPickerPreviewSize: token
      .calc(colorPickerSliderHeight)
      .mul(2)
      .add(marginSM)
      .equal() as number,
  });

  return [genColorPickerStyle(colorPickerToken)];
});
