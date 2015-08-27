import React from 'react';
import Steps from 'rc-steps';

const AntSteps = React.createClass({
  getDefaultProps() {
    return {
      iconPrefix: 'ant',
      size: 'default',
      maxDescriptionWidth: 100
    };
  },
  render() {
    let stepsCls = '';
    if (this.props.direction === 'vertical') {
      if (this.props.size === 'small') {
        stepsCls = 'ant-steps-vertical-small ant-steps';
      } else {
        stepsCls = 'ant-steps-vertical ant-steps';
      }
    } else {
      stepsCls = 'ant-steps';
    }
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
