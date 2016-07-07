import React from 'react';
import RcSteps from 'rc-steps';

export default class Steps extends React.Component {
  static Step = RcSteps.Step;

  static defaultProps = {
    prefixCls: 'ant-steps',
    iconPrefix: 'ant',
    current: 0,
  }

  render() {
    return (
      <RcSteps {...this.props} />
    );
  }
}
