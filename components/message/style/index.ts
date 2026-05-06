import type { CSSProperties } from 'react';
import type { CSSObject } from '@ant-design/cssinjs';
import { unit } from '@ant-design/cssinjs';

import { CONTAINER_MAX_OFFSET } from '../../_util/hooks';
import { prepareNotificationToken, sharedGenerateStyle } from '../../notification/style';
import type { NotificationToken } from '../../notification/style';
import { genListItemSharedStyle } from '../../notification/style/notification';
import type { GenerateStyle, GenStyleFn, GetDefaultToken } from '../../theme/internal';
import { genStyleHooks, genSubStyleComponent, mergeToken } from '../../theme/internal';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  // Component token here
  /**
   * @desc 提示框 z-index
   * @descEN z-index of Message
   */
  zIndexPopup: number;
  /**
   * @desc 提示框背景色
   * @descEN Background color of Message
   */
  contentBg: string;
  /**
   * @desc 提示框内边距
   * @descEN Padding of Message
   */
  contentPadding: CSSProperties['padding'];
}

// =============================== Token ===============================

/** Map Message component tokens onto the shared Notification token shape. */
const prepareMessageToken: (token: Parameters<GenStyleFn<'Message'>>[0]) => NotificationToken = (
  token,
) => {
  const messagePaddingVertical = token
    .calc(token.controlHeightLG)
    .sub(token.calc(token.fontSize).mul(token.lineHeight))
    .div(2)
    .equal();
  const messagePaddingHorizontal = token.paddingSM;

  return mergeToken<NotificationToken>(
    prepareNotificationToken(token as unknown as Parameters<GenStyleFn<'Notification'>>[0]),
    {
      notificationBg: token.contentBg,
      notificationPadding: token.contentPadding as NotificationToken['notificationPadding'],
      notificationPaddingVertical: messagePaddingVertical,
      notificationPaddingHorizontal: messagePaddingHorizontal,
    },
  );
};

/** Provide default public ComponentToken values for Message. */
const prepareComponentToken: GetDefaultToken<'Message'> = (token) => ({
  zIndexPopup: token.zIndexPopupBase + CONTAINER_MAX_OFFSET + 10,
  contentBg: token.colorBgElevated,
  contentPadding: `${(token.controlHeightLG - token.fontSize * token.lineHeight) / 2}px ${
    token.paddingSM
  }px`,
});

// =============================== Base ===============================

/** Generate the shared item card styles for Message notices. */
const genMessageItemStyle = (token: NotificationToken): CSSObject => {
  const { fontSize, fontSizeLG, lineHeight } = token;

  return genListItemSharedStyle(token, {
    // Adjust card style since Message is not same as Notification.
    // Message needs horizontal center and not fix width.
    width: 'max-content',
    iconFontSize: fontSizeLG,
    titleFontSize: fontSize,
    titleLineHeight: lineHeight,
    contentStyle: {
      alignItems: 'center',
      gap: token.marginXS,
    },
    noticeStyle: {
      zIndex: 1,
    },
  });
};

// =============================== Stack ===============================

/** Generate the collapsed stack placeholder styles for Message notices. */
const generateMessageStackStyle: GenerateStyle<NotificationToken> = (token) => {
  const { componentCls } = token;
  const noticeCls = `${componentCls}-notice`;
  const listContentCls = `${componentCls}-list-content`;
  const messageItemStyle = genMessageItemStyle(token);
  const { '&::after': _hoverAfterStyle, ...messageNoticeStyle } = messageItemStyle[
    noticeCls
  ] as CSSObject;
  const placeholderStyle: CSSObject = {
    ...messageNoticeStyle,
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
    [componentCls]: {
      [`&${componentCls}-stack`]: {
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

        [`&:not(${componentCls}-stack-expanded)`]: {
          [listContentCls]: {
            '&::before, &::after': {
              opacity: 1,
              transform: 'translateX(-50%) translateY(0)',
            },
          },
        },
      },
    },
  };
};

// ============================= PurePanel =============================

/** Generate standalone PurePanel styles for Message. */
const generateMessagePurePanelStyle: GenerateStyle<NotificationToken> = (token) => {
  const { componentCls } = token;
  const noticeCls = `${componentCls}-notice`;
  const messageItemStyle = genMessageItemStyle(token);

  return {
    [`${noticeCls}-pure-panel`]: {
      width: 'max-content',
      maxWidth: '100%',
      ...messageItemStyle,

      [noticeCls]: {
        ...(messageItemStyle[noticeCls] as CSSObject),
        position: 'relative',
        width: 'max-content',
        maxWidth: '100%',
      },
    },
  };
};

/** Register the PurePanel sub-style component for Message. */
export const PurePanelStyle = genSubStyleComponent(
  ['Message', 'PurePanel'],
  (token) =>
    generateMessagePurePanelStyle(
      prepareMessageToken(token as unknown as Parameters<GenStyleFn<'Message'>>[0]),
    ),
  prepareComponentToken,
);

// ============================== Export ==============================

/** Wrap Message item styles under the component root selector. */
const generateMessageStyle: GenerateStyle<NotificationToken> = (token) => ({
  [token.componentCls]: genMessageItemStyle(token),
});

/** Register the main style hook for Message. */
export default genStyleHooks(
  'Message',
  (token) => {
    const messageToken = prepareMessageToken(
      token as unknown as Parameters<GenStyleFn<'Message'>>[0],
    );

    return [
      sharedGenerateStyle(messageToken, { stackVisibleCount: 1, itemStyle: generateMessageStyle }),
      generateMessageStackStyle(messageToken),
    ];
  },
  prepareComponentToken,
);
