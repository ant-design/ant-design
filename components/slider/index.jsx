import React from 'react';
import Slider from 'rc-slider';

export default React.createClass({
  getDefaultProps() {
    return {
      prefixCls: 'ant-slider',
      tipTransitionName: 'zoom-down'
    };
  },
  render() {
    return <Slider {...this.props} />;
  }
});
