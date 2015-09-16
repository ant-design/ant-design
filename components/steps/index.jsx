import React from 'react';
import Steps from 'rc-steps';

const AntSteps = React.createClass({
  getDefaultProps() {
    return {
      prefixCls: 'ant-steps',
      iconPrefix: 'ant',
      size: 'default',
      maxDescriptionWidth: 100,
      current: 0
    };
  },
  render() {
    return (
      <Steps size={this.props.size}
             current={this.props.current}
             direction={this.props.direction}
             iconPrefix={this.props.iconPrefix}
             maxDescriptionWidth={this.props.maxDescriptionWidth}
             prefixCls={this.props.prefixCls}>
        {this.props.children}
      </Steps>
    );
  }
});

AntSteps.Step = Steps.Step;

export default AntSteps;
