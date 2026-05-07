import type { CSSObject } from '@ant-design/cssinjs';
import { unit } from '@ant-design/cssinjs';

import { CONTAINER_MAX_OFFSET } from '../../_util/hooks';
import { resetComponent } from '../../style';
import type { AliasToken, FullToken, GenerateStyle, GenStyleFn } from '../../theme/internal';
import { genStyleHooks, genSubStyleComponent, mergeToken } from '../../theme/internal';
import genNotificationStyle, { genNotificationItemStyle, genPurePanelStyle } from './notification';
import genNotificationPlacementStyle from './placement';

const DEFAULT_COLLAPSED_STACK_VISIBLE_COUNT = 1;

type WidthKey<Token extends NotificationToken> = {
  [Key in keyof Token]: Token[Key] extends number | string ? Key : never;
}[keyof Token];

interface SharedStyleConfig<Token extends NotificationToken> {
  listWidthKey?: WidthKey<Token>;
  stackVisibleCount?: number;
  itemStyle?: false | GenerateStyle<Token>;
  stackPlaceholderItemStyle?: false | ((token: Token) => CSSObject);
}

interface StackPlaceholderStyle {
  rootStyle: CSSObject;
  collapsedStyle: CSSObject;
}

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
  notificationPaddingVertical: number | string;
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

// =============================== Token ===============================

/** Provide default public ComponentToken values for Notification. */
const prepareComponentToken = (token: AliasToken) => ({
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

/** Derive internal Notification style tokens from alias and component tokens. */
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

// =============================== List ================================

/** Generate shared list content and motion base styles. */
export const genNotificationListContentStyle: GenerateStyle<NotificationToken, CSSObject> = (
  token,
) => {
  const { componentCls, motionDurationMid, motionDurationSlow, motionEaseInOut } = token;

  const listCls = `${componentCls}-list`;
  const listContentCls = `${listCls}-content`;

  return {
    [listContentCls]: {
      position: 'relative',
      display: 'flex',
      flexShrink: 0,
      flexDirection: 'column',
      gap: token.notificationMarginBottom,
      width: '100%',
      willChange: 'height, transform',
      transition: 'none',

      [`&${listContentCls}-decrease`]: {
        transition: `height calc(${motionDurationSlow} * 2) ${motionEaseInOut} ${motionDurationMid}`,
      },
    },

    // ============================ Motion ============================
    [`${componentCls}-fade`]: {
      backfaceVisibility: 'hidden',
      willChange: 'transform, opacity',
    },
  };
};

/** Generate pseudo notice cards shown below the collapsed stack. */
const genNotificationStackPlaceholderStyle = <Token extends NotificationToken>(
  token: Token,
  stackPlaceholderItemStyle: false | ((token: Token) => CSSObject),
): StackPlaceholderStyle => {
  if (stackPlaceholderItemStyle === false) {
    return {
      rootStyle: {},
      collapsedStyle: {},
    };
  }

  const { componentCls } = token;
  const noticeCls = `${componentCls}-notice`;
  const listContentCls = `${componentCls}-list-content`;
  const rawNoticeStyle = (stackPlaceholderItemStyle(token)[noticeCls] || {}) as CSSObject;
  const { '&::after': _hoverAfterStyle, ...noticeStyle } = rawNoticeStyle;
  const placeholderStyle: CSSObject = {
    ...noticeStyle,
    position: 'absolute',
    zIndex: -1,
    left: '50%',
    height: token.calc(token.marginXS).mul(2).equal(),
    padding: 0,
    boxShadow: token.boxShadowTertiary,
    opacity: 0,
    pointerEvents: 'none',
    transform: 'translateX(-50%) translateY(100%)',
    transition: [
      `opacity ${token.motionDurationFast} ${token.motionEaseInOut}`,
      `transform ${token.motionDurationFast} ${token.motionEaseInOut}`,
      `width ${token.motionDurationSlow} ${token.motionEaseInOut}`,
    ].join(', '),
    content: '""',
  };

  return {
    rootStyle: {
      [listContentCls]: {
        isolation: 'isolate',

        '&::before': {
          ...placeholderStyle,
          top: `calc(var(--top-notificiation-height) - ${unit(token.marginXS)})`,
          width: `calc(var(--top-notificiation-width) - ${unit(token.margin)})`,
        },

        '&::after': {
          ...placeholderStyle,
          zIndex: -2,
          top: 'var(--top-notificiation-height)',
          width: `calc(var(--top-notificiation-width) - ${unit(
            token.calc(token.margin).mul(2).equal(),
          )})`,
        },
      },
    },
    collapsedStyle: {
      [listContentCls]: {
        '&::before, &::after': {
          opacity: 1,
          transform: 'translateX(-50%) translateY(0)',
        },
      },
    },
  };
};

/** Generate the root holder, list, stack, and RTL styles for notifications. */
const genNotificationListStyle = <Token extends NotificationToken>(
  token: Token,
  config: SharedStyleConfig<Token>,
): CSSObject => {
  const { componentCls, notificationMarginEdge } = token;

  const noticeCls = `${componentCls}-notice`;
  const listCls = `${componentCls}-list`;

  const listWidth = config.listWidthKey
    ? token
        .calc(token[config.listWidthKey] as number | string)
        .add(token.calc(notificationMarginEdge).mul(2))
        .equal()
    : '100%';
  const stackVisibleCount = config.stackVisibleCount ?? DEFAULT_COLLAPSED_STACK_VISIBLE_COUNT;
  const noticeBeyondStackVisibleCountCls = `${noticeCls}:nth-last-child(n + ${
    stackVisibleCount + 1
  })`;
  const stackPlaceholderItemStyle =
    config.stackPlaceholderItemStyle === undefined
      ? (stackToken: Token) => genNotificationItemStyle(stackToken)
      : config.stackPlaceholderItemStyle;
  const { rootStyle: stackPlaceholderStyle, collapsedStyle: stackPlaceholderCollapsedStyle } =
    genNotificationStackPlaceholderStyle(token, stackPlaceholderItemStyle);

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
        pointerEvents: 'none',

        '&::-webkit-scrollbar': {
          display: 'none',
          width: 0,
          height: 0,
        },
      },

      ...genNotificationListContentStyle(token),

      // ============================ Stack ============================
      [`&${componentCls}-stack`]: {
        ...stackPlaceholderStyle,

        [`&:not(${componentCls}-stack-expanded)`]: {
          ...stackPlaceholderCollapsedStyle,

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

// ============================== Export ==============================

/** Register the PurePanel sub-style component for Notification. */
export const PurePanelStyle = genSubStyleComponent(
  ['Notification', 'PurePanel'],
  (token) => genPurePanelStyle(prepareNotificationToken(token)),
  prepareComponentToken,
);

/** Compose the shared list, item, and placement styles. */
export const sharedGenerateStyle = <Token extends NotificationToken>(
  token: Token,
  config: SharedStyleConfig<Token> = {},
): ReturnType<GenerateStyle<Token>> => {
  const itemStyle = config.itemStyle === undefined ? genNotificationStyle : config.itemStyle;

  return [
    genNotificationListStyle(token, config),
    ...(itemStyle === false ? [] : [itemStyle(token)]),
    genNotificationPlacementStyle(token),
  ];
};

/** Register the main style hook for Notification. */
export default genStyleHooks(
  'Notification',
  (token) => {
    const notificationToken = prepareNotificationToken(token);

    return sharedGenerateStyle(notificationToken, { listWidthKey: 'width' });
  },
  prepareComponentToken,
);
