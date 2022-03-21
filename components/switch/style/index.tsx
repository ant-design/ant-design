// deps-lint-skip-all
import { TinyColor } from '@ctrl/tinycolor';
import { CSSObject } from '@ant-design/cssinjs';
import {
  DerivativeToken,
  resetComponent,
  UseComponentStyleResult,
  useStyleRegister,
  useToken,
  GenerateStyle,
} from '../../_util/theme';

interface SwitchToken extends DerivativeToken {
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
  switchShadowColor: string;
  switchMinWidthSM: number;
  switchHeightSM: number;
  switchInnerMarginMinSM: number;
  switchInnerMarginMaxSM: number;
  switchPinSizeSM: number;
  switchCls: string;
  iconPrefixCls: string;
}

const genSwitchSmallStyle: GenerateStyle<SwitchToken, CSSObject> = token => ({
  [`&${token.switchCls}-small`]: {
    minWidth: token.switchMinWidthSM,
    height: token.switchHeightSM,
    lineHeight: `${token.switchHeightSM}px`,

    [`${token.switchCls}-inner`]: {
      marginInlineStart: token.switchInnerMarginMaxSM,
      marginInlineEnd: token.switchInnerMarginMinSM,
      fontSize: token.fontSizeSM,
    },

    [`${token.switchCls}-handle`]: {
      width: token.switchPinSizeSM,
      height: token.switchPinSizeSM,
    },

    [`${token.switchCls}-loading-icon`]: {
      top: (token.switchPinSizeSM - 9) / 2,
      // FIXME
      fontSize: 9,
    },

    [`&${token.switchCls}-checked`]: {
      [`${token.switchCls}-inner`]: {
        marginInlineStart: token.switchInnerMarginMinSM,
        marginInlineEnd: token.switchInnerMarginMaxSM,
      },

      [`${token.switchCls}-handle`]: {
        insetInlineStart: `calc(100% - ${token.switchPinSizeSM + token.switchPadding}px)`,
      },
    },
  },
});

const genSwitchLoadingStyle: GenerateStyle<SwitchToken, CSSObject> = token => ({
  [`${token.switchCls}-loading-icon${token.iconPrefixCls}`]: {
    position: 'relative',
    top: (token.switchPinSize - token.fontSize) / 2,
    color: 'rgba(0, 0, 0, 0.65)',
    verticalAlign: 'top',
  },

  [`&${token.switchCls}-checked ${token.switchCls}-loading-icon`]: {
    color: token.switchColor,
  },
});

const genSwitchHandleStyle: GenerateStyle<SwitchToken, CSSObject> = token => {
  const switchHandleCls = `${token.switchCls}-handle`;

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
        // FIXME
        boxShadow: `0 2px 4px 0 ${token.switchShadowColor}`,
        transition: `all ${token.switchDuration} ease-in-out`,
        content: '""',
      },
    },

    [`&${token.switchCls}-checked ${switchHandleCls}`]: {
      insetInlineStart: `calc(100% - ${token.switchPinSize + token.switchPadding}px)`,
    },

    [`&:not(${token.switchCls}-disabled):active`]: {
      [`${switchHandleCls}::before`]: {
        // FIXME
        insetInlineEnd: '-30%',
        insetInlineStart: 0,
      },

      [`&${token.switchCls}-checked ${switchHandleCls}::before`]: {
        insetInlineEnd: 0,
        // FIXME
        insetInlineStart: '-30%',
      },
    },
  };
};

const genSwitchInnerStyle: GenerateStyle<SwitchToken, CSSObject> = token => {
  const switchInnerCls = `${token.switchCls}-inner`;

  return {
    [switchInnerCls]: {
      display: 'block',
      marginInlineEnd: token.switchInnerMarginMin,
      marginInlineStart: token.switchInnerMarginMax,
      color: token.textColorInverse,
      fontSize: token.fontSizeSM,
      transition: `margin-inline-end ${token.switchDuration}, margin-inline-start ${token.switchDuration}`,
    },

    [`&${token.switchCls}-checked ${switchInnerCls}`]: {
      marginInlineEnd: token.switchInnerMarginMax,
      marginInlineStart: token.switchInnerMarginMin,
    },
  };
};

const genSwitchStyle = (token: SwitchToken): CSSObject => {
  const { switchCls } = token;

  return {
    [switchCls]: {
      ...resetComponent(token),

      position: 'relative',
      display: 'inline-block',
      boxSizing: 'border-box',
      minWidth: token.switchMinWidth,
      height: token.switchHeight,
      lineHeight: `${token.switchHeight}px`,
      verticalAlign: 'middle',
      backgroundColor: token.textColorDisabled,
      border: '0',
      // FIXME
      borderRadius: 100,
      cursor: 'pointer',
      transition: `all ${token.switchDuration}`,
      userSelect: 'none',

      '&:focus': {
        outline: 0,
        // FIXME
        boxShadow: `0 0 0 2px ${new TinyColor(token.textColorDisabled)
          .setAlpha(0.1)
          .toRgbString()}`,
      },

      [`&${token.switchCls}-checked:focus`]: {
        // FIXME
        boxShadow: `0 0 0 2px ${token.tmpPrimaryHoverColorWeak}`,
      },

      '&:focus:hover': {
        boxShadow: 'none',
      },

      [`&${token.switchCls}-checked`]: {
        backgroundColor: token.switchColor,
      },

      [`&${token.switchCls}-loading, &${token.switchCls}-disabled`]: {
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
      [`&${token.switchCls}-rtl`]: {
        direction: 'rtl',
      },
    },
  };
};

// ============================== Export ==============================
export default function useStyle(
  prefixCls: string,
  iconPrefixCls: string,
): UseComponentStyleResult {
  const [theme, token, hashId] = useToken();
  const switchHeight = 22;
  const switchHeightSM = 16;

  const switchToken: SwitchToken = {
    ...token,
    // FIXME: missing token
    switchMinWidth: 44,
    switchHeight,
    switchDuration: '0.2s',
    switchColor: token.colorPrimary,
    switchDisabledOpacity: 0.4,
    switchInnerMarginMin: Math.ceil(switchHeight * 0.3),
    switchInnerMarginMax: Math.ceil(switchHeight * 1.1),
    switchPadding: 2,
    switchPinSize: switchHeight - 4,
    switchBg: token.componentBackground,
    switchShadowColor: new TinyColor('#00230b').setAlpha(0.2).toRgbString(),
    switchMinWidthSM: 28,
    switchHeightSM,
    switchInnerMarginMinSM: Math.ceil(switchHeight * 0.3),
    switchInnerMarginMaxSM: Math.ceil(switchHeight * 1.1),
    switchPinSizeSM: switchHeightSM - 4,
    switchCls: `.${prefixCls}`,
    iconPrefixCls: `.${iconPrefixCls}`,
  };

  return [
    useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => [
      genSwitchStyle(switchToken),
    ]),
    hashId,
  ];
}
