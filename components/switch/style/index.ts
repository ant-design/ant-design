import type { CSSObject } from '@ant-design/cssinjs';
import { TinyColor } from '@ctrl/tinycolor';
import { genFocusStyle, resetComponent } from '../../style';
import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';

export interface ComponentToken {
  /**
   *  @desc 开关高度
   *  @descEN Height of Switch
   */
  trackHeight: number;
  /**
   * @desc 小号开关高度
   * @descEN Height of small Switch
   */
  trackHeightSM: number;
  /**
   * @desc 开关最小宽度
   * @descEN Minimum width of Switch
   */
  trackMinWidth: number;
  /**
   * @desc 小号开关最小宽度
   * @descEN Minimum width of small Switch
   */
  trackMinWidthSM: number;
  /**
   * @desc 开关内边距
   * @descEN Padding of Switch
   */
  trackPadding: number;
  /**
   * @desc 开关把手背景色
   * @descEN Background color of Switch handle
   */
  handleBg: string;
  /**
   * @desc 开关把手阴影
   * @descEN Shadow of Switch handle
   */
  handleShadow: string;
  /**
   * @desc 开关把手大小
   * @descEN Size of Switch handle
   */
  handleSize: number;
  /**
   * @desc 小号开关把手大小
   * @descEN Size of small Switch handle
   */
  handleSizeSM: number;
  /**
   * @desc 内容区域最小边距
   * @descEN Minimum margin of content area
   */
  innerMinMargin: number;
  /**
   * @desc 内容区域最大边距
   * @descEN Maximum margin of content area
   */
  innerMaxMargin: number;
  /**
   * @desc 小号开关内容区域最小边距
   * @descEN Minimum margin of content area of small Switch
   */
  innerMinMarginSM: number;
  /**
   * @desc 小号开关内容区域最大边距
   * @descEN Maximum margin of content area of small Switch
   */
  innerMaxMarginSM: number;
}

interface SwitchToken extends FullToken<'Switch'> {
  switchDuration: string;
  switchColor: string;
  switchDisabledOpacity: number;
  switchLoadingIconSize: number;
  switchLoadingIconColor: string;
  switchHandleActiveInset: string;
}

const genSwitchSmallStyle: GenerateStyle<SwitchToken, CSSObject> = (token) => {
  const {
    componentCls,
    trackHeightSM,
    trackPadding,
    trackMinWidthSM,
    innerMinMarginSM,
    innerMaxMarginSM,
    handleSizeSM,
  } = token;
  const switchInnerCls = `${componentCls}-inner`;

  return {
    [componentCls]: {
      [`&${componentCls}-small`]: {
        minWidth: trackMinWidthSM,
        height: trackHeightSM,
        lineHeight: `${trackHeightSM}px`,

        [`${componentCls}-inner`]: {
          paddingInlineStart: innerMaxMarginSM,
          paddingInlineEnd: innerMinMarginSM,
          [`${switchInnerCls}-checked`]: {
            marginInlineStart: `calc(-100% + ${handleSizeSM + trackPadding * 2}px - ${
              innerMaxMarginSM * 2
            }px)`,
            marginInlineEnd: `calc(100% - ${handleSizeSM + trackPadding * 2}px + ${
              innerMaxMarginSM * 2
            }px)`,
          },

          [`${switchInnerCls}-unchecked`]: {
            marginTop: -trackHeightSM,
            marginInlineStart: 0,
            marginInlineEnd: 0,
          },
        },

        [`${componentCls}-handle`]: {
          width: handleSizeSM,
          height: handleSizeSM,
        },

        [`${componentCls}-loading-icon`]: {
          top: (handleSizeSM - token.switchLoadingIconSize) / 2,
          fontSize: token.switchLoadingIconSize,
        },

        [`&${componentCls}-checked`]: {
          [`${componentCls}-inner`]: {
            paddingInlineStart: innerMinMarginSM,
            paddingInlineEnd: innerMaxMarginSM,
            [`${switchInnerCls}-checked`]: {
              marginInlineStart: 0,
              marginInlineEnd: 0,
            },

            [`${switchInnerCls}-unchecked`]: {
              marginInlineStart: `calc(100% - ${handleSizeSM + trackPadding * 2}px + ${
                innerMaxMarginSM * 2
              }px)`,
              marginInlineEnd: `calc(-100% + ${handleSizeSM + trackPadding * 2}px - ${
                innerMaxMarginSM * 2
              }px)`,
            },
          },

          [`${componentCls}-handle`]: {
            insetInlineStart: `calc(100% - ${handleSizeSM + trackPadding}px)`,
          },
        },

        [`&:not(${componentCls}-disabled):active`]: {
          [`&:not(${componentCls}-checked) ${switchInnerCls}`]: {
            [`${switchInnerCls}-unchecked`]: {
              marginInlineStart: token.marginXXS / 2,
              marginInlineEnd: -token.marginXXS / 2,
            },
          },

          [`&${componentCls}-checked ${switchInnerCls}`]: {
            [`${switchInnerCls}-checked`]: {
              marginInlineStart: -token.marginXXS / 2,
              marginInlineEnd: token.marginXXS / 2,
            },
          },
        },
      },
    },
  };
};

const genSwitchLoadingStyle: GenerateStyle<SwitchToken, CSSObject> = (token) => {
  const { componentCls, handleSize } = token;

  return {
    [componentCls]: {
      [`${componentCls}-loading-icon${token.iconCls}`]: {
        position: 'relative',
        top: (handleSize - token.fontSize) / 2,
        color: token.switchLoadingIconColor,
        verticalAlign: 'top',
      },

      [`&${componentCls}-checked ${componentCls}-loading-icon`]: {
        color: token.switchColor,
      },
    },
  };
};

const genSwitchHandleStyle: GenerateStyle<SwitchToken, CSSObject> = (token) => {
  const { componentCls, motion, trackPadding, handleBg, handleShadow, handleSize } = token;
  const switchHandleCls = `${componentCls}-handle`;

  return {
    [componentCls]: {
      [switchHandleCls]: {
        position: 'absolute',
        top: trackPadding,
        insetInlineStart: trackPadding,
        width: handleSize,
        height: handleSize,
        transition: `all ${token.switchDuration} ease-in-out`,

        '&::before': {
          position: 'absolute',
          top: 0,
          insetInlineEnd: 0,
          bottom: 0,
          insetInlineStart: 0,
          backgroundColor: handleBg,
          borderRadius: handleSize / 2,
          boxShadow: handleShadow,
          transition: `all ${token.switchDuration} ease-in-out`,
          content: '""',
        },
      },

      [`&${componentCls}-checked ${switchHandleCls}`]: {
        insetInlineStart: `calc(100% - ${handleSize + trackPadding}px)`,
      },

      [`&:not(${componentCls}-disabled):active`]: motion
        ? {
            [`${switchHandleCls}::before`]: {
              insetInlineEnd: token.switchHandleActiveInset,
              insetInlineStart: 0,
            },

            [`&${componentCls}-checked ${switchHandleCls}::before`]: {
              insetInlineEnd: 0,
              insetInlineStart: token.switchHandleActiveInset,
            },
          }
        : /* istanbul ignore next */
          {},
    },
  };
};

const genSwitchInnerStyle: GenerateStyle<SwitchToken, CSSObject> = (token) => {
  const { componentCls, trackHeight, trackPadding, innerMinMargin, innerMaxMargin, handleSize } =
    token;
  const switchInnerCls = `${componentCls}-inner`;

  return {
    [componentCls]: {
      [switchInnerCls]: {
        display: 'block',
        overflow: 'hidden',
        borderRadius: 100,
        height: '100%',
        paddingInlineStart: innerMaxMargin,
        paddingInlineEnd: innerMinMargin,
        transition: `padding-inline-start ${token.switchDuration} ease-in-out, padding-inline-end ${token.switchDuration} ease-in-out`,

        [`${switchInnerCls}-checked, ${switchInnerCls}-unchecked`]: {
          display: 'block',
          color: token.colorTextLightSolid,
          fontSize: token.fontSizeSM,
          transition: `margin-inline-start ${token.switchDuration} ease-in-out, margin-inline-end ${token.switchDuration} ease-in-out`,
          pointerEvents: 'none',
        },

        [`${switchInnerCls}-checked`]: {
          marginInlineStart: `calc(-100% + ${handleSize + trackPadding * 2}px - ${
            innerMaxMargin * 2
          }px)`,
          marginInlineEnd: `calc(100% - ${handleSize + trackPadding * 2}px + ${
            innerMaxMargin * 2
          }px)`,
        },

        [`${switchInnerCls}-unchecked`]: {
          marginTop: -trackHeight,
          marginInlineStart: 0,
          marginInlineEnd: 0,
        },
      },

      [`&${componentCls}-checked ${switchInnerCls}`]: {
        paddingInlineStart: innerMinMargin,
        paddingInlineEnd: innerMaxMargin,
        [`${switchInnerCls}-checked`]: {
          marginInlineStart: 0,
          marginInlineEnd: 0,
        },

        [`${switchInnerCls}-unchecked`]: {
          marginInlineStart: `calc(100% - ${handleSize + trackPadding * 2}px + ${
            innerMaxMargin * 2
          }px)`,
          marginInlineEnd: `calc(-100% + ${handleSize + trackPadding * 2}px - ${
            innerMaxMargin * 2
          }px)`,
        },
      },

      [`&:not(${componentCls}-disabled):active`]: {
        [`&:not(${componentCls}-checked) ${switchInnerCls}`]: {
          [`${switchInnerCls}-unchecked`]: {
            marginInlineStart: trackPadding * 2,
            marginInlineEnd: -trackPadding * 2,
          },
        },

        [`&${componentCls}-checked ${switchInnerCls}`]: {
          [`${switchInnerCls}-checked`]: {
            marginInlineStart: -trackPadding * 2,
            marginInlineEnd: trackPadding * 2,
          },
        },
      },
    },
  };
};

const genSwitchStyle = (token: SwitchToken): CSSObject => {
  const { componentCls, trackHeight, trackMinWidth } = token;

  return {
    [componentCls]: {
      ...resetComponent(token),

      position: 'relative',
      display: 'inline-block',
      boxSizing: 'border-box',
      minWidth: trackMinWidth,
      height: trackHeight,
      lineHeight: `${trackHeight}px`,
      verticalAlign: 'middle',
      background: token.colorTextQuaternary,
      border: '0',
      borderRadius: 100,
      cursor: 'pointer',
      transition: `all ${token.motionDurationMid}`,
      userSelect: 'none',

      [`&:hover:not(${componentCls}-disabled)`]: {
        background: token.colorTextTertiary,
      },

      ...genFocusStyle(token),

      [`&${componentCls}-checked`]: {
        background: token.switchColor,

        [`&:hover:not(${componentCls}-disabled)`]: {
          background: token.colorPrimaryHover,
        },
      },

      [`&${componentCls}-loading, &${componentCls}-disabled`]: {
        cursor: 'not-allowed',
        opacity: token.switchDisabledOpacity,

        '*': {
          boxShadow: 'none',
          cursor: 'not-allowed',
        },
      },

      // rtl style
      [`&${componentCls}-rtl`]: {
        direction: 'rtl',
      },
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook(
  'Switch',
  (token) => {
    const switchToken = mergeToken<SwitchToken>(token, {
      switchDuration: token.motionDurationMid,
      switchColor: token.colorPrimary,
      switchDisabledOpacity: token.opacityLoading,
      switchLoadingIconSize: token.fontSizeIcon * 0.75,
      switchLoadingIconColor: `rgba(0, 0, 0, ${token.opacityLoading})`,
      switchHandleActiveInset: '-30%',
    });

    return [
      genSwitchStyle(switchToken),

      // inner style
      genSwitchInnerStyle(switchToken),

      // handle style
      genSwitchHandleStyle(switchToken),

      // loading style
      genSwitchLoadingStyle(switchToken),

      // small style
      genSwitchSmallStyle(switchToken),
    ];
  },
  (token) => {
    const { fontSize, lineHeight, controlHeight, colorWhite } = token;

    const height = fontSize * lineHeight;
    const heightSM = controlHeight / 2;
    const padding = 2; // Fixed value
    const handleSize = height - padding * 2;
    const handleSizeSM = heightSM - padding * 2;

    return {
      trackHeight: height,
      trackHeightSM: heightSM,
      trackMinWidth: handleSize * 2 + padding * 4,
      trackMinWidthSM: handleSizeSM * 2 + padding * 2,
      trackPadding: padding, // Fixed value
      handleBg: colorWhite,
      handleSize,
      handleSizeSM,
      handleShadow: `0 2px 4px 0 ${new TinyColor('#00230b').setAlpha(0.2).toRgbString()}`,
      innerMinMargin: handleSize / 2,
      innerMaxMargin: handleSize + padding + padding * 2,
      innerMinMarginSM: handleSizeSM / 2,
      innerMaxMarginSM: handleSizeSM + padding + padding * 2,
    };
  },
);
