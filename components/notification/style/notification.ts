import type { CSSObject } from '@ant-design/cssinjs';
import { unit } from '@ant-design/cssinjs';

import { genFocusStyle } from '../../style';
import type { GenerateStyle } from '../../theme/internal';
import { genCssVar } from '../../theme/util/genStyleUtils';
import type { NotificationToken } from '.';

export const genNotificationItemMotionStyle = (token: NotificationToken): CSSObject => {
  const { motionDurationMid, motionEaseInOut } = token;

  return {
    transform: 'scale(var(--notification-scale, 1))',
    transition: [
      `transform ${motionDurationMid} ${motionEaseInOut}`,
      `inset ${motionDurationMid} ${motionEaseInOut}`,
      `clip-path ${motionDurationMid} ${motionEaseInOut}`,
      `opacity ${motionDurationMid} ${motionEaseInOut}`,
    ].join(', '),
  };
};

export const genNotificationItemStyle = (token: NotificationToken): CSSObject => {
  const {
    componentCls,
    antCls,
    boxShadow,
    fontSizeLG,
    borderRadiusLG,
    colorSuccess,
    colorInfo,
    colorWarning,
    colorError,
    colorTextHeading,
    notificationBg,
    notificationPadding,
    notificationMarginEdge,
    progressBg,
    notificationProgressHeight,
    fontSize,
    lineHeight,
    width,
    notificationIconSize,
    colorText,
    motionDurationMid,
  } = token;

  const noticeCls = `${componentCls}-notice`;
  const [varName, varRef] = genCssVar(antCls, 'notification');

  return {
    [noticeCls]: {
      // ============================== Base ==============================
      position: 'absolute',
      boxSizing: 'border-box',
      width,
      maxWidth: `calc(100vw - ${unit(token.calc(notificationMarginEdge).mul(2).equal())})`,
      padding: notificationPadding,
      pointerEvents: 'auto',
      [varName('icon-font-size')]: notificationIconSize,
      [varName('title-font-size')]: fontSizeLG,
      [varName('title-line-height')]: token.lineHeightLG,
      color: colorText,
      background: notificationBg,
      borderRadius: borderRadiusLG,
      boxShadow,
      fontSize,
      lineHeight,
      wordWrap: 'break-word',
      overflow: 'hidden',
      ...genNotificationItemMotionStyle(token),

      // ============================== Type ==============================
      '&-success': {
        background: varRef('color-success-bg', notificationBg),
      },
      '&-error': {
        background: varRef('color-error-bg', notificationBg),
      },
      '&-info': {
        background: varRef('color-info-bg', notificationBg),
      },
      '&-warning': {
        background: varRef('color-warning-bg', notificationBg),
      },
    },

    // ============================ Content ============================
    [`${noticeCls}-content`]: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: token.marginSM,
    },

    [`${noticeCls}-section`]: {
      display: 'flex',
      flexDirection: 'column',
      flex: 'auto',
      gap: token.marginXS,
      minWidth: 0,
    },

    [`${noticeCls}-title`]: {
      color: colorTextHeading,
      fontSize: varRef('title-font-size'),
      lineHeight: varRef('title-line-height'),
    },

    [`${noticeCls}-description`]: {
      color: colorText,
      fontSize,

      '&:first-child': {
        marginInlineEnd: token.marginSM,
      },
    },

    [`${noticeCls}-closable ${noticeCls}-title`]: {
      paddingInlineEnd: token.paddingLG,
    },

    // ============================= Icon =============================
    // Icon & color style in different selector level
    // https://github.com/ant-design/ant-design/issues/16503
    // https://github.com/ant-design/ant-design/issues/15512
    [`${noticeCls}-icon`]: {
      flex: 'none',
      fontSize: varRef('icon-font-size'),
      lineHeight: 1,

      [`&${noticeCls}-icon-success`]: {
        color: colorSuccess,
      },
      [`&${noticeCls}-icon-info`]: {
        color: colorInfo,
      },
      [`&${noticeCls}-icon-loading`]: {
        color: colorInfo,
      },
      [`&${noticeCls}-icon-warning`]: {
        color: colorWarning,
      },
      [`&${noticeCls}-icon-error`]: {
        color: colorError,
      },
    },

    // ============================ Close =============================
    [`${noticeCls}-close`]: {
      position: 'absolute',
      top: token.notificationPaddingVertical,
      insetInlineEnd: token.notificationPaddingHorizontal,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: token.notificationCloseButtonSize,
      height: token.notificationCloseButtonSize,
      color: token.colorIcon,
      background: 'none',
      border: 'none',
      borderRadius: token.borderRadiusSM,
      outline: 'none',
      transition: ['color', 'background-color']
        .map((prop) => `${prop} ${motionDurationMid}`)
        .join(', '),

      '&:hover': {
        color: token.colorIconHover,
        backgroundColor: token.colorBgTextHover,
      },

      '&:active': {
        backgroundColor: token.colorBgTextActive,
      },

      ...genFocusStyle(token),
    },

    // =========================== Progress ===========================
    [`${noticeCls}-progress`]: {
      position: 'absolute',
      bottom: 0,
      display: 'block',
      appearance: 'none',
      inlineSize: `calc(100% - ${unit(borderRadiusLG)} * 2)`,
      blockSize: notificationProgressHeight,
      border: 0,
      left: {
        _skip_check_: true,
        value: borderRadiusLG,
      },
      right: {
        _skip_check_: true,
        value: borderRadiusLG,
      },

      '&, &::-webkit-progress-bar': {
        borderRadius: borderRadiusLG,
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
      },

      '&::-moz-progress-bar': {
        background: progressBg,
      },

      '&::-webkit-progress-value': {
        borderRadius: borderRadiusLG,
        background: progressBg,
      },
    },

    // ============================ Action ============================
    [`${noticeCls}-actions`]: {
      float: 'right',
      marginTop: token.marginSM,
    },
  };
};

export const genPurePanelStyle = (token: NotificationToken): CSSObject => {
  const noticeCls = `${token.componentCls}-notice`;
  const notificationItemStyle = genNotificationItemStyle(token);

  return {
    [`${noticeCls}-pure-panel`]: {
      width: token.width,
      maxWidth: '100%',
      ...notificationItemStyle,

      [noticeCls]: {
        ...(notificationItemStyle[noticeCls] as CSSObject),
        position: 'relative',
        width: '100%',
        maxWidth: '100%',
      },
    },
  };
};

const genNotificationStyle: GenerateStyle<NotificationToken, CSSObject> = (token) => {
  return {
    [token.componentCls]: genNotificationItemStyle(token),
  };
};

export default genNotificationStyle;
