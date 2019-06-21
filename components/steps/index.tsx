import * as React from 'react';
import * as PropTypes from 'prop-types';
import RcSteps from 'rc-steps';
import Icon from '../icon';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export interface StepsProps {
  className?: string;
  current?: number;
  direction?: 'horizontal' | 'vertical';
  iconPrefix?: string;
  initial?: number;
  labelPlacement?: 'horizontal' | 'vertical';
  prefixCls?: string;
  progressDot?: boolean | Function;
  size?: 'default' | 'small';
  status?: 'wait' | 'process' | 'finish' | 'error';
  style?: React.CSSProperties;
  onChange?: (current: number) => void;
}

export interface StepProps {
  className?: string;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLElement>;
  status?: 'wait' | 'process' | 'finish' | 'error';
  title?: React.ReactNode;
  style?: React.CSSProperties;
}

export default class Steps extends React.Component<StepsProps, any> {
  static Step = RcSteps.Step as React.ClassicComponentClass<StepProps>;

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
