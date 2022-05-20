// deps-lint-skip-all
import type { CSSObject } from '@ant-design/cssinjs';
import { Keyframes } from '@ant-design/cssinjs';
import type { FullToken, GenerateStyle } from '../../_util/theme';
import { genComponentStyleHook, mergeToken, resetComponent } from '../../_util/theme';
import genNotificationPlacementStyle from './placement';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  zIndexPopup: number;
  width: number;
}

export interface NotificationToken extends FullToken<'Notification'> {
  notificationBg: string;
  notificationPaddingVertical: number;
  notificationPaddingHorizontal: number;
  popoverBackground: string;
  notificationPadding: string;
  notificationMarginBottom: number;
  notificationMarginEdge: number;
  animationMaxHeight: number;
}

const genNotificationStyle: GenerateStyle<NotificationToken, CSSObject> = token => {
  const {
    iconCls,
    componentCls, // .ant-notification
    boxShadow,
    fontSizeLG,
    notificationMarginBottom,
    radiusBase,
    colorSuccess,
    colorInfo,
    colorWarning,
    colorError,
    colorTextHeading,
    notificationBg,
    notificationPadding,
    notificationMarginEdge,
    motionDurationMid,
    motionEaseInOut,
    fontSizeBase,
    lineHeight,
    width,
  } = token;

  const notificationFadeIn = new Keyframes('antNotificationFadeIn', {
    '0%': {
      left: {
        _skip_check_: true,
        value: width,
      },
      opacity: 0,
    },

    '100%': {
      left: {
        _skip_check_: true,
        value: 0,
      },
      opacity: 1,
    },
  });

  const notificationFadeOut = new Keyframes('antNotificationFadeOut', {
    '0%': {
      maxHeight: token.animationMaxHeight,
      marginBottom: notificationMarginBottom,
      opacity: 1,
    },

    '100%': {
      maxHeight: 0,
      marginBottom: 0,
      paddingTop: 0,
      paddingBottom: 0,
      opacity: 0,
    },
  });

  return {
    [componentCls]: {
      ...resetComponent(token),

      position: 'fixed',
      zIndex: token.zIndexPopup,
      marginInlineEnd: notificationMarginEdge,

      [`${componentCls}-close-icon`]: {
        fontSize: fontSizeBase,
        cursor: 'pointer',
      },

      [`${componentCls}-hook-holder`]: {
        position: 'relative',
      },

      [`${componentCls}-notice`]: {
        position: 'relative',
        width,
        maxWidth: `calc(100vw - ${notificationMarginEdge * 2}px)`,
        marginBottom: notificationMarginBottom,
        marginInlineStart: 'auto',
        padding: notificationPadding,
        overflow: 'hidden',
        lineHeight,
        wordWrap: 'break-word',
        background: notificationBg,
        borderRadius: radiusBase,
        boxShadow,

        [`&-message`]: {
          marginBottom: token.marginXS,
          color: colorTextHeading,
          fontSize: fontSizeLG,
          lineHeight: token.lineHeightLG,
        },

        '&-description': {
          fontSize: fontSizeBase,
        },

        [`&-closable ${componentCls}-notice-message`]: {
          paddingInlineEnd: token.paddingLG,
        },

        [`&-with-icon ${componentCls}-notice-message`]: {
          marginBottom: token.marginXXS,
          marginInlineStart: token.marginXXL,
          fontSize: fontSizeLG,
        },

        [`&-with-icon ${componentCls}-notice-description`]: {
          marginInlineStart: token.marginXXL,
          fontSize: fontSizeBase,
        },

        // Icon & color style in different selector level
        // https://github.com/ant-design/ant-design/issues/16503
        // https://github.com/ant-design/ant-design/issues/15512
        '&-icon': {
          position: 'absolute',
          marginInlineStart: token.marginXXS,
          fontSize: token.fontSizeLG * token.lineHeightLG,

          // icon-font
          [`&-success${iconCls}`]: {
            color: colorSuccess,
          },
          [`&-info${iconCls}`]: {
            color: colorInfo,
          },
          [`&-warning${iconCls}`]: {
            color: colorWarning,
          },
          [`&-error${iconCls}`]: {
            color: colorError,
          },
        },

        '&-close': {
          position: 'absolute',
          top: token.notificationPaddingVertical,
          insetInlineEnd: token.notificationPaddingHorizontal,
          color: token.colorAction,
          outline: 'none',

          '&:hover': {
            color: token.colorActionHover,
          },
        },

        '&-btn': {
          float: 'right',
          marginTop: token.margin,
        },
      },

      [`&${componentCls}-top, &${componentCls}-bottom`]: {
        [`${componentCls}-notice`]: {
          marginInline: 'auto auto',
        },
      },

      [`&${componentCls}-topLeft, &${componentCls}-bottomLeft`]: {
        [`${componentCls}-notice`]: {
          marginInlineEnd: 'auto',
          marginInlineStart: 0,
        },
      },

      //  animation
      [`${componentCls}-fade-enter, ${componentCls}-fade-appear`]: {
        animationDuration: token.motionDurationMid,
        animationTimingFunction: motionEaseInOut,
        animationFillMode: 'both',
        opacity: 0,
        animationPlayState: 'paused',
      },

      [`${componentCls}-fade-leave`]: {
        animationTimingFunction: motionEaseInOut,
        animationFillMode: 'both',

        animationDuration: motionDurationMid,
        animationPlayState: 'paused',
      },

      [`${componentCls}-fade-enter${componentCls}-fade-enter-active, ${componentCls}-fade-appear${componentCls}-fade-appear-active`]:
        {
          animationName: notificationFadeIn,
          animationPlayState: 'running',
        },

      [`${componentCls}-fade-leave${componentCls}-fade-leave-active`]: {
        animationName: notificationFadeOut,
        animationPlayState: 'running',
      },

      // placement
      ...genNotificationPlacementStyle(token),

      // RTL
      '&-rtl': {
        direction: 'rtl',

        [`${componentCls}-notice-btn`]: {
          float: 'left',
        },
      },
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook(
  'Notification',
  token => {
    const { colorBgComponent } = token;
    const notificationPaddingVertical = token.padding;
    const notificationPaddingHorizontal = token.paddingLG;

    const notificationToken = mergeToken<NotificationToken>(token, {
      // default.less variables
      notificationBg: colorBgComponent,
      notificationPaddingVertical,
      notificationPaddingHorizontal,
      // index.less variables
      popoverBackground: colorBgComponent,
      notificationPadding: `${notificationPaddingVertical}px ${notificationPaddingHorizontal}px`,
      notificationMarginBottom: token.margin,
      notificationMarginEdge: token.marginLG,
      animationMaxHeight: 150,
    });

    return [genNotificationStyle(notificationToken)];
  },
  token => ({
    zIndexPopup: token.zIndexPopupBase + 50,
    width: 384,
  }),
);
