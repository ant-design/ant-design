import { createContext } from 'react';

import type { DirectionType } from '../config-provider';
import type {
  MenuPopupSemanticClassNames,
  MenuPopupSemanticStyles,
  MenuSemanticClassNames,
  MenuSemanticStyles,
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
    popup?: MenuPopupSemanticClassNames;
    subMenu?: SubMenuSemanticClassNames;
  };
  styles?: MenuSemanticStyles & {
    popup?: MenuPopupSemanticStyles;
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
