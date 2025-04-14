import { createContext } from 'react';

import type { DirectionType } from '../config-provider';
import { MenuProps } from './menu';

export type MenuTheme = 'light' | 'dark';

export interface MenuContextProps {
  prefixCls: string;
  inlineCollapsed: boolean;
  direction?: DirectionType;
  theme?: MenuTheme;
  firstLevel: boolean;
  /** @internal Safe to remove */
  disableMenuItemTitleTooltip?: boolean;
  classNames?: MenuProps['classNames'];
  styles?: MenuProps['styles'];
}

const MenuContext = createContext<MenuContextProps>({
  prefixCls: '',
  firstLevel: true,
  inlineCollapsed: false,
});

export default MenuContext;
