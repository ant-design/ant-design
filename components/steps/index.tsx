import * as React from 'react';
import RcSteps from 'rc-steps';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import classNames from 'classnames';

import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export interface StepsProps {
  type?: 'default' | 'navigation';
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
  disabled?: boolean;
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  style?: React.CSSProperties;
}

export default class Steps extends React.Component<StepsProps, any> {
  static Step = RcSteps.Step as React.ClassicComponentClass<StepProps>;

  static defaultProps = {
    current: 0,
  };

  renderSteps = ({ getPrefixCls, direction }: ConfigConsumerProps) => {
    const prefixCls = getPrefixCls('steps', this.props.prefixCls);
    const iconPrefix = getPrefixCls('', this.props.iconPrefix);
    const className = classNames(this.props.className, {
      [`${prefixCls}-rtl`]: direction === 'rtl',
    });
    const icons = {
      finish: <CheckOutlined className={`${prefixCls}-finish-icon`} />,
      error: <CloseOutlined className={`${prefixCls}-error-icon`} />,
    };
    return (
      <RcSteps
        icons={icons}
        {...this.props}
        prefixCls={prefixCls}
        iconPrefix={iconPrefix}
        className={className}
      />
    );
  };

  render() {
    return <ConfigConsumer>{this.renderSteps}</ConfigConsumer>;
  }
}
