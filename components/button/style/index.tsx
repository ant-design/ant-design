import type { CSSInterpolation, CSSObject } from '@ant-design/cssinjs';
import type { FullToken, GenerateStyle } from '../../theme';
import { genComponentStyleHook, mergeToken } from '../../theme';
import genGroupStyle from './group';
import { genFocusStyle } from '../../style';
import { genCompactItemStyle } from '../../style/compact-item';
import { genCompactItemVerticalStyle } from '../../style/compact-item-vertical';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {}

export interface ButtonToken extends FullToken<'Button'> {
  // FIXME: should be removed
  colorOutlineDefault: string;
  buttonPaddingHorizontal: number;
}

// ============================== Shared ==============================
const genSharedButtonStyle: GenerateStyle<ButtonToken, CSSObject> = (token): CSSObject => {
  const {
    componentCls,
    iconCls,
    lineHeight,
    lineWidth,
    lineType,
    motionDurationFast,
    motionEaseInOut,
    colorText,
    marginXS,
    colorPrimaryBorder,
  } = token;

  return {
    [componentCls]: {
      outline: 'none',
      position: 'relative',
      display: 'inline-block',
      fontWeight: 400,
      whiteSpace: 'nowrap',
      textAlign: 'center',
      backgroundImage: 'none',
      backgroundColor: 'transparent',
      border: `${lineWidth}px ${lineType} transparent`,
      cursor: 'pointer',
      transition: `all ${motionDurationFast} ${motionEaseInOut}`,
      userSelect: 'none',
      touchAction: 'manipulation',
      lineHeight,
      color: colorText,

      '> span': {
        display: 'inline-block',
      },

      // Leave a space between icon and text.
      [`> ${iconCls} + span, > span + ${iconCls}`]: {
        marginInlineStart: marginXS,
      },

      [`&${componentCls}-block`]: {
        width: '100%',
      },

      '&:not(:disabled)': {
        ...genFocusStyle(token),
      },

      ...genCompactItemStyle(token, componentCls),
      ...genCompactItemVerticalStyle(token, componentCls),

      // make `btn-icon-only` not too narrow
      '&-icon-only&-compact-item': {
        flex: 'none',
      },
      // Special styles for Primary Button
      [`&-compact-item${componentCls}-primary`]: {
        '&:not([disabled]) + &:not([disabled])': {
          position: 'relative',

          '&:after': {
            position: 'absolute',
            top: -lineWidth,
            insetInlineStart: -lineWidth,
            display: 'inline-block',
            width: lineWidth,
            height: `calc(100% + ${lineWidth * 2}px)`,
            backgroundColor: colorPrimaryBorder,
            content: '""',
          },
        },
      },
      // Special styles for Primary Button
      '&-compact-vertical-item': {
        [`&${componentCls}-primary`]: {
          '&:not([disabled]) + &:not([disabled])': {
            position: 'relative',

            '&:after': {
              position: 'absolute',
              top: -lineWidth,
              insetInlineStart: -lineWidth,
              display: 'inline-block',
              width: `calc(100% + ${lineWidth * 2}px)`,
              height: lineWidth,
              backgroundColor: colorPrimaryBorder,
              content: '""',
            },
          },
        },
      },
    },
  };
};

const genHoverActiveButtonStyle = (hoverStyle: CSSObject, activeStyle: CSSObject): CSSObject => ({
  '&:not(:disabled)': {
    '&:hover': hoverStyle,
    '&:active': activeStyle,
  },
});

// ============================== Shape ===============================
const genCircleButtonStyle: GenerateStyle<ButtonToken, CSSObject> = ({ controlHeight }) => ({
  minWidth: controlHeight,
  paddingInlineStart: 0,
  paddingInlineEnd: 0,
  borderRadius: '50%',
});

const genRoundButtonStyle: GenerateStyle<ButtonToken, CSSObject> = ({ controlHeight }) => ({
  borderRadius: controlHeight,
  paddingInlineStart: controlHeight / 2,
  paddingInlineEnd: controlHeight / 2,
  width: 'auto',
});

// =============================== Type ===============================
const genGhostButtonStyle = (
  btnCls: string,
  textColor: string | false,
  borderColor: string | false,
  textColorDisabled: string | false,
  borderColorDisabled: string | false,
  hoverStyle?: CSSObject,
  activeStyle?: CSSObject,
): CSSObject => ({
  [`&${btnCls}-background-ghost`]: {
    color: textColor || undefined,
    backgroundColor: 'transparent',
    borderColor: borderColor || undefined,
    boxShadow: 'none',

    ...genHoverActiveButtonStyle(
      {
        backgroundColor: 'transparent',
        ...hoverStyle,
      },
      {
        backgroundColor: 'transparent',
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

const genSolidDisabledButtonStyle: GenerateStyle<ButtonToken, CSSObject> = ({
  colorBorder,
  colorTextDisabled,
  colorBgContainerDisabled,
}) => ({
  '&:disabled': {
    cursor: 'not-allowed',
    borderColor: colorBorder,
    color: colorTextDisabled,
    backgroundColor: colorBgContainerDisabled,
    boxShadow: 'none',
  },
});

const genSolidButtonStyle: GenerateStyle<ButtonToken, CSSObject> = (token) => ({
  ...genSolidDisabledButtonStyle(token),
});

const genPureDisabledButtonStyle: GenerateStyle<ButtonToken, CSSObject> = ({
  colorTextDisabled,
}) => ({
  '&:disabled': {
    cursor: 'not-allowed',
    color: colorTextDisabled,
  },
});

// Type: Default
const genDefaultButtonStyle: GenerateStyle<ButtonToken, CSSObject> = (token) => {
  const {
    componentCls,
    colorBgContainer,
    colorBorder,
    controlOutlineWidth,
    controlTmpOutline,
    colorPrimaryHover,
    colorPrimaryActive,
    colorTextDisabled,
    colorError,
    colorErrorHover,
    colorErrorBorder,
    colorErrorActive,
  } = token;

  return {
    ...genSolidButtonStyle(token),

    backgroundColor: colorBgContainer,
    borderColor: colorBorder,

    boxShadow: `0 ${controlOutlineWidth}px 0 ${controlTmpOutline}`,

    ...genHoverActiveButtonStyle(
      {
        color: colorPrimaryHover,
        borderColor: colorPrimaryHover,
      },
      {
        color: colorPrimaryActive,
        borderColor: colorPrimaryActive,
      },
    ),

    ...genGhostButtonStyle(
      componentCls,
      colorBgContainer,
      colorBgContainer,
      colorTextDisabled,
      colorBorder,
    ),

    [`&${componentCls}-dangerous`]: {
      color: colorError,
      borderColor: colorError,

      ...genHoverActiveButtonStyle(
        {
          color: colorErrorHover,
          borderColor: colorErrorBorder,
        },
        {
          color: colorErrorActive,
          borderColor: colorErrorActive,
        },
      ),

      ...genGhostButtonStyle(componentCls, colorError, colorError, colorTextDisabled, colorBorder),
      ...genSolidDisabledButtonStyle(token),
    },
  };
};

// Type: Primary
const genPrimaryButtonStyle: GenerateStyle<ButtonToken, CSSObject> = (token) => {
  const {
    colorTextLightSolid,
    colorPrimary,
    controlOutlineWidth,
    controlOutline,
    colorPrimaryHover,
    colorPrimaryActive,
    componentCls,
    colorTextDisabled,
    colorBorder,
    colorError,
    colorErrorOutline,
    colorErrorHover,
    colorErrorActive,
  } = token;

  return {
    ...genSolidButtonStyle(token),

    color: colorTextLightSolid,
    backgroundColor: colorPrimary,

    boxShadow: `0 ${controlOutlineWidth}px 0 ${controlOutline}`,

    ...genHoverActiveButtonStyle(
      {
        color: colorTextLightSolid,
        backgroundColor: colorPrimaryHover,
      },
      {
        color: colorTextLightSolid,
        backgroundColor: colorPrimaryActive,
      },
    ),

    ...genGhostButtonStyle(
      componentCls,
      colorPrimary,
      colorPrimary,
      colorTextDisabled,
      colorBorder,
      {
        color: colorPrimaryHover,
        borderColor: colorPrimaryHover,
      },
      {
        color: colorPrimaryActive,
        borderColor: colorPrimaryActive,
      },
    ),

    [`&${componentCls}-dangerous`]: {
      backgroundColor: colorError,
      boxShadow: `0 ${controlOutlineWidth}px 0 ${colorErrorOutline}`,

      ...genHoverActiveButtonStyle(
        {
          backgroundColor: colorErrorHover,
        },
        {
          backgroundColor: colorErrorActive,
        },
      ),

      ...genGhostButtonStyle(
        componentCls,
        colorError,
        colorError,
        colorTextDisabled,
        colorBorder,
        {
          color: colorErrorHover,
          borderColor: colorErrorHover,
        },
        {
          color: colorErrorActive,
          borderColor: colorErrorActive,
        },
      ),
      ...genSolidDisabledButtonStyle(token),
    },
  };
};

// Type: Dashed
const genDashedButtonStyle: GenerateStyle<ButtonToken, CSSObject> = (token) => ({
  ...genDefaultButtonStyle(token),

  borderStyle: 'dashed',
});

// Type: Link
const genLinkButtonStyle: GenerateStyle<ButtonToken, CSSObject> = (token) => {
  const {
    componentCls,
    colorLink,
    colorLinkHover,
    colorLinkActive,
    colorError,
    colorErrorHover,
    colorErrorActive,
  } = token;

  return {
    color: colorLink,

    ...genHoverActiveButtonStyle(
      {
        color: colorLinkHover,
      },
      {
        color: colorLinkActive,
      },
    ),

    ...genPureDisabledButtonStyle(token),

    [`&${componentCls}-dangerous`]: {
      color: colorError,

      ...genHoverActiveButtonStyle(
        {
          color: colorErrorHover,
        },
        {
          color: colorErrorActive,
        },
      ),

      ...genPureDisabledButtonStyle(token),
    },
  };
};

// Type: Text
const genTextButtonStyle: GenerateStyle<ButtonToken, CSSObject> = (token) => {
  const {
    componentCls,
    colorText,
    colorBgTextHover,
    colorBgTextActive,
    colorError,
    colorErrorHover,
    colorErrorBg,
  } = token;

  return {
    ...genHoverActiveButtonStyle(
      {
        color: colorText,
        backgroundColor: colorBgTextHover,
      },
      {
        color: colorText,
        backgroundColor: colorBgTextActive,
      },
    ),

    ...genPureDisabledButtonStyle(token),

    [`&${componentCls}-dangerous`]: {
      color: colorError,

      ...genPureDisabledButtonStyle(token),
      ...genHoverActiveButtonStyle(
        {
          color: colorErrorHover,
          backgroundColor: colorErrorBg,
        },
        {
          color: colorErrorHover,
          backgroundColor: colorErrorBg,
        },
      ),
    },
  };
};

const genTypeButtonStyle: GenerateStyle<ButtonToken> = (token) => {
  const { componentCls } = token;

  return {
    [`${componentCls}-default`]: genDefaultButtonStyle(token),
    [`${componentCls}-primary`]: genPrimaryButtonStyle(token),
    [`${componentCls}-dashed`]: genDashedButtonStyle(token),
    [`${componentCls}-link`]: genLinkButtonStyle(token),
    [`${componentCls}-text`]: genTextButtonStyle(token),
  };
};

// =============================== Size ===============================
const genSizeButtonStyle = (token: ButtonToken, sizePrefixCls: string = ''): CSSInterpolation => {
  const {
    componentCls,
    iconCls,
    buttonPaddingHorizontal,
    controlHeight,
    fontSize,
    lineHeight,
    lineWidth,
    borderRadius,
    opacityLoading,
    motionDurationSlow,
    motionEaseInOut,
    marginXS,
  } = token;

  const paddingVertical = Math.max(0, (controlHeight - fontSize * lineHeight) / 2 - lineWidth);
  const paddingHorizontal = buttonPaddingHorizontal - lineWidth;

  const iconOnlyCls = `${componentCls}-icon-only`;

  return [
    // Size
    {
      [`${componentCls}${sizePrefixCls}`]: {
        fontSize,
        height: controlHeight,
        padding: `${paddingVertical}px ${paddingHorizontal}px`,
        borderRadius,

        [`&${iconOnlyCls}`]: {
          width: controlHeight,
          paddingInlineStart: 0,
          paddingInlineEnd: 0,

          '> span': {
            transform: 'scale(1.143)', // 14px -> 16px
          },
        },

        // Loading
        [`&${componentCls}-loading`]: {
          opacity: opacityLoading,
          cursor: 'default',
        },

        [`${componentCls}-loading-icon`]: {
          transition: `width ${motionDurationSlow} ${motionEaseInOut}, opacity ${motionDurationSlow} ${motionEaseInOut}`,
        },

        [`&:not(${iconOnlyCls}) ${componentCls}-loading-icon > ${iconCls}`]: {
          marginInlineEnd: marginXS,
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

const genSizeBaseButtonStyle: GenerateStyle<ButtonToken> = (token) => genSizeButtonStyle(token);

const genSizeSmallButtonStyle: GenerateStyle<ButtonToken> = (token) => {
  const { componentCls, controlHeightSM, paddingXS, borderRadiusSM } = token;

  const smallToken = mergeToken<ButtonToken>(token, {
    controlHeight: controlHeightSM,
    padding: paddingXS,
    buttonPaddingHorizontal: 8, // Fixed padding
    borderRadius: borderRadiusSM,
  });

  return genSizeButtonStyle(smallToken, `${componentCls}-sm`);
};

const genSizeLargeButtonStyle: GenerateStyle<ButtonToken> = (token) => {
  const { controlHeightLG, fontSizeLG, borderRadiusLG, componentCls } = token;

  const largeToken = mergeToken<ButtonToken>(token, {
    controlHeight: controlHeightLG,
    fontSize: fontSizeLG,
    borderRadius: borderRadiusLG,
  });

  return genSizeButtonStyle(largeToken, `${componentCls}-lg`);
};

// ============================== Export ==============================
export default genComponentStyleHook('Button', (token) => {
  const { controlTmpOutline, paddingContentHorizontal } = token;

  const buttonToken = mergeToken<ButtonToken>(token, {
    colorOutlineDefault: controlTmpOutline,
    buttonPaddingHorizontal: paddingContentHorizontal,
  });

  return [
    // Shared
    genSharedButtonStyle(buttonToken),

    // Size
    genSizeSmallButtonStyle(buttonToken),
    genSizeBaseButtonStyle(buttonToken),
    genSizeLargeButtonStyle(buttonToken),

    // Group (type, ghost, danger, disabled, loading)
    genTypeButtonStyle(buttonToken),

    // Button Group
    genGroupStyle(buttonToken),
  ];
});
