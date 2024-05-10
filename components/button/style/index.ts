import type { CSSInterpolation, CSSObject } from '@ant-design/cssinjs';
import { unit } from '@ant-design/cssinjs';

import { genFocusStyle } from '../../style';
import type { GenerateStyle } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';
import genGroupStyle from './group';
import type { ButtonToken, ComponentToken } from './token';
import { prepareComponentToken, prepareToken } from './token';

export type { ComponentToken };

// ============================== Shared ==============================
const genSharedButtonStyle: GenerateStyle<ButtonToken, CSSObject> = (token): CSSObject => {
  const { componentCls, iconCls, fontWeight } = token;
  return {
    [componentCls]: {
      outline: 'none',
      position: 'relative',
      display: 'inline-block',
      fontWeight,
      whiteSpace: 'nowrap',
      textAlign: 'center',
      backgroundImage: 'none',
      background: 'transparent',
      border: `${unit(token.lineWidth)} ${token.lineType} transparent`,
      cursor: 'pointer',
      transition: `all ${token.motionDurationMid} ${token.motionEaseInOut}`,
      userSelect: 'none',
      touchAction: 'manipulation',
      color: token.colorText,

      '&:disabled > *': {
        pointerEvents: 'none',
      },

      '> span': {
        display: 'inline-block',
      },

      [`${componentCls}-icon`]: {
        lineHeight: 0,
        // iconPosition in end
        [`&-end`]: {
          marginInlineStart: token.marginXS,
        },
      },

      // Leave a space between icon and text.
      [`> ${iconCls} + span, > span + ${iconCls}`]: {
        marginInlineStart: token.marginXS,
      },

      [`&:not(${componentCls}-icon-only) > ${componentCls}-icon`]: {
        [`&${componentCls}-loading-icon, &:not(:last-child)`]: {
          marginInlineEnd: token.marginXS,
        },
        [`&${componentCls}-loading-icon-end`]: {
          marginInlineStart: token.marginXS,
        },
      },

      '> a': {
        color: 'currentColor',
      },

      '&:not(:disabled)': {
        ...genFocusStyle(token),
      },

      [`&${componentCls}-two-chinese-chars::first-letter`]: {
        letterSpacing: '0.34em',
      },

      [`&${componentCls}-two-chinese-chars > *:not(${iconCls})`]: {
        marginInlineEnd: '-0.34em',
        letterSpacing: '0.34em',
      },

      // make `btn-icon-only` not too narrow
      [`&-icon-only${componentCls}-compact-item`]: {
        flex: 'none',
      },
    },
  };
};

const genHoverActiveButtonStyle = (
  btnCls: string,
  hoverStyle: CSSObject,
  activeStyle: CSSObject,
): CSSObject => ({
  [`&:not(:disabled):not(${btnCls}-disabled)`]: {
    '&:hover': hoverStyle,
    '&:active': activeStyle,
  },
});

// ============================== Shape ===============================
const genCircleButtonStyle: GenerateStyle<ButtonToken, CSSObject> = (token) => ({
  minWidth: token.controlHeight,
  paddingInlineStart: 0,
  paddingInlineEnd: 0,
  borderRadius: '50%',
});

const genRoundButtonStyle: GenerateStyle<ButtonToken, CSSObject> = (token) => ({
  borderRadius: token.controlHeight,
  paddingInlineStart: token.calc(token.controlHeight).div(2).equal(),
  paddingInlineEnd: token.calc(token.controlHeight).div(2).equal(),
});

// =============================== Type ===============================
const genDisabledStyle: GenerateStyle<ButtonToken, CSSObject> = (token) => ({
  cursor: 'not-allowed',
  borderColor: token.borderColorDisabled,
  color: token.colorTextDisabled,
  background: token.colorBgContainerDisabled,
  boxShadow: 'none',
});

const genGhostButtonStyle = (
  btnCls: string,
  background: string,
  textColor: string | false,
  borderColor: string | false,
  textColorDisabled: string | false,
  borderColorDisabled: string | false,
  hoverStyle?: CSSObject,
  activeStyle?: CSSObject,
): CSSObject => ({
  [`&${btnCls}-background-ghost`]: {
    color: textColor || undefined,
    background,
    borderColor: borderColor || undefined,
    boxShadow: 'none',

    ...genHoverActiveButtonStyle(
      btnCls,
      {
        background,
        ...hoverStyle,
      },
      {
        background,
        ...activeStyle,
      },
    ),

    '&:disabled': {
      cursor: 'not-allowed',
      color: textColorDisabled || undefined,
      borderColor: borderColorDisabled || undefined,
    },
  },
});

const genSolidDisabledButtonStyle: GenerateStyle<ButtonToken, CSSObject> = (token) => ({
  [`&:disabled, &${token.componentCls}-disabled`]: {
    ...genDisabledStyle(token),
  },
});

const genSolidButtonStyle: GenerateStyle<ButtonToken, CSSObject> = (token) => ({
  ...genSolidDisabledButtonStyle(token),
});

const genPureDisabledButtonStyle: GenerateStyle<ButtonToken, CSSObject> = (token) => ({
  [`&:disabled, &${token.componentCls}-disabled`]: {
    cursor: 'not-allowed',
    color: token.colorTextDisabled,
  },
});

// Type: Default
const genDefaultButtonStyle: GenerateStyle<ButtonToken, CSSObject> = (token) => ({
  ...genSolidButtonStyle(token),

  background: token.defaultBg,
  borderColor: token.defaultBorderColor,
  color: token.defaultColor,

  boxShadow: token.defaultShadow,

  ...genHoverActiveButtonStyle(
    token.componentCls,
    {
      color: token.defaultHoverColor,
      borderColor: token.defaultHoverBorderColor,
      background: token.defaultHoverBg,
    },
    {
      color: token.defaultActiveColor,
      borderColor: token.defaultActiveBorderColor,
      background: token.defaultActiveBg,
    },
  ),

  ...genGhostButtonStyle(
    token.componentCls,
    token.ghostBg,
    token.defaultGhostColor,
    token.defaultGhostBorderColor,
    token.colorTextDisabled,
    token.colorBorder,
  ),

  [`&${token.componentCls}-dangerous`]: {
    color: token.colorError,
    borderColor: token.colorError,

    ...genHoverActiveButtonStyle(
      token.componentCls,
      {
        color: token.colorErrorHover,
        borderColor: token.colorErrorBorderHover,
      },
      {
        color: token.colorErrorActive,
        borderColor: token.colorErrorActive,
      },
    ),

    ...genGhostButtonStyle(
      token.componentCls,
      token.ghostBg,
      token.colorError,
      token.colorError,
      token.colorTextDisabled,
      token.colorBorder,
    ),
    ...genSolidDisabledButtonStyle(token),
  },
});

// Type: Primary
const genPrimaryButtonStyle: GenerateStyle<ButtonToken, CSSObject> = (token) => ({
  ...genSolidButtonStyle(token),

  color: token.primaryColor,
  background: token.colorPrimary,

  boxShadow: token.primaryShadow,

  ...genHoverActiveButtonStyle(
    token.componentCls,
    {
      color: token.colorTextLightSolid,
      background: token.colorPrimaryHover,
    },
    {
      color: token.colorTextLightSolid,
      background: token.colorPrimaryActive,
    },
  ),

  ...genGhostButtonStyle(
    token.componentCls,
    token.ghostBg,
    token.colorPrimary,
    token.colorPrimary,
    token.colorTextDisabled,
    token.colorBorder,
    {
      color: token.colorPrimaryHover,
      borderColor: token.colorPrimaryHover,
    },
    {
      color: token.colorPrimaryActive,
      borderColor: token.colorPrimaryActive,
    },
  ),

  [`&${token.componentCls}-dangerous`]: {
    background: token.colorError,
    boxShadow: token.dangerShadow,
    color: token.dangerColor,

    ...genHoverActiveButtonStyle(
      token.componentCls,
      {
        background: token.colorErrorHover,
      },
      {
        background: token.colorErrorActive,
      },
    ),

    ...genGhostButtonStyle(
      token.componentCls,
      token.ghostBg,
      token.colorError,
      token.colorError,
      token.colorTextDisabled,
      token.colorBorder,
      {
        color: token.colorErrorHover,
        borderColor: token.colorErrorHover,
      },
      {
        color: token.colorErrorActive,
        borderColor: token.colorErrorActive,
      },
    ),
    ...genSolidDisabledButtonStyle(token),
  },
});

// Type: Dashed
const genDashedButtonStyle: GenerateStyle<ButtonToken, CSSObject> = (token) => ({
  ...genDefaultButtonStyle(token),
  borderStyle: 'dashed',
});

// Type: Link
const genLinkButtonStyle: GenerateStyle<ButtonToken, CSSObject> = (token) => ({
  color: token.colorLink,

  ...genHoverActiveButtonStyle(
    token.componentCls,
    {
      color: token.colorLinkHover,
      background: token.linkHoverBg,
    },
    {
      color: token.colorLinkActive,
    },
  ),

  ...genPureDisabledButtonStyle(token),

  [`&${token.componentCls}-dangerous`]: {
    color: token.colorError,

    ...genHoverActiveButtonStyle(
      token.componentCls,
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
const genTextButtonStyle: GenerateStyle<ButtonToken, CSSObject> = (token) => ({
  ...genHoverActiveButtonStyle(
    token.componentCls,
    {
      color: token.colorText,
      background: token.textHoverBg,
    },
    {
      color: token.colorText,
      background: token.colorBgTextActive,
    },
  ),

  ...genPureDisabledButtonStyle(token),

  [`&${token.componentCls}-dangerous`]: {
    color: token.colorError,

    ...genPureDisabledButtonStyle(token),
    ...genHoverActiveButtonStyle(
      token.componentCls,
      {
        color: token.colorErrorHover,
        background: token.colorErrorBg,
      },
      {
        color: token.colorErrorHover,
        background: token.colorErrorBgActive,
      },
    ),
  },
});

const genTypeButtonStyle: GenerateStyle<ButtonToken> = (token) => {
  const { componentCls } = token;

  return {
    [`${componentCls}-default`]: genDefaultButtonStyle(token),
    [`${componentCls}-primary`]: genPrimaryButtonStyle(token),
    [`${componentCls}-dashed`]: genDashedButtonStyle(token),
    [`${componentCls}-link`]: genLinkButtonStyle(token),
    [`${componentCls}-text`]: genTextButtonStyle(token),
    [`${componentCls}-ghost`]: genGhostButtonStyle(
      token.componentCls,
      token.ghostBg,
      token.colorBgContainer,
      token.colorBgContainer,
      token.colorTextDisabled,
      token.colorBorder,
    ),
  };
};

// =============================== Size ===============================
const genButtonStyle = (token: ButtonToken, prefixCls: string = ''): CSSInterpolation => {
  const {
    componentCls,
    controlHeight,
    fontSize,
    lineHeight,
    borderRadius,
    buttonPaddingHorizontal,
    iconCls,
    buttonPaddingVertical,
  } = token;

  const iconOnlyCls = `${componentCls}-icon-only`;

  return [
    {
      [`${prefixCls}`]: {
        fontSize,
        lineHeight,
        height: controlHeight,
        padding: `${unit(buttonPaddingVertical!)} ${unit(buttonPaddingHorizontal!)}`,
        borderRadius,

        [`&${iconOnlyCls}`]: {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: controlHeight,
          paddingInlineStart: 0,
          paddingInlineEnd: 0,
          [`&${componentCls}-round`]: {
            width: 'auto',
          },
          [iconCls]: {
            fontSize: token.buttonIconOnlyFontSize,
          },
        },

        // Loading
        [`&${componentCls}-loading`]: {
          opacity: token.opacityLoading,
          cursor: 'default',
        },

        [`${componentCls}-loading-icon`]: {
          transition: `width ${token.motionDurationSlow} ${token.motionEaseInOut}, opacity ${token.motionDurationSlow} ${token.motionEaseInOut}`,
        },
      },
    },

    // Shape - patch prefixCls again to override solid border radius style
    {
      [`${componentCls}${componentCls}-circle${prefixCls}`]: genCircleButtonStyle(token),
    },
    {
      [`${componentCls}${componentCls}-round${prefixCls}`]: genRoundButtonStyle(token),
    },
  ];
};

const genSizeBaseButtonStyle: GenerateStyle<ButtonToken> = (token) => {
  const baseToken = mergeToken<ButtonToken>(token, {
    fontSize: token.contentFontSize,
    lineHeight: token.contentLineHeight,
  });
  return genButtonStyle(baseToken, token.componentCls);
};

const genSizeSmallButtonStyle: GenerateStyle<ButtonToken> = (token) => {
  const smallToken = mergeToken<ButtonToken>(token, {
    controlHeight: token.controlHeightSM,
    fontSize: token.contentFontSizeSM,
    lineHeight: token.contentLineHeightSM,
    padding: token.paddingXS,
    buttonPaddingHorizontal: token.paddingInlineSM,
    buttonPaddingVertical: token.paddingBlockSM,
    borderRadius: token.borderRadiusSM,
    buttonIconOnlyFontSize: token.onlyIconSizeSM,
  });

  return genButtonStyle(smallToken, `${token.componentCls}-sm`);
};

const genSizeLargeButtonStyle: GenerateStyle<ButtonToken> = (token) => {
  const largeToken = mergeToken<ButtonToken>(token, {
    controlHeight: token.controlHeightLG,
    fontSize: token.contentFontSizeLG,
    lineHeight: token.contentLineHeightLG,
    buttonPaddingHorizontal: token.paddingInlineLG,
    buttonPaddingVertical: token.paddingBlockLG,
    borderRadius: token.borderRadiusLG,
    buttonIconOnlyFontSize: token.onlyIconSizeLG,
  });

  return genButtonStyle(largeToken, `${token.componentCls}-lg`);
};

const genBlockButtonStyle: GenerateStyle<ButtonToken> = (token) => {
  const { componentCls } = token;
  return {
    [componentCls]: {
      [`&${componentCls}-block`]: {
        width: '100%',
      },
    },
  };
};

// ============================== Export ==============================
export default genStyleHooks(
  'Button',
  (token) => {
    const buttonToken = prepareToken(token);

    return [
      // Shared
      genSharedButtonStyle(buttonToken),

      // Size
      genSizeBaseButtonStyle(buttonToken),
      genSizeSmallButtonStyle(buttonToken),
      genSizeLargeButtonStyle(buttonToken),

      // Block
      genBlockButtonStyle(buttonToken),

      // Group (type, ghost, danger, loading)
      genTypeButtonStyle(buttonToken),

      // Button Group
      genGroupStyle(buttonToken),
    ];
  },
  prepareComponentToken,
  {
    unitless: {
      fontWeight: true,
      contentLineHeight: true,
      contentLineHeightSM: true,
      contentLineHeightLG: true,
    },
  },
);
