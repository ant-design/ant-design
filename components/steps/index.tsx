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
  progressIcon?: ProgressIconRender;
  percentage?: number;
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

type ProgressIconRender = (options: {
  node: React.ReactNode;
  index: number;
  status: string;
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  percentage: number;
}) => React.ReactNode;

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
    const { percentage, progressIcon, size } = this.props;
    const icons = {
      finish: <CheckOutlined className={`${prefixCls}-finish-icon`} />,
      error: <CloseOutlined className={`${prefixCls}-error-icon`} />,
    };
    const stepIconRender = ({
      node,
      status,
      index,
      title,
      description,
    }: {
      node: React.ReactNode;
      index: number;
      status: string;
      title: string | React.ReactNode;
      description: string | React.ReactNode;
    }) => {
      if (status === 'process' && percentage !== undefined) {
        // currently it's hard-coded, since we can't easily read the actually width of icon
        const progressWidth = size === 'small' ? 30 : 38;
        const iconWithProgress = (
          <div className={`${prefixCls}-progress-icon`}>
            <Progress
              type="circle"
              percent={percentage}
              width={progressWidth}
              strokeWidth={4}
              format={() => null}
            />
            {node}
          </div>
        );
        if (progressIcon) {
          return progressIcon({
            index,
            status,
            title,
            description,
            percentage,
            node: iconWithProgress,
          });
        }
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
