import React from 'react';
import Dropdown from 'rc-dropdown';

export default class AntDropdown extends React.Component {
  render() {
    const { overlay, ...otherProps } = this.props;
    const menu = React.cloneElement(overlay, {
      openTransitionName: 'zoom-big',
    });
    return (
      <Dropdown {...otherProps} overlay={menu} />
    );
  }
}

AntDropdown.defaultProps = {
  transitionName: 'slide-up',
  prefixCls: 'ant-dropdown',
  mouseEnterDelay: 0.15,
  mouseLeaveDelay: 0.1,
};
