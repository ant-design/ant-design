import { createContext } from 'react';
import type { DirectionType } from '../config-provider';

export type MenuTheme = 'light' | 'dark';

export interface MenuContextProps {
  prefixCls: string;
  inlineCollapsed: boolean;
  direction?: DirectionType;
  theme?: MenuTheme;
  firstLevel: boolean;
  /** @internal Safe to remove */
  disableMenuItemTitleTooltip?: boolean;
}

const MenuContext = createContext<MenuContextProps>({
  prefixCls: '',
  firstLevel: true,
  inlineCollapsed: false,
});

export default MenuContext;
