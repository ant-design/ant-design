import { createContext } from 'react';
import type { DirectionType } from '../config-provider';

export type MenuTheme = 'light' | 'dark';

export interface MenuContextProps {
  prefixCls: string;
  inlineCollapsed: boolean;
  antdMenuTheme?: MenuTheme;
  direction?: DirectionType;
  firstLevel: boolean;
  /** @private Internal Usage. Safe to remove */
  disableMenuItemTitleTooltip?: boolean;
}

const MenuContext = createContext<MenuContextProps>({
  prefixCls: '',
  firstLevel: true,
  inlineCollapsed: false,
});

export default MenuContext;
