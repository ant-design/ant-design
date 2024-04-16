import { Keyframes, unit } from '@ant-design/cssinjs';

import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';

const loadingMove = new Keyframes('loadingMove', {
  '0%': {
    opacity: 0.3,
  },
  '50%': {
    opacity: 1,
  },
  '100%': {
    opacity: 0.3,
  },
});

const cursorBlink = new Keyframes('cursorBlink', {
  '0%': {
    opacity: 1,
  },
  '50%': {
    opacity: 0,
  },
  '100%': {
    opacity: 1,
  },
});

export interface ComponentToken {
  //
}

export interface ChatboxToken extends FullToken<'Chatbox'> {
  messageMaxWidth: number;
  avatarGap: number;
}

const genChatboxStyle: GenerateStyle<ChatboxToken> = (token) => {
  const { componentCls, messageMaxWidth, avatarGap } = token;
  return {
    [componentCls]: {
      display: 'flex',
      columnGap: avatarGap,
      maxWidth: '100%',
      [`&${componentCls}-end`]: {
        justifyContent: 'end',
        flexDirection: 'row-reverse',
      },
      [`&${componentCls}-rtl`]: {
        direction: 'rtl',
      },
      [`& ${componentCls}-avatar`]: {
        display: 'inline-flex',
        justifyContent: 'center',
      },
      [`& ${componentCls}-content`]: {
        position: 'relative',
        padding: `${unit(token.paddingSM)} ${unit(token.padding)}`,
        color: token.colorText,
        fontSize: token.fontSize,
        maxWidth: unit(messageMaxWidth),
        backgroundColor: token.colorInfoBg,
        borderRadius: token.borderRadiusLG,
        boxShadow: token.boxShadowTertiary,
        '&-cursorBlink::after': {
          display: 'inline-block',
          content: '"|"',
          fontWeight: 900,
          transform: 'translate3d(0, -1px, 0)',
          marginInlineStart: token.marginXXS,
          userSelect: 'none',
          opacity: 1,
          animationName: cursorBlink,
          animationDuration: '0.6s',
          animationIterationCount: 'infinite',
          animationTimingFunction: 'linear',
        },
        [`${componentCls}-dot`]: {
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          columnGap: token.marginXS,
          '&-item': {
            backgroundColor: token.colorPrimary,
            borderRadius: '100%',
            display: 'block',
            width: 8,
            height: 8,
            opacity: 0.3,
            animationName: loadingMove,
            animationDuration: '1s',
            animationIterationCount: 'infinite',
            animationTimingFunction: 'linear',
            '&:nth-child(1)': {
              animationDelay: '0s',
            },
            '&:nth-child(2)': {
              animationDelay: '0.3s',
            },
            '&:nth-child(3)': {
              animationDelay: '0.6s',
            },
          },
        },
      },
    },
  };
};

export const prepareComponentToken: GetDefaultToken<'Chatbox'> = () => ({
  //
});

export default genStyleHooks<'Chatbox'>(
  'Chatbox',
  (token) => {
    const chatBoxToken = mergeToken<ChatboxToken>(token, {
      messageMaxWidth: 720,
      avatarGap: token.paddingXS,
    });
    return genChatboxStyle(chatBoxToken);
  },
  prepareComponentToken,
);
