import type { CSSProperties } from 'react';
import type { CSSObject } from '@ant-design/cssinjs';

import { CONTAINER_MAX_OFFSET } from '../../_util/hooks';
import { prepareNotificationToken, sharedGenerateStyle } from '../../notification/style';
import type { NotificationToken } from '../../notification/style';
import { genNotificationItemStyle } from '../../notification/style/notification';
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
const generateMessageStyle: GenerateStyle<NotificationToken> = (token) => {
  const { antCls, componentCls, fontSize, fontSizeLG, lineHeight } = token;
  const noticeCls = `${componentCls}-notice`;
  const [varName] = genCssVar(antCls, 'notification');

  return {
    [componentCls]: {
      [noticeCls]: {
        [varName('icon-font-size')]: fontSizeLG,
        [varName('title-font-size')]: fontSize,
        [varName('title-line-height')]: lineHeight,
        width: 'max-content',
      },
      [`${noticeCls}-content`]: {
        alignItems: 'center',
        gap: token.marginXS,
      },
    },
  };
};

const generateMessagePurePanelStyle: GenerateStyle<NotificationToken> = (token) => {
  const { antCls, componentCls, fontSize, fontSizeLG, lineHeight } = token;
  const noticeCls = `${componentCls}-notice`;
  const [varName] = genCssVar(antCls, 'notification');
  const notificationItemStyle = genNotificationItemStyle(token);

  return {
    [`${noticeCls}-pure-panel`]: {
      width: 'max-content',
      maxWidth: '100%',
      ...notificationItemStyle,

      [noticeCls]: {
        ...(notificationItemStyle[noticeCls] as CSSObject),
        position: 'relative',
        width: 'max-content',
        maxWidth: '100%',
        [varName('icon-font-size')]: fontSizeLG,
        [varName('title-font-size')]: fontSize,
        [varName('title-line-height')]: lineHeight,
      },

      [`${noticeCls}-content`]: {
        ...(notificationItemStyle[`${noticeCls}-content`] as CSSObject),
        alignItems: 'center',
        gap: token.marginXS,
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

    return [sharedGenerateStyle(messageToken), generateMessageStyle(messageToken)];
  },
  prepareComponentToken,
);
