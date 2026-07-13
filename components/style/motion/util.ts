import type { CSSObject } from '@ant-design/cssinjs';

export const genNoMotionStyle = (): CSSObject => {
  return {
    '@media (prefers-reduced-motion: reduce)': {
      '&, &::before, &::after': {
        transition: 'none',
        animation: 'none',
      },
    },
  };
};
