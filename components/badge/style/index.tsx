import type { CSSObject } from '@ant-design/cssinjs';
import { Keyframes } from '@ant-design/cssinjs';
import type { FullToken, GenerateStyle, PresetColorType } from '../../theme';
import { genComponentStyleHook, mergeToken, PresetColors } from '../../theme';
import { resetComponent } from '../../style';

interface BadgeToken extends FullToken<'Badge'> {
  badgeFontHeight: number;
  badgeZIndex: number | string;
  badgeHeight: number;
  badgeHeightSm: number;
  badgeTextColor: string;
  badgeFontWeight: string;
  badgeFontSize: number;
  badgeColor: string;
  badgeColorHover: string;
  badgeDotSize: number;
  badgeFontSizeSm: number;
  badgeStatusSize: number;
  badgeShadowSize: number;
  badgeShadowColor: string;
  badgeProcessingDuration: string;
  badgeRibbonOffset: number;
  badgeRibbonCornerTransform: string;
  badgeRibbonCornerFilter: string;
}

const antStatusProcessing = new Keyframes('antStatusProcessing', {
  '0%': { transform: 'scale(0.8)', opacity: 0.5 },
  '100%': { transform: 'scale(2.4)', opacity: 0 },
});

const antZoomBadgeIn = new Keyframes('antZoomBadgeIn', {
  '0%': { transform: 'scale(0) translate(50%, -50%)', opacity: 0 },
  '100%': { transform: 'scale(1) translate(50%, -50%)' },
});

const antZoomBadgeOut = new Keyframes('antZoomBadgeOut', {
  '0%': { transform: 'scale(1) translate(50%, -50%)' },
  '100%': { transform: 'scale(0) translate(50%, -50%)', opacity: 0 },
});

const antNoWrapperZoomBadgeIn = new Keyframes('antNoWrapperZoomBadgeIn', {
  '0%': { transform: 'scale(0)', opacity: 0 },
  '100%': { transform: 'scale(1)' },
});
const antNoWrapperZoomBadgeOut = new Keyframes('antNoWrapperZoomBadgeOut', {
  '0%': { transform: 'scale(1)' },
  '100%': { transform: 'scale(0)', opacity: 0 },
});
const antBadgeLoadingCircle = new Keyframes('antBadgeLoadingCircle', {
  '0%': { transformOrigin: '50%' },
  '100%': {
    transform: 'translate(50%, -50%) rotate(360deg)',
    transformOrigin: '50%',
  },
});

const genSharedBadgeStyle: GenerateStyle<BadgeToken> = (token: BadgeToken): CSSObject => {
  const {
    componentCls,
    iconCls,
    antCls,
    badgeFontHeight,
    badgeShadowSize,
    badgeHeightSm,
    motionDurationSlow,
    badgeStatusSize,
    marginXS,
    badgeRibbonOffset,
    badgeZIndex,
    badgeHeight,
    badgeTextColor,
    badgeFontWeight,
    badgeFontSize,
    badgeColor,
    badgeShadowColor,
    motionDurationFast,
    badgeColorHover,
    badgeFontSizeSm,
    paddingXS,
    badgeDotSize,
    colorSuccess,
    colorPrimary,
    badgeProcessingDuration,
    colorTextPlaceholder,
    colorError,
    colorWarning,
    colorText,
    fontSize,
    motionEaseOutBack,
    borderRadiusSM,
    colorTextLightSolid,
    badgeRibbonCornerTransform,
    badgeRibbonCornerFilter,
  } = token;
  const numberPrefixCls = `${antCls}-scroll-number`;
  const ribbonPrefixCls = `${antCls}-ribbon`;
  const ribbonWrapperPrefixCls = `${antCls}-ribbon-wrapper`;

  const statusPreset = PresetColors.reduce((prev: CSSObject, colorKey: keyof PresetColorType) => {
    const darkColor = token[`${colorKey}-6`];
    return {
      ...prev,
      [`${componentCls}-status-${colorKey}`]: {
        background: darkColor,
      },
    };
  }, {} as CSSObject);
  const statusRibbonPreset = PresetColors.reduce(
    (prev: CSSObject, colorKey: keyof PresetColorType) => {
      const darkColor = token[`${colorKey}-6`];
      return {
        ...prev,
        [`&${ribbonPrefixCls}-color-${colorKey}`]: {
          background: darkColor,
          color: darkColor,
        },
      };
    },
    {} as CSSObject,
  );

  return {
    [componentCls]: {
      ...resetComponent(token),
      position: 'relative',
      display: 'inline-block',
      lineHeight: 1,

      [`${componentCls}-count`]: {
        zIndex: badgeZIndex,
        minWidth: badgeHeight,
        height: badgeHeight,
        color: badgeTextColor,
        fontWeight: badgeFontWeight,
        fontSize: badgeFontSize,
        lineHeight: `${badgeHeight}px`,
        whiteSpace: 'nowrap',
        textAlign: 'center',
        background: badgeColor,
        borderRadius: badgeHeight / 2,
        boxShadow: `0 0 0 ${badgeShadowSize}px ${badgeShadowColor}`,
        transition: `background ${motionDurationFast}`,

        a: {
          color: badgeTextColor,
        },
        'a:hover': {
          color: badgeTextColor,
        },

        'a:hover &': {
          background: badgeColorHover,
        },
      },
      [`${componentCls}-count-sm`]: {
        minWidth: badgeHeightSm,
        height: badgeHeightSm,
        fontSize: badgeFontSizeSm,
        lineHeight: `${badgeHeightSm}px`,
        borderRadius: badgeHeightSm / 2,
      },

      [`${componentCls}-multiple-words`]: {
        padding: `0 ${paddingXS}px`,
      },

      [`${componentCls}-dot`]: {
        zIndex: badgeZIndex,
        width: badgeDotSize,
        minWidth: badgeDotSize,
        height: badgeDotSize,
        background: badgeColor,
        borderRadius: '100%',
        boxShadow: `0 0 0 ${badgeShadowSize}px ${badgeShadowColor}`,
      },
      [`${componentCls}-dot${numberPrefixCls}`]: {
        transition: `background ${motionDurationSlow}`,
      },
      [`${componentCls}-count, ${componentCls}-dot, ${numberPrefixCls}-custom-component`]: {
        position: 'absolute',
        top: 0,
        insetInlineEnd: 0,
        transform: 'translate(50%, -50%)',
        transformOrigin: '100% 0%',
        [`${iconCls}-spin`]: {
          animationName: antBadgeLoadingCircle,
          animationDuration: motionDurationFast,
          animationIterationCount: 'infinite',
          animationTimingFunction: 'linear',
        },
      },
      [`&${componentCls}-status`]: {
        lineHeight: 'inherit',
        verticalAlign: 'baseline',

        [`${componentCls}-status-dot`]: {
          position: 'relative',
          top: -1, // Magic number, but seems better experience
          display: 'inline-block',
          width: badgeStatusSize,
          height: badgeStatusSize,
          verticalAlign: 'middle',
          borderRadius: '50%',
        },

        [`${componentCls}-status-success`]: {
          backgroundColor: colorSuccess,
        },
        [`${componentCls}-status-processing`]: {
          position: 'relative',
          backgroundColor: colorPrimary,

          '&::after': {
            position: 'absolute',
            top: 0,
            insetInlineStart: 0,
            width: '100%',
            height: '100%',
            border: `${badgeShadowSize}px solid ${colorPrimary}`,
            borderRadius: '50%',
            animationName: antStatusProcessing,
            animationDuration: badgeProcessingDuration,
            animationIterationCount: 'infinite',
            animationTimingFunction: 'ease-in-out',
            content: '""',
          },
        },
        [`${componentCls}-status-default`]: {
          backgroundColor: colorTextPlaceholder,
        },

        [`${componentCls}-status-error`]: {
          backgroundColor: colorError,
        },

        [`${componentCls}-status-warning`]: {
          backgroundColor: colorWarning,
        },
        ...statusPreset,
        [`${componentCls}-status-text`]: {
          marginInlineStart: marginXS,
          color: colorText,
          fontSize,
        },
      },
      [`${componentCls}-zoom-appear, ${componentCls}-zoom-enter`]: {
        animationName: antZoomBadgeIn,
        animationDuration: motionDurationSlow,
        animationTimingFunction: motionEaseOutBack,
        animationFillMode: 'both',
      },
      [`${componentCls}-zoom-leave`]: {
        animationName: antZoomBadgeOut,
        animationDuration: motionDurationSlow,
        animationTimingFunction: motionEaseOutBack,
        animationFillMode: 'both',
      },
      [`&${componentCls}-not-a-wrapper`]: {
        [`${componentCls}-zoom-appear, ${componentCls}-zoom-enter`]: {
          animationName: antNoWrapperZoomBadgeIn,
          animationDuration: motionDurationSlow,
          animationTimingFunction: motionEaseOutBack,
        },

        [`${componentCls}-zoom-leave`]: {
          animationName: antNoWrapperZoomBadgeOut,
          animationDuration: motionDurationSlow,
          animationTimingFunction: motionEaseOutBack,
        },
        [`&:not(${componentCls}-status)`]: {
          verticalAlign: 'middle',
        },
        [`${numberPrefixCls}-custom-component, ${componentCls}-count`]: {
          transform: 'none',
        },
        [`${numberPrefixCls}-custom-component, ${numberPrefixCls}`]: {
          position: 'relative',
          top: 'auto',
          display: 'block',
          transformOrigin: '50% 50%',
        },
      },
      [`${numberPrefixCls}`]: {
        overflow: 'hidden',
        direction: 'ltr',
        [`${numberPrefixCls}-only`]: {
          position: 'relative',
          display: 'inline-block',
          height: badgeHeight,
          transition: `all ${motionDurationSlow} ${motionEaseOutBack}`,
          WebkitTransformStyle: 'preserve-3d',
          WebkitBackfaceVisibility: 'hidden',
          [`> p${numberPrefixCls}-only-unit`]: {
            height: badgeHeight,
            margin: 0,
            WebkitTransformStyle: 'preserve-3d',
            WebkitBackfaceVisibility: 'hidden',
          },
        },
        [`${numberPrefixCls}-symbol`]: { verticalAlign: 'top' },
      },
    },
    [`${ribbonWrapperPrefixCls}`]: { position: 'relative' },
    [`${ribbonPrefixCls}`]: {
      ...resetComponent(token),
      position: 'absolute',
      top: marginXS,
      height: badgeFontHeight,
      padding: `0 ${paddingXS}px`,
      color: colorPrimary,
      lineHeight: `${badgeFontHeight}px`,
      whiteSpace: 'nowrap',
      backgroundColor: colorPrimary,
      borderRadius: borderRadiusSM,
      [`${ribbonPrefixCls}-text`]: { color: colorTextLightSolid },
      [`${ribbonPrefixCls}-corner`]: {
        position: 'absolute',
        top: '100%',
        width: badgeRibbonOffset,
        height: badgeRibbonOffset,
        color: 'currentcolor',
        border: `${badgeRibbonOffset / 2}px solid`,
        transform: badgeRibbonCornerTransform,
        transformOrigin: 'top',
        filter: badgeRibbonCornerFilter,
      },
      ...statusRibbonPreset,
      [`&${ribbonPrefixCls}-placement-end`]: {
        insetInlineEnd: -badgeRibbonOffset,
        borderEndEndRadius: 0,
        [`${ribbonPrefixCls}-corner`]: {
          insetInlineEnd: 0,
          borderColor: 'currentcolor transparent transparent currentcolor',
        },
      },
      [`&${ribbonPrefixCls}-placement-start`]: {
        insetInlineStart: -badgeRibbonOffset,
        borderEndStartRadius: 0,
        [`${ribbonPrefixCls}-corner`]: {
          insetInlineStart: 0,
          borderColor: 'currentcolor currentcolor transparent transparent',
        },
      },
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook('Badge', (token) => {
  const {
    fontSize,
    lineHeight,
    fontSizeSM,
    lineWidth,
    marginXS,
    colorBorderBg,
    colorBgContainer,
    colorError,
    colorErrorHover,
  } = token;

  const badgeFontHeight = Math.round(fontSize * lineHeight);
  const badgeShadowSize = lineWidth;
  const badgeZIndex = 'auto';
  const badgeHeight = badgeFontHeight - 2 * badgeShadowSize;
  const badgeTextColor = colorBgContainer;
  const badgeFontWeight = 'normal';
  const badgeFontSize = fontSizeSM;
  const badgeColor = colorError;
  const badgeColorHover = colorErrorHover;
  const badgeHeightSm = fontSize;
  const badgeDotSize = fontSizeSM / 2;
  const badgeFontSizeSm = fontSizeSM;
  const badgeStatusSize = fontSizeSM / 2;

  const badgeToken = mergeToken<BadgeToken>(token, {
    badgeFontHeight,
    badgeShadowSize,
    badgeZIndex,
    badgeHeight,
    badgeTextColor,
    badgeFontWeight,
    badgeFontSize,
    badgeColor,
    badgeColorHover,
    badgeShadowColor: colorBorderBg,
    badgeHeightSm,
    badgeDotSize,
    badgeFontSizeSm,
    badgeStatusSize,
    badgeProcessingDuration: '1.2s',
    badgeRibbonOffset: marginXS,

    // Follow token just by Design. Not related with token
    badgeRibbonCornerTransform: 'scaleY(0.75)',
    badgeRibbonCornerFilter: `brightness(75%)`,
  });

  return [genSharedBadgeStyle(badgeToken)];
});
