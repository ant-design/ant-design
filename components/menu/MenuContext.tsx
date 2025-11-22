import { createContext } from 'react';

import type { SemanticClassNames, SemanticStyles } from '../_util/hooks';
import type { DirectionType } from '../config-provider';
import type { SemanticName, SubMenuSemanticName } from './menu';

export type MenuTheme = 'light' | 'dark';

export interface MenuContextProps {
  prefixCls: string;
  inlineCollapsed: boolean;
  direction?: DirectionType;
  theme?: MenuTheme;
  firstLevel: boolean;
  /** @internal Safe to remove */
  disableMenuItemTitleTooltip?: boolean;
  classNames: SemanticClassNames<SemanticName> & {
    popup: SemanticClassNames<'root'>;
    subMenu: SemanticClassNames<SubMenuSemanticName>;
  };
  styles: SemanticStyles<SemanticName> & {
    popup: SemanticStyles<'root'>;
    subMenu: SemanticStyles<SubMenuSemanticName>;
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
