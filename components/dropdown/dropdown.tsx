import * as React from 'react';
import RcDropdown from 'rc-dropdown';
import splitObject from '../_util/splitObject';

export default class Dropdown extends React.Component {
  static defaultProps = {
    transitionName: 'slide-up',
    prefixCls: 'ant-dropdown',
    mouseEnterDelay: 0.15,
    mouseLeaveDelay: 0.1,
  }

  render() {
    const [{overlay}, others] = splitObject(this.props,
      ['overlay']);
    
    const menu = React.cloneElement(overlay, {
      openTransitionName: 'zoom-big',
    });
    return (
      <RcDropdown {...others} overlay={menu} />
    );
  }
}
