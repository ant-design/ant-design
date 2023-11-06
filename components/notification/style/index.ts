import type { CSSObject } from '@ant-design/cssinjs';
import { Keyframes } from '@ant-design/cssinjs';
import { resetComponent } from '../../style';
import type { FullToken, GenerateStyle, AliasToken } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';
import genNotificationPlacementStyle from './placement';
import genStackStyle from './stack';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  /**
   * @desc 提醒框 z-index
   * @descEN z-index of Notification
   */
  zIndexPopup: number;
  /**
   * @desc 提醒框宽度
   * @descEN Width of Notification
   */
  width: number;
}

export interface NotificationToken extends FullToken<'Notification'> {
  animationMaxHeight: number;
  notificationBg: string;
  notificationPadding: string;
  notificationPaddingVertical: number;
  notificationPaddingHorizontal: number;
  notificationIconSize: number;
  notificationCloseButtonSize: number;
  notificationMarginBottom: number;
  notificationMarginEdge: number;
  notificationStackLayer: number;
}

export const genNoticeStyle = (token: NotificationToken): CSSObject => {
  const {
    iconCls,
    componentCls, // .ant-notification
    boxShadow,
    fontSizeLG,
    notificationMarginBottom,
    borderRadiusLG,
    colorSuccess,
    colorInfo,
    colorWarning,
    colorError,
    colorTextHeading,
    notificationBg,
    notificationPadding,
    notificationMarginEdge,
    fontSize,
    lineHeight,
    width,
    notificationIconSize,
    colorText,
  } = token;

  const noticeCls = `${componentCls}-notice`;

  return {
    position: 'relative',
    marginBottom: notificationMarginBottom,
    marginInlineStart: 'auto',
    background: notificationBg,
    borderRadius: borderRadiusLG,
    boxShadow,

    [noticeCls]: {
      padding: notificationPadding,
      width,
      maxWidth: `calc(100vw - ${notificationMarginEdge * 2}px)`,
      overflow: 'hidden',
      lineHeight,
      wordWrap: 'break-word',
    },

    [`${componentCls}-close-icon`]: {
      fontSize,
      cursor: 'pointer',
    },

    [`${noticeCls}-message`]: {
      marginBottom: token.marginXS,
      color: colorTextHeading,
      fontSize: fontSizeLG,
      lineHeight: token.lineHeightLG,
    },

    [`${noticeCls}-description`]: {
      fontSize,
      color: colorText,
    },

    [`&${noticeCls}-closable ${noticeCls}-message`]: {
      paddingInlineEnd: token.paddingLG,
    },

    [`${noticeCls}-with-icon ${noticeCls}-message`]: {
      marginBottom: token.marginXS,
      marginInlineStart: token.marginSM + notificationIconSize,
      fontSize: fontSizeLG,
    },

    [`${noticeCls}-with-icon ${noticeCls}-description`]: {
      marginInlineStart: token.marginSM + notificationIconSize,
      fontSize,
    },

    // Icon & color style in different selector level
    // https://github.com/ant-design/ant-design/issues/16503
    // https://github.com/ant-design/ant-design/issues/15512
    [`${noticeCls}-icon`]: {
      position: 'absolute',
      fontSize: notificationIconSize,
      lineHeight: 0,

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

    [`${noticeCls}-close`]: {
      position: 'absolute',
      top: token.notificationPaddingVertical,
      insetInlineEnd: token.notificationPaddingHorizontal,
      color: token.colorIcon,
      outline: 'none',
      width: token.notificationCloseButtonSize,
      height: token.notificationCloseButtonSize,
      borderRadius: token.borderRadiusSM,
      transition: `background-color ${token.motionDurationMid}, color ${token.motionDurationMid}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

      '&:hover': {
        color: token.colorIconHover,
        backgroundColor: token.wireframe ? 'transparent' : token.colorFillContent,
      },
    },

    [`${noticeCls}-btn`]: {
      float: 'right',
      marginTop: token.marginSM,
    },
  };
};

const genNotificationStyle: GenerateStyle<NotificationToken> = (token) => {
  const {
    componentCls, // .ant-notification
    notificationMarginBottom,
    notificationMarginEdge,
    motionDurationMid,
    motionEaseInOut,
  } = token;

  const noticeCls = `${componentCls}-notice`;

  const fadeOut = new Keyframes('antNotificationFadeOut', {
    '0%': {
      maxHeight: token.animationMaxHeight,
      marginBottom: notificationMarginBottom,
    },

    '100%': {
      maxHeight: 0,
      marginBottom: 0,
      paddingTop: 0,
      paddingBottom: 0,
      opacity: 0,
    },
  });

  return [
    // ============================ Holder ============================
    {
      [componentCls]: {
        ...resetComponent(token),

        position: 'fixed',
        zIndex: token.zIndexPopup,
        marginRight: {
          value: notificationMarginEdge,
          _skip_check_: true,
        },

        [`${componentCls}-hook-holder`]: {
          position: 'relative',
        },

        //  animation
        [`${componentCls}-fade-appear-prepare`]: {
          opacity: '0 !important',
        },

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
            animationPlayState: 'running',
          },

        [`${componentCls}-fade-leave${componentCls}-fade-leave-active`]: {
          animationName: fadeOut,
          animationPlayState: 'running',
        },

        // RTL
        '&-rtl': {
          direction: 'rtl',

          [`${noticeCls}-btn`]: {
            float: 'left',
          },
        },
      },
    },

    // ============================ Notice ============================
    {
      [componentCls]: {
        [`${noticeCls}-wrapper`]: {
          ...genNoticeStyle(token),
        },
      },
    },
  ];
};

// ============================== Export ==============================
export const prepareComponentToken = (token: AliasToken) => ({
  zIndexPopup: token.zIndexPopupBase + 50,
  width: 384,
});

export const prepareNotificationToken = (token: AliasToken) => {
  const notificationPaddingVertical = token.paddingMD;
  const notificationPaddingHorizontal = token.paddingLG;
  const notificationToken = mergeToken<NotificationToken>(token, {
    notificationBg: token.colorBgElevated,
    notificationPaddingVertical,
    notificationPaddingHorizontal,
    notificationIconSize: token.fontSizeLG * token.lineHeightLG,
    notificationCloseButtonSize: token.controlHeightLG * 0.55,
    notificationMarginBottom: token.margin,
    notificationPadding: `${token.paddingMD}px ${token.paddingContentHorizontalLG}px`,
    notificationMarginEdge: token.marginLG,
    animationMaxHeight: 150,
    notificationStackLayer: 3,
  });

  return notificationToken;
};

export default genComponentStyleHook(
  'Notification',
  (token) => {
    const notificationToken = prepareNotificationToken(token);

    return [
      genNotificationStyle(notificationToken),
      genNotificationPlacementStyle(notificationToken),
      genStackStyle(notificationToken),
    ];
  },
  prepareComponentToken,
);
