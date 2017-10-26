import React from 'react';
import { Item } from 'rc-menu';
import PropTypes from 'prop-types';
import Tooltip from '../tooltip';

class MenuItem extends React.Component {
  static contextTypes = {
    inlineCollapsed: PropTypes.bool,
  };

  render() {
    const { inlineCollapsed } = this.context;
    const { rootPrefixCls, level, children } = this.context;

    return (
      <Tooltip
        title={inlineCollapsed && level === 1 ? children : ''}
        placement="right"
        overlayClassName={`${rootPrefixCls}-inline-collapsed-tooltip`}
      >
        <Item {...this.props} />
      </Tooltip>
    );
  }
}

MenuItem.isMenuItem = 1;

export default MenuItem;
