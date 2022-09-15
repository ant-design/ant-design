import { ItemGroup } from 'rc-menu';
import type { MenuRef as RcMenuRef } from 'rc-menu';
import * as React from 'react';
import { forwardRef, useImperativeHandle, useMemo, useRef } from 'react';
import { TinyColor } from '@ctrl/tinycolor';
import type { MenuProps } from './menu';
import InternalMenu from './menu';
import type { SiderContextProps } from '../layout/Sider';
import { SiderContext } from '../layout/Sider';
import { MenuTheme } from './MenuContext';
import MenuDivider from './MenuDivider';
import Item, { MenuItemProps } from './MenuItem';
import SubMenu, { SubMenuProps } from './SubMenu';
import { ConfigProvider } from '..';
import type { ComponentToken } from './style';
import { useToken } from '../theme';

export { MenuItemGroupProps } from 'rc-menu';
export { MenuDividerProps } from './MenuDivider';
export { MenuTheme, SubMenuProps, MenuItemProps, MenuProps };

export type MenuMode = 'vertical' | 'vertical-left' | 'vertical-right' | 'horizontal' | 'inline';

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

const ThemedMenu = forwardRef<MenuRef, MenuProps>(({ theme = 'light', ...rest }, ref) => {
  const menuRef = useRef<RcMenuRef>(null);
  const [, token] = useToken();

  useImperativeHandle(ref, () => ({
    focus: options => {
      menuRef.current?.focus(options);
    },
    menu: menuRef.current,
  }));

  const { colorTextLightSolid, colorTextDescription, colorPrimary, colorError, colorErrorHover } =
    token;

  const darkThemeToken = useMemo<Partial<ComponentToken>>(() => {
    if (theme === 'dark') {
      return {
        colorItemText: new TinyColor(colorTextLightSolid).setAlpha(0.65).toRgbString(),
        colorItemTextHover: colorTextLightSolid,
        colorGroupTitle: colorTextDescription,
        colorItemTextSelected: colorTextLightSolid,
        colorItemBg: '#001529',
        colorSubItemBg: '#000c17',
        colorItemBgActive: 'transparent',
        colorItemBgSelected: colorPrimary,
        colorActiveBarWidth: 0,
        colorActiveBarHeight: 0,
        colorActiveBarBorderSize: 0,

        // Disabled
        colorItemTextDisabled: new TinyColor(colorTextLightSolid).setAlpha(0.25).toRgbString(),

        // Danger
        colorDangerItemText: colorError,
        colorDangerItemTextHover: colorErrorHover,
        colorDangerItemTextSelected: colorTextLightSolid,
        colorDangerItemBgActive: colorError,
        colorDangerItemBgSelected: colorError,
      };
    }
    return {};
  }, [theme]);

  return (
    <ConfigProvider theme={{ components: { Menu: darkThemeToken } }}>
      <SiderContext.Consumer>
        {(context: SiderContextProps) => <InternalMenu ref={menuRef} {...rest} {...context} />}
      </SiderContext.Consumer>
    </ConfigProvider>
  );
});

const Menu: CompoundedComponent = ThemedMenu as CompoundedComponent;

Menu.Divider = MenuDivider;
Menu.Item = Item;
Menu.SubMenu = SubMenu;
Menu.ItemGroup = ItemGroup;

export default Menu;
