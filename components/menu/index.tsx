import * as React from 'react';
import RcMenu, { ItemGroup, MenuProps as RcMenuProps } from 'rc-menu';
import classNames from 'classnames';
import omit from 'rc-util/lib/omit';
import EllipsisOutlined from '@ant-design/icons/EllipsisOutlined';
import SubMenu, { SubMenuProps } from './SubMenu';
import Item, { MenuItemProps } from './MenuItem';
import { ConfigContext } from '../config-provider';
import devWarning from '../_util/devWarning';
import { SiderContext, SiderContextProps } from '../layout/Sider';
import collapseMotion from '../_util/motion';
import { cloneElement } from '../_util/reactNode';
import MenuContext, { MenuTheme } from './MenuContext';
import MenuDivider from './MenuDivider';

export { MenuDividerProps } from './MenuDivider';

export { MenuItemGroupProps } from 'rc-menu';

export type MenuMode = 'vertical' | 'vertical-left' | 'vertical-right' | 'horizontal' | 'inline';

export interface MenuProps extends RcMenuProps {
  theme?: MenuTheme;
  inlineIndent?: number;

  // >>>>> Private
  /**
   * @private Internal Usage. Not promise crash if used in production. Connect with chenshuai2144
   *   for removing.
   */
  _internalDisableMenuItemTitleTooltip?: boolean;
}

type InternalMenuProps = MenuProps &
  SiderContextProps & {
    collapsedWidth?: string | number;
  };

function InternalMenu(props: InternalMenuProps) {
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
    ...restProps
  } = props;

  const passedProps = omit(restProps, ['collapsedWidth']);

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
        expandIcon={cloneElement(expandIcon, {
          className: `${prefixCls}-submenu-expand-icon`,
        })}
      />
    </MenuContext.Provider>
  );
}

// We should keep this as ref-able
class Menu extends React.Component<MenuProps, {}> {
  static Divider = MenuDivider;

  static Item = Item;

  static SubMenu = SubMenu;

  static ItemGroup = ItemGroup;

  render() {
    return (
      <SiderContext.Consumer>
        {(context: SiderContextProps) => <InternalMenu {...this.props} {...context} />}
      </SiderContext.Consumer>
    );
  }
}

export { MenuTheme, SubMenuProps, MenuItemProps };

export default Menu;
