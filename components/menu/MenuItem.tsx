import * as React from 'react';
import { Item } from 'rc-menu';
import { ClickParam } from '.';
import MenuContext, { MenuContextProps } from './MenuContext';
import Tooltip, { TooltipProps } from '../tooltip';
import { SiderContext, SiderContextProps } from '../layout/Sider';

export interface MenuItemProps
  extends Omit<
    React.HTMLAttributes<HTMLLIElement>,
    'title' | 'onClick' | 'onMouseEnter' | 'onMouseLeave'
  > {
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
          const tooltipProps: TooltipProps = {
            title: title || (level === 1 ? children : ''),
          };

          if (!siderCollapsed && !inlineCollapsed) {
            tooltipProps.title = null;
            // Reset `visible` to fix control mode tooltip display not correct
            // ref: https://github.com/ant-design/ant-design/issues/16742
            tooltipProps.visible = false;
          }

          return (
            <Tooltip
              {...tooltipProps}
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
