import React from 'react';
import Steps from 'rc-steps';

const AntSteps = React.createClass({
  getDefaultProps() {
    return {
      prefixCls: 'ant-steps',
      iconPrefix: 'ant',
      size: 'default',
      maxDescriptionWidth: 100
    };
  },
  render() {
    let stepsCls = this.props.direction === 'vertical' ? (this.props.size === 'small' ? 'ant-steps-vertical-small ant-steps' : 'ant-steps-vertical ant-steps') : 'ant-steps';
    return (<Steps size={this.props.size}
                   iconPrefix={this.props.iconPrefix}
                   maxDescriptionWidth={this.props.maxDescriptionWidth}
                   prefixCls={stepsCls}>
      {this.props.children}
    </Steps>);
  }
});
AntSteps.Step = Steps.Step;

export default AntSteps;
