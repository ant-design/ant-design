import { unit } from '@ant-design/cssinjs';
import type { CssUtil } from 'antd-style';

import type { MenuToken } from '.';
import type { GenerateStyle } from '../../theme/internal';

const getRTLStyle: GenerateStyle<MenuToken & CssUtil> = ({
  componentCls,
  menuArrowOffset,
  calc,
}) => ({
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
        transform: `rotate(-45deg) translateY(${unit(calc(menuArrowOffset).mul(-1).equal())})`,
      },

      '&::after': {
        transform: `rotate(45deg) translateY(${unit(menuArrowOffset)})`,
      },
    },
  },
});

export default getRTLStyle;
