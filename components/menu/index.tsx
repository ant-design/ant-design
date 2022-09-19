import type { MenuRef as RcMenuRef } from 'rc-menu';
import { ItemGroup } from 'rc-menu';
import * as React from 'react';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import type { MenuProps } from './menu';
import InternalMenu from './menu';
import { SiderContext } from '../layout/Sider';
import { MenuTheme } from './MenuContext';
import MenuDivider from './MenuDivider';
import Item, { MenuItemProps } from './MenuItem';
import SubMenu, { SubMenuProps } from './SubMenu';

export { MenuItemGroupProps } from 'rc-menu';
export { MenuDividerProps } from './MenuDivider';
export { MenuTheme, SubMenuProps, MenuItemProps, MenuProps };

export type MenuRef = {
  menu: RcMenuRef | null;
  focus: (options?: FocusOptions) => void;
};

interface CompoundedComponent
  extends React.ForwardRefExoticComponent<MenuProps & React.RefAttributes<MenuRef>> {
  Divider: typeof MenuDivider;
  Item: typeof Item;
  SubMenu: typeof SubMenu;
  ItemGroup: typeof ItemGroup;
}

const Menu = forwardRef<MenuRef, MenuProps>((props, ref) => {
  const menuRef = useRef<RcMenuRef>(null);
  const context = React.useContext(SiderContext);

  useImperativeHandle(ref, () => ({
    focus: options => {
      menuRef.current?.focus(options);
    },
    menu: menuRef.current,
  }));

  return <InternalMenu ref={menuRef} {...props} {...context} />;
}) as CompoundedComponent;

Menu.Divider = MenuDivider;
Menu.Item = Item;
Menu.SubMenu = SubMenu;
Menu.ItemGroup = ItemGroup;

export default Menu;
