import type { CSSObject } from '@ant-design/cssinjs';
import { unit } from '@ant-design/cssinjs';
import { FastColor } from '@ant-design/fast-color';

import { genFocusStyle, resetComponent } from '../../style';
import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';

export interface ComponentToken {
  /**
   *  @desc 开关高度
   *  @descEN Height of Switch
   */
  trackHeight: number | string;
  /**
   * @desc 小号开关高度
   * @descEN Height of small Switch
   */
  trackHeightSM: number | string;
  /**
   * @desc 开关最小宽度
   * @descEN Minimum width of Switch
   */
  trackMinWidth: number | string;
  /**
   * @desc 小号开关最小宽度
   * @descEN Minimum width of small Switch
   */
  trackMinWidthSM: number | string;
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
  switchLoadingIconSize: number | string;
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
    calc,
  } = token;
  const switchInnerCls = `${componentCls}-inner`;

  const trackPaddingCalc = unit(calc(handleSizeSM).add(calc(trackPadding).mul(2)).equal());
  const innerMaxMarginCalc = unit(calc(innerMaxMarginSM).mul(2).equal());

  return {
    [componentCls]: {
      [`&${componentCls}-small`]: {
        minWidth: trackMinWidthSM,
        height: trackHeightSM,
        lineHeight: unit(trackHeightSM),

        [`${componentCls}-inner`]: {
          paddingInlineStart: innerMaxMarginSM,
          paddingInlineEnd: innerMinMarginSM,

          [`${switchInnerCls}-checked, ${switchInnerCls}-unchecked`]: {
            minHeight: trackHeightSM,
          },

          [`${switchInnerCls}-checked`]: {
            marginInlineStart: `calc(-100% + ${trackPaddingCalc} - ${innerMaxMarginCalc})`,
            marginInlineEnd: `calc(100% - ${trackPaddingCalc} + ${innerMaxMarginCalc})`,
          },

          [`${switchInnerCls}-unchecked`]: {
            marginTop: calc(trackHeightSM).mul(-1).equal(),
            marginInlineStart: 0,
            marginInlineEnd: 0,
          },
        },

        [`${componentCls}-handle`]: {
          width: handleSizeSM,
          height: handleSizeSM,
        },

        [`${componentCls}-loading-icon`]: {
          top: calc(calc(handleSizeSM).sub(token.switchLoadingIconSize)).div(2).equal(),
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
              marginInlineStart: `calc(100% - ${trackPaddingCalc} + ${innerMaxMarginCalc})`,
              marginInlineEnd: `calc(-100% + ${trackPaddingCalc} - ${innerMaxMarginCalc})`,
            },
          },

          [`${componentCls}-handle`]: {
            insetInlineStart: `calc(100% - ${unit(calc(handleSizeSM).add(trackPadding).equal())})`,
          },
        },

        [`&:not(${componentCls}-disabled):active`]: {
          [`&:not(${componentCls}-checked) ${switchInnerCls}`]: {
            [`${switchInnerCls}-unchecked`]: {
              marginInlineStart: calc(token.marginXXS).div(2).equal(),
              marginInlineEnd: calc(token.marginXXS).mul(-1).div(2).equal(),
            },
          },

          [`&${componentCls}-checked ${switchInnerCls}`]: {
            [`${switchInnerCls}-checked`]: {
              marginInlineStart: calc(token.marginXXS).mul(-1).div(2).equal(),
              marginInlineEnd: calc(token.marginXXS).div(2).equal(),
            },
          },
        },
      },
    },
  };
};

const genSwitchLoadingStyle: GenerateStyle<SwitchToken, CSSObject> = (token) => {
  const { componentCls, handleSize, calc } = token;

  return {
    [componentCls]: {
      [`${componentCls}-loading-icon${token.iconCls}`]: {
        position: 'relative',
        top: calc(calc(handleSize).sub(token.fontSize)).div(2).equal(),
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
  const { componentCls, trackPadding, handleBg, handleShadow, handleSize, calc } = token;
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
          borderRadius: calc(handleSize).div(2).equal(),
          boxShadow: handleShadow,
          transition: `all ${token.switchDuration} ease-in-out`,
          content: '""',
        },
      },

      [`&${componentCls}-checked ${switchHandleCls}`]: {
        insetInlineStart: `calc(100% - ${unit(calc(handleSize).add(trackPadding).equal())})`,
      },

      [`&:not(${componentCls}-disabled):active`]: {
        [`${switchHandleCls}::before`]: {
          insetInlineEnd: token.switchHandleActiveInset,
          insetInlineStart: 0,
        },

        [`&${componentCls}-checked ${switchHandleCls}::before`]: {
          insetInlineEnd: 0,
          insetInlineStart: token.switchHandleActiveInset,
        },
      },
    },
  };
};

const genSwitchInnerStyle: GenerateStyle<SwitchToken, CSSObject> = (token) => {
  const {
    componentCls,
    trackHeight,
    trackPadding,
    innerMinMargin,
    innerMaxMargin,
    handleSize,
    calc,
  } = token;
  const switchInnerCls = `${componentCls}-inner`;

  const trackPaddingCalc = unit(calc(handleSize).add(calc(trackPadding).mul(2)).equal());
  const innerMaxMarginCalc = unit(calc(innerMaxMargin).mul(2).equal());

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
          minHeight: trackHeight,
        },

        [`${switchInnerCls}-checked`]: {
          marginInlineStart: `calc(-100% + ${trackPaddingCalc} - ${innerMaxMarginCalc})`,
          marginInlineEnd: `calc(100% - ${trackPaddingCalc} + ${innerMaxMarginCalc})`,
        },

        [`${switchInnerCls}-unchecked`]: {
          marginTop: calc(trackHeight).mul(-1).equal(),
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
          marginInlineStart: `calc(100% - ${trackPaddingCalc} + ${innerMaxMarginCalc})`,
          marginInlineEnd: `calc(-100% + ${trackPaddingCalc} - ${innerMaxMarginCalc})`,
        },
      },

      [`&:not(${componentCls}-disabled):active`]: {
        [`&:not(${componentCls}-checked) ${switchInnerCls}`]: {
          [`${switchInnerCls}-unchecked`]: {
            marginInlineStart: calc(trackPadding).mul(2).equal(),
            marginInlineEnd: calc(trackPadding).mul(-1).mul(2).equal(),
          },
        },

        [`&${componentCls}-checked ${switchInnerCls}`]: {
          [`${switchInnerCls}-checked`]: {
            marginInlineStart: calc(trackPadding).mul(-1).mul(2).equal(),
            marginInlineEnd: calc(trackPadding).mul(2).equal(),
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
      lineHeight: unit(trackHeight),
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
export const prepareComponentToken: GetDefaultToken<'Switch'> = (token) => {
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
    handleShadow: `0 2px 4px 0 ${new FastColor('#00230b').setA(0.2).toRgbString()}`,
    innerMinMargin: handleSize / 2,
    innerMaxMargin: handleSize + padding + padding * 2,
    innerMinMarginSM: handleSizeSM / 2,
    innerMaxMarginSM: handleSizeSM + padding + padding * 2,
  };
};

export default genStyleHooks(
  'Switch',
  (token) => {
    const switchToken = mergeToken<SwitchToken>(token, {
      switchDuration: token.motionDurationMid,
      switchColor: token.colorPrimary,
      switchDisabledOpacity: token.opacityLoading,
      switchLoadingIconSize: token.calc(token.fontSizeIcon).mul(0.75).equal(),
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
  prepareComponentToken,
);
