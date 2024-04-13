import { Keyframes, unit } from '@ant-design/cssinjs';

import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';

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

export interface ChatBoxToken extends FullToken<'ChatBox'> {
  messageMaxWidth: number;
  avatarGap: number;
}

const genChatBoxStyle: GenerateStyle<ChatBoxToken> = (token) => {
  const { componentCls, messageMaxWidth, avatarGap } = token;
  return {
    [componentCls]: {
      display: 'flex',
      gap: avatarGap,
      maxWidth: '100%',
      [`&${componentCls}-end`]: {
        flexDirection: 'row-reverse',
        justifyContent: 'end',
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
        [`&${componentCls}-start`]: {
          borderRadius: `${token.borderRadiusLG} 0 0 ${token.borderRadiusLG}`,
        },
        [`&${componentCls}-end`]: {
          borderRadius: `0 ${token.borderRadiusLG} ${token.borderRadiusLG} 0`,
        },
        [`&${componentCls}-rtl`]: {
          borderRadius: `${token.borderRadiusLG} 0 0 ${token.borderRadiusLG}`,
        },
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
        },
      },
    },
  };
};

export const prepareComponentToken: GetDefaultToken<'ChatBox'> = () => ({
  //
});

export default genStyleHooks<'ChatBox'>(
  'ChatBox',
  (token) => {
    const chatBoxToken = mergeToken<ChatBoxToken>(token, {
      messageMaxWidth: 720,
      avatarGap: token.paddingXS,
    });
    return genChatBoxStyle(chatBoxToken);
  },
  prepareComponentToken,
);
