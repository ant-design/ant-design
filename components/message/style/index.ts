import type { CSSProperties } from 'react';
import type { CSSObject } from '@ant-design/cssinjs';
import { Keyframes } from '@ant-design/cssinjs';

import { CONTAINER_MAX_OFFSET } from '../../_util/hooks/useZIndex';
import { resetComponent } from '../../style';
import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';

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

/**
 * @desc Message 组件的 Token
 * @descEN Token for Message component
 */
interface MessageToken extends FullToken<'Message'> {
  // Custom token here
  /**
   * @desc 提示框高度
   * @descEN Height of Message
   */
  height: number;
}

const genMessageStyle: GenerateStyle<MessageToken> = (token) => {
  const {
    componentCls,
    iconCls,
    boxShadow,
    colorText,
    colorSuccess,
    colorError,
    colorWarning,
    colorInfo,
    fontSizeLG,
    motionEaseInOutCirc,
    motionDurationSlow,
    marginXS,
    paddingXS,
    borderRadiusLG,
    zIndexPopup,
    // Custom token
    contentPadding,
    contentBg,
  } = token;

  const noticeCls = `${componentCls}-notice`;

  const messageMoveIn = new Keyframes('MessageMoveIn', {
    '0%': {
      padding: 0,
      transform: 'translateY(-100%)',
      opacity: 0,
    },

    '100%': {
      padding: paddingXS,
      transform: 'translateY(0)',
      opacity: 1,
    },
  });

  const messageMoveOut = new Keyframes('MessageMoveOut', {
    '0%': {
      maxHeight: token.height,
      padding: paddingXS,
      opacity: 1,
    },
    '100%': {
      maxHeight: 0,
      padding: 0,
      opacity: 0,
    },
  });

  const noticeStyle: CSSObject = {
    padding: paddingXS,
    textAlign: 'center',

    [`${componentCls}-custom-content`]: {
      display: 'flex',
      alignItems: 'center',
    },

    [`${componentCls}-custom-content > ${iconCls}`]: {
      marginInlineEnd: marginXS, // affected by ltr or rtl
      fontSize: fontSizeLG,
    },

    [`${noticeCls}-content`]: {
      display: 'inline-block',
      padding: contentPadding,
      background: contentBg,
      borderRadius: borderRadiusLG,
      boxShadow,
      pointerEvents: 'all',
    },

    [`${componentCls}-success > ${iconCls}`]: {
      color: colorSuccess,
    },
    [`${componentCls}-error > ${iconCls}`]: {
      color: colorError,
    },
    [`${componentCls}-warning > ${iconCls}`]: {
      color: colorWarning,
    },
    [`${componentCls}-info > ${iconCls},
      ${componentCls}-loading > ${iconCls}`]: {
      color: colorInfo,
    },
  };

  return [
    // ============================ Holder ============================
    {
      [componentCls]: {
        ...resetComponent(token),
        color: colorText,
        position: 'fixed',
        top: marginXS,
        width: '100%',
        pointerEvents: 'none',
        zIndex: zIndexPopup,

        [`${componentCls}-move-up`]: {
          animationFillMode: 'forwards',
        },
        [`
        ${componentCls}-move-up-appear,
        ${componentCls}-move-up-enter
      `]: {
          animationName: messageMoveIn,
          animationDuration: motionDurationSlow,
          animationPlayState: 'paused',
          animationTimingFunction: motionEaseInOutCirc,
        },
        [`
        ${componentCls}-move-up-appear${componentCls}-move-up-appear-active,
        ${componentCls}-move-up-enter${componentCls}-move-up-enter-active
      `]: {
          animationPlayState: 'running',
        },
        [`${componentCls}-move-up-leave`]: {
          animationName: messageMoveOut,
          animationDuration: motionDurationSlow,
          animationPlayState: 'paused',
          animationTimingFunction: motionEaseInOutCirc,
        },
        [`${componentCls}-move-up-leave${componentCls}-move-up-leave-active`]: {
          animationPlayState: 'running',
        },
        '&-rtl': {
          direction: 'rtl',
          span: {
            direction: 'rtl',
          },
        },
      },
    },

    // ============================ Notice ============================
    {
      [componentCls]: {
        [`${noticeCls}-wrapper`]: {
          ...noticeStyle,
        },
      },
    },

    // ============================= Pure =============================
    {
      [`${componentCls}-notice-pure-panel`]: {
        ...noticeStyle,
        padding: 0,
        textAlign: 'start',
      },
    },
  ];
};

export const prepareComponentToken: GetDefaultToken<'Message'> = (token) => ({
  zIndexPopup: token.zIndexPopupBase + CONTAINER_MAX_OFFSET + 10,
  contentBg: token.colorBgElevated,
  contentPadding: `${(token.controlHeightLG - token.fontSize * token.lineHeight) / 2}px ${
    token.paddingSM
  }px`,
});

// ============================== Export ==============================
export default genStyleHooks(
  'Message',
  (token) => {
    // Gen-style functions here
    const combinedToken = mergeToken<MessageToken>(token, {
      height: 150,
    });
    return [genMessageStyle(combinedToken)];
  },
  prepareComponentToken,
);
