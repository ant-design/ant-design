import type { CSSObject } from '@ant-design/cssinjs';
import { TinyColor } from '@ctrl/tinycolor';
import type { FullToken, GenerateStyle } from '../../theme';
import { genComponentStyleHook, mergeToken } from '../../theme';
import { resetComponent } from '../../style';

interface SwitchToken extends FullToken<'Switch'> {
  switchMinWidth: number;
  switchHeight: number;
  switchDuration: string;
  switchColor: string;
  switchDisabledOpacity: number;
  switchInnerMarginMin: number;
  switchInnerMarginMax: number;
  switchPadding: number;
  switchPinSize: number;
  switchBg: string;
  switchMinWidthSM: number;
  switchHeightSM: number;
  switchInnerMarginMinSM: number;
  switchInnerMarginMaxSM: number;
  switchPinSizeSM: number;
  switchHandleShadow: string;
  switchLoadingIconSize: number;
  switchLoadingIconColor: string;
  switchHandleActiveInset: string;
}

const genSwitchSmallStyle: GenerateStyle<SwitchToken, CSSObject> = token => ({
  [`&${token.componentCls}-small`]: {
    minWidth: token.switchMinWidthSM,
    height: token.switchHeightSM,
    lineHeight: `${token.switchHeightSM}px`,

    [`${token.componentCls}-inner`]: {
      marginInlineStart: token.switchInnerMarginMaxSM,
      marginInlineEnd: token.switchInnerMarginMinSM,
      fontSize: token.fontSizeSM,
    },

    [`${token.componentCls}-handle`]: {
      width: token.switchPinSizeSM,
      height: token.switchPinSizeSM,
    },

    [`${token.componentCls}-loading-icon`]: {
      top: (token.switchPinSizeSM - token.switchLoadingIconSize) / 2,
      fontSize: token.switchLoadingIconSize,
    },

    [`&${token.componentCls}-checked`]: {
      [`${token.componentCls}-inner`]: {
        marginInlineStart: token.switchInnerMarginMinSM,
        marginInlineEnd: token.switchInnerMarginMaxSM,
      },

      [`${token.componentCls}-handle`]: {
        insetInlineStart: `calc(100% - ${token.switchPinSizeSM + token.switchPadding}px)`,
      },
    },
  },
});

const genSwitchLoadingStyle: GenerateStyle<SwitchToken, CSSObject> = token => ({
  [`${token.componentCls}-loading-icon${token.iconCls}`]: {
    position: 'relative',
    top: (token.switchPinSize - token.fontSize) / 2,
    color: token.switchLoadingIconColor,
    verticalAlign: 'top',
  },

  [`&${token.componentCls}-checked ${token.componentCls}-loading-icon`]: {
    color: token.switchColor,
  },
});

const genSwitchHandleStyle: GenerateStyle<SwitchToken, CSSObject> = token => {
  const switchHandleCls = `${token.componentCls}-handle`;

  return {
    [switchHandleCls]: {
      position: 'absolute',
      top: token.switchPadding,
      insetInlineStart: token.switchPadding,
      width: token.switchPinSize,
      height: token.switchPinSize,
      transition: `all ${token.switchDuration} ease-in-out`,

      '&::before': {
        position: 'absolute',
        top: 0,
        insetInlineEnd: 0,
        bottom: 0,
        insetInlineStart: 0,
        backgroundColor: token.switchBg,
        borderRadius: token.switchPinSize / 2,
        boxShadow: token.switchHandleShadow,
        transition: `all ${token.switchDuration} ease-in-out`,
        content: '""',
      },
    },

    [`&${token.componentCls}-checked ${switchHandleCls}`]: {
      insetInlineStart: `calc(100% - ${token.switchPinSize + token.switchPadding}px)`,
    },

    [`&:not(${token.componentCls}-disabled):active`]: {
      [`${switchHandleCls}::before`]: {
        insetInlineEnd: token.switchHandleActiveInset,
        insetInlineStart: 0,
      },

      [`&${token.componentCls}-checked ${switchHandleCls}::before`]: {
        insetInlineEnd: 0,
        insetInlineStart: token.switchHandleActiveInset,
      },
    },
  };
};

const genSwitchInnerStyle: GenerateStyle<SwitchToken, CSSObject> = token => {
  const switchInnerCls = `${token.componentCls}-inner`;

  return {
    [switchInnerCls]: {
      display: 'block',
      marginInlineEnd: token.switchInnerMarginMin,
      marginInlineStart: token.switchInnerMarginMax,
      color: token.colorTextLightSolid,
      fontSize: token.fontSizeSM,
      transition: `margin-inline-end ${token.switchDuration}, margin-inline-start ${token.switchDuration}`,
    },

    [`&${token.componentCls}-checked ${switchInnerCls}`]: {
      marginInlineEnd: token.switchInnerMarginMax,
      marginInlineStart: token.switchInnerMarginMin,
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
      minWidth: token.switchMinWidth,
      height: token.switchHeight,
      lineHeight: `${token.switchHeight}px`,
      verticalAlign: 'middle',
      background: token.colorTextQuaternary,
      border: '0',
      borderRadius: 100,
      cursor: 'pointer',
      transition: `all ${token.switchDuration}`,
      userSelect: 'none',

      '&:hover': {
        background: token.colorTextTertiary,
      },

      '&:focus-visible': {
        outline: 0,
        boxShadow: `0 0 0 ${token.controlOutlineWidth}px ${token.controlTmpOutline}`,
      },

      [`&${token.componentCls}-checked:focus-visible`]: {
        boxShadow: `0 0 0 ${token.controlOutlineWidth}px ${token.controlOutline}`,
      },

      '&:focus:hover': {
        boxShadow: 'none',
      },

      [`&${token.componentCls}-checked`]: {
        background: token.switchColor,

        '&:hover': {
          background: token.colorPrimaryHover,
        },
      },

      [`&${token.componentCls}-loading, &${token.componentCls}-disabled`]: {
        cursor: 'not-allowed',
        opacity: token.switchDisabledOpacity,

        '*': {
          boxShadow: 'none',
          cursor: 'not-allowed',
        },
      },

      // inner style
      ...genSwitchInnerStyle(token),

      // handle style
      ...genSwitchHandleStyle(token),

      // loading style
      ...genSwitchLoadingStyle(token),

      // small style
      ...genSwitchSmallStyle(token),

      // rtl style
      [`&${token.componentCls}-rtl`]: {
        direction: 'rtl',
      },
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook('Switch', token => {
  const switchHeight = token.fontSize * token.lineHeight;
  const switchHeightSM = token.controlHeight / 2;
  const switchPadding = token.paddingXXS / 2;
  const switchPinSize = switchHeight - switchPadding * 2;
  const switchPinSizeSM = switchHeightSM - switchPadding * 2;

  const switchToken = mergeToken<SwitchToken>(token, {
    switchMinWidth: switchPinSize * 2 + switchPadding * 4,
    switchHeight,
    switchDuration: token.motionDurationMid,
    switchColor: token.colorPrimary,
    switchDisabledOpacity: token.opacityLoading,
    switchInnerMarginMin: switchPinSize / 2,
    switchInnerMarginMax: switchPinSize + switchPadding + token.paddingXXS,
    switchPadding,
    switchPinSize,
    switchBg: token.colorBgContainer,
    switchMinWidthSM: switchPinSizeSM * 2 + switchPadding * 2,
    switchHeightSM,
    switchInnerMarginMinSM: switchPinSizeSM / 2,
    switchInnerMarginMaxSM: switchPinSizeSM + switchPadding + token.paddingXXS,
    switchPinSizeSM,
    switchHandleShadow: `0 2px 4px 0 ${new TinyColor('#00230b').setAlpha(0.2).toRgbString()}`,
    switchLoadingIconSize: token.fontSizeIcon * 0.75,
    switchLoadingIconColor: `rgba(0, 0, 0, ${token.opacityLoading})`,
    switchHandleActiveInset: '-30%',
  });

  return [genSwitchStyle(switchToken)];
});
