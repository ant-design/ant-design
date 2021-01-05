import * as React from 'react';
import RcMenu, { Divider, ItemGroup, MenuProps as RcMenuProps } from 'rc-menu';
import classNames from 'classnames';
import SubMenu from './SubMenu';
import Item from './MenuItem';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import devWarning from '../_util/devWarning';
import { SiderContext, SiderContextProps } from '../layout/Sider';
import collapseMotion from '../_util/motion';
import { cloneElement } from '../_util/reactNode';
import MenuContext, { MenuTheme } from './MenuContext';

export { MenuItemGroupProps } from 'rc-menu';

export type MenuMode = 'vertical' | 'vertical-left' | 'vertical-right' | 'horizontal' | 'inline';

export interface MenuProps extends RcMenuProps {
  theme?: MenuTheme;
  inlineIndent?: number;
  focusable?: boolean;
}

type InternalMenuProps = MenuProps & SiderContextProps;

class InternalMenu extends React.Component<InternalMenuProps> {
  static defaultProps: Partial<MenuProps> = {
    className: '',
    theme: 'light', // or dark
    focusable: false,
  };

  constructor(props: InternalMenuProps) {
    super(props);

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
  }

  getInlineCollapsed() {
    const { inlineCollapsed, siderCollapsed } = this.props;
    if (siderCollapsed !== undefined) {
      return siderCollapsed;
    }
    return inlineCollapsed;
  }

  renderMenu = ({ getPopupContainer, getPrefixCls, direction }: ConfigConsumerProps) => {
    const { prefixCls: customizePrefixCls, className, theme, expandIcon } = this.props;
    const defaultMotions = {
      horizontal: { motionName: 'slide-up' },
      inline: collapseMotion,
      other: { motionName: 'zoom-big' },
    };

    const prefixCls = getPrefixCls('menu', customizePrefixCls);
    const menuClassName = classNames(
      `${prefixCls}-${theme}`,
      {
        [`${prefixCls}-inline-collapsed`]: this.getInlineCollapsed(),
      },
      className,
    );

    return (
      <MenuContext.Provider
        value={{
          inlineCollapsed: this.getInlineCollapsed() || false,
          antdMenuTheme: theme,
          direction,
        }}
      >
        <RcMenu
          getPopupContainer={getPopupContainer}
          {...this.props}
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
  };

  render() {
    return <ConfigConsumer>{this.renderMenu}</ConfigConsumer>;
  }
}

// We should keep this as ref-able
export default class Menu extends React.Component<MenuProps, {}> {
  static Divider = Divider;

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
