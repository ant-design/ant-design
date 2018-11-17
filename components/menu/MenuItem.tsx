import * as React from 'react';
import { Item } from 'rc-menu';
import * as PropTypes from 'prop-types';
import Tooltip from '../tooltip';

class MenuItem extends React.Component<any, any> {
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
    const props = this.props;
    return (
      <Tooltip
        title={inlineCollapsed && props.level === 1 ? props.children : ''}
        placement="right"
        overlayClassName={`${props.rootPrefixCls}-inline-collapsed-tooltip`}
      >
        <Item {...props} ref={this.saveMenuItem} />
      </Tooltip>
    );
  }
}

export default MenuItem;
