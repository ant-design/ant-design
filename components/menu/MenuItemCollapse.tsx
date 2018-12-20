import * as React from 'react';
import { Item } from 'rc-menu';
import * as PropTypes from 'prop-types';
import { ClickParam } from './index';
import classNames from 'classnames';

interface MenuItemProps {
  rootPrefixCls?: string;
  disabled?: boolean;
  level?: number;
  title?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  onClick?: (param: ClickParam) => void;
}

class MenuItemCollapse extends React.Component<MenuItemProps, any> {
  static contextTypes = {
    inlineCollapsed: PropTypes.bool,
  };
  static isMenuItem = 1;
  context: any;
  private menuItem: any;

  onKeyDown = (e: React.MouseEvent<HTMLElement>) => {
    this.menuItem.onKeyDown(e);
  };

  saveMenuItem = (menuItem: any) => {
    this.menuItem = menuItem;
  };

  render() {
    const { inlineCollapsed } = this.context;
    const { rootPrefixCls } = this.props;
    const { title, className, ...rest } = this.props;

    const itemClassName = classNames(className, {
      [`${rootPrefixCls}-item-collapse`]: inlineCollapsed,
    });

    return <Item {...rest} className={itemClassName} title={title} ref={this.saveMenuItem} />;
  }
}

export default MenuItemCollapse;
