import type { CSSObject } from '@ant-design/cssinjs';
import { unit } from '@ant-design/cssinjs';

import { CONTAINER_MAX_OFFSET } from '../../_util/hooks';
import { genFocusStyle, resetComponent } from '../../style';
import type { AliasToken, FullToken, GenerateStyle, GenStyleFn } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';
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
  width: number | string;
  /**
   * @desc 提醒框进度条背景色
   * @descEN Background color of Notification progress bar
   */
  progressBg: string;
  /**
   * @desc 成功提醒框容器背景色
   * @descEN Background color of success notification container
   */
  colorSuccessBg?: string;
  /**
   * @desc 错误提醒框容器背景色
   * @descEN Background color of error notification container
   */
  colorErrorBg?: string;
  /**
   * @desc 信息提醒框容器背景色
   * @descEN Background color of info notification container
   */
  colorInfoBg?: string;
  /**
   * @desc 警告提醒框容器背景色
   * @descEN Background color of warning notification container
   */
  colorWarningBg?: string;
}

/**
 * @desc Notification 组件的 Token
 * @descEN Token for Notification component
 */
export interface NotificationToken extends FullToken<'Notification'> {
  /**
   * @desc 动画最大高度
   * @descEN Maximum height of animation
   */
  animationMaxHeight: number | string;
  /**
   * @desc 提醒框背景色
   * @descEN Background color of Notification
   */
  notificationBg: string;
  /**
   * @desc 提醒框内边距
   * @descEN Padding of Notification
   */
  notificationPadding: string;
  /**
   * @desc 提醒框垂直内边距
   * @descEN Vertical padding of Notification
   */
  notificationPaddingVertical: number;
  /**
   * @desc 提醒框水平内边距
   * @descEN Horizontal padding of Notification
   */
  notificationPaddingHorizontal: number;
  /**
   * @desc 提醒框图标尺寸
   * @descEN Icon size of Notification
   */
  notificationIconSize: number | string;
  /**
   * @desc 提醒框关闭按钮尺寸
   * @descEN Close button size of Notification
   */
  notificationCloseButtonSize: number | string;
  /**
   * @desc 提醒框底部外边距
   * @descEN Bottom margin of Notification
   */
  notificationMarginBottom: number;
  /**
   * @desc 提醒框边缘外边距
   * @descEN Edge margin of Notification
   */
  notificationMarginEdge: number;
  /**
   * @desc 提醒框堆叠层数
   * @descEN Stack layer of Notification
   */
  notificationStackLayer: number;
  /**
   * @desc 提醒框进度条高度
   * @descEN Height of Notification progress bar
   */
  notificationProgressHeight: number;
  /**
   * @desc 提醒框入场动画偏移
   * @descEN Motion offset of Notification
   */
  notificationMotionOffset: number;
}

export const genNoticeStyle: GenerateStyle<NotificationToken, CSSObject> = (token) => {
  const {
    iconCls,
    componentCls, // .ant-notification
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

    // Type-specific background colors
    '&-success': colorSuccessBg ? { background: colorSuccessBg } : {},
    '&-error': colorErrorBg ? { background: colorErrorBg } : {},
    '&-info': colorInfoBg ? { background: colorInfoBg } : {},
    '&-warning': colorWarningBg ? { background: colorWarningBg } : {},

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
      fontSize,
      color: colorText,
      marginTop: token.marginXS,

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

    // Icon & color style in different selector level
    // https://github.com/ant-design/ant-design/issues/16503
    // https://github.com/ant-design/ant-design/issues/15512
    [`${noticeCls}-icon`]: {
      position: 'absolute',
      fontSize: notificationIconSize,
      lineHeight: 1,

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

      transition: ['color', 'background-color']
        .map((prop) => `${prop} ${motionDurationMid}`)
        .join(', '),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'none',
      border: 'none',

      '&:hover': {
        color: token.colorIconHover,
        backgroundColor: token.colorBgTextHover,
      },

      '&:active': {
        backgroundColor: token.colorBgTextActive,
      },

      ...genFocusStyle(token),
    },

    [`${noticeCls}-progress`]: {
      position: 'absolute',
      display: 'block',
      appearance: 'none',
      inlineSize: `calc(100% - ${unit(borderRadiusLG)} * 2)`,
      left: {
        _skip_check_: true,
        value: borderRadiusLG,
      },
      right: {
        _skip_check_: true,
        value: borderRadiusLG,
      },
      bottom: 0,
      blockSize: notificationProgressHeight,
      border: 0,

      '&, &::-webkit-progress-bar': {
        borderRadius: borderRadiusLG,
        backgroundColor: `rgba(0, 0, 0, 0.04)`,
      },

      '&::-moz-progress-bar': {
        background: progressBg,
      },

      '&::-webkit-progress-value': {
        borderRadius: borderRadiusLG,
        background: progressBg,
      },
    },

    [`${noticeCls}-actions`]: {
      float: 'right',
      marginTop: token.marginSM,
    },
  };
};

const genNotificationStyle: GenerateStyle<NotificationToken> = (token) => {
  const {
    componentCls, // .ant-notification
    notificationMarginEdge,
    motionDurationMid,
    motionDurationSlow,
    motionEaseInOut,
  } = token;

  const noticeCls = `${componentCls}-notice`;
  const listCls = `${componentCls}-list`;
  const listContentCls = `${listCls}-content`;
  const listWidth = token.calc(token.width).add(token.calc(notificationMarginEdge).mul(2)).equal();
  // const listContentTransition = [
  //   `height ${motionDurationMid} ${token.motionEaseInOut}`,
  //   `transform ${motionDurationMid} ${token.motionEaseInOut}`,
  // ].join(', ');
  // const leavingListContentTransition = `height ${motionDurationMid} ${token.motionEaseInOut} ${motionDurationMid}`;

  return [
    // ============================ Holder ============================
    {
      [componentCls]: {
        ...resetComponent(token),

        position: 'fixed',
        zIndex: token.zIndexPopup,
        boxSizing: 'border-box',
        width: listWidth,
        maxWidth: '100vw',
        height: '100vh',
        overflow: 'hidden',
        overscrollBehavior: 'contain',
        pointerEvents: 'none',

        [`${componentCls}-hook-holder`]: {
          position: 'relative',
        },

        [`&${listCls}`]: {
          maxHeight: '100vh',
          padding: notificationMarginEdge,
          overflowX: 'hidden',
          overflowY: 'auto',
          overscrollBehavior: 'contain',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',

          '&::-webkit-scrollbar': {
            display: 'none',
            width: 0,
            height: 0,
          },
        },

        [listContentCls]: {
          position: 'relative',
          display: 'flex',
          flexShrink: 0,
          flexDirection: 'column',
          gap: token.notificationMarginBottom,
          width: '100%',
          pointerEvents: 'none',
          // transition: listContentTransition,
          willChange: 'height, transform',
          transition: 'none',

          [`&${listContentCls}-decrease`]: {
            transition: `height calc(${motionDurationSlow} * 2) ${motionEaseInOut} ${motionDurationMid}`,
          },
        },

        [`${componentCls}-fade`]: {
          backfaceVisibility: 'hidden',
          willChange: 'transform, opacity',
        },

        // RTL
        '&-rtl': {
          direction: 'rtl',

          [`${noticeCls}-actions`]: {
            float: 'left',
          },
        },

        [noticeCls]: genNoticeStyle(token),
      },
    },
  ];
};

// ============================== Export ==============================
export const prepareComponentToken = (token: AliasToken) => ({
  zIndexPopup: token.zIndexPopupBase + CONTAINER_MAX_OFFSET + 50,
  width: 384,
  progressBg: `linear-gradient(90deg, ${token.colorPrimaryBorderHover}, ${token.colorPrimary})`,
  // Fix notification background color issue
  // https://github.com/ant-design/ant-design/issues/55649
  // https://github.com/ant-design/ant-design/issues/56055
  colorSuccessBg: undefined,
  colorErrorBg: undefined,
  colorInfoBg: undefined,
  colorWarningBg: undefined,
});

export const prepareNotificationToken: (
  token: Parameters<GenStyleFn<'Notification'>>[0],
) => NotificationToken = (token) => {
  const notificationPaddingVertical = token.paddingMD;
  const notificationPaddingHorizontal = token.paddingLG;
  const notificationToken = mergeToken<NotificationToken>(token, {
    notificationBg: token.colorBgElevated,
    notificationPaddingVertical,
    notificationPaddingHorizontal,
    notificationIconSize: token.calc(token.fontSizeLG).mul(token.lineHeightLG).equal(),
    notificationCloseButtonSize: token.calc(token.controlHeightLG).mul(0.55).equal(),
    notificationMarginBottom: token.margin,
    notificationPadding: `${unit(token.paddingMD)} ${unit(token.paddingContentHorizontalLG)}`,
    notificationMarginEdge: token.marginLG,
    animationMaxHeight: 150,
    notificationStackLayer: 3,
    notificationProgressHeight: 2,
    notificationMotionOffset: 64,
  });

  return notificationToken;
};

export default genStyleHooks(
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
