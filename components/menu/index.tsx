import type { MenuRef as RcMenuRef } from 'rc-menu';
import { ItemGroup } from 'rc-menu';
import * as React from 'react';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import type { MenuProps } from './menu';
import InternalMenu from './menu';
import { SiderContext } from '../layout/Sider';
import type { MenuTheme } from './MenuContext';
import MenuDivider from './MenuDivider';
import Item, { type MenuItemProps } from './MenuItem';
import SubMenu, { type SubMenuProps } from './SubMenu';

export type { MenuItemGroupProps } from 'rc-menu';
export type { MenuDividerProps } from './MenuDivider';
export type { MenuTheme, SubMenuProps, MenuItemProps, MenuProps };

export type MenuRef = {
  menu: RcMenuRef | null;
  focus: (options?: FocusOptions) => void;
};

type CompoundedComponent = React.ForwardRefExoticComponent<
  MenuProps & React.RefAttributes<MenuRef>
> & {
  Item: typeof Item;
  SubMenu: typeof SubMenu;
  Divider: typeof MenuDivider;
  ItemGroup: typeof ItemGroup;
};

const Menu = forwardRef<MenuRef, MenuProps>((props, ref) => {
  const menuRef = useRef<RcMenuRef>(null);
  const context = React.useContext(SiderContext);

  useImperativeHandle(ref, () => ({
    menu: menuRef.current,
    focus: (options) => {
      menuRef.current?.focus(options);
    },
  }));
  return <InternalMenu ref={menuRef} {...props} {...context} />;
}) as CompoundedComponent;

Menu.Item = Item;
Menu.SubMenu = SubMenu;
Menu.Divider = MenuDivider;
Menu.ItemGroup = ItemGroup;

if (process.env.NODE_ENV !== 'production') {
  Menu.displayName = 'Menu';
}

export default Menu;
