import * as React from 'react';
import { Item } from 'rc-menu';
import * as PropTypes from 'prop-types';
import Tooltip from '../tooltip';

interface MenuItemProps {
  rootPrefixCls?: string;
  disabled?: boolean;
  level?: number;
  title?: React.ReactNode;
  children?: React.ReactNode;
}

class MenuItem extends React.Component<MenuItemProps, any> {
  static contextTypes = {
    inlineCollapsed: PropTypes.bool,
  };
  static isMenuItem = 1;
  context: any;
  private menuItem: any;
  onKeyDown = (e: React.MouseEvent<HTMLElement>) => {
    this.menuItem.onKeyDown(e);
  }
  saveMenuItem = (menuItem: any) => {
    this.menuItem = menuItem;
  }
  render() {
    const { inlineCollapsed } = this.context;
    const { level, children, rootPrefixCls } = this.props;
    const { title, ...rest } = this.props;

    let titleNode;
    if (inlineCollapsed) {
      titleNode = title || (level === 1 ? children : '');
    }

    return (
      <Tooltip
        title={titleNode}
        placement="right"
        overlayClassName={`${rootPrefixCls}-inline-collapsed-tooltip`}
      >
        <Item {...rest} title={inlineCollapsed ? null : title} ref={this.saveMenuItem} />
      </Tooltip>
    );
  }
}

export default MenuItem;
