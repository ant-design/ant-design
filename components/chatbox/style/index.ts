import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';

export interface ComponentToken {
  // Component token here
}

export interface ChatBoxToken extends FullToken<'ChatBox'> {
  //
}

const genChatBoxStyle: GenerateStyle<ChatBoxToken> = () => ({
  //
});

export const prepareComponentToken: GetDefaultToken<'ChatBox'> = () => ({
  //
});

// ============================== Export ==============================
export default genStyleHooks(
  'ChatBox',
  (token) => {
    const chatBoxToken = mergeToken<ChatBoxToken>(token);
    return genChatBoxStyle(chatBoxToken);
  },
  prepareComponentToken,
);
