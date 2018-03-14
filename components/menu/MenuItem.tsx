import * as React from 'react';
import { Item } from 'rc-menu';
import PropTypes from 'prop-types';
import Tooltip from '../tooltip';

class MenuItem extends React.Component<any, any> {
  static contextTypes = {
    inlineCollapsed: PropTypes.bool,
  };
  static isMenuItem = 1;
  private menuItem: any;
  onKeyDown = (e: React.MouseEvent<HTMLElement>) => {
    this.menuItem.onKeyDown(e);
  }
  saveMenuItem = (menuItem: any) => {
    this.menuItem = menuItem;
  }
  render() {
    const { inlineCollapsed } = this.context;
    const props = this.props;
    const item = <Item {...props} ref={this.saveMenuItem} />;
    if (inlineCollapsed && props.level === 1) {
      return <Tooltip
        title={props.children}
        placement="right"
        overlayClassName={`${props.rootPrefixCls}-inline-collapsed-tooltip`}
      >
        {item}
      </Tooltip>;
    }
    return item;
  }
}

export default MenuItem;
