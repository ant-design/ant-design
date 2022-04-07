// deps-lint-skip-all
import { CSSObject, Keyframes } from '@ant-design/cssinjs';
import {
  resetComponent,
  GenerateStyle,
  PresetColors,
  PresetColorType,
  genComponentStyleHook,
  FullToken,
} from '../../_util/theme';

interface BadgeToken extends FullToken<'Badge'> {
  badgeZIndex: number | string;
  badgeHeight: number;
  badgeHeightSm: number;
  badgeTextColor: string;
  badgeFontWeight: string;
  badgeFontSize: number;
  badgeColor: string;
  badgeDotSize: number;
  badgeFontSizeSm: number;
  badgeStatusSize: number;
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

const genSharedBadgeStyle: GenerateStyle<BadgeToken> = (
  token: BadgeToken,
  hashId: string,
): CSSObject => {
  const { componentCls, iconCls, antCls } = token;
  const numberPrefixCls = `${antCls}-scroll-number`;
  const ribbonPrefixCls = `${antCls}-ribbon`;
  const ribbonWrapperPrefixCls = `${antCls}-ribbon-wrapper`;

  // FIXME preset color 后面可能要统一重构
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
        zIndex: token.badgeZIndex,
        minWidth: token.badgeHeight,
        height: token.badgeHeight,
        padding: '0 6px', // FIXME: hard code, copied from old less file
        color: token.badgeTextColor,
        fontWeight: token.badgeFontWeight,
        fontSize: token.badgeFontSize,
        lineHeight: `${token.badgeHeight}px`,
        whiteSpace: 'nowrap',
        textAlign: 'center',
        background: token.badgeColor,
        borderRadius: token.badgeHeight / 2,
        boxShadow: `0 0 0 1px ${token.colorBgComponent}`,
        a: {
          color: token.badgeTextColor,
        },
        'a:hover': {
          color: token.badgeTextColor,
        },
      },
      [`${componentCls}-count-sm`]: {
        minWidth: token.badgeHeightSm,
        height: token.badgeHeightSm,
        padding: 0,
        fontSize: token.badgeFontSizeSm,
        lineHeight: `${token.badgeHeightSm}px`,
        borderRadius: token.badgeHeightSm / 2,
      },

      [`${componentCls}-multiple-words`]: {
        padding: `0 ${token.paddingXS}px`,
      },

      [`${componentCls}-dot`]: {
        zIndex: token.badgeZIndex,
        width: token.badgeDotSize,
        minWidth: token.badgeDotSize,
        height: token.badgeDotSize,
        background: token.badgeColor,
        borderRadius: '100%',
        boxShadow: `0 0 0 1px ${token.colorBgComponent}`,
      },
      [`${componentCls}-dot${numberPrefixCls}`]: {
        transition: 'background 1.5s', // FIXME: hard code, copied from old less file
      },
      [`${componentCls}-count, ${componentCls}-dot, ${numberPrefixCls}-custom-component`]: {
        position: 'absolute',
        top: 0,
        insetInlineEnd: 0,
        transform: 'translate(50%, -50%)',
        transformOrigin: '100% 0%',
        [`${iconCls}-spin`]: {
          animation: `${antBadgeLoadingCircle.getName(hashId)} ${
            token.motionDurationFast
          } infinite linear`,
        },
      },
      [`&${componentCls}-status`]: {
        lineHeight: 'inherit',
        verticalAlign: 'baseline',

        [`${componentCls}-status-dot`]: {
          position: 'relative',
          top: -1, // FIXME: hard code, copied from old less file
          display: 'inline-block',
          width: token.badgeStatusSize,
          height: token.badgeStatusSize,
          verticalAlign: 'middle',
          borderRadius: '50%',
        },

        [`${componentCls}-status-success`]: {
          backgroundColor: token.colorSuccess,
        },
        [`${componentCls}-status-processing`]: {
          position: 'relative',
          backgroundColor: token.colorPrimary,

          '&::after': {
            position: 'absolute',
            top: 0,
            insetInlineStart: 0,
            width: '100%',
            height: '100%',
            border: `1px solid ${token.colorPrimary}`,
            borderRadius: '50%',
            animation: `${antStatusProcessing.getName(hashId)} 1.2s infinite ease-in-out`, // FIXME: hard code, copied from old less file
            content: '""',
          },
        },
        [`${componentCls}-status-default`]: {
          backgroundColor: '#d9d9d9', // FIXME: @normal-color;
        },

        [`${componentCls}-status-error`]: {
          backgroundColor: token.colorError,
        },

        [`${componentCls}-status-warning`]: {
          backgroundColor: token.colorWarning,
        },
        ...statusPreset,
        [`${componentCls}-status-text`]: {
          marginInlineStart: token.marginXS,
          color: token.colorText,
          fontSize: token.fontSize,
        },
      },
      [`${componentCls}-zoom-appear, ${componentCls}-zoom-enter`]: {
        animation: `${antZoomBadgeIn.getName(hashId)} ${token.motionDurationSlow} ${
          token.motionEaseOutBack
        }`,
        animationFillMode: 'both',
      },
      [`${componentCls}-zoom-leave`]: {
        animation: `${antZoomBadgeOut.getName(hashId)} ${token.motionDurationSlow} ${
          token.motionEaseOutBack
        }`,
        animationFillMode: 'both',
      },
      [`&${componentCls}-not-a-wrapper`]: {
        [`${componentCls}-zoom-appear, ${componentCls}-zoom-enter`]: {
          animation: `${antNoWrapperZoomBadgeIn.getName(hashId)} ${token.motionDurationSlow} ${
            token.motionEaseOutBack
          }`,
        },

        [`${componentCls}-zoom-leave`]: {
          animation: `${antNoWrapperZoomBadgeOut.getName(hashId)} ${token.motionDurationSlow} ${
            token.motionEaseOutBack
          }`,
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
          height: token.badgeHeight,
          transition: `all ${token.motionDurationSlow} ${token.motionEaseOutBack}`,
          WebkitTransformStyle: 'preserve-3d',
          WebkitBackfaceVisibility: 'hidden',
          [`> p${numberPrefixCls}-only-unit`]: {
            height: token.badgeHeight,
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
      top: 8, // FIXME: hard code, copied from old less file
      height: 22, // FIXME: hard code, copied from old less file
      padding: `0 ${token.paddingXS}px`,
      color: token.badgeTextColor,
      lineHeight: '22px', // colorPrimarycode, copied from old less file
      whiteSpace: 'nowrap',
      backgroundColor: token.colorPrimary,
      borderRadius: token.controlRadius,
      [`${ribbonPrefixCls}-text`]: { color: '#fff' },
      [`${ribbonPrefixCls}-corner`]: {
        position: 'absolute',
        top: '100%',
        width: 8,
        height: 8,
        color: 'currentcolor',
        border: '4px solid', // FIXME: hard code, copied from old less file
        transform: 'scaleY(0.75)', // FIXME: hard code, copied from old less file
        transformOrigin: 'top',
        '&::after': {
          position: 'absolute',
          top: `${-0.5 * token.paddingXS}px`,
          insetInlineStart: `${-0.5 * token.paddingXS}px`,
          width: 'inherit',
          height: 'inherit',
          color: 'rgba(0, 0, 0, 0.25)',
          border: 'inherit',
          content: "''",
        },
      },
      ...statusRibbonPreset,
      [`&${ribbonPrefixCls}-placement-end`]: {
        insetInlineEnd: -1 * token.marginXS,
        borderBottomRightRadius: 0,
        [`${ribbonPrefixCls}-corner`]: {
          insetInlineEnd: 0,
          borderColor: 'currentcolor transparent transparent currentcolor',
        },
      },
      [`&${ribbonPrefixCls}-placement-start`]: {
        insetInlineStart: -1 * token.marginXS,
        borderBottomLeftRadius: 0,
        [`${ribbonPrefixCls}-corner`]: {
          insetInlineStart: 0,
          borderColor: 'currentcolor currentcolor transparent transparent',
        },
      },
      antStatusProcessing,
      antZoomBadgeIn,
      antZoomBadgeOut,
      antNoWrapperZoomBadgeIn,
      antNoWrapperZoomBadgeOut,
      antBadgeLoadingCircle,
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook('Badge', (token, { hashId }) => {
  const badgeZIndex = 'auto';
  const badgeHeight = 20; // FIXME: hard code
  const badgeTextColor = token.colorBgComponent;
  const badgeFontWeight = 'normal';
  const badgeFontSize = token.fontSizeSM;
  const badgeColor = token.colorHighlight;
  const badgeHeightSm = 14; // FIXME: hard code
  const badgeDotSize = 6; // FIXME: hard code
  const badgeFontSizeSm = token.fontSizeSM;
  const badgeStatusSize = 6; // FIXME: hard code

  const badgeToken: BadgeToken = {
    ...token,
    badgeZIndex,
    badgeHeight,
    badgeTextColor,
    badgeFontWeight,
    badgeFontSize,
    badgeColor,
    badgeHeightSm,
    badgeDotSize,
    badgeFontSizeSm,
    badgeStatusSize,
  };

  return [genSharedBadgeStyle(badgeToken, hashId), { display: 'none' }];
});
