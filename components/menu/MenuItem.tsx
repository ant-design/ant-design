import * as React from 'react';
import { Item, MenuItemProps as RcMenuItemProps } from 'rc-menu';
import toArray from 'rc-util/lib/Children/toArray';
import classNames from 'classnames';
import MenuContext, { MenuContextProps } from './MenuContext';
import Tooltip, { TooltipProps } from '../tooltip';
import { SiderContext, SiderContextProps } from '../layout/Sider';
import { isValidElement } from '../_util/reactNode';

export interface MenuItemProps extends Omit<RcMenuItemProps, 'title'> {
  icon?: React.ReactNode;
  danger?: boolean;
  title?: React.ReactNode;
}

export default class MenuItem extends React.Component<MenuItemProps> {
  static isMenuItem = true;

  private menuItem: this;

  onKeyDown = (e: React.MouseEvent<HTMLElement>) => {
    this.menuItem.onKeyDown(e);
  };

  saveMenuItem = (menuItem: this) => {
    this.menuItem = menuItem;
  };

  renderItemChildren(inlineCollapsed: boolean) {
    const { icon, children, level, rootPrefixCls } = this.props;
    // inline-collapsed.md demo 依赖 span 来隐藏文字,有 icon 属性，则内部包裹一个 span
    // ref: https://github.com/ant-design/ant-design/pull/23456
    if (!icon || (isValidElement(children) && children.type === 'span')) {
      if (children && inlineCollapsed && level === 1 && typeof children === 'string') {
        return (
          <div className={`${rootPrefixCls}-inline-collapsed-noicon`}>{children.charAt(0)}</div>
        );
      }
      return children;
    }
    return <span>{children}</span>;
  }

  renderItem = ({ siderCollapsed }: SiderContextProps) => {
    const { level, className, children, rootPrefixCls } = this.props;
    const { title, icon, danger, ...rest } = this.props;

    return (
      <MenuContext.Consumer>
        {({ inlineCollapsed, direction }: MenuContextProps) => {
          let tooltipTitle = title;
          if (typeof title === 'undefined') {
            tooltipTitle = level === 1 ? children : '';
          } else if (title === false) {
            tooltipTitle = '';
          }
          const tooltipProps: TooltipProps = {
            title: tooltipTitle,
          };

          if (!siderCollapsed && !inlineCollapsed) {
            tooltipProps.title = null;
            // Reset `visible` to fix control mode tooltip display not correct
            // ref: https://github.com/ant-design/ant-design/issues/16742
            tooltipProps.visible = false;
          }
          const childrenLength = toArray(children).length;
          return (
            <Tooltip
              {...tooltipProps}
              placement={direction === 'rtl' ? 'left' : 'right'}
              overlayClassName={`${rootPrefixCls}-inline-collapsed-tooltip`}
            >
              <Item
                {...rest}
                className={classNames(className, {
                  [`${rootPrefixCls}-item-danger`]: danger,
                  [`${rootPrefixCls}-item-only-child`]:
                    (icon ? childrenLength + 1 : childrenLength) === 1,
                })}
                title={title}
                ref={this.saveMenuItem}
              >
                {icon}
                {this.renderItemChildren(inlineCollapsed)}
              </Item>
            </Tooltip>
          );
        }}
      </MenuContext.Consumer>
    );
  };

  render() {
    return <SiderContext.Consumer>{this.renderItem}</SiderContext.Consumer>;
  }
}
