import { createContext } from 'react';

export type MenuTheme = 'light' | 'dark';

export interface MenuContextProps {
  inlineCollapsed: boolean;
  antdMenuTheme?: MenuTheme;
  direction?: 'ltr' | 'rtl';
  arrow: boolean;
}

const MenuContext = createContext<MenuContextProps>({
  inlineCollapsed: false,
  arrow: false,
});

export default MenuContext;
