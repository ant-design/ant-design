import type { CSSObject } from '@ant-design/cssinjs';

import type { MessageToken } from '.';
import type { GenerateStyle } from '../../theme/internal';

const genStackChildrenStyle: GenerateStyle<MessageToken, CSSObject> = (token) => {
  const childrenStyle: CSSObject = {};
  for (let i = 1; i < token.messageStackLayer; i++) {
    childrenStyle[`&:nth-last-child(${i + 1})`] = {
      overflow: 'hidden',

      [`& > ${token.componentCls}-notice`]: {
        opacity: 0,
        transition: `opacity ${token.motionDurationMid}`,
      },
    };
  }

  return {
    [`&:not(:nth-last-child(-n+${token.messageStackLayer}))`]: {
      opacity: 0,
      overflow: 'hidden',
      color: 'transparent',
      pointerEvents: 'none',
    },
    ...childrenStyle,
  };
};

const genStackedNoticeStyle: GenerateStyle<MessageToken, CSSObject> = (token) => {
  const childrenStyle: CSSObject = {};
  for (let i = 1; i < token.messageStackLayer; i++) {
    childrenStyle[`&:nth-last-child(${i + 1})`] = {
      background: token.colorBgBlur,
      backdropFilter: 'blur(10px)',
      '-webkit-backdrop-filter': 'blur(10px)',
    };
  }
  return childrenStyle;
};

const genStackStyle: GenerateStyle<MessageToken, CSSObject> = (token) => {
  const { componentCls } = token;
  return {
    [`${componentCls}-stack`]: {
      [`& > ${componentCls}-notice-wrapper`]: {
        transition: `transform ${token.motionDurationSlow}, backdrop-filter 0s`,
        willChange: 'transform, opacity',
        position: 'absolute',
        top: 0,
        left: { value: 0, _skip_check_: true },

        ...genStackChildrenStyle(token),
      },
    },
    [`${componentCls}-stack:not(${componentCls}-stack-expanded)`]: {
      [`& > ${componentCls}-notice-wrapper`]: {
        ...genStackedNoticeStyle(token),
      },
    },
    [`${componentCls}-stack${componentCls}-stack-expanded`]: {
      [`& > ${componentCls}-notice-wrapper`]: {
        '&:not(:nth-last-child(-n + 1))': {
          opacity: 1,
          overflow: 'unset',
          color: 'inherit',
          pointerEvents: 'auto',

          [`& > ${token.componentCls}-notice`]: {
            opacity: 1,
          },
        },

        '&:after': {
          content: '""',
          position: 'absolute',
          height: token.margin,
          width: '100%',
          insetInline: 0,
          bottom: token.calc(token.margin).mul(-1).equal(),
          background: 'transparent',
          pointerEvents: 'auto',
        },
      },
    },
  };
};

export default genStackStyle;
