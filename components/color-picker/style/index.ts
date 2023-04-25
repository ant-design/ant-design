import { resetComponent } from '../../style';
import { initSlideMotion } from '../../style/motion';
import getArrowStyle from '../../style/placementArrow';
import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';

export interface ComponentToken {}

interface ColorPickerToken extends FullToken<'ColorPicker'> {
  colorPickerWidth: number;
}

export const genActiveStyle = (token: ColorPickerToken) => ({
  boxShadow: `0 0 0 ${token.controlOutlineWidth}px ${token.controlOutline}`,
  borderInlineEndWidth: token.lineWidth,
  outline: 0,
});

const genColorPickerStyle: GenerateStyle<ColorPickerToken> = (token) => {
  const {
    antCls,
    componentCls,
    colorPickerWidth,
    boxShadowSecondary,
    colorPrimary,
    motionDurationMid,
    colorBgElevated,
    colorTextDisabled,
    colorBgContainerDisabled,
    colorText,
    colorTextQuaternary,
    colorBgTextHover,
    colorTextTertiary,
    colorWhite,
    controlPaddingHorizontal,
    borderRadiusLG,
    borderRadius,
    borderRadiusSM,
    marginXS,
    marginSM,
    controlHeightLG,
    borderRadiusOuter,
    controlHeightSM,
    size,
    sizeMS,
    sizeSM,
    sizeXS,
    sizeXXS,
    sizeXL,
    sizeMD,
    sizeLG,
    colorFillSecondary,
    fontSizeSM,
    lineHeightSM,
    paddingXXS,
    paddingXS,
    paddingContentVertical,
    colorBorder,
    colorBgTextActive,
    colorTextPlaceholder,
    red6,
  } = token;

  return [
    {
      [componentCls]: {
        ...resetComponent(token),
        position: 'absolute',
        display: 'block',
        width: colorPickerWidth,
        visibility: 'visible',
        '&-hidden': {
          display: 'none',
        },
        [`${componentCls}-panel`]: {
          display: 'flex',
          flexDirection: 'column',
          width: colorPickerWidth,
          padding: controlPaddingHorizontal,
          backgroundColor: colorBgElevated,
          borderRadius: borderRadiusLG,
          boxShadow: boxShadowSecondary,
        },
        [`${componentCls}-expanel`]: {
          '&-clear': {
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: marginXS,
          },
          '&-divider': {
            margin: `${marginSM}px 0 ${marginXS}px`,
          },
        },

        [`${componentCls}-select`]: {
          [`${componentCls}-palette`]: {
            minHeight: controlHeightLG * 4,
            overflow: 'hidden',
            borderRadius: borderRadiusOuter,
          },
          [`${componentCls}-saturation`]: {
            position: 'absolute',
            borderRadius: 'inherit',
            inset: 0,
          },
          marginBottom: marginSM,
        },

        [`${componentCls}-handler`]: {
          width: sizeMS,
          height: sizeMS,
          border: `2px solid ${colorBgElevated}`,
          position: 'relative',
          borderRadius: '50%',
          '&::after': {
            width: sizeMS + 2,
            height: sizeMS + 2,
            content: '""',
            border: `1px solid ${colorFillSecondary}`,
            borderRadius: '50%',
            position: 'absolute',
            top: -3,
            insetInlineStart: -3,
          },
          '&-sm': {
            width: sizeSM,
            height: sizeSM,
            '&::after': {
              width: sizeSM + 2,
              height: sizeSM + 2,
            },
          },
        },

        [`${componentCls}-slider`]: {
          borderRadius: borderRadiusOuter,
          [`${componentCls}-palette`]: {
            height: sizeXS,
          },
          [`${componentCls}-gradient`]: {
            borderRadius: borderRadiusOuter,
          },
          '&-alpha': {
            backgroundSize: size,
            backgroundImage:
              'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAAFpJREFUWAntljEKADAIA23p6v//qQ+wfUEcCu1yriEgp0FHRJSJcnehmmWm1Dv/lO4HIg1AAAKjTqm03ea88zMCCEDgO4HV5bS757f+7wRoAAIQ4B9gByAAgQ3pfiDmXmAeEwAAAABJRU5ErkJggg==")',
          },
          marginBottom: marginSM,
        },

        [`${componentCls}-slider-container`]: {
          display: 'flex',
          flexDirection: 'row-reverse',
          [`${componentCls}-slider-group`]: {
            flex: 1,
          },
        },

        [`${componentCls}-display`]: {
          marginInlineStart: marginSM,
          '&-container': {
            position: 'relative',
            overflow: 'hidden',
            borderRadius: borderRadiusOuter,
          },
          '&-block': {
            width: sizeXXS * 7,
            height: sizeXXS * 7,
            backgroundSize: sizeXXS * 7,
            border: `1px solid ${colorFillSecondary}`,
            backgroundImage:
              'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAAFpJREFUWAntljEKADAIA23p6v//qQ+wfUEcCu1yriEgp0FHRJSJcnehmmWm1Dv/lO4HIg1AAAKjTqm03ea88zMCCEDgO4HV5bS757f+7wRoAAIQ4B9gByAAgQ3pfiDmXmAeEwAAAABJRU5ErkJggg==")',
            borderRadius: borderRadiusOuter,
          },
          '&-layer': {
            position: 'absolute',
            inset: 0,
          },
        },
        [`${componentCls}-color-input`]: {
          '&-container': {
            display: 'flex',
            gap: 10,
            height: controlHeightSM,
          },
          [`${componentCls}-steppers`]: {
            [`${antCls}-input-number`]: {
              fontSize: fontSizeSM,
              lineHeight: lineHeightSM,
              '&-affix-wrapper': {
                width: 56,
                paddingInlineStart: paddingXXS,
                [`${antCls}-input-number-input`]: {
                  padding: 0,
                },
              },
              '&-input-wrap': {
                height: controlHeightSM - 1,
              },
              '&-input': {
                height: 'inherit',
                paddingInlineStart: paddingXXS,
                paddingInlineEnd: 0,
              },
              '&-handler-wrap': {
                width: sizeMS,
              },
            },
            '&-prefix': {
              position: 'relative',
              borderRadius: 2,
              overflow: 'hidden',
            },
          },

          '&-select': {
            width: sizeMD * 2,
            [`${antCls}-select`]: {
              width: '100%',
              '&-selection-search': {
                insetInlineEnd: 0,
              },
              '&-arrow': {
                insetInlineEnd: 0,
                marginTop: -marginXS,
              },
              '&-single': {
                [`${antCls}-select-selector`]: {
                  height: controlHeightSM,
                  padding: 0,
                  border: 0,
                  lineHeight: lineHeightSM,
                  [`${antCls}-select-selection-item`]: {
                    lineHeight: lineHeightSM,
                    fontSize: fontSizeSM,
                    paddingInlineEnd: 0,
                  },
                },
              },
              '&-selection-search-input': {
                height: 'inherit',
              },
              '&-item-option-content': {
                fontSize: fontSizeSM,
              },
            },
          },
          '&-picker': {
            display: 'flex',
            gap: 4,
            alignItems: 'center',
            flex: 1,
            [`${componentCls}-hsb-input,${componentCls}-rgb-input`]: {
              display: 'flex',
              gap: 4,
              alignItems: 'center',
              flex: 1,
            },
            [`${componentCls}-steppers`]: {
              flex: 1,
              [`${antCls}-input-number`]: {
                width: 'auto',
              },
            },
            [`${componentCls}-alpha-input`]: {
              flex: 'unset',
              width: sizeMD * 2,
              [`${antCls}-input-number`]: {
                width: '100%',
              },
            },

            [`${componentCls}-hex-input`]: {
              flex: 1,
              [`${antCls}-input`]: {
                height: controlHeightSM - 1,
                '&-affix-wrapper': {
                  padding: `0 ${paddingXS}px`,
                },
                '&-prefix': {
                  color: colorBorder,
                },
              },
            },
          },
        },
        [`${componentCls}-clear`]: {
          width: sizeMS + 2,
          height: sizeMS + 2,
          borderRadius: borderRadiusOuter,
          border: `1px solid ${colorBgTextHover}`,
          position: 'relative',
          cursor: 'pointer',
          '&::after': {
            content: '""',
            position: 'absolute',
            insetInlineEnd: 1,
            top: 0,
            display: 'block',
            width: sizeMD,
            height: 2,
            transformOrigin: 'right',
            transform: 'rotate(-45deg)',
            backgroundColor: red6,
          },
        },
        [`${componentCls}-presets`]: {
          [`${antCls}-collapse-item > ${antCls}-collapse-header`]: {
            padding: 0,
            [`${antCls}-collapse-expand-icon`]: {
              height: 20,
              color: colorTextQuaternary,
            },
          },
          [`${antCls}-collapse-item > ${antCls}-collapse-content > ${antCls}-collapse-content-box`]:
            {
              padding: `${paddingContentVertical}px 0`,
            },
          '&-label': {
            fontSize: fontSizeSM,
            color: colorText,
            lineHeight: lineHeightSM,
          },
          '&-items': {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px 6px',
            [`${componentCls}-presets-color`]: {
              '&::after': {
                content: '""',
                width: sizeMD + 2,
                height: sizeMD + 2,
                position: 'absolute',
                top: -2,
                insetInlineStart: -2,
                borderRadius,
                border: '1px solid transparent',
                transition: `all ${token.motionDurationMid} ${token.motionEaseInBack}`,
              },
              '&:hover::after': {
                borderColor: colorBgTextActive,
              },

              position: 'relative',
              cursor: 'pointer',
              [`&${componentCls}-presets-color-checked`]: {
                [`${componentCls}-presets-color-box`]: {
                  '&:after': {
                    opacity: 1,
                    transform: 'rotate(45deg) scale(1) translate(-50%,-50%)',
                    transition: `all ${token.motionDurationMid} ${token.motionEaseOutBack} ${token.motionDurationFast}`,
                  },
                  [`&${componentCls}-presets-color-bright`]: {
                    '&:after': {
                      borderColor: colorTextTertiary,
                    },
                  },
                  [`&${componentCls}-presets-color-dark`]: {
                    '&:after': {
                      borderColor: colorWhite,
                    },
                  },
                },
              },
              [`${componentCls}-presets-color-box`]: {
                borderRadius: borderRadiusSM,
                overflow: 'hidden',
                position: 'relative',
                '&:after': {
                  boxSizing: 'border-box',
                  position: 'absolute',
                  top: '50%',
                  insetInlineStart: '21.5%',
                  display: 'table',
                  width: ((sizeMS + 2) / 14) * 5,
                  height: ((sizeMS + 2) / 14) * 8,
                  border: `${token.lineWidthBold}px solid ${token.colorWhite}`,
                  borderTop: 0,
                  borderInlineStart: 0,
                  transform: 'rotate(45deg) scale(0) translate(-50%,-50%)',
                  opacity: 0,
                  content: '""',
                  transition: `all ${token.motionDurationFast} ${token.motionEaseInBack}, opacity ${token.motionDurationFast}`,
                },
                [`${componentCls}-presets-color-block`]: {
                  width: sizeMS + 2,
                  height: sizeMS + 2,
                  borderRadius: borderRadiusOuter,
                  boxShadow: `inset 0 0 1px 0 ${colorTextPlaceholder}`,
                },
                [`${componentCls}-presets-color-layer`]: {
                  position: 'absolute',
                  inset: 0,
                },
              },
            },
          },
          '&-empty': {
            fontSize: fontSizeSM,
            color: colorTextQuaternary,
          },
        },
        '&-placeholder': {
          width: sizeXL,
          height: sizeXL,
          borderRadius,
          border: `1px solid ${colorPrimary}`,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: `all ${motionDurationMid}`,
          background: colorBgElevated,
          '&-active': {
            ...genActiveStyle(token),
          },
          '&-disabled': {
            color: colorTextDisabled,
            background: colorBgContainerDisabled,
            borderColor: colorTextDisabled,
            cursor: 'not-allowed',
          },
          [`${componentCls}-placeholder-container`]: {
            position: 'relative',
            borderRadius: borderRadiusOuter,
            overflow: 'hidden',
          },

          [`${componentCls}-placeholder-display`]: {
            width: sizeLG,
            height: sizeLG,
            backgroundSize: sizeLG,
            borderRadius: borderRadiusOuter,
            border: `1px solid ${colorFillSecondary}`,
            backgroundImage:
              'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAAFpJREFUWAntljEKADAIA23p6v//qQ+wfUEcCu1yriEgp0FHRJSJcnehmmWm1Dv/lO4HIg1AAAKjTqm03ea88zMCCEDgO4HV5bS757f+7wRoAAIQ4B9gByAAgQ3pfiDmXmAeEwAAAABJRU5ErkJggg==")',
          },
          [`${componentCls}-placeholder-layer`]: {
            position: 'absolute',
            inset: 0,
          },
          [`${componentCls}-clear`]: {
            width: controlHeightSM,
            height: controlHeightSM,
            borderRadius,
            border: `1px solid ${colorBgTextHover}`,
            position: 'relative',
            cursor: 'pointer',
            '&::after': {
              content: '""',
              position: 'absolute',
              insetInlineEnd: paddingXXS - 1,
              top: 2,
              display: 'block',
              width: sizeLG - 1,
              height: 2,
              transformOrigin: 'right',
              transform: 'rotate(-45deg)',
              backgroundColor: red6,
            },
          },
        },
      },
    },
    // Arrow Style
    getArrowStyle<ColorPickerToken>(mergeToken<ColorPickerToken>(token), {
      colorBg: token.colorBgElevated,
      limitVerticalRadius: true,
    }),
  ];
};

export default genComponentStyleHook<'ColorPicker'>('ColorPicker', (token) => {
  const ColorPickerToken = mergeToken<ColorPickerToken>(token, {
    colorPickerWidth: 258,
  });

  return [genColorPickerStyle(ColorPickerToken), initSlideMotion(token, 'slide-up')];
});
