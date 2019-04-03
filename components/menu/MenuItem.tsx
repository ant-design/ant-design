import * as React from 'react';
import { Item } from 'rc-menu';
import Tooltip from '../tooltip';
import { ClickParam } from '.';

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

export default class MenuItem extends React.Component<MenuItemProps> {
  static isMenuItem = true;
  private menuItem: this;

  onKeyDown = (e: React.MouseEvent<HTMLElement>) => {
    this.menuItem.onKeyDown(e);
  };

  saveMenuItem = (menuItem: this) => {
    this.menuItem = menuItem;
  };

  render() {
    const { rootPrefixCls, title, ...rest } = this.props;

    return (
      <Tooltip
        title={title}
        placement="right"
        overlayClassName={`${rootPrefixCls}-inline-collapsed-tooltip`}
      >
        <Item {...rest} rootPrefixCls={rootPrefixCls} title={title} ref={this.saveMenuItem} />
      </Tooltip>
    );
  }
}
