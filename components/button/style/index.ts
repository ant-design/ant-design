import type { CSSProperties } from 'react';
import type { CSSInterpolation, CSSObject } from '@ant-design/cssinjs';

import { genFocusStyle } from '../../style';
import type { GlobalToken } from '../../theme';
import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';
import type { GenStyleFn } from '../../theme/util/genComponentStyleHook';
import genGroupStyle from './group';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  /**
   * @desc 文字字重
   * @descEN Font weight of text
   */
  fontWeight: CSSProperties['fontWeight'];
  /**
   * @desc 默认按钮阴影
   * @descEN Shadow of default button
   */
  defaultShadow: string;
  /**
   * @desc 主要按钮阴影
   * @descEN Shadow of primary button
   */
  primaryShadow: string;
  /**
   * @desc 危险按钮阴影
   * @descEN Shadow of danger button
   */
  dangerShadow: string;
  /**
   * @desc 主要按钮文本颜色
   * @descEN Text color of primary button
   */
  primaryColor: string;
  /**
   * @desc 默认按钮文本颜色
   * @descEN Text color of default button
   */
  defaultColor: string;
  /**
   * @desc 默认按钮背景色
   * @descEN Background color of default button
   */
  defaultBg: string;
  /**
   * @desc 默认按钮边框颜色
   * @descEN Border color of default button
   */
  defaultBorderColor: string;
  /**
   * @desc 危险按钮文本颜色
   * @descEN Text color of danger button
   */
  dangerColor: string;
  /**
   * @desc 禁用状态边框颜色
   * @descEN Border color of disabled button
   */
  borderColorDisabled: string;
  /**
   * @desc 默认幽灵按钮文本颜色
   * @descEN Text color of default ghost button
   */
  defaultGhostColor: string;
  /**
   * @desc 幽灵按钮背景色
   * @descEN Background color of ghost button
   */
  ghostBg: string;
  /**
   * @desc 默认幽灵按钮边框颜色
   * @descEN Border color of default ghost button
   */
  defaultGhostBorderColor: string;
  /**
   * @desc 按钮横向内间距
   * @descEN Horizontal padding of button
   */
  paddingInline: CSSProperties['paddingInline'];
  /**
   * @desc 大号按钮横向内间距
   * @descEN Horizontal padding of large button
   */
  paddingInlineLG: CSSProperties['paddingInline'];
  /**
   * @desc 小号按钮横向内间距
   * @descEN Horizontal padding of small button
   */
  paddingInlineSM: CSSProperties['paddingInline'];
  /**
   * @desc 只有图标的按钮图标尺寸
   * @descEN Icon size of button which only contains icon
   */
  onlyIconSize: number;
  /**
   * @desc 大号只有图标的按钮图标尺寸
   * @descEN Icon size of large button which only contains icon
   */
  onlyIconSizeLG: number;
  /**
   * @desc 小号只有图标的按钮图标尺寸
   * @descEN Icon size of small button which only contains icon
   */
  onlyIconSizeSM: number;
  /**
   * @desc 按钮组边框颜色
   * @descEN Border color of button group
   */
  groupBorderColor: string;
  /**
   * @desc 链接按钮悬浮态背景色
   * @descEN Background color of link button when hover
   */
  linkHoverBg: string;
  /**
   * @desc 文本按钮悬浮态背景色
   * @descEN Background color of text button when hover
   */
  textHoverBg: string;
  /**
   * @desc 按钮内容字体大小
   * @descEN Font size of button content
   */
  contentFontSize: number;
  /**
   * @desc 大号按钮内容字体大小
   * @descEN Font size of large button content
   */
  contentFontSizeLG: number;
  /**
   * @desc 小号按钮内容字体大小
   * @descEN Font size of small button content
   */
  contentFontSizeSM: number;
}

export interface ButtonToken extends FullToken<'Button'> {
  buttonPaddingHorizontal: CSSProperties['paddingInline'];
  buttonIconOnlyFontSize: number;
}

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
      backgroundColor: 'transparent',
      border: `${token.lineWidth}px ${token.lineType} transparent`,
      cursor: 'pointer',
      transition: `all ${token.motionDurationMid} ${token.motionEaseInOut}`,
      userSelect: 'none',
      touchAction: 'manipulation',
      lineHeight: token.lineHeight,
      color: token.colorText,

      '&:disabled > *': {
        pointerEvents: 'none',
      },

      '> span': {
        display: 'inline-block',
      },

      [`${componentCls}-icon`]: {
        lineHeight: 0,
      },

      // Leave a space between icon and text.
      [`> ${iconCls} + span, > span + ${iconCls}`]: {
        marginInlineStart: token.marginXS,
      },

      [`&:not(${componentCls}-icon-only) > ${componentCls}-icon`]: {
        [`&${componentCls}-loading-icon, &:not(:last-child)`]: {
          marginInlineEnd: token.marginXS,
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
      // Special styles for Primary Button
      [`&-compact-item${componentCls}-primary`]: {
        [`&:not([disabled]) + ${componentCls}-compact-item${componentCls}-primary:not([disabled])`]:
          {
            position: 'relative',

            '&:before': {
              position: 'absolute',
              top: -token.lineWidth,
              insetInlineStart: -token.lineWidth,
              display: 'inline-block',
              width: token.lineWidth,
              height: `calc(100% + ${token.lineWidth * 2}px)`,
              backgroundColor: token.colorPrimaryHover,
              content: '""',
            },
          },
      },
      // Special styles for Primary Button
      '&-compact-vertical-item': {
        [`&${componentCls}-primary`]: {
          [`&:not([disabled]) + ${componentCls}-compact-vertical-item${componentCls}-primary:not([disabled])`]:
            {
              position: 'relative',

              '&:before': {
                position: 'absolute',
                top: -token.lineWidth,
                insetInlineStart: -token.lineWidth,
                display: 'inline-block',
                width: `calc(100% + ${token.lineWidth * 2}px)`,
                height: token.lineWidth,
                backgroundColor: token.colorPrimaryHover,
                content: '""',
              },
            },
        },
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
  paddingInlineStart: token.controlHeight / 2,
  paddingInlineEnd: token.controlHeight / 2,
});

// =============================== Type ===============================
const genDisabledStyle: GenerateStyle<ButtonToken, CSSObject> = (token) => ({
  cursor: 'not-allowed',
  borderColor: token.borderColorDisabled,
  color: token.colorTextDisabled,
  backgroundColor: token.colorBgContainerDisabled,
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
    backgroundColor: background,
    borderColor: borderColor || undefined,
    boxShadow: 'none',

    ...genHoverActiveButtonStyle(
      btnCls,
      {
        backgroundColor: background,
        ...hoverStyle,
      },
      {
        backgroundColor: background,
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

  backgroundColor: token.defaultBg,
  borderColor: token.defaultBorderColor,
  color: token.defaultColor,

  boxShadow: token.defaultShadow,

  ...genHoverActiveButtonStyle(
    token.componentCls,
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
  backgroundColor: token.colorPrimary,

  boxShadow: token.primaryShadow,

  ...genHoverActiveButtonStyle(
    token.componentCls,
    {
      color: token.colorTextLightSolid,
      backgroundColor: token.colorPrimaryHover,
    },
    {
      color: token.colorTextLightSolid,
      backgroundColor: token.colorPrimaryActive,
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
    backgroundColor: token.colorError,
    boxShadow: token.dangerShadow,
    color: token.dangerColor,

    ...genHoverActiveButtonStyle(
      token.componentCls,
      {
        backgroundColor: token.colorErrorHover,
      },
      {
        backgroundColor: token.colorErrorActive,
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
      backgroundColor: token.linkHoverBg,
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
      backgroundColor: token.textHoverBg,
    },
    {
      color: token.colorText,
      backgroundColor: token.colorBgTextActive,
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
        backgroundColor: token.colorErrorBg,
      },
      {
        color: token.colorErrorHover,
        backgroundColor: token.colorErrorBg,
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
const genSizeButtonStyle = (token: ButtonToken, sizePrefixCls: string = ''): CSSInterpolation => {
  const {
    componentCls,
    controlHeight,
    fontSize,
    lineHeight,
    lineWidth,
    borderRadius,
    buttonPaddingHorizontal,
    iconCls,
  } = token;

  const paddingVertical = Math.max(0, (controlHeight - fontSize * lineHeight) / 2 - lineWidth);

  const iconOnlyCls = `${componentCls}-icon-only`;

  return [
    // Size
    {
      [`${componentCls}${sizePrefixCls}`]: {
        fontSize,
        height: controlHeight,
        padding: `${paddingVertical}px ${buttonPaddingHorizontal}px`,
        borderRadius,

        [`&${iconOnlyCls}`]: {
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
      [`${componentCls}${componentCls}-circle${sizePrefixCls}`]: genCircleButtonStyle(token),
    },
    {
      [`${componentCls}${componentCls}-round${sizePrefixCls}`]: genRoundButtonStyle(token),
    },
  ];
};

const genSizeBaseButtonStyle: GenerateStyle<ButtonToken> = (token) =>
  genSizeButtonStyle(
    mergeToken<ButtonToken>(token, {
      fontSize: token.contentFontSize,
    }),
  );

const genSizeSmallButtonStyle: GenerateStyle<ButtonToken> = (token) => {
  const smallToken = mergeToken<ButtonToken>(token, {
    controlHeight: token.controlHeightSM,
    fontSize: token.contentFontSizeSM,
    padding: token.paddingXS,
    buttonPaddingHorizontal: token.paddingInlineSM, // Fixed padding
    borderRadius: token.borderRadiusSM,
    buttonIconOnlyFontSize: token.onlyIconSizeSM,
  });

  return genSizeButtonStyle(smallToken, `${token.componentCls}-sm`);
};

const genSizeLargeButtonStyle: GenerateStyle<ButtonToken> = (token) => {
  const largeToken = mergeToken<ButtonToken>(token, {
    controlHeight: token.controlHeightLG,
    fontSize: token.contentFontSizeLG,
    buttonPaddingHorizontal: token.paddingInlineLG,
    borderRadius: token.borderRadiusLG,
    buttonIconOnlyFontSize: token.onlyIconSizeLG,
  });

  return genSizeButtonStyle(largeToken, `${token.componentCls}-lg`);
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
export const prepareToken: (token: Parameters<GenStyleFn<'Button'>>[0]) => ButtonToken = (
  token,
) => {
  const { paddingInline, onlyIconSize } = token;

  const buttonToken = mergeToken<ButtonToken>(token, {
    buttonPaddingHorizontal: paddingInline,
    buttonIconOnlyFontSize: onlyIconSize,
  });

  return buttonToken;
};

export const prepareComponentToken = (token: GlobalToken) => ({
  fontWeight: 400,
  defaultShadow: `0 ${token.controlOutlineWidth}px 0 ${token.controlTmpOutline}`,
  primaryShadow: `0 ${token.controlOutlineWidth}px 0 ${token.controlOutline}`,
  dangerShadow: `0 ${token.controlOutlineWidth}px 0 ${token.colorErrorOutline}`,
  primaryColor: token.colorTextLightSolid,
  dangerColor: token.colorTextLightSolid,
  borderColorDisabled: token.colorBorder,
  defaultGhostColor: token.colorBgContainer,
  ghostBg: 'transparent',
  defaultGhostBorderColor: token.colorBgContainer,
  paddingInline: token.paddingContentHorizontal - token.lineWidth,
  paddingInlineLG: token.paddingContentHorizontal - token.lineWidth,
  paddingInlineSM: 8 - token.lineWidth,
  onlyIconSize: token.fontSizeLG,
  onlyIconSizeSM: token.fontSizeLG - 2,
  onlyIconSizeLG: token.fontSizeLG + 2,
  groupBorderColor: token.colorPrimaryHover,
  linkHoverBg: 'transparent',
  textHoverBg: token.colorBgTextHover,
  defaultColor: token.colorText,
  defaultBg: token.colorBgContainer,
  defaultBorderColor: token.colorBorder,
  defaultBorderColorDisabled: token.colorBorder,
  contentFontSize: token.fontSize,
  contentFontSizeSM: token.fontSize,
  contentFontSizeLG: token.fontSizeLG,
});

export default genComponentStyleHook(
  'Button',
  (token) => {
    const buttonToken = prepareToken(token);

    return [
      // Shared
      genSharedButtonStyle(buttonToken),

      // Size
      genSizeSmallButtonStyle(buttonToken),
      genSizeBaseButtonStyle(buttonToken),
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
);
