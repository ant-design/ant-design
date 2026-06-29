import type { CSSObject } from '@ant-design/cssinjs';

export const genNoMotionStyle = (): CSSObject => {
  return {
    '@media (prefers-reduced-motion: reduce)': {
      transition: 'none',
      animation: 'none',
    },
  };
};
