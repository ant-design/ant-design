import React from 'react';

let AntTimeline = React.createClass({
  getDefaultProps() {
    return {
      prefixCls: 'ant-timeline'
    };
  },
  render() {
    return (
      <ul className={this.props.prefixCls}>
        {this.props.children}
      </ul>
    );
  }
});

AntTimeline.Item = React.createClass({
  getDefaultProps() {
    return {
      prefixCls: 'ant-timeline',
      color: 'blue',
      dashed: false
    };
  },
  render() {
    return (
      <li className={this.props.prefixCls + '-item'}>
        {this.props.children}
      </li>
    );
  }
});

export default AntTimeline;
