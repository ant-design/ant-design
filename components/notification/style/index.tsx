import type { CSSObject } from '@ant-design/cssinjs';
import { Keyframes } from '@ant-design/cssinjs';
import type { CSSProperties } from 'react';
import { resetComponent } from '../../style';
import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';
import genNotificationPlacementStyle from './placement';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  zIndexPopup: number;
  componentWidth: number;
  componentBg: string;
  componentPaddingBlockStart: CSSProperties['paddingBlockStart'];
  componentPaddingBlockEnd: CSSProperties['paddingBlockEnd'];
  componentPaddingInlineStart: CSSProperties['paddingInlineStart'];
  componentPaddingInlineEnd: CSSProperties['paddingInlineEnd'];
  componentMarginBottom: number;
  componentMarginInlineEnd: number;
}

export interface NotificationToken extends FullToken<'Notification'> {
  animationMaxHeight: number;
  notificationIconSize: number;
  notificationCloseBtnSize: number;
}

const genNotificationStyle: GenerateStyle<NotificationToken> = (token) => {
  const {
    iconCls,
    componentCls, // .ant-notification
    boxShadow,
    fontSizeLG,
    componentMarginBottom,
    borderRadiusLG,
    colorSuccess,
    colorInfo,
    colorWarning,
    colorError,
    colorTextHeading,
    componentBg,
    componentMarginInlineEnd,
    motionDurationMid,
    motionEaseInOut,
    fontSize,
    lineHeight,
    componentWidth,
    notificationIconSize,
    componentPaddingInlineStart,
    componentPaddingInlineEnd,
    componentPaddingBlockStart,
    componentPaddingBlockEnd,
  } = token;

  const noticeCls = `${componentCls}-notice`;

  const notificationFadeIn = new Keyframes('antNotificationFadeIn', {
    '0%': {
      left: {
        _skip_check_: true,
        value: componentWidth,
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
      marginBottom: componentMarginBottom,
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

  const noticeStyle: CSSObject = {
    position: 'relative',
    width: componentWidth,
    maxWidth: `calc(100vw - ${componentMarginInlineEnd * 2}px)`,
    marginBottom: componentMarginBottom,
    marginInlineStart: 'auto',
    paddingInlineStart: componentPaddingInlineStart,
    paddingInlineEnd: componentPaddingInlineEnd,
    paddingBlockStart: componentPaddingBlockStart,
    paddingBlockEnd: componentPaddingBlockEnd,
    overflow: 'hidden',
    lineHeight,
    wordWrap: 'break-word',
    background: componentBg,
    borderRadius: borderRadiusLG,
    boxShadow,

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
      top: componentPaddingBlockStart,
      insetInlineEnd: componentPaddingInlineEnd,
      color: token.colorIcon,
      outline: 'none',
      width: token.notificationCloseBtnSize,
      height: token.notificationCloseBtnSize,
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

  return [
    // ============================ Holder ============================
    {
      [componentCls]: {
        ...resetComponent(token),

        position: 'fixed',
        zIndex: token.zIndexPopup,
        marginInlineEnd: componentMarginInlineEnd,

        [`${componentCls}-hook-holder`]: {
          position: 'relative',
        },

        [`&${componentCls}-top, &${componentCls}-bottom`]: {
          [noticeCls]: {
            marginInline: 'auto auto',
          },
        },

        [`&${componentCls}-topLeft, &${componentCls}-bottomLeft`]: {
          [noticeCls]: {
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

          [`${noticeCls}-btn`]: {
            float: 'left',
          },
        },
      },
    },

    // ============================ Notice ============================
    {
      [componentCls]: {
        [noticeCls]: {
          ...noticeStyle,
        },
      },
    },

    // ============================= Pure =============================
    {
      [`${noticeCls}-pure-panel`]: {
        ...noticeStyle,
        margin: 0,
      },
    },
  ];
};

// ============================== Export ==============================
export default genComponentStyleHook(
  'Notification',
  (token) => {
    const notificationToken = mergeToken<NotificationToken>(token, {
      // index.less variables
      animationMaxHeight: 150,
      notificationIconSize: token.fontSizeLG * token.lineHeightLG,
      notificationCloseBtnSize: token.controlHeightLG * 0.55,
    });

    return [genNotificationStyle(notificationToken)];
  },
  (token) => {
    const paddingBlock = token.paddingMD;
    const paddingInline = token.paddingContentHorizontalLG;
    return {
      zIndexPopup: token.zIndexPopupBase + 50,
      componentWidth: 384,
      componentBg: token.colorBgElevated,
      componentPaddingInlineStart: paddingInline,
      componentPaddingInlineEnd: paddingInline,
      componentPaddingBlockStart: paddingBlock,
      componentPaddingBlockEnd: paddingBlock,
      componentMarginBottom: token.margin,
      componentMarginInlineEnd: token.marginLG,
    };
  },
);
