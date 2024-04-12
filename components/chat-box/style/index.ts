import { unit } from '@ant-design/cssinjs';

import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';

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
