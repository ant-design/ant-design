import type { CSSObject } from '@ant-design/cssinjs';
import { unit } from '@ant-design/cssinjs';

import { genFocusStyle } from '../../style';
import type { GenerateStyle } from '../../theme/internal';
import type { NotificationToken } from '.';

export const genNoticeStyle = (token: NotificationToken): CSSObject => {
  const {
    iconCls,
    componentCls,
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
    notificationCloseButtonSize,
    colorText,
    colorSuccessBg,
    colorErrorBg,
    colorInfoBg,
    colorWarningBg,
    motionDurationMid,
    motionEaseInOut,
  } = token;

  const noticeCls = `${componentCls}-notice`;

  return {
    // ============================== Base ==============================
    position: 'absolute',
    boxSizing: 'border-box',
    width,
    maxWidth: `calc(100vw - ${unit(token.calc(notificationMarginEdge).mul(2).equal())})`,
    padding: notificationPadding,
    pointerEvents: 'auto',
    color: colorText,
    background: notificationBg,
    borderRadius: borderRadiusLG,
    boxShadow,
    fontSize,
    lineHeight,
    wordWrap: 'break-word',
    overflow: 'hidden',
    transform: 'scale(var(--notification-scale, 1))',
    transition: [
      `transform ${motionDurationMid} ${motionEaseInOut}`,
      `inset ${motionDurationMid} ${motionEaseInOut}`,
      `clip-path ${motionDurationMid} ${motionEaseInOut}`,
      `opacity ${motionDurationMid} ${motionEaseInOut}`,
    ].join(', '),

    // ============================== Type ==============================
    '&-success': colorSuccessBg ? { background: colorSuccessBg } : {},
    '&-error': colorErrorBg ? { background: colorErrorBg } : {},
    '&-info': colorInfoBg ? { background: colorInfoBg } : {},
    '&-warning': colorWarningBg ? { background: colorWarningBg } : {},

    // ============================ Content ============================
    [`${noticeCls}-section`]: {
      paddingInlineEnd: token.calc(notificationCloseButtonSize).add(token.marginSM).equal(),
    },

    [`${noticeCls}-title`]: {
      marginBottom: token.marginXS,
      color: colorTextHeading,
      fontSize: fontSizeLG,
      lineHeight: token.lineHeightLG,
    },

    [`${noticeCls}-description`]: {
      marginTop: token.marginXS,
      color: colorText,
      fontSize,

      '&:first-child': {
        marginTop: 0,
        marginInlineEnd: token.marginSM,
      },
    },

    [`${noticeCls}-closable ${noticeCls}-title`]: {
      paddingInlineEnd: token.paddingLG,
    },

    [`${noticeCls}-with-icon ${noticeCls}-title`]: {
      marginBottom: token.marginXS,
      marginInlineStart: token.calc(token.marginSM).add(notificationIconSize).equal(),
      fontSize: fontSizeLG,
    },

    [`${noticeCls}-with-icon ${noticeCls}-description`]: {
      marginInlineStart: token.calc(token.marginSM).add(notificationIconSize).equal(),
      fontSize,
    },

    // ============================= Icon =============================
    // Icon & color style in different selector level
    // https://github.com/ant-design/ant-design/issues/16503
    // https://github.com/ant-design/ant-design/issues/15512
    [`${noticeCls}-icon`]: {
      position: 'absolute',
      fontSize: notificationIconSize,
      lineHeight: 1,

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

const genNotificationNoticeStyle: GenerateStyle<NotificationToken, CSSObject> = (token) => {
  const { componentCls } = token;
  const noticeCls = `${token.componentCls}-notice`;

  return {
    [componentCls]: {
      [noticeCls]: genNoticeStyle(token),
    },
  };
};

export default genNotificationNoticeStyle;
