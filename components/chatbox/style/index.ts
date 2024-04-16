import { Keyframes, unit } from '@ant-design/cssinjs';

import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';

const loadingBlink = new Keyframes('loadingBlink', {
  '0%': {
    opacity: 0.3,
    transform: 'scale(1)',
  },
  '100%': {
    opacity: 1,
    transform: 'scale(1.5)',
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
        minHeight: 46,
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
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          columnGap: token.marginXS,
          '&-item': {
            backgroundColor: token.colorPrimary,
            borderRadius: '100%',
            display: 'block',
            width: 6,
            height: 6,
            opacity: 0.3,
            transform: 'scale(1)',
            animationName: loadingBlink,
            animationDuration: '0.6s',
            animationIterationCount: 'infinite',
            animationTimingFunction: 'linear',
            animationDirection: 'alternate',
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
