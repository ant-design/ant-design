import { createContext } from 'react';
import { DirectionType } from '../config-provider';

export type MenuTheme = 'light' | 'dark';

export interface MenuContextProps {
  prefixCls: string;
  inlineCollapsed: boolean;
  antdMenuTheme?: MenuTheme;
  direction?: DirectionType;
}

const MenuContext = createContext<MenuContextProps>({
  prefixCls: '',
  inlineCollapsed: false,
});

export default MenuContext;
