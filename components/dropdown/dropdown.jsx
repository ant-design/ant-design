import React from 'react';
import RcDropdown from 'rc-dropdown';

export default class Dropdown extends React.Component {
  render() {
    const { overlay, ...otherProps } = this.props;
    const menu = React.cloneElement(overlay, {
      openTransitionName: 'zoom-big',
    });
    return (
      <RcDropdown {...otherProps} overlay={menu} />
    );
  }
}

Dropdown.defaultProps = {
  transitionName: 'slide-up',
  prefixCls: 'ant-dropdown',
  mouseEnterDelay: 0.15,
  mouseLeaveDelay: 0.1,
};
