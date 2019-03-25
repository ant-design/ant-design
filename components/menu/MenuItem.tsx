import * as React from 'react';
import { Item } from 'rc-menu';
import Tooltip from '../tooltip';
import { ClickParam } from './index';

export interface MenuItemProps {
  rootPrefixCls?: string;
  disabled?: boolean;
  level?: number;
  title?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (param: ClickParam) => void;
  onMouseEnter?: (e: { key: string; domEvent: MouseEvent }) => void;
  onMouseLeave?: (e: { key: string; domEvent: MouseEvent }) => void;
}

class MenuItem extends React.Component<MenuItemProps> {
  static isMenuItem = 1;
  private menuItem: this;

  onKeyDown = (e: React.MouseEvent<HTMLElement>) => {
    this.menuItem.onKeyDown(e);
  };
  saveMenuItem = (menuItem: this) => {
    this.menuItem = menuItem;
  };
  render() {
    const { level, children, rootPrefixCls } = this.props;
    const { title, ...rest } = this.props;

    let titleNode;
    titleNode = title || (level === 1 ? children : '');

    return (
      <Tooltip
        title={titleNode}
        placement="right"
        overlayClassName={`${rootPrefixCls}-inline-collapsed-tooltip`}
      >
        <Item {...rest} title={title} ref={this.saveMenuItem} />
      </Tooltip>
    );
  }
}

export default MenuItem;
