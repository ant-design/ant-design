import { createContext } from 'react';

import type { DirectionType } from '../config-provider';
import type {
  MenuSemanticClassNames,
  MenuSemanticStyles,
  PopupSemanticClassNames,
  PopupSemanticStyles,
  SubMenuSemanticClassNames,
  SubMenuSemanticStyles,
} from './menu';

export type MenuTheme = 'light' | 'dark';

export interface MenuContextProps {
  prefixCls: string;
  inlineCollapsed: boolean;
  direction?: DirectionType;
  theme?: MenuTheme;
  firstLevel: boolean;
  /** @internal Safe to remove */
  disableMenuItemTitleTooltip?: boolean;
  classNames?: MenuSemanticClassNames & {
    popup?: PopupSemanticClassNames;
    subMenu?: SubMenuSemanticClassNames;
  };
  styles?: MenuSemanticStyles & {
    popup?: PopupSemanticStyles;
    subMenu?: SubMenuSemanticStyles;
  };
}

const MenuContext = createContext<MenuContextProps>({
  prefixCls: '',
  firstLevel: true,
  inlineCollapsed: false,
  styles: null!,
  classNames: null!,
});

export default MenuContext;
