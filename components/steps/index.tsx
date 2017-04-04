import React from 'react';
import { PropTypes } from 'react';
import RcSteps from 'rc-steps';

export interface StepsProps {
  prefixCls?: string;
  iconPrefix?: string;
  current?: number;
  status?: 'wait' | 'process' | 'finish' | 'error';
  size?: 'default' | 'small';
  direction?: 'horizontal' | 'vertical';
  progressDot?: boolean | Function;
}

export default class Steps extends React.Component<StepsProps, any> {
  static Step = RcSteps.Step;

  static defaultProps = {
    prefixCls: 'ant-steps',
    iconPrefix: 'ant',
    current: 0,
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    iconPrefix: PropTypes.string,
    current: PropTypes.number,
  };

  render() {
    return (
      <RcSteps {...this.props} />
    );
  }
}
