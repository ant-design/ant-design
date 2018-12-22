import * as React from 'react';
import { Item } from 'rc-menu';
import * as PropTypes from 'prop-types';
import Tooltip from '../tooltip';
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
  showTextInlineCollapsed?: boolean;
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
  };
  saveMenuItem = (menuItem: any) => {
    this.menuItem = menuItem;
  };
  render() {
    const { inlineCollapsed } = this.context;
    const { level, children, rootPrefixCls, showTextInlineCollapsed } = this.props;
    const { title, className, ...rest } = this.props;

    let titleNode;
    if (inlineCollapsed) {
      titleNode = title || (level === 1 ? children : '');
    }

    const itemClassName = classNames(className, {
      [`${rootPrefixCls}-item-collapse`]: showTextInlineCollapsed,
    });

    if (showTextInlineCollapsed) {
      return <Item {...rest} className={itemClassName} title={title} ref={this.saveMenuItem} />;
    }

    return (
      <Tooltip
        title={titleNode}
        placement="right"
        overlayClassName={`${rootPrefixCls}-inline-collapsed-tooltip`}
      >
        <Item
          {...rest}
          className={itemClassName}
          title={inlineCollapsed ? null : title}
          ref={this.saveMenuItem}
        />
      </Tooltip>
    );
  }
}

export default MenuItem;
