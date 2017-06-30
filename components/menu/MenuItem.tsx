import React from 'react';
import { Item } from 'rc-menu';
import PropTypes from 'prop-types';
import Tooltip from '../tooltip';

const MenuItem: any = (props, { inlineCollapsed }) => {
  return (
    <Tooltip
      title={inlineCollapsed && props.level === 1 ? props.children : ''}
      placement="right"
      overlayClassName={`${props.rootPrefixCls}-inline-collapsed-tooltip`}
    >
      <Item {...props} />
    </Tooltip>
  );
};

MenuItem.contextTypes = {
  inlineCollapsed: PropTypes.bool,
};

export default MenuItem;
