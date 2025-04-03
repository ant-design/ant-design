import { createContext } from 'react';

import type { DirectionType } from '../config-provider';
import { SemanticName } from './menu';

export type MenuTheme = 'light' | 'dark';

export interface MenuContextProps {
  prefixCls: string;
  inlineCollapsed: boolean;
  direction?: DirectionType;
  theme?: MenuTheme;
  firstLevel: boolean;
  /** @internal Safe to remove */
  disableMenuItemTitleTooltip?: boolean;
  classNames?: Partial<Record<SemanticName, string>>;
  styles?: Partial<Record<SemanticName, React.CSSProperties>>;
}

const MenuContext = createContext<MenuContextProps>({
  prefixCls: '',
  firstLevel: true,
  inlineCollapsed: false,
});

export default MenuContext;
