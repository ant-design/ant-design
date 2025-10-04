import type { CSSInterpolation, CSSObject } from '@ant-design/cssinjs';
import { unit } from '@ant-design/cssinjs';

import { genFocusStyle, resetIcon } from '../../style';
import type { GenerateStyle } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';
import genGroupStyle from './group';
import type { ButtonToken, ComponentToken } from './token';
import { prepareComponentToken, prepareToken } from './token';
import genVariantStyle from './variant';

export type { ComponentToken };

// ============================== Shared ==============================
const genSharedButtonStyle: GenerateStyle<ButtonToken, CSSObject> = (token): CSSObject => {
  const {
    componentCls,
    iconCls,
    fontWeight,
    opacityLoading,
    motionDurationSlow,
    motionEaseInOut,
    iconGap,
    calc,
  } = token;

  return {
    [componentCls]: {
      outline: 'none',
      position: 'relative',
      display: 'inline-flex',
      gap: iconGap,
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight,
      whiteSpace: 'nowrap',
      textAlign: 'center',
      backgroundImage: 'none',
      cursor: 'pointer',
      transition: `all ${token.motionDurationMid} ${token.motionEaseInOut}`,
      userSelect: 'none',
      touchAction: 'manipulation',

      '&:disabled > *': {
        pointerEvents: 'none',
      },

      // https://github.com/ant-design/ant-design/issues/51380
      [`${componentCls}-icon > svg`]: resetIcon(),

      '> a': {
        color: 'currentColor',
      },

      '&:not(:disabled)': genFocusStyle(token),

      [`&${componentCls}-two-chinese-chars::first-letter`]: {
        letterSpacing: '0.34em',
      },

      [`&${componentCls}-two-chinese-chars > *:not(${iconCls})`]: {
        marginInlineEnd: '-0.34em',
        letterSpacing: '0.34em',
      },

      [`&${componentCls}-icon-only`]: {
        paddingInline: 0,

        // make `btn-icon-only` not too narrow
        [`&${componentCls}-compact-item`]: {
          flex: 'none',
        },
      },

      // Loading
      [`&${componentCls}-loading`]: {
        opacity: opacityLoading,
        cursor: 'default',
      },

      [`${componentCls}-loading-icon`]: {
        transition: ['width', 'opacity', 'margin']
          .map((transition) => `${transition} ${motionDurationSlow} ${motionEaseInOut}`)
          .join(','),
      },

      // iconPlacement
      [`&:not(${componentCls}-icon-end)`]: {
        [`${componentCls}-loading-icon-motion`]: {
          '&-appear-start, &-enter-start': {
            marginInlineEnd: calc(iconGap).mul(-1).equal(),
          },
          '&-appear-active, &-enter-active': {
            marginInlineEnd: 0,
          },
          '&-leave-start': {
            marginInlineEnd: 0,
          },
          '&-leave-active': {
            marginInlineEnd: calc(iconGap).mul(-1).equal(),
          },
        },
      },

      '&-icon-end': {
        flexDirection: 'row-reverse',

        [`${componentCls}-loading-icon-motion`]: {
          '&-appear-start, &-enter-start': {
            marginInlineStart: calc(iconGap).mul(-1).equal(),
          },
          '&-appear-active, &-enter-active': {
            marginInlineStart: 0,
          },
          '&-leave-start': {
            marginInlineStart: 0,
          },
          '&-leave-active': {
            marginInlineStart: calc(iconGap).mul(-1).equal(),
          },
        },
      },
    },
  };
};

// ============================== Shape ===============================
const genCircleButtonStyle: GenerateStyle<ButtonToken, CSSObject> = (token) => ({
  minWidth: token.controlHeight,
  paddingInline: 0,
  borderRadius: '50%',
});

// =============================== Size ===============================
const genButtonStyle = (token: ButtonToken, prefixCls = ''): CSSInterpolation => {
  const {
    componentCls,
    controlHeight,
    fontSize,
    borderRadius,
    buttonPaddingHorizontal,
    iconCls,
    buttonPaddingVertical,
    buttonIconOnlyFontSize,
  } = token;

  return [
    {
      [prefixCls]: {
        fontSize,
        height: controlHeight,
        padding: `${unit(buttonPaddingVertical!)} ${unit(buttonPaddingHorizontal!)}`,
        borderRadius,

        [`&${componentCls}-icon-only`]: {
          width: controlHeight,

          [iconCls]: {
            fontSize: buttonIconOnlyFontSize,
          },
        },
      },
    },
    // Shape - patch prefixCls again to override solid border radius style
    {
      [`${componentCls}${componentCls}-circle${prefixCls}`]: genCircleButtonStyle(token),
    },
    {
      [`${componentCls}${componentCls}-round${prefixCls}`]: {
        borderRadius: token.controlHeight,
        [`&:not(${componentCls}-icon-only)`]: {
          paddingInline: token.buttonPaddingHorizontal,
        },
      },
    },
  ];
};

const genSizeBaseButtonStyle: GenerateStyle<ButtonToken> = (token) => {
  const baseToken = mergeToken<ButtonToken>(token, {
    fontSize: token.contentFontSize,
  });
  return genButtonStyle(baseToken, token.componentCls);
};

const genSizeSmallButtonStyle: GenerateStyle<ButtonToken> = (token) => {
  const smallToken = mergeToken<ButtonToken>(token, {
    controlHeight: token.controlHeightSM,
    fontSize: token.contentFontSizeSM,
    padding: token.paddingXS,
    buttonPaddingHorizontal: token.paddingInlineSM,
    buttonPaddingVertical: 0,
    borderRadius: token.borderRadiusSM,
    buttonIconOnlyFontSize: token.onlyIconSizeSM,
  });

  return genButtonStyle(smallToken, `${token.componentCls}-sm`);
};

const genSizeLargeButtonStyle: GenerateStyle<ButtonToken> = (token) => {
  const largeToken = mergeToken<ButtonToken>(token, {
    controlHeight: token.controlHeightLG,
    fontSize: token.contentFontSizeLG,
    buttonPaddingHorizontal: token.paddingInlineLG,
    buttonPaddingVertical: 0,
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

      // Variant
      genVariantStyle(buttonToken),

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
