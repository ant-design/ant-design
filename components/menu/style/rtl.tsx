import type { MenuToken } from '.';
import type { GenerateStyle } from '../../theme/internal';

const getRTLStyle: GenerateStyle<MenuToken> = ({ componentCls, menuArrowOffset }) => ({
  [`${componentCls}-rtl`]: {
    direction: 'rtl',
  },

  [`${componentCls}-submenu-rtl`]: {
    transformOrigin: '100% 0',
  },

  // Vertical Arrow
  [`${componentCls}-rtl${componentCls}-vertical,
    ${componentCls}-submenu-rtl ${componentCls}-vertical`]: {
    [`${componentCls}-submenu-arrow`]: {
      '&::before': {
        transform: `rotate(-45deg) translateY(-${menuArrowOffset})`,
      },

      '&::after': {
        transform: `rotate(45deg) translateY(${menuArrowOffset})`,
      },
    },
  },
});

export default getRTLStyle;
