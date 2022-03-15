// deps-lint-skip-all
import { CSSObject, Keyframes } from '@ant-design/cssinjs';
import { useStyleRegister, useToken, resetComponent } from '../../_util/theme';
import type { DerivativeToken } from '../../_util/theme';

interface BadgeToken extends DerivativeToken {
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

const tmpPreset = {
  pink: '#eb2f96',
};

const genSharedBadgeStyle = (
  token: BadgeToken,
  badgePrefixCls: string,
  numberPrefixCls: string,
  iconPrefixCls: string,
  ribbonPrefixCls: string,
  ribbonWrapperPrefixCls: string,
  hashId: string,
  commonToken: DerivativeToken,
): CSSObject => {
  // 这里等https://github.com/ant-design/ant-design/pull/34422 合并后会用他的常量再改
  const statusPreset = {} as any;
  const statusRibbonPreset = {} as any;

  Object.keys(tmpPreset).forEach(preset => {
    statusPreset[`.${badgePrefixCls}-status-${preset}`] = {
      background: tmpPreset[preset],
    };
    statusRibbonPreset[`&.${ribbonPrefixCls}-color-${preset}`] = {
      background: tmpPreset[preset],
      color: tmpPreset[preset],
    };
  });

  return {
    [`.${badgePrefixCls}`]: {
      ...resetComponent(token),
      position: 'relative',
      display: 'inline-block',
      lineHeight: 1,

      [`.${badgePrefixCls}-count`]: {
        zIndex: token.badgeZIndex,
        minWidth: token.badgeHeight,
        height: token.badgeHeight,
        padding: '0 6px',
        color: token.badgeTextColor,
        fontWeight: token.badgeFontWeight,
        fontSize: token.badgeFontSize,
        lineHeight: `${token.badgeHeight}px`,
        whiteSpace: 'nowrap',
        textAlign: 'center',
        background: token.badgeColor,
        borderRadius: token.badgeHeight / 2,
        boxShadow: `0 0 0 1px ${commonToken.componentBackground}`,
        a: {
          color: token.badgeTextColor,
        },
        'a:hover': {
          color: token.badgeTextColor,
        },
      },
      [`.${badgePrefixCls}-count-sm`]: {
        minWidth: token.badgeHeightSm,
        height: token.badgeHeightSm,
        padding: 0,
        fontSize: token.badgeFontSizeSm,
        lineHeight: `${token.badgeHeightSm}px`,
        borderRadius: token.badgeHeightSm / 2,
      },

      [`.${badgePrefixCls}-multiple-words`]: {
        padding: '0 8px',
      },

      [`.${badgePrefixCls}-dot`]: {
        zIndex: token.badgeZIndex,
        width: token.badgeDotSize,
        minWidth: token.badgeDotSize,
        height: token.badgeDotSize,
        background: token.badgeColor,
        borderRadius: '100%',
        boxShadow: `0 0 0 1px ${commonToken.componentBackground}`,
      },
      [`.${badgePrefixCls}-dot.${numberPrefixCls}`]: {
        transition: 'background 1.5s',
      },
      [`.${badgePrefixCls}-count, .${badgePrefixCls}-dot, .${numberPrefixCls}-custom-component`]: {
        position: 'absolute',
        top: '0',
        right: '0',
        transform: 'translate(50%, -50%)',
        transformOrigin: '100% 0%',
        [`.${iconPrefixCls}-spin`]: {
          animation: `${antBadgeLoadingCircle.getName(hashId)} 1s infinite linear`,
        },
      },
      [`&.${badgePrefixCls}-status`]: {
        lineHeight: 'inherit',
        verticalAlign: 'baseline',

        [`.${badgePrefixCls}-status-dot`]: {
          position: 'relative',
          top: '-1px',
          display: 'inline-block',
          width: token.badgeStatusSize,
          height: token.badgeStatusSize,
          verticalAlign: 'middle',
          borderRadius: '50%',
        },

        [`.${badgePrefixCls}-status-success`]: {
          backgroundColor: commonToken.successColor,
        },
        [`.${badgePrefixCls}-status-processing`]: {
          position: 'relative',
          backgroundColor: commonToken.primaryColor,

          '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: `1px solid ${commonToken.primaryColor}`,
            borderRadius: '50%',
            animation: `${antStatusProcessing.getName(hashId)} 1.2s infinite ease-in-out`,
            content: '',
          },
        },
        [`.${badgePrefixCls}-status-default`]: {
          backgroundColor: '#d9d9d9', // todo @normal-color;
        },

        [`.${badgePrefixCls}-status-error`]: {
          backgroundColor: commonToken.errorColor,
        },

        [`.${badgePrefixCls}-status-warning`]: {
          backgroundColor: commonToken.warningColor,
        },
        ...statusPreset,
        [`.${badgePrefixCls}-status-text`]: {
          marginLeft: 8,
          color: commonToken.textColor,
          fontSize: commonToken.fontSize,
        },
      },
      [`.${badgePrefixCls}-zoom-appear, .${badgePrefixCls}-zoom-enter`]: {
        animation: `${antZoomBadgeIn.getName(hashId)} ${commonToken.duration} ${
          commonToken.easeOutBack
        }`,
        animationFillMode: 'both',
      },
      [`.${badgePrefixCls}-zoom-leave`]: {
        animation: `${antZoomBadgeOut.getName(hashId)} ${commonToken.duration} ${
          commonToken.easeOutBack
        }`,
        animationFillMode: 'both',
      },
      [`&.${badgePrefixCls}-not-a-wrapper`]: {
        [`.${badgePrefixCls}-zoom-appear, .${badgePrefixCls}-zoom-enter`]: {
          animation: `${antNoWrapperZoomBadgeIn.getName(hashId)} ${commonToken.duration} ${
            commonToken.easeOutBack
          }`,
        },

        [`.${badgePrefixCls}-zoom-leave`]: {
          animation: `${antNoWrapperZoomBadgeOut.getName(hashId)} ${commonToken.duration} ${
            commonToken.easeOutBack
          }`,
        },
        [`&:not(.${badgePrefixCls}-status)`]: {
          verticalAlign: 'middle',
        },
        [`.${numberPrefixCls}-custom-component, .${badgePrefixCls}-count`]: {
          transform: 'none',
        },
        [`.${numberPrefixCls}-custom-component, .${numberPrefixCls}`]: {
          position: 'relative',
          top: 'auto',
          display: 'block',
          transformOrigin: '50% 50%',
        },
      },
      [`.${numberPrefixCls}`]: {
        overflow: 'hidden',
        direction: 'ltr',
        [`.${numberPrefixCls}-only`]: {
          position: 'relative',
          display: 'inline-block',
          height: token.badgeHeight,
          transition: `all ${commonToken.duration} ${commonToken.easeOutBack}`,
          WebkitTransformStyle: 'preserve-3d',
          WebkitBackfaceVisibility: 'hidden',
          [`> p.${numberPrefixCls}-only-unit`]: {
            height: token.badgeHeight,
            margin: '0',
            WebkitTransformStyle: 'preserve-3d',
            WebkitBackfaceVisibility: 'hidden',
          },
        },
        [`.${numberPrefixCls}-symbol`]: { verticalAlign: 'top' },
      },
    },
    [`.${ribbonWrapperPrefixCls}`]: { position: 'relative' },
    [`.${ribbonPrefixCls}`]: {
      ...resetComponent(token),
      position: 'absolute',
      top: 8,
      height: 22,
      padding: '0 8px',
      color: token.badgeTextColor,
      lineHeight: '22px',
      whiteSpace: 'nowrap',
      backgroundColor: commonToken.primaryColor,
      borderRadius: commonToken.borderRadius,
      [`.${ribbonPrefixCls}-text`]: { color: '#fff' },
      [`.${ribbonPrefixCls}-corner`]: {
        position: 'absolute',
        top: '100%',
        width: '8px',
        height: '8px',
        color: 'currentcolor',
        border: '4px solid',
        transform: 'scaleY(0.75)',
        transformOrigin: 'top',
        '&::after': {
          position: 'absolute',
          top: '-4px',
          left: '-4px',
          width: 'inherit',
          height: 'inherit',
          color: 'rgba(0, 0, 0, 0.25)',
          border: 'inherit',
          content: "''",
        },
      },
      ...statusRibbonPreset,
      [`&.${ribbonPrefixCls}-placement-end`]: {
        right: '-8px',
        borderBottomRightRadius: '0',
        [`.${ribbonPrefixCls}-corner`]: {
          right: '0',
          borderColor: 'currentcolor transparent transparent currentcolor',
        },
      },
      [`&.${ribbonPrefixCls}-placement-start`]: {
        left: '-8px',
        borderBottomLeftRadius: '0',
        [`.${ribbonPrefixCls}-corner`]: {
          left: '0',
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
export default function useStyle(antPrefix: string, badgePrefixCls: string, iconPrefixCls: string) {
  const [theme, token, hashId] = useToken();

  const badgeZIndex = 'auto';
  const badgeHeight = 20;
  const badgeTextColor = token.componentBackground;
  const badgeFontWeight = 'normal';
  const badgeFontSize = token.fontSizeSM;
  const badgeColor = token.highlightColor;
  const badgeHeightSm = 14;
  const badgeDotSize = 6;
  const badgeFontSizeSm = token.fontSizeSM;
  const badgeStatusSize = 6;

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

  const numberPrefixCls = `${antPrefix}-scroll-number`;
  const ribbonPrefixCls = `${antPrefix}-ribbon`;
  const ribbonWrapperPrefixCls = `${antPrefix}-ribbon-wrapper`;

  return [
    useStyleRegister({ theme, token, hashId, path: [badgePrefixCls] }, () => [
      genSharedBadgeStyle(
        badgeToken,
        badgePrefixCls,
        numberPrefixCls,
        iconPrefixCls,
        ribbonPrefixCls,
        ribbonWrapperPrefixCls,
        hashId,
        token,
      ),
      { display: 'none' },
    ]),
    hashId,
  ];
}
