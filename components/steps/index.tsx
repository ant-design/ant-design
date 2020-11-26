import * as React from 'react';
import omit from 'omit.js';
import RcSteps from 'rc-steps';
import CheckOutlined from '@ant-design/icons/CheckOutlined';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import classNames from 'classnames';

import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import Progress from '../progress';

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
  percent?: number;
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
    const { percent, size, labelPlacement } = this.props;
    const className = classNames(
      {
        [`${prefixCls}-rtl`]: direction === 'rtl',
      },
      this.props.className,
    );
    const icons = {
      finish: <CheckOutlined className={`${prefixCls}-finish-icon`} />,
      error: <CloseOutlined className={`${prefixCls}-error-icon`} />,
    };
    const stepIconRender = ({
      node,
      status,
    }: {
      node: React.ReactNode;
      index: number;
      status: string;
      title: string | React.ReactNode;
      description: string | React.ReactNode;
    }) => {
      if (
        (status === 'wait' || status === 'process') &&
        size === 'small' &&
        labelPlacement === 'vertical'
      ) {
        return (
          <div className={`${prefixCls}-circle-icon`}>
            <div className={`${prefixCls}-circle`} />
          </div>
        );
      }
      if (status === 'process' && percent !== undefined) {
        // currently it's hard-coded, since we can't easily read the actually width of icon
        const progressWidth = size === 'small' ? 32 : 40;
        const iconWithProgress = (
          <div className={`${prefixCls}-progress-icon`}>
            <Progress
              type="circle"
              percent={percent}
              width={progressWidth}
              strokeWidth={4}
              format={() => null}
            />
            {node}
          </div>
        );
        return iconWithProgress;
      }
      return node;
    };
    return (
      <RcSteps
        icons={icons}
        {...omit(this.props, ['progress'])}
        stepIcon={stepIconRender}
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
