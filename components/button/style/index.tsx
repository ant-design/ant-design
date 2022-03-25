// deps-lint-skip-all
import { CSSInterpolation, CSSObject } from '@ant-design/cssinjs';
import { TinyColor } from '@ctrl/tinycolor';
import {
  AliasToken,
  UseComponentStyleResult,
  useStyleRegister,
  useToken,
  GenerateStyle,
} from '../../_util/theme';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  colorBgTextHover: string;
  colorBgTextActive: string;
}

interface ButtonToken extends AliasToken, ComponentToken {
  btnCls: string;
  iconPrefixCls: string;
}

// ============================== Shared ==============================
const genSharedButtonStyle: GenerateStyle<ButtonToken, CSSObject> = (token): CSSObject => {
  const { btnCls, iconPrefixCls } = token;

  return {
    [btnCls]: {
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

      [`&${btnCls}-block`]: {
        width: '100%',
      },
    },
  };
};

const genHoverActiveButtonStyle = (hoverStyle: CSSObject, activeStyle: CSSObject): CSSObject => ({
  '&:not(:disabled)': {
    '&:hover, &:focus': hoverStyle,
    '&:active': activeStyle,
  },
});

// ============================== Shape ===============================
const genCircleButtonStyle: GenerateStyle<ButtonToken, CSSObject> = token => ({
  minWidth: token.controlHeight,
  paddingInlineStart: 0,
  paddingInlineEnd: 0,
  borderRadius: '50%',
});

const genRoundButtonStyle: GenerateStyle<ButtonToken, CSSObject> = token => ({
  borderRadius: token.controlHeight,
  paddingInlineStart: token.controlHeight / 2,
  paddingInlineEnd: token.controlHeight / 2,
  width: 'auto',
});

// =============================== Type ===============================
const genGhostButtonStyle = (
  btnCls: string,
  textColor: string | false,
  borderColor: string | false,
  textColorDisabled: string | false,
  borderColorDisabled: string | false,
): CSSObject => ({
  [`&${btnCls}-background-ghost`]: {
    color: textColor || undefined,
    backgroundColor: 'transparent',
    borderColor: borderColor || undefined,
    boxShadow: 'none',

    '&:disabled': {
      cursor: 'not-allowed',
      color: textColorDisabled || undefined,
      borderColor: borderColorDisabled || undefined,
    },
  },
});

const genSolidDisabledButtonStyle: GenerateStyle<ButtonToken, CSSObject> = token => ({
  '&:disabled': {
    cursor: 'not-allowed',
    borderColor: token.colorBorder,
    color: token.colorTextDisabled,
    backgroundColor: token.colorBgComponentDisabled,
    boxShadow: 'none',
  },
});

const genSolidButtonStyle: GenerateStyle<ButtonToken, CSSObject> = token => ({
  borderRadius: token.controlRadius,

  ...genSolidDisabledButtonStyle(token),
});

const genPureDisabledButtonStyle: GenerateStyle<ButtonToken, CSSObject> = token => ({
  '&:disabled': {
    cursor: 'not-allowed',
    color: token.colorTextDisabled,
  },
});

// Type: Default
const genDefaultButtonStyle: GenerateStyle<ButtonToken, CSSObject> = token => ({
  ...genSolidButtonStyle(token),

  backgroundColor: token.colorBgComponent,
  borderColor: token.colorBorder,

  boxShadow: `0 ${token.controlOutlineWidth}px 0 ${token.colorDefaultOutline}`,

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
    token.btnCls,
    token.colorBgComponent,
    token.colorBgComponent,
    token.colorTextDisabled,
    token.colorBorder,
  ),

  [`&${token.btnCls}-dangerous`]: {
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
      token.btnCls,
      token.colorError,
      token.colorError,
      token.colorTextDisabled,
      token.colorBorder,
    ),
    ...genSolidDisabledButtonStyle(token),
  },
});

// Type: Primary
const genPrimaryButtonStyle: GenerateStyle<ButtonToken, CSSObject> = token => ({
  ...genSolidButtonStyle(token),

  color: '#FFF',
  backgroundColor: token.colorPrimary,

  boxShadow: `0 ${token.controlOutlineWidth}px 0 ${token.colorPrimaryOutline}`,

  ...genHoverActiveButtonStyle(
    {
      backgroundColor: token.colorPrimaryHover,
    },
    {
      backgroundColor: token.colorPrimaryActive,
    },
  ),

  ...genGhostButtonStyle(
    token.btnCls,
    token.colorPrimary,
    token.colorPrimary,
    token.colorTextDisabled,
    token.colorBorder,
  ),

  [`&${token.btnCls}-dangerous`]: {
    backgroundColor: token.colorError,
    boxShadow: `0 ${token.controlOutlineWidth}px 0 ${token.colorErrorOutline}`,

    ...genHoverActiveButtonStyle(
      {
        backgroundColor: token.colorErrorHover,
      },
      {
        backgroundColor: token.colorErrorActive,
      },
    ),

    ...genGhostButtonStyle(
      token.btnCls,
      token.colorError,
      token.colorError,
      token.colorTextDisabled,
      token.colorBorder,
    ),
    ...genSolidDisabledButtonStyle(token),
  },
});

// Type: Dashed
const genDashedButtonStyle: GenerateStyle<ButtonToken, CSSObject> = token => ({
  ...genDefaultButtonStyle(token),

  borderStyle: 'dashed',
});

// Type: Link
const genLinkButtonStyle: GenerateStyle<ButtonToken, CSSObject> = token => ({
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

  [`&${token.btnCls}-dangerous`]: {
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
const genTextButtonStyle: GenerateStyle<ButtonToken, CSSObject> = token => ({
  borderRadius: token.controlRadius,

  ...genHoverActiveButtonStyle(
    {
      backgroundColor: token.colorBgTextHover,
    },
    {
      backgroundColor: token.colorBgTextActive,
    },
  ),

  ...genPureDisabledButtonStyle(token),

  [`&${token.btnCls}-dangerous`]: {
    color: token.colorError,

    ...genPureDisabledButtonStyle(token),
  },
});

const genTypeButtonStyle: GenerateStyle<ButtonToken> = token => {
  const { btnCls } = token;

  return {
    [`${btnCls}-default`]: genDefaultButtonStyle(token),
    [`${btnCls}-primary`]: genPrimaryButtonStyle(token),
    [`${btnCls}-dashed`]: genDashedButtonStyle(token),
    [`${btnCls}-link`]: genLinkButtonStyle(token),
    [`${btnCls}-text`]: genTextButtonStyle(token),
  };
};

// =============================== Size ===============================
const genSizeButtonStyle = (token: ButtonToken, sizePrefixCls: string = ''): CSSInterpolation => {
  const { btnCls, iconPrefixCls } = token;

  const paddingVertical = Math.max(
    0,
    (token.controlHeight - token.fontSize * token.lineHeight) / 2 - token.controlLineWidth,
  );
  const paddingHorizontal = token.padding - token.controlLineWidth;

  const iconOnlyCls = `${btnCls}-icon-only`;

  return [
    // Size
    {
      [`${btnCls}${sizePrefixCls}`]: {
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
        [`&${btnCls}-loading`]: {
          opacity: 0.65,
          cursor: 'default',
        },

        [`${btnCls}-loading-icon`]: {
          transition: `width ${token.motionDurationSlow} ${token.motionEaseInOut}, opacity ${token.motionDurationSlow} ${token.motionEaseInOut}`,
        },

        [`&:not(${iconOnlyCls}) ${btnCls}-loading-icon > .${iconPrefixCls}`]: {
          marginInlineEnd: token.marginXS,
        },
      },
    },

    // Shape - patch prefixCls again to override solid border radius style
    {
      [`${btnCls}${btnCls}-circle${sizePrefixCls}`]: genCircleButtonStyle(token),
    },
    {
      [`${btnCls}${btnCls}-round${sizePrefixCls}`]: genRoundButtonStyle(token),
    },
  ];
};

const genSizeBaseButtonStyle: GenerateStyle<ButtonToken> = token => genSizeButtonStyle(token);

const genSizeSmallButtonStyle: GenerateStyle<ButtonToken> = token => {
  const largeToken: ButtonToken = {
    ...token,
    controlHeight: token.controlHeightSM,
    padding: token.paddingXS,
  };

  return genSizeButtonStyle(largeToken, `${token.btnCls}-sm`);
};

const genSizeLargeButtonStyle: GenerateStyle<ButtonToken> = token => {
  const largeToken: ButtonToken = {
    ...token,
    controlHeight: token.controlHeightLG,
    fontSize: token.fontSizeLG,
  };

  return genSizeButtonStyle(largeToken, `${token.btnCls}-lg`);
};

// ============================== Export ==============================
export default function useStyle(
  prefixCls: string,
  iconPrefixCls: string,
): UseComponentStyleResult {
  const [theme, token, hashId] = useToken();

  return [
    useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => {
      const { colorText, button = {} } = token;
      const textColor = new TinyColor(colorText);

      const buttonToken: ButtonToken = {
        ...token,
        colorBgTextHover: textColor
          .clone()
          .setAlpha(textColor.getAlpha() * 0.02)
          .toRgbString(),
        colorBgTextActive: textColor
          .clone()
          .setAlpha(textColor.getAlpha() * 0.03)
          .toRgbString(),

        iconPrefixCls,
        btnCls: `.${prefixCls}`,

        // Override by developer
        ...button,
      };

      return [
        // Shared
        genSharedButtonStyle(buttonToken),

        // Size
        genSizeSmallButtonStyle(buttonToken),
        genSizeBaseButtonStyle(buttonToken),
        genSizeLargeButtonStyle(buttonToken),

        // Group (type, ghost, danger, disabled, loading)
        genTypeButtonStyle(buttonToken),
      ];
    }),
    hashId,
  ];
}
