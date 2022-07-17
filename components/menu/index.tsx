import EllipsisOutlined from '@ant-design/icons/EllipsisOutlined';
import classNames from 'classnames';
import type { MenuProps as RcMenuProps, MenuRef } from 'rc-menu';
import RcMenu, { ItemGroup } from 'rc-menu';
import useEvent from 'rc-util/lib/hooks/useEvent';
import omit from 'rc-util/lib/omit';
import * as React from 'react';
import { forwardRef } from 'react';
import { ConfigContext } from '../config-provider';
import type { SiderContextProps } from '../layout/Sider';
import { SiderContext } from '../layout/Sider';
import collapseMotion from '../_util/motion';
import { cloneElement } from '../_util/reactNode';
import warning from '../_util/warning';
import type { ItemType } from './hooks/useItems';
import useItems from './hooks/useItems';
import MenuContext, { MenuTheme } from './MenuContext';
import MenuDivider from './MenuDivider';
import Item, { MenuItemProps } from './MenuItem';
import OverrideContext from './OverrideContext';
import SubMenu, { SubMenuProps } from './SubMenu';

export { MenuItemGroupProps } from 'rc-menu';
export { MenuDividerProps } from './MenuDivider';
export { MenuTheme, SubMenuProps, MenuItemProps };

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
  const override = React.useContext(OverrideContext) || {};

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
    mode,
    selectable,
    onClick,
    ...restProps
  } = props;

  const passedProps = omit(restProps, ['collapsedWidth']);

  // ========================= Items ===========================
  const mergedChildren = useItems(items) || children;

  // ======================== Warning ==========================
  warning(
    !('inlineCollapsed' in props && mode !== 'inline'),
    'Menu',
    '`inlineCollapsed` should only be used when `mode` is inline.',
  );

  warning(
    !(props.siderCollapsed !== undefined && 'inlineCollapsed' in props),
    'Menu',
    '`inlineCollapsed` not control Menu under Sider. Should set `collapsed` on Sider instead.',
  );

  warning(
    'items' in props && !children,
    'Menu',
    '`children` will be removed in next major version. Please use `items` instead.',
  );

  override.validator?.({ mode });

  // ========================== Click ==========================
  // Tell dropdown that item clicked
  const onItemClick = useEvent<Required<MenuProps>['onClick']>((...args) => {
    onClick?.(...args);
    override?.onClick?.();
  });

  // ========================== Mode ===========================
  const mergedMode = override.mode || mode;

  // ======================= Selectable ========================
  const mergedSelectable = selectable ?? override.selectable;

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

  const prefixCls = getPrefixCls('menu', customizePrefixCls || override.prefixCls);
  const menuClassName = classNames(`${prefixCls}-${theme}`, className);

  // ====================== Expand Icon ========================
  let mergedExpandIcon: MenuProps[`expandIcon`];
  if (typeof expandIcon === 'function') {
    mergedExpandIcon = expandIcon;
  } else {
    mergedExpandIcon = cloneElement(expandIcon || override.expandIcon, {
      className: `${prefixCls}-submenu-expand-icon`,
    });
  }

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
    <OverrideContext.Provider value={null}>
      <MenuContext.Provider value={contextValue}>
        <RcMenu
          getPopupContainer={getPopupContainer}
          overflowedIndicator={<EllipsisOutlined />}
          overflowedIndicatorPopupClassName={`${prefixCls}-${theme}`}
          mode={mergedMode}
          selectable={mergedSelectable}
          onClick={onItemClick}
          {...passedProps}
          inlineCollapsed={mergedInlineCollapsed}
          className={menuClassName}
          prefixCls={prefixCls}
          direction={direction}
          defaultMotions={defaultMotions}
          expandIcon={mergedExpandIcon}
          ref={ref}
        >
          {mergedChildren}
        </RcMenu>
      </MenuContext.Provider>
    </OverrideContext.Provider>
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

export default Menu;
