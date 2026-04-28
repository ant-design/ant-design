import type { CSSObject } from '@ant-design/cssinjs';
import { unit } from '@ant-design/cssinjs';

import { CONTAINER_MAX_OFFSET } from '../../_util/hooks';
import { resetComponent } from '../../style';
import type { AliasToken, FullToken, GenerateStyle, GenStyleFn } from '../../theme/internal';
import { genStyleHooks, genSubStyleComponent, mergeToken } from '../../theme/internal';
import genNotificationStyle, { genPurePanelStyle } from './notification';
import genNotificationPlacementStyle from './placement';

const COLLAPSED_STACK_VISIBLE_COUNT = 3;

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
    notificationProgressHeight: 2,
    notificationMotionOffset: 64,
  });

  return notificationToken;
};

const genNotificationListStyle: GenerateStyle<NotificationToken, CSSObject> = (token) => {
  const {
    componentCls,
    notificationMarginEdge,
    motionDurationMid,
    motionDurationSlow,
    motionEaseInOut,
  } = token;

  const noticeCls = `${componentCls}-notice`;
  const listCls = `${componentCls}-list`;
  const listContentCls = `${listCls}-content`;
  const listWidth = token.calc(token.width).add(token.calc(notificationMarginEdge).mul(2)).equal();
  const noticeBeyondStackVisibleCountCls = `${noticeCls}:nth-last-child(n + ${
    COLLAPSED_STACK_VISIBLE_COUNT + 1
  })`;

  return {
    [componentCls]: {
      ...resetComponent(token),

      // ============================ Holder ============================
      position: 'fixed',
      zIndex: token.zIndexPopup,
      width: listWidth,
      maxWidth: '100vw',
      height: '100vh',
      overflow: 'hidden',
      overscrollBehavior: 'contain',
      pointerEvents: 'none',

      [`${componentCls}-hook-holder`]: {
        position: 'relative',
      },

      // ============================= List =============================
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
        willChange: 'height, transform',
        transition: 'none',

        [`&${listContentCls}-decrease`]: {
          transition: `height calc(${motionDurationSlow} * 2) ${motionEaseInOut} ${motionDurationMid}`,
        },
      },

      // ============================ Stack ============================
      [`&${componentCls}-stack`]: {
        [noticeCls]: {
          clipPath: 'inset(-50% -50% -50% -50%)',
        },

        [`&:not(${componentCls}-stack-expanded)`]: {
          [noticeCls]: {
            '--notification-scale': 'calc(1 - min(var(--notification-index, 0), 2) * 0.06)',
          } as CSSObject,

          [`${noticeCls}:not(${noticeCls}-stack-in-threshold)`]: {
            opacity: 0,
            pointerEvents: 'none',
          },

          [noticeBeyondStackVisibleCountCls]: {
            opacity: 0,
            pointerEvents: 'none',
          },
        },
      },

      [`&${componentCls}-list-hovered`]: {
        [listContentCls]: {
          pointerEvents: 'auto',
        },
      },

      // ============================ Motion ============================
      [`${componentCls}-fade`]: {
        backfaceVisibility: 'hidden',
        willChange: 'transform, opacity',
      },

      // ============================== RTL =============================
      '&-rtl': {
        direction: 'rtl',

        [`${noticeCls}-actions`]: {
          float: 'left',
        },
      },
    },
  };
};

export const PurePanelStyle = genSubStyleComponent(
  ['Notification', 'PurePanel'],
  (token) => genPurePanelStyle(prepareNotificationToken(token)),
  prepareComponentToken,
);

export default genStyleHooks(
  'Notification',
  (token) => {
    const notificationToken = prepareNotificationToken(token);

    return [
      genNotificationListStyle(notificationToken),
      genNotificationStyle(notificationToken),
      genNotificationPlacementStyle(notificationToken),
    ];
  },
  prepareComponentToken,
);
