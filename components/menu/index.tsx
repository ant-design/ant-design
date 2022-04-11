import * as React from 'react';
import RcMenu, { ItemGroup, MenuProps as RcMenuProps, MenuRef } from 'rc-menu';
import classNames from 'classnames';
import omit from 'rc-util/lib/omit';
import EllipsisOutlined from '@ant-design/icons/EllipsisOutlined';
import { forwardRef } from 'react';
import SubMenu, { SubMenuProps } from './SubMenu';
import Item, { MenuItemProps } from './MenuItem';
import { ConfigContext } from '../config-provider';
import devWarning from '../_util/devWarning';
import { SiderContext, SiderContextProps } from '../layout/Sider';
import collapseMotion from '../_util/motion';
import { cloneElement } from '../_util/reactNode';
import MenuContext, { MenuTheme } from './MenuContext';
import MenuDivider from './MenuDivider';
import type { ItemType } from './hooks/useItems';
import useItems from './hooks/useItems';

export { MenuDividerProps } from './MenuDivider';

export { MenuItemGroupProps } from 'rc-menu';

export type MenuMode = 'vertical' | 'vertical-left' | 'vertical-right' | 'horizontal' | 'inline';

export interface MenuProps extends Omit<RcMenuProps, 'items'> {
  theme?: MenuTheme;
  inlineIndent?: number;

  // >>>>> Private
  /**
   * @private Internal Usage. Not promise crash if used in production. Connect with chenshuai2144
   *   for removing.
   */
  _internalDisableMenuItemTitleTooltip?: boolean;

  items?: ItemType[];
}

type InternalMenuProps = MenuProps &
  SiderContextProps & {
    collapsedWidth?: string | number;
  };

const InternalMenu = forwardRef<MenuRef, InternalMenuProps>((props, ref) => {
  const { getPrefixCls, getPopupContainer, direction } = React.useContext(ConfigContext);

  const rootPrefixCls = getPrefixCls();

  const {
    prefixCls: customizePrefixCls,
    className,
    theme = 'light',
    expandIcon,
    _internalDisableMenuItemTitleTooltip,
    inlineCollapsed,
    siderCollapsed,
    items,
    children,
    ...restProps
  } = props;

  const passedProps = omit(restProps, ['collapsedWidth']);

  // ========================= Items ===========================
  const mergedChildren = useItems(items) || children;

  // ======================== Warning ==========================
  devWarning(
    !('inlineCollapsed' in props && props.mode !== 'inline'),
    'Menu',
    '`inlineCollapsed` should only be used when `mode` is inline.',
  );

  devWarning(
    !(props.siderCollapsed !== undefined && 'inlineCollapsed' in props),
    'Menu',
    '`inlineCollapsed` not control Menu under Sider. Should set `collapsed` on Sider instead.',
  );

  devWarning(
    !!items && !children,
    'Menu',
    '`children` will be removed in next major version. Please use `items` instead.',
  );

  // ======================== Collapsed ========================
  // Inline Collapsed
  const mergedInlineCollapsed = React.useMemo(() => {
    if (siderCollapsed !== undefined) {
      return siderCollapsed;
    }
    return inlineCollapsed;
  }, [inlineCollapsed, siderCollapsed]);

  const defaultMotions = {
    horizontal: { motionName: `${rootPrefixCls}-slide-up` },
    inline: collapseMotion,
    other: { motionName: `${rootPrefixCls}-zoom-big` },
  };

  const prefixCls = getPrefixCls('menu', customizePrefixCls);
  const menuClassName = classNames(`${prefixCls}-${theme}`, className);

  // ======================== Context ==========================
  const contextValue = React.useMemo(
    () => ({
      prefixCls,
      inlineCollapsed: mergedInlineCollapsed || false,
      antdMenuTheme: theme,
      direction,
      firstLevel: true,
      disableMenuItemTitleTooltip: _internalDisableMenuItemTitleTooltip,
    }),
    [prefixCls, mergedInlineCollapsed, theme, direction, _internalDisableMenuItemTitleTooltip],
  );

  // ========================= Render ==========================
  return (
    <MenuContext.Provider value={contextValue}>
      <RcMenu
        getPopupContainer={getPopupContainer}
        overflowedIndicator={<EllipsisOutlined />}
        overflowedIndicatorPopupClassName={`${prefixCls}-${theme}`}
        {...passedProps}
        inlineCollapsed={mergedInlineCollapsed}
        className={menuClassName}
        prefixCls={prefixCls}
        direction={direction}
        defaultMotions={defaultMotions}
        expandIcon={
          typeof expandIcon === 'function'
            ? expandIcon
            : cloneElement(expandIcon, {
                className: `${prefixCls}-submenu-expand-icon`,
              })
        }
        ref={ref}
      >
        {mergedChildren}
      </RcMenu>
    </MenuContext.Provider>
  );
});

// We should keep this as ref-able
class Menu extends React.Component<MenuProps, {}> {
  static Divider = MenuDivider;

  static Item = Item;

  static SubMenu = SubMenu;

  static ItemGroup = ItemGroup;

  menu: MenuRef | null;

  focus = (options?: FocusOptions) => {
    this.menu?.focus(options);
  };

  render() {
    return (
      <SiderContext.Consumer>
        {(context: SiderContextProps) => (
          <InternalMenu
            ref={node => {
              this.menu = node;
            }}
            {...this.props}
            {...context}
          />
        )}
      </SiderContext.Consumer>
    );
  }
}

export { MenuTheme, SubMenuProps, MenuItemProps };

export default Menu;
