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

/**
 * For call sites already nested inside a pseudo-element selector.
 */
export const genNoMotionRawStyle = (): CSSObject => {
  return {
    '@media (prefers-reduced-motion: reduce)': {
      transition: 'none',
      animation: 'none',
    },
  };
};
