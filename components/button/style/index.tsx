// deps-lint-skip-all
import { CSSInterpolation, CSSObject } from '@ant-design/cssinjs';
import { TinyColor } from '@ctrl/tinycolor';
import {
  DerivativeToken,
  UseComponentStyleResult,
  useStyleRegister,
  useToken,
  withPrefix,
} from '../../_util/theme';

// ============================== Shared ==============================
const genSharedButtonStyle = (
  prefixCls: string,
  iconPrefixCls: string,
  token: DerivativeToken,
): CSSObject => ({
  outline: 'none',
  position: 'relative',
  display: 'inline-block',
  fontWeight: 400,
  whiteSpace: 'nowrap',
  textAlign: 'center',
  backgroundImage: 'none',
  backgroundColor: 'transparent',
  border: `${token.controlLineWidth}px ${token.controlLineType} transparent`,
  cursor: 'pointer',
  transition: `all ${token.motionDurationSlow} ${token.motionEaseInOut}`,
  userSelect: 'none',
  touchAction: 'manipulation',
  lineHeight: token.lineHeight,
  color: token.colorText,

  '> span': {
    display: 'inline-block',
  },

  // Leave a space between icon and text.
  [`> .${iconPrefixCls} + span, > span + .${iconPrefixCls}`]: {
    marginInlineStart: token.marginXS,
  },

  [`&.${prefixCls}-block`]: {
    width: '100%',
  },
});

const genHoverActiveButtonStyle = (hoverStyle: CSSObject, activeStyle: CSSObject): CSSObject => ({
  '&:not(:disabled)': {
    '&:hover, &:focus': hoverStyle,
    '&:active': activeStyle,
  },
});

// ============================== Shape ===============================
const genCircleButtonStyle = (token: DerivativeToken): CSSObject => ({
  minWidth: token.controlHeight,
  paddingInlineStart: 0,
  paddingInlineEnd: 0,
  borderRadius: '50%',
});

const genRoundButtonStyle = (token: DerivativeToken): CSSObject => ({
  borderRadius: token.controlHeight,
  paddingInlineStart: token.controlHeight / 2,
  paddingInlineEnd: token.controlHeight / 2,
  width: 'auto',
});

// =============================== Type ===============================
const genGhostButtonStyle = (
  prefixCls: string,
  textColor: string | false,
  borderColor: string | false,
  textColorDisabled: string | false,
  borderColorDisabled: string | false,
): CSSObject => ({
  [`&.${prefixCls}-background-ghost`]: {
    color: textColor || undefined,
    backgroundColor: 'transparent',
    borderColor: borderColor || undefined,

    '&:disabled': {
      cursor: 'not-allowed',
      color: textColorDisabled || undefined,
      borderColor: borderColorDisabled || undefined,
    },
  },
});

const genSolidDisabledButtonStyle = (token: DerivativeToken): CSSObject => ({
  '&:disabled': {
    cursor: 'not-allowed',
    borderColor: token.colorBorder,
    color: token.colorTextDisabled,
    backgroundColor: token.colorBgComponentDisabled,
    boxShadow: 'none',
  },
});

const genSolidButtonStyle = (token: DerivativeToken): CSSObject => ({
  borderRadius: token.controlRadius,

  ...genSolidDisabledButtonStyle(token),
});

const genPureDisabledButtonStyle = (token: DerivativeToken): CSSObject => ({
  '&:disabled': {
    cursor: 'not-allowed',
    color: token.colorTextDisabled,
  },
});

// Type: Default
const genDefaultButtonStyle = (prefixCls: string, token: DerivativeToken): CSSObject => ({
  ...genSolidButtonStyle(token),

  backgroundColor: token.colorBgComponent,
  borderColor: token.colorBorder,

  boxShadow: '0 2px 0 rgba(0, 0, 0, 0.015)',

  ...genHoverActiveButtonStyle(
    {
      color: token.colorPrimaryHover,
      borderColor: token.colorPrimaryHover,
    },
    {
      color: token.colorPrimaryActive,
      borderColor: token.colorPrimaryActive,
    },
  ),

  ...genGhostButtonStyle(
    prefixCls,
    token.colorBgComponent,
    token.colorBgComponent,
    token.colorTextDisabled,
    token.colorBorder,
  ),

  [`&.${prefixCls}-dangerous`]: {
    color: token.colorError,
    borderColor: token.colorError,

    ...genHoverActiveButtonStyle(
      {
        color: token.colorErrorHover,
        borderColor: token.colorErrorHover,
      },
      {
        color: token.colorErrorActive,
        borderColor: token.colorErrorActive,
      },
    ),

    ...genGhostButtonStyle(
      prefixCls,
      token.colorError,
      token.colorError,
      token.colorTextDisabled,
      token.colorBorder,
    ),
    ...genSolidDisabledButtonStyle(token),
  },
});

// Type: Primary
const genPrimaryButtonStyle = (prefixCls: string, token: DerivativeToken): CSSObject => ({
  ...genSolidButtonStyle(token),

  color: '#FFF',
  backgroundColor: token.colorPrimary,

  boxShadow: '0 2px 0 rgba(0, 0, 0, 0.045)',

  ...genHoverActiveButtonStyle(
    {
      backgroundColor: token.colorPrimaryHover,
    },
    {
      backgroundColor: token.colorPrimaryActive,
    },
  ),

  ...genGhostButtonStyle(
    prefixCls,
    token.colorPrimary,
    token.colorPrimary,
    token.colorTextDisabled,
    token.colorBorder,
  ),

  [`&.${prefixCls}-dangerous`]: {
    backgroundColor: token.colorError,

    ...genHoverActiveButtonStyle(
      {
        backgroundColor: token.colorErrorHover,
      },
      {
        backgroundColor: token.colorErrorActive,
      },
    ),

    ...genGhostButtonStyle(
      prefixCls,
      token.colorError,
      token.colorError,
      token.colorTextDisabled,
      token.colorBorder,
    ),
    ...genSolidDisabledButtonStyle(token),
  },
});

// Type: Dashed
const genDashedButtonStyle = (prefixCls: string, token: DerivativeToken): CSSObject => ({
  ...genDefaultButtonStyle(prefixCls, token),

  borderStyle: 'dashed',
});

// Type: Link
const genLinkButtonStyle = (prefixCls: string, token: DerivativeToken): CSSObject => ({
  color: token.colorLink,

  ...genHoverActiveButtonStyle(
    {
      color: token.colorLinkHover,
    },
    {
      color: token.colorLinkActive,
    },
  ),

  ...genPureDisabledButtonStyle(token),

  [`&.${prefixCls}-dangerous`]: {
    color: token.colorError,

    ...genHoverActiveButtonStyle(
      {
        color: token.colorErrorHover,
      },
      {
        color: token.colorErrorActive,
      },
    ),

    ...genPureDisabledButtonStyle(token),
  },
});

// Type: Text
const genTextButtonStyle = (prefixCls: string, token: DerivativeToken): CSSObject => {
  const backgroundColor = new TinyColor({ r: 0, g: 0, b: 0, a: 0.018 });

  return {
    ...genHoverActiveButtonStyle(
      {
        backgroundColor: backgroundColor.toRgbString(),
      },
      {
        backgroundColor: backgroundColor
          .clone()
          .setAlpha(backgroundColor.getAlpha() * 1.5)
          .toRgbString(),
      },
    ),

    ...genPureDisabledButtonStyle(token),

    [`&.${prefixCls}-dangerous`]: {
      color: token.colorError,

      ...genPureDisabledButtonStyle(token),
    },
  };
};

const genTypeButtonStyle = (prefixCls: string, token: DerivativeToken): CSSInterpolation => [
  withPrefix(genDefaultButtonStyle(prefixCls, token), `${prefixCls}-default`, []),
  withPrefix(genPrimaryButtonStyle(prefixCls, token), `${prefixCls}-primary`, []),
  withPrefix(genDashedButtonStyle(prefixCls, token), `${prefixCls}-dashed`, []),
  withPrefix(genLinkButtonStyle(prefixCls, token), `${prefixCls}-link`, []),
  withPrefix(genTextButtonStyle(prefixCls, token), `${prefixCls}-text`, []),
];

// =============================== Size ===============================
const genSizeButtonStyle = (
  prefixCls: string,
  iconPrefixCls: string,
  sizePrefixCls: string,
  token: DerivativeToken,
): CSSInterpolation => {
  const paddingVertical = Math.max(
    0,
    (token.controlHeight - token.fontSize * token.lineHeight) / 2 - token.controlLineWidth,
  );
  const paddingHorizontal = token.padding - token.controlLineWidth;

  const iconOnlyCls = `.${prefixCls}-icon-only`;

  return [
    // Size
    withPrefix(
      {
        fontSize: token.fontSize,
        height: token.controlHeight,
        padding: `${paddingVertical}px ${paddingHorizontal}px`,

        [`&${iconOnlyCls}`]: {
          width: token.controlHeight,
          paddingInlineStart: 0,
          paddingInlineEnd: 0,

          '> span': {
            transform: 'scale(1.143)', // 14px -> 16px
          },
        },

        // Loading
        [`&.${prefixCls}-loading`]: {
          opacity: 0.65,
          cursor: 'default',
        },

        [`.${prefixCls}-loading-icon`]: {
          transition: `width ${token.motionDurationSlow} ${token.motionEaseInOut}, opacity ${token.motionDurationSlow} ${token.motionEaseInOut}`,
        },

        [`&:not(${iconOnlyCls}) .${prefixCls}-loading-icon > .${iconPrefixCls}`]: {
          marginInlineEnd: token.marginXS,
        },
      },
      prefixCls,
      [sizePrefixCls],
    ),

    // Shape - patch prefixCls again to override solid border radius style
    withPrefix(genCircleButtonStyle(token), `${prefixCls}-circle`, [prefixCls, sizePrefixCls]),
    withPrefix(genRoundButtonStyle(token), `${prefixCls}-round`, [prefixCls, sizePrefixCls]),
  ];
};

const genSizeBaseButtonStyle = (
  prefixCls: string,
  iconPrefixCls: string,
  token: DerivativeToken,
): CSSInterpolation => genSizeButtonStyle(prefixCls, iconPrefixCls, '', token);

const genSizeSmallButtonStyle = (
  prefixCls: string,
  iconPrefixCls: string,
  token: DerivativeToken,
): CSSInterpolation => {
  const largeToken: DerivativeToken = {
    ...token,
    controlHeight: token.controlHeightSM,
    padding: token.paddingXS,
  };

  return genSizeButtonStyle(prefixCls, iconPrefixCls, `${prefixCls}-sm`, largeToken);
};

const genSizeLargeButtonStyle = (
  prefixCls: string,
  iconPrefixCls: string,
  token: DerivativeToken,
): CSSInterpolation => {
  const largeToken: DerivativeToken = {
    ...token,
    controlHeight: token.controlHeightLG,
    fontSize: token.fontSizeLG,
  };

  return genSizeButtonStyle(prefixCls, iconPrefixCls, `${prefixCls}-lg`, largeToken);
};

// ============================== Export ==============================
export default function useStyle(
  prefixCls: string,
  iconPrefixCls: string,
): UseComponentStyleResult {
  const [theme, token, hashId] = useToken();

  return [
    useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => [
      // Shared
      withPrefix(genSharedButtonStyle(prefixCls, iconPrefixCls, token), prefixCls),

      // Size
      genSizeSmallButtonStyle(prefixCls, iconPrefixCls, token),
      genSizeBaseButtonStyle(prefixCls, iconPrefixCls, token),
      genSizeLargeButtonStyle(prefixCls, iconPrefixCls, token),

      // Group (type, ghost, danger, disabled, loading)
      genTypeButtonStyle(prefixCls, token),
    ]),
    hashId,
  ];
}
