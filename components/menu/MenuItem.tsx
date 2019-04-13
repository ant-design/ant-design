import * as React from 'react';
import { Item } from 'rc-menu';
import { ClickParam } from '.';
import { MenuContext, MenuContextProps } from './';
import Tooltip from '../tooltip';
import { SiderContext, SiderContextProps } from '../layout/Sider';

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

  renderItem = ({ siderCollapsed }: SiderContextProps) => {
    const { level, children, rootPrefixCls } = this.props;
    const { title, ...rest } = this.props;

    return (
      <MenuContext.Consumer>
        {({ inlineCollapsed }: MenuContextProps) => {
          let titleNode = title || (level === 1 ? children : '');
          if (!siderCollapsed && !inlineCollapsed) {
            titleNode = null;
          }

          return (
            <Tooltip
              title={titleNode}
              placement="right"
              overlayClassName={`${rootPrefixCls}-inline-collapsed-tooltip`}
            >
              <Item {...rest} title={title} ref={this.saveMenuItem} />
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
