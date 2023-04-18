import { resetComponent } from '../../style';
import { initSlideMotion } from '../../style/motion';
import getArrowStyle from '../../style/placementArrow';
import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';

export interface ComponentToken {}

interface ColorPickerToken extends FullToken<'ColorPicker'> {
  colorPickerMinWidth: number;
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
    colorPickerMinWidth,
    boxShadowSecondary,
    colorPrimary,
    motionDurationMid,
    colorBgElevated,
    red6,
  } = token;

  return [
    {
      [componentCls]: {
        ...resetComponent(token),
        position: 'absolute',
        display: 'block',
        width: 'max-content',
        minWidth: colorPickerMinWidth,
        visibility: 'visible',
        '&-hidden': {
          display: 'none',
        },

        [`${componentCls}-panel`]: {
          display: 'flex',
          flexDirection: 'column',
          minWidth: colorPickerMinWidth,
          padding: 12,
          backgroundColor: colorBgElevated,
          borderRadius: 8,
          boxShadow: boxShadowSecondary,
        },
        [`${componentCls}-expanel`]: {
          '&-clear': {
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: 4,
          },
        },

        [`${componentCls}-picker`]: {
          [`${componentCls}-palette`]: {
            minHeight: 160,
            overflow: 'hidden',
            borderRadius: 4,
            [`> ${componentCls}-gradient`]: {
              borderStartStartRadius: 5,
            },
          },
          marginBottom: 12,
        },

        [`${componentCls}-handler`]: {
          boxSizing: 'border-box',
          width: 16,
          height: 16,
          border: `2px solid ${colorBgElevated}`,
          borderRadius: '50%',
          boxShadow: '0 0 1px 1px rgba(0, 0, 0, 0.06)',
          '&-sm': {
            width: 12,
            height: 12,
          },
        },

        [`${componentCls}-slider`]: {
          [`${componentCls}-palette`]: {
            height: 8,
          },
          [`${componentCls}-gradient`]: {
            borderRadius: 4,
          },
          '&-alpha': {
            backgroundSize: 16,
            backgroundImage:
              'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAAFpJREFUWAntljEKADAIA23p6v//qQ+wfUEcCu1yriEgp0FHRJSJcnehmmWm1Dv/lO4HIg1AAAKjTqm03ea88zMCCEDgO4HV5bS757f+7wRoAAIQ4B9gByAAgQ3pfiDmXmAeEwAAAABJRU5ErkJggg==")',
          },
          marginBottom: 12,
        },

        [`${componentCls}-slider-container`]: {
          display: 'flex',
          [`${componentCls}-slider-group`]: {
            flex: 1,
          },
        },

        [`${componentCls}-display`]: {
          marginInlineEnd: 12,
          '&-container': {
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 4,
          },
          '&-block': {
            width: 28,
            height: 28,
            backgroundSize: 28,
            border: '1px solid rgba(0,0,0,0.06)',
            backgroundImage:
              'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAAFpJREFUWAntljEKADAIA23p6v//qQ+wfUEcCu1yriEgp0FHRJSJcnehmmWm1Dv/lO4HIg1AAAKjTqm03ea88zMCCEDgO4HV5bS757f+7wRoAAIQ4B9gByAAgQ3pfiDmXmAeEwAAAABJRU5ErkJggg==")',
            borderRadius: 4,
          },
          '&-layer': {
            position: 'absolute',
            inset: 0,
          },
        },
        [`${componentCls}-databar`]: {
          '&-container': {
            display: 'flex',
            gap: 10,
            height: 24,
          },
          '&-steppers': {
            [`${antCls}-input-number`]: {
              fontSize: 12,
              lineHeight: '24px',
              '&-affix-wrapper': {
                width: 56,
                paddingInlineStart: 4,
                [`${antCls}-input-number-input`]: {
                  padding: 0,
                },
              },
              // '&-prefix': {
              //   marginInlineEnd: 0,
              // },
              '&-input-wrap': {
                height: 23,
              },
              '&-input': {
                height: 'inherit',
                paddingInlineStart: 4,
                paddingInlineEnd: 0,
              },
              '&-handler-wrap': {
                width: 16,
              },
            },
            '&-prefix': {
              position: 'relative',
              borderRadius: 2,
              overflow: 'hidden',
            },
            '&-display': {
              width: 12,
              height: 12,
              backgroundSize: 14,
              borderRadius: 2,
              border: '1px solid rgba(0,0,0,0.06)',
              backgroundImage:
                'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAAFpJREFUWAntljEKADAIA23p6v//qQ+wfUEcCu1yriEgp0FHRJSJcnehmmWm1Dv/lO4HIg1AAAKjTqm03ea88zMCCEDgO4HV5bS757f+7wRoAAIQ4B9gByAAgQ3pfiDmXmAeEwAAAABJRU5ErkJggg==")',
            },
            '&-layer': {
              position: 'absolute',
              inset: 0,
            },
          },
          '&-select': {
            width: 40,
            [`${antCls}-select`]: {
              width: '100%',
              '&-selector': {
                height: 24,
                padding: 0,
                border: 0,
                lineHeight: '24px',
              },
              '&-selection-search': {
                insetInlineEnd: 0,
              },
              '&-arrow': {
                insetInlineEnd: 0,
              },
              '&-selection-item': {
                lineHeight: 'inherit',
                fontSize: 12,
                paddingInlineEnd: 0,
              },
              '&-selection-search-input': {
                height: 'inherit',
              },
              '&-dropdown': {},
              '&-item-option-content': {
                fontSize: 12,
              },
            },
          },
          '&-picker': {
            display: 'flex',
            gap: 4,
            alignItems: 'center',
            [`${componentCls}-databar-steppers`]: {
              [`${antCls}-input-number`]: {
                width: 39,
              },
            },
            [`${componentCls}-databar-hexinput`]: {
              width: 125,
              [`${antCls}-input`]: {
                height: 24,
                '&-affix-wrapper': {
                  padding: '0 6px',
                },
                '&-prefix': {
                  color: '#d9d9d9',
                },
              },
            },
          },
        },
        [`${componentCls}-clear`]: {
          width: 18,
          height: 18,
          borderRadius: 4,
          border: '1px solid rgba(0,0,0,0.06)',
          position: 'relative',
          cursor: 'pointer',
          '&::after': {
            content: '""',
            position: 'absolute',
            right: 1,
            top: 0,
            display: 'block',
            width: 20,
            height: 2,
            transformOrigin: 'right',
            transform: 'rotate(-45deg)',
            backgroundColor: red6,
          },
        },
      },
      [`${componentCls}-root`]: {
        display: 'inline-block',
        [`${componentCls}-placeholder`]: {
          width: 32,
          height: 32,
          borderRadius: 6,
          border: `1px solid ${colorPrimary}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: `all ${motionDurationMid}`,
          '&-active': {
            ...genActiveStyle(token),
          },
          '&-container': {
            position: 'relative',
            borderRadius: 4,
            overflow: 'hidden',
          },
          '&-display': {
            width: 24,
            height: 24,
            backgroundSize: 24,
            borderRadius: 4,
            border: '1px solid rgba(0,0,0,0.06)',
            backgroundImage:
              'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAAFpJREFUWAntljEKADAIA23p6v//qQ+wfUEcCu1yriEgp0FHRJSJcnehmmWm1Dv/lO4HIg1AAAKjTqm03ea88zMCCEDgO4HV5bS757f+7wRoAAIQ4B9gByAAgQ3pfiDmXmAeEwAAAABJRU5ErkJggg==")',
          },
          '&-layer': {
            position: 'absolute',
            inset: 0,
          },
          [`${componentCls}-clear`]: {
            width: 24,
            height: 24,
            borderRadius: 6,
            border: '1px solid rgba(0,0,0,0.06)',
            position: 'relative',
            cursor: 'pointer',
            '&::after': {
              content: '""',
              position: 'absolute',
              right: 3,
              top: 2,
              display: 'block',
              width: 23,
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
    colorPickerMinWidth: 258,
  });

  return [genColorPickerStyle(ColorPickerToken), initSlideMotion(token, 'slide-up')];
});
