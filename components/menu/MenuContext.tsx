import { createContext } from 'react';

import type { DirectionType } from '../config-provider';
import type { SemanticName, SubMenuName } from './menu';

export type MenuTheme = 'light' | 'dark';

export interface MenuContextProps {
  prefixCls: string;
  inlineCollapsed: boolean;
  direction?: DirectionType;
  theme?: MenuTheme;
  firstLevel: boolean;
  /** @internal Safe to remove */
  disableMenuItemTitleTooltip?: boolean;
  classNames: Required<
    Record<SemanticName, string> & {
      popup: { root: string };
      subMenu: Required<Record<SubMenuName, string>>;
    }
  >;
  styles: Required<
    Record<SemanticName, React.CSSProperties> & {
      subMenu: Required<Record<SubMenuName, React.CSSProperties>>;
      popup: { root: React.CSSProperties };
    }
  >;
}

const MenuContext = createContext<MenuContextProps>({
  prefixCls: '',
  firstLevel: true,
  inlineCollapsed: false,
  styles: null!,
  classNames: null!,
});

export default MenuContext;
