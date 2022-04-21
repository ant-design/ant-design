import { createContext } from 'react';
import { DirectionType } from '../config-provider';

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

/**
 * @private Internal Usage, do not use!!!
 *
 *   Tell Menu that it's created in a nest content. Currently only the Dropdown use this.
 *   `rc-dropdown` will modify Menu component `prefixCls` which should affect cssinjs logic, we need
 *   tell Menu that do not inject style since Dropdown will handle it self.
 */
export const NestContext = createContext(false);
