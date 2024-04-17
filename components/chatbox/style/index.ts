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

export interface ChatboxToken extends FullToken<'Chatbox'> {
  chatboxContentMaxWidth: number | string;
}

const genChatboxStyle: GenerateStyle<ChatboxToken> = (token) => {
  const { componentCls, fontSize, lineHeight, paddingSM, padding, paddingXS, colorText, calc } =
    token;
  return {
    [componentCls]: {
      display: 'flex',
      columnGap: paddingXS,
      maxWidth: '100%',
      [`&${componentCls}-end`]: {
        justifyContent: 'end',
        flexDirection: 'row-reverse',
      },
      [`&${componentCls}-rtl`]: {
        direction: 'rtl',
      },
      [`&${componentCls}-typing ${componentCls}-content::after`]: {
        display: 'inline-block',
        content: '"|"',
        fontWeight: 900,
        userSelect: 'none',
        opacity: 1,
        lineHeight: token.lineHeight,
        animationName: cursorBlink,
        animationDuration: '0.8s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'linear',
      },
      [`& ${componentCls}-avatar`]: {
        display: 'inline-flex',
        justifyContent: 'center',
      },
      [`& ${componentCls}-content`]: {
        position: 'relative',
        padding: `${unit(paddingSM)} ${unit(padding)}`,
        color: colorText,
        fontSize: token.fontSize,
        lineHeight: token.lineHeight,
        minHeight: calc(paddingSM).mul(2).add(calc(lineHeight).mul(fontSize)).equal(),
        maxWidth: token.chatboxContentMaxWidth,
        backgroundColor: token.colorInfoBg,
        borderRadius: token.borderRadiusLG,
        boxShadow: token.boxShadowTertiary,
        [`& ${componentCls}-dot`]: {
          position: 'relative',
          height: '100%',
          display: 'inline-flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: token.colorPrimary,
          fontSize: token.fontSizeLG,
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
    const { paddingXS, calc } = token;
    const chatBoxToken = mergeToken<ChatboxToken>(token, {
      chatboxContentMaxWidth: `calc(100% - ${calc(paddingXS).add(32).equal()})`,
    });
    return genChatboxStyle(chatBoxToken);
  },
  prepareComponentToken,
);
