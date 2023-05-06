import type { CSSObject } from '@ant-design/cssinjs';
import { TinyColor } from '@ctrl/tinycolor';
import type { GlobalToken } from 'antd';
import { genFocusStyle, resetComponent } from '../../style';
import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';

export interface ComponentToken {
  height: number;
  heightSM: number;
  minWidth: number;
  minWidthSM: number;
  disabledOpacity: number;
  color: string;
  padding: number;
  innerMarginMin: number;
  innerMarginMax: number;
  innerMarginMinSM: number;
  innerMarginMaxSM: number;
}

interface SwitchToken extends FullToken<'Switch'> {
  switchDuration: string;
  switchPinSize: number;
  switchPinSizeSM: number;
  switchHandleShadow: string;
  switchLoadingIconSize: number;
  switchLoadingIconColor: string;
  switchHandleActiveInset: string;
}

type NeedCalculateToken = 'height' | 'heightSM' | 'switchPinSize' | 'switchPinSizeSM';
type TokenStoreType = Pick<SwitchToken & ComponentToken, NeedCalculateToken>;

// Fixed value
const padding = 2;

// Store calculation results
let tokenStore: TokenStoreType;

const calculateToken = (token: FullToken<'Switch'> | GlobalToken) => {
  if (!tokenStore && token) {
    const height = token.fontSize * token.lineHeight;
    const heightSM = token.controlHeight / 2;

    tokenStore = {
      height,
      heightSM,
      switchPinSize: height - padding * 2,
      switchPinSizeSM: heightSM - padding * 2,
    };
  }

  return tokenStore;
};

const genSwitchSmallStyle: GenerateStyle<SwitchToken, CSSObject> = (token) => {
  const { componentCls } = token;
  const switchInnerCls = `${componentCls}-inner`;

  return {
    [componentCls]: {
      [`&${componentCls}-small`]: {
        minWidth: token.minWidthSM,
        height: token.heightSM,
        lineHeight: `${token.heightSM}px`,

        [`${componentCls}-inner`]: {
          paddingInlineStart: token.innerMarginMaxSM,
          paddingInlineEnd: token.innerMarginMinSM,
          [`${switchInnerCls}-checked`]: {
            marginInlineStart: `calc(-100% + ${token.switchPinSizeSM + token.padding * 2}px - ${
              token.innerMarginMaxSM * 2
            }px)`,
            marginInlineEnd: `calc(100% - ${token.switchPinSizeSM + token.padding * 2}px + ${
              token.innerMarginMaxSM * 2
            }px)`,
          },

          [`${switchInnerCls}-unchecked`]: {
            marginTop: -token.heightSM,
            marginInlineStart: 0,
            marginInlineEnd: 0,
          },
        },

        [`${componentCls}-handle`]: {
          width: token.switchPinSizeSM,
          height: token.switchPinSizeSM,
        },

        [`${componentCls}-loading-icon`]: {
          top: (token.switchPinSizeSM - token.switchLoadingIconSize) / 2,
          fontSize: token.switchLoadingIconSize,
        },

        [`&${componentCls}-checked`]: {
          [`${componentCls}-inner`]: {
            paddingInlineStart: token.innerMarginMinSM,
            paddingInlineEnd: token.innerMarginMaxSM,
            [`${switchInnerCls}-checked`]: {
              marginInlineStart: 0,
              marginInlineEnd: 0,
            },

            [`${switchInnerCls}-unchecked`]: {
              marginInlineStart: `calc(100% - ${token.switchPinSizeSM + token.padding * 2}px + ${
                token.innerMarginMaxSM * 2
              }px)`,
              marginInlineEnd: `calc(-100% + ${token.switchPinSizeSM + token.padding * 2}px - ${
                token.innerMarginMaxSM * 2
              }px)`,
            },
          },

          [`${componentCls}-handle`]: {
            insetInlineStart: `calc(100% - ${token.switchPinSizeSM + token.padding}px)`,
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
  const { componentCls } = token;

  return {
    [componentCls]: {
      [`${componentCls}-loading-icon${token.iconCls}`]: {
        position: 'relative',
        top: (token.switchPinSize - token.fontSize) / 2,
        color: token.switchLoadingIconColor,
        verticalAlign: 'top',
      },

      [`&${componentCls}-checked ${componentCls}-loading-icon`]: {
        color: token.color,
      },
    },
  };
};

const genSwitchHandleStyle: GenerateStyle<SwitchToken, CSSObject> = (token) => {
  const { componentCls, motion } = token;
  const switchHandleCls = `${componentCls}-handle`;

  return {
    [componentCls]: {
      [switchHandleCls]: {
        position: 'absolute',
        top: token.padding,
        insetInlineStart: token.padding,
        width: token.switchPinSize,
        height: token.switchPinSize,
        transition: `all ${token.switchDuration} ease-in-out`,

        '&::before': {
          position: 'absolute',
          top: 0,
          insetInlineEnd: 0,
          bottom: 0,
          insetInlineStart: 0,
          backgroundColor: token.colorWhite,
          borderRadius: token.switchPinSize / 2,
          boxShadow: token.switchHandleShadow,
          transition: `all ${token.switchDuration} ease-in-out`,
          content: '""',
        },
      },

      [`&${componentCls}-checked ${switchHandleCls}`]: {
        insetInlineStart: `calc(100% - ${token.switchPinSize + token.padding}px)`,
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
  const { componentCls } = token;
  const switchInnerCls = `${componentCls}-inner`;

  return {
    [componentCls]: {
      [switchInnerCls]: {
        display: 'block',
        overflow: 'hidden',
        borderRadius: 100,
        height: '100%',
        paddingInlineStart: token.innerMarginMax,
        paddingInlineEnd: token.innerMarginMin,
        transition: `padding-inline-start ${token.switchDuration} ease-in-out, padding-inline-end ${token.switchDuration} ease-in-out`,

        [`${switchInnerCls}-checked, ${switchInnerCls}-unchecked`]: {
          display: 'block',
          color: token.colorTextLightSolid,
          fontSize: token.fontSizeSM,
          transition: `margin-inline-start ${token.switchDuration} ease-in-out, margin-inline-end ${token.switchDuration} ease-in-out`,
          pointerEvents: 'none',
        },

        [`${switchInnerCls}-checked`]: {
          marginInlineStart: `calc(-100% + ${token.switchPinSize + token.padding * 2}px - ${
            token.innerMarginMax * 2
          }px)`,
          marginInlineEnd: `calc(100% - ${token.switchPinSize + token.padding * 2}px + ${
            token.innerMarginMax * 2
          }px)`,
        },

        [`${switchInnerCls}-unchecked`]: {
          marginTop: -token.height,
          marginInlineStart: 0,
          marginInlineEnd: 0,
        },
      },

      [`&${componentCls}-checked ${switchInnerCls}`]: {
        paddingInlineStart: token.innerMarginMin,
        paddingInlineEnd: token.innerMarginMax,
        [`${switchInnerCls}-checked`]: {
          marginInlineStart: 0,
          marginInlineEnd: 0,
        },

        [`${switchInnerCls}-unchecked`]: {
          marginInlineStart: `calc(100% - ${token.switchPinSize + token.padding * 2}px + ${
            token.innerMarginMax * 2
          }px)`,
          marginInlineEnd: `calc(-100% + ${token.switchPinSize + token.padding * 2}px - ${
            token.innerMarginMax * 2
          }px)`,
        },
      },

      [`&:not(${componentCls}-disabled):active`]: {
        [`&:not(${componentCls}-checked) ${switchInnerCls}`]: {
          [`${switchInnerCls}-unchecked`]: {
            marginInlineStart: token.padding * 2,
            marginInlineEnd: -token.padding * 2,
          },
        },

        [`&${componentCls}-checked ${switchInnerCls}`]: {
          [`${switchInnerCls}-checked`]: {
            marginInlineStart: -token.padding * 2,
            marginInlineEnd: token.padding * 2,
          },
        },
      },
    },
  };
};

const genSwitchStyle = (token: SwitchToken): CSSObject => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      ...resetComponent(token),

      position: 'relative',
      display: 'inline-block',
      boxSizing: 'border-box',
      minWidth: token.minWidth,
      height: token.height,
      lineHeight: `${token.height}px`,
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
        background: token.color,

        [`&:hover:not(${componentCls}-disabled)`]: {
          background: token.colorPrimaryHover,
        },
      },

      [`&${componentCls}-loading, &${componentCls}-disabled`]: {
        cursor: 'not-allowed',
        opacity: token.disabledOpacity,

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
    const { switchPinSize, switchPinSizeSM } = calculateToken(token);

    const switchToken = mergeToken<SwitchToken>(token, {
      switchDuration: token.motionDurationMid,
      switchPinSize,
      switchPinSizeSM,
      switchHandleShadow: `0 2px 4px 0 ${new TinyColor('#00230b').setAlpha(0.2).toRgbString()}`,
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
    const { height, heightSM, switchPinSize, switchPinSizeSM } = calculateToken(token);
    const { opacityLoading, colorPrimary } = token;

    return {
      height,
      heightSM,
      minWidth: switchPinSize * 2 + padding * 4,
      minWidthSM: switchPinSizeSM * 2 + padding * 2,
      disabledOpacity: opacityLoading,
      color: colorPrimary,
      padding,
      innerMarginMin: switchPinSize / 2,
      innerMarginMax: switchPinSize + padding + padding * 2,
      innerMarginMinSM: switchPinSizeSM / 2,
      innerMarginMaxSM: switchPinSizeSM + padding + padding * 2,
    };
  },
);
