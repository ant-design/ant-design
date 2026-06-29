import type { CSSObject } from '@ant-design/cssinjs';
import { unit } from '@ant-design/cssinjs';

import { genFocusStyle } from '../../style';
import type { GenerateStyle } from '../../theme/internal';
import { genCssVar } from '../../theme/util/genStyleUtils';
import type { NotificationToken } from '.';

// ============================== Shared ==============================

/** Generate motion transitions shared by notification-like notice cards. */
const genNotificationItemMotionStyle = (token: NotificationToken): CSSObject => {
  const { motionDurationMid, motionEaseInOut } = token;
  const transition = `${motionDurationMid} ${motionEaseInOut}`;

  return {
    transform: 'scale(var(--notification-scale, 1))',
    transition: ['transform', 'inset', 'clip-path', 'opacity']
      .map((property) => `${property} ${transition}`)
      .join(', '),
  };
};

interface NotificationItemSharedStyleConfig {
  width: number | string;
  iconFontSize: number | string;
  titleFontSize: number | string;
  titleLineHeight: number | string;
  contentStyle: CSSObject;
  noticeStyle?: CSSObject;
  typeStyle?: boolean;
}

/** Generate item styles shared by Notification and Message notice cards. */
export const genListItemSharedStyle = (
  token: NotificationToken,
  config: NotificationItemSharedStyleConfig,
): CSSObject => {
  const {
    componentCls,
    antCls,
    colorSuccess,
    colorInfo,
    colorWarning,
    colorError,
    colorTextHeading,
    colorText,
    boxShadow,
    borderRadiusLG,
    fontSize,
    lineHeight,
    notificationBg,
    notificationPadding,
    notificationMarginEdge,
    margin,
    calc,
  } = token;

  const noticeCls = `${componentCls}-notice`;
  const [varName, varRef] = genCssVar(antCls, 'notification');

  return {
    [noticeCls]: {
      // ============================== Base ==============================
      position: 'absolute',
      width: config.width,
      maxWidth: `calc(100vw - ${unit(calc(notificationMarginEdge).mul(2).equal())})`,
      padding: notificationPadding,
      pointerEvents: 'auto',
      [varName('icon-font-size')]: config.iconFontSize,
      [varName('title-font-size')]: config.titleFontSize,
      [varName('title-line-height')]: config.titleLineHeight,
      boxSizing: 'border-box',
      color: colorText,
      background: notificationBg,
      borderRadius: borderRadiusLG,
      boxShadow,
      fontSize,
      lineHeight,
      wordWrap: 'break-word',
      overflow: 'visible',
      ...genNotificationItemMotionStyle(token),
      ...config.noticeStyle,

      '&::after': {
        position: 'absolute',
        insetInline: 0,
        top: calc(margin).mul(-1).equal(),
        height: margin,
        content: '""',
      },

      // ============================== Type ==============================
      ...(config.typeStyle && {
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
      }),
    },

    // ============================ Wrapper ============================
    [`${noticeCls}-wrapper`]: {
      display: 'flex',
      ...config.contentStyle,
    },

    [`${noticeCls}-title`]: {
      color: colorTextHeading,
      fontSize: varRef('title-font-size'),
      lineHeight: varRef('title-line-height'),
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
      [`&${noticeCls}-icon-info, &${noticeCls}-icon-loading`]: {
        color: colorInfo,
      },
      [`&${noticeCls}-icon-warning`]: {
        color: colorWarning,
      },
      [`&${noticeCls}-icon-error`]: {
        color: colorError,
      },
    },
  };
};

// =========================== Notification ===========================

/** Generate the complete notice item styles for Notification. */
const genNotificationItemStyle = (token: NotificationToken): CSSObject => {
  const {
    componentCls,
    progressBg,
    notificationProgressHeight,
    fontSize,
    borderRadiusLG,
    width,
    notificationIconSize,
    colorText,
    motionDurationMid,
    fontSizeLG,
    lineHeightLG,
    marginSM,
    marginXS,
    paddingLG,
    notificationPaddingVertical,
    notificationPaddingHorizontal,
    notificationCloseButtonSize,
    colorIcon,
    borderRadiusSM,
    colorIconHover,
    colorBgTextHover,
    colorBgTextActive,
  } = token;

  const noticeCls = `${componentCls}-notice`;

  return {
    ...genListItemSharedStyle(token, {
      width,
      iconFontSize: notificationIconSize,
      titleFontSize: fontSizeLG,
      titleLineHeight: lineHeightLG,
      contentStyle: {
        alignItems: 'flex-start',
        gap: marginSM,
      },
      typeStyle: true,
    }),

    [`${noticeCls}-section`]: {
      display: 'flex',
      flexDirection: 'column',
      flex: 'auto',
      gap: marginXS,
      minWidth: 0,
    },

    [`${noticeCls}-description`]: {
      color: colorText,
      fontSize,
    },

    [`${noticeCls}-closable`]: {
      [`${noticeCls}-title, ${noticeCls}-description`]: {
        paddingInlineEnd: paddingLG,
      },
      [`${noticeCls}-title + ${noticeCls}-description`]: {
        paddingInlineEnd: 0,
      },
    },

    // ============================ Close =============================
    [`${noticeCls}-close`]: {
      position: 'absolute',
      top: notificationPaddingVertical,
      insetInlineEnd: notificationPaddingHorizontal,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: notificationCloseButtonSize,
      height: notificationCloseButtonSize,
      color: colorIcon,
      background: 'none',
      border: 'none',
      borderRadius: borderRadiusSM,
      outline: 'none',
      transition: ['color', 'background-color']
        .map((prop) => `${prop} ${motionDurationMid}`)
        .join(', '),

      '&:hover': {
        color: colorIconHover,
        backgroundColor: colorBgTextHover,
      },

      '&:active': {
        backgroundColor: colorBgTextActive,
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
      marginTop: marginSM,
    },
  };
};

/** Generate standalone PurePanel styles for Notification. */
export const genPurePanelStyle = (token: NotificationToken): CSSObject => {
  const { componentCls, width } = token;
  const noticeCls = `${componentCls}-notice`;
  const actionsCls = `${noticeCls}-actions`;
  const notificationItemStyle = genNotificationItemStyle(token);

  return {
    [`${noticeCls}-pure-panel`]: {
      width,
      maxWidth: '100%',
      ...notificationItemStyle,

      [noticeCls]: {
        ...(notificationItemStyle[noticeCls] as CSSObject),
        position: 'relative',
        width: '100%',
        maxWidth: '100%',
      },

      [actionsCls]: {
        ...(notificationItemStyle[actionsCls] as CSSObject),
        float: 'none',
        textAlign: 'end',
      },
    },
  };
};

// ============================== Export ==============================

/** Wrap Notification item styles under the component root selector. */
const genNotificationStyle: GenerateStyle<NotificationToken, CSSObject> = (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: genNotificationItemStyle(token),
  };
};

export default genNotificationStyle;
