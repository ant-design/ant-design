import type { CSSProperties } from 'react';
import type { CSSObject } from '@ant-design/cssinjs';
import { unit } from '@ant-design/cssinjs';

import { CONTAINER_MAX_OFFSET } from '../../_util/hooks';
import { prepareNotificationToken, sharedGenerateStyle } from '../../notification/style';
import type { NotificationToken } from '../../notification/style';
import {
  genNotificationCardStyle,
  genNotificationItemMotionStyle,
} from '../../notification/style/notification';
import type { GenerateStyle, GenStyleFn, GetDefaultToken } from '../../theme/internal';
import { genStyleHooks, genSubStyleComponent, mergeToken } from '../../theme/internal';
import { genCssVar } from '../../theme/util/genStyleUtils';

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

// =============================== Base ===============================
const genMessageItemStyle = (token: NotificationToken): CSSObject => {
  const {
    antCls,
    componentCls,
    fontSize,
    fontSizeLG,
    lineHeight,
    notificationMarginEdge,
    notificationPadding,
    colorTextHeading,
    colorSuccess,
    colorInfo,
    colorWarning,
    colorError,
  } = token;
  const noticeCls = `${componentCls}-notice`;
  const [varName, varRef] = genCssVar(antCls, 'notification');

  return {
    [noticeCls]: {
      position: 'absolute',
      zIndex: 1,
      width: 'max-content',
      maxWidth: `calc(100vw - ${unit(token.calc(notificationMarginEdge).mul(2).equal())})`,
      padding: notificationPadding,
      pointerEvents: 'auto',
      [varName('icon-font-size')]: fontSizeLG,
      [varName('title-font-size')]: fontSize,
      [varName('title-line-height')]: lineHeight,
      ...genNotificationCardStyle(token),
      ...genNotificationItemMotionStyle(token),

      '&::after': {
        position: 'absolute',
        insetInline: 0,
        top: token.calc(token.margin).mul(-1).equal(),
        height: token.margin,
        content: '""',
      },
    },

    [`${noticeCls}-content`]: {
      display: 'flex',
      alignItems: 'center',
      gap: token.marginXS,
    },

    [`${noticeCls}-title`]: {
      color: colorTextHeading,
      fontSize: varRef('title-font-size'),
      lineHeight: varRef('title-line-height'),
    },

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

const generateMessageStyle: GenerateStyle<NotificationToken> = (token) => ({
  [token.componentCls]: genMessageItemStyle(token),
});

const generateMessageStackStyle: GenerateStyle<NotificationToken> = (token) => {
  const { componentCls } = token;
  const listContentCls = `${componentCls}-list-content`;
  const placeholderStyle: CSSObject = {
    ...genNotificationCardStyle(token),
    position: 'absolute',
    zIndex: 0,
    left: '50%',
    height: token.marginXS,
    padding: 0,
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
          '&::before': {
            ...placeholderStyle,
            top: 'var(--top-notificiation-height)',
            width: `calc(var(--top-notificiation-width) - ${unit(token.margin)})`,
          },
          '&::after': {
            ...placeholderStyle,
            top: `calc(var(--top-notificiation-height) + ${unit(token.marginXS)})`,
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

// ============================== Token ===============================
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

export const prepareComponentToken: GetDefaultToken<'Message'> = (token) => ({
  zIndexPopup: token.zIndexPopupBase + CONTAINER_MAX_OFFSET + 10,
  contentBg: token.colorBgElevated,
  contentPadding: `${(token.controlHeightLG - token.fontSize * token.lineHeight) / 2}px ${
    token.paddingSM
  }px`,
});

export const PurePanelStyle = genSubStyleComponent(
  ['Message', 'PurePanel'],
  (token) =>
    generateMessagePurePanelStyle(
      prepareMessageToken(token as unknown as Parameters<GenStyleFn<'Message'>>[0]),
    ),
  prepareComponentToken,
);

// ============================== Export ==============================
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
