// deps-lint-skip-all
import { CSSObject } from '@ant-design/cssinjs';
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

const genSharedBadgeStyle = (
  token: BadgeToken,
  badgePrefixCls: string,
  numberPrefixCls: string,
  iconPrefixCls: string,
  ribbonPrefixCls: string,
  ribbonWrapperPrefixCls: string,
  commonToken: DerivativeToken,
): CSSObject => ({
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
      lineHeight: token.badgeHeight,
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
      position: 'absolute',
      top: '0',
      right: '0',
      transform: 'translate(50%, -50%)',
      transformOrigin: '100% 0%',
      [`.${iconPrefixCls}-spin`]: {
        animation: 'antBadgeLoadingCircle 1s infinite linear',
      },
    },
    [`.${badgePrefixCls}-count-sm`]: {
      minWidth: token.badgeHeightSm,
      height: token.badgeHeightSm,
      padding: 0,
      fontSize: token.badgeFontSizeSm,
      lineHeight: token.badgeHeightSm,
      borderRadius: `(${token.badgeHeightSm} / 2)`,
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
    [`.${badgePrefixCls}-dot`]: {
      position: 'absolute',
      top: '0',
      right: '0',
      transform: 'translate(50%, -50%)',
      transformOrigin: '100% 0%',
      [`.${iconPrefixCls}-spin`]: {
        animation: 'antBadgeLoadingCircle 1s infinite linear',
      },
    },
    [`.${numberPrefixCls}-custom-component`]: {
      position: 'absolute',
      top: '0',
      right: '0',
      transform: 'translate(50%, -50%)',
      transformOrigin: '100% 0%',
      [`.${iconPrefixCls}-spin`]: {
        animation: 'antBadgeLoadingCircle 1s infinite linear',
      },
    },
    [`.${badgePrefixCls}-status`]: {
      lineHeight: 'inherit',
      verticalAlign: 'baseline',

      [`.${badgePrefixCls}-dot`]: {
        position: 'relative',
        top: '-1px',
        display: 'inline-block',
        width: token.badgeStatusSize,
        height: token.badgeStatusSize,
        verticalAlign: 'middle',
        borderRadius: '50%',
      },

      [`.${badgePrefixCls}-success`]: {
        backgroundColor: commonToken.successColor,
      },
      [`.${badgePrefixCls}-processing`]: {
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
          animation: `antStatusProcessing 1.2s infinite ease-in-out`,
          content: '',
        },
      },
      [`.${badgePrefixCls}-default`]: {
        backgroundColor: '#d9d9d9', // todo @normal-color;
      },

      [`.${badgePrefixCls}-error`]: {
        backgroundColor: commonToken.errorColor,
      },

      [`.${badgePrefixCls}-warning`]: {
        backgroundColor: commonToken.warningColor,
      },

      // todo
      // // mixin to iterate over colors and create CSS class for each one
      // .make-color-classes(@i: length(@preset-colors)) when (@i > 0) {
      //   .make-color-classes(@i - 1);
      //   @color: extract(@preset-colors, @i);
      //   @darkColor: '@{color}-6';
      //   &-@{color} {
      //     background: @@darkColor;
      //   }
      // }
      // .make-color-classes();

      [`.${badgePrefixCls}-text`]: {
        marginLeft: 8,
        color: commonToken.textColor,
        fontSize: commonToken.fontSize,
      },
    },
    [`.${badgePrefixCls}-zoom-appear`]: {
      animation: `antZoomBadgeIn ${commonToken.duration} ${commonToken.easeOutBack}`,
      animationFillMode: 'both',
    },
    [`.${badgePrefixCls}-zoom-enter`]: {
      animation: `antZoomBadgeIn ${commonToken.duration} ${commonToken.easeOutBack}`,
      animationFillMode: 'both',
    },
    [`.${badgePrefixCls}-zoom-leave`]: {
      animation: `antZoomBadgeOut ${commonToken.duration} ${commonToken.easeOutBack}`,
      animationFillMode: 'both',
    },
    [`.${badgePrefixCls}-not-a-wrapper`]: {
      [`.${badgePrefixCls}-zoom-appear`]: {
        animation: `antNoWrapperZoomBadgeIn ${commonToken.duration} ${commonToken.easeOutBack}`,
      },
      [`.${badgePrefixCls}-zoom-enter`]: {
        animation: `antNoWrapperZoomBadgeIn ${commonToken.duration} ${commonToken.easeOutBack}`,
      },

      [`.${badgePrefixCls}-zoom-leave`]: {
        animation: `antNoWrapperZoomBadgeOut ${commonToken.duration} ${commonToken.easeOutBack}`,
      },
      [`&:not(.${badgePrefixCls}-status)`]: {
        verticalAlign: 'middle',
      },
      [`.${numberPrefixCls}-custom-component`]: {
        transform: 'none',
      },
      [`.${badgePrefixCls}-count`]: {
        transform: 'none',
      },
      [`.${numberPrefixCls}-custom-component`]: {
        position: 'relative',
        top: 'auto',
        display: 'block',
        transformOrigin: '50% 50%',
      },
      [`.${numberPrefixCls}`]: {
        position: 'relative',
        top: 'auto',
        display: 'block',
        transformOrigin: '50% 50%',
      },
    },
  },
  '@keyframes antStatusProcessing': {
    '0%': { transform: 'scale(0.8)', opacity: 0.5 },
    '100%': { transform: 'scale(2.4)', opacity: 0 },
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
  '@keyframes antZoomBadgeIn': {
    '0%': { transform: 'scale(0) translate(50%, -50%)', opacity: 0 },
    '100%': { transform: 'scale(1) translate(50%, -50%)' },
  },
  '@keyframes antZoomBadgeOut': {
    '0%': { transform: 'scale(1) translate(50%, -50%)' },
    '100%': { transform: 'scale(0) translate(50%, -50%)', opacity: 0 },
  },
  '@keyframes antNoWrapperZoomBadgeIn': {
    '0%': { transform: 'scale(0)', opacity: 0 },
    '100%': { transform: 'scale(1)' },
  },
  '@keyframes antNoWrapperZoomBadgeOut': {
    '0%': { transform: 'scale(1)' },
    '100%': { transform: 'scale(0)', opacity: 0 },
  },
  '@keyframes antBadgeLoadingCircle': {
    '0%': { transformOrigin: '50%' },
    '100%': {
      transform: 'translate(50%, -50%) rotate(360deg)',
      transformOrigin: '50%',
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
    lineHeight: 22,
    whiteSpace: 'nowrap',
    backgroundColor: commonToken.primaryColor,
    borderRadius: commonToken.borderRadius,
    [`.${ribbonPrefixCls}-text`]: { color: '#000' },
    [`.${ribbonPrefixCls}-corner`]: {
      position: 'absolute',
      top: '100%',
      width: '8px',
      height: '8px',
      color: 'currentcolor',
      border: '4px solid',
      transform: 'scaleY(0.75)',
      transformOrigin: 'top',
      '::after': {
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
    // todo
    // .make-color-classes(@i: length(@preset-colors)) when (@i > 0) {
    //   .make-color-classes(@i - 1);
    //   @color: extract(@preset-colors, @i);
    //   @darkColor: '@{color}-6';
    //   &-color-@{color} {
    //     color: @@darkColor;
    //     background: @@darkColor;
    //   }
    // }
    // .make-color-classes();
    [`.${ribbonPrefixCls}-placement-end`]: {
      right: '-8px',
      borderBottomRightRadius: '0',
      [`.${ribbonPrefixCls}-corner`]: {
        right: '0',
        borderColor: 'currentcolor transparent transparent currentcolor',
      },
    },
    [`.${ribbonPrefixCls}-placement-start`]: {
      left: '-8px',
      borderBottomLeftRadius: '0',
      [`.${ribbonPrefixCls}-corner`]: {
        left: '0',
        borderColor: 'currentcolor currentcolor transparent transparent',
      },
    },
  },
});

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
        token,
      ),
      { display: 'none' },
    ]),
    hashId,
  ];
}
