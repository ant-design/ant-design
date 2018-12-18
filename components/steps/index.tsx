import * as React from 'react';
import * as PropTypes from 'prop-types';
import RcSteps from 'rc-steps';
import Icon from '../icon';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export interface StepsProps {
  prefixCls?: string;
  iconPrefix?: string;
  className?: string;
  current?: number;
  initial?: number;
  labelPlacement?: 'horizontal' | 'vertical';
  status?: 'wait' | 'process' | 'finish' | 'error';
  size?: 'default' | 'small';
  direction?: 'horizontal' | 'vertical';
  progressDot?: boolean | Function;
  style?: React.CSSProperties;
}

export default class Steps extends React.Component<StepsProps, any> {
  static Step = RcSteps.Step;

  static defaultProps = {
    current: 0,
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    iconPrefix: PropTypes.string,
    current: PropTypes.number,
  };

  renderSteps = ({ getPrefixCls }: ConfigConsumerProps) => {
    const prefixCls = getPrefixCls('steps', this.props.prefixCls);
    const iconPrefix = getPrefixCls('', this.props.iconPrefix);
    const icons = {
      finish: <Icon type="check" className={`${prefixCls}-finish-icon`} />,
      error: <Icon type="close" className={`${prefixCls}-error-icon`} />,
    };
    return <RcSteps icons={icons} {...this.props} prefixCls={prefixCls} iconPrefix={iconPrefix} />;
  };

  render() {
    return <ConfigConsumer>{this.renderSteps}</ConfigConsumer>;
  }
}
