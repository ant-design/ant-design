import type { CSSObject } from '@ant-design/cssinjs';

import type { NotificationToken } from '.';
import type { GenerateStyle } from '../../theme/internal';

const genStackStyle: GenerateStyle<NotificationToken, CSSObject> = (token) => {
  const { componentCls } = token;
  const noticeCls = `${componentCls}-notice`;
  const listContentCls = `${componentCls}-list-content`;

  return {
    [`${componentCls}-stack`]: {
      [noticeCls]: {
        clipPath: 'inset(-50% -50% -50% -50%)',
      },

      [`&:not(${componentCls}-stack-expanded)`]: {
        [noticeCls]: {
          '--notification-scale': 'calc(1 - min(var(--notification-index, 0), 2) * 0.06)',
        } as CSSObject,

        [`${noticeCls}:not(${noticeCls}-stack-in-threshold)`]: {
          opacity: 0,
          pointerEvents: 'none',
        },
      },
    },

    [`${componentCls}-list-hovered`]: {
      [listContentCls]: {
        pointerEvents: 'auto',
      },
    },
  };
};

export default genStackStyle;
