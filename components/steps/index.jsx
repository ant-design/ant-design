import React from 'react';
import RcSteps from 'rc-steps';

export default class Steps extends React.Component {
  render() {
    let maxDescriptionWidth = this.props.maxDescriptionWidth;
    if (this.props.direction === 'vertical') {
      maxDescriptionWidth = 'auto';
    }
    return (
      <RcSteps size={this.props.size}
        current={this.props.current}
        direction={this.props.direction}
        iconPrefix={this.props.iconPrefix}
        maxDescriptionWidth={maxDescriptionWidth}
        prefixCls={this.props.prefixCls}>
        {this.props.children}
      </RcSteps>
    );
  }
}

Steps.defaultProps = {
  prefixCls: 'ant-steps',
  iconPrefix: 'ant',
  maxDescriptionWidth: 100,
  current: 0
};

Steps.Step = RcSteps.Step;
