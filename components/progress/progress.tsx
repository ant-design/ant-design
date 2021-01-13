import * as React from 'react';
import classNames from 'classnames';
import omit from 'rc-util/lib/omit';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import CheckOutlined from '@ant-design/icons/CheckOutlined';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import { tuple } from '../_util/type';
import devWarning from '../_util/devWarning';
import Line from './Line';
import Circle from './Circle';
import Steps from './Steps';
import { validProgress, getSuccessPercent } from './utils';

const ProgressTypes = tuple('line', 'circle', 'dashboard');
export type ProgressType = typeof ProgressTypes[number];
const ProgressStatuses = tuple('normal', 'exception', 'active', 'success');
export type ProgressSize = 'default' | 'small';
export type StringGradients = { [percentage: string]: string };
type FromToGradients = { from: string; to: string };
export type ProgressGradient = { direction?: string } & (StringGradients | FromToGradients);

export interface SuccessProps {
  percent?: number;
  /** @deprecated Use `percent` instead */
  progress?: number;
  strokeColor?: string;
}

export interface ProgressProps {
  prefixCls?: string;
  className?: string;
  type?: ProgressType;
  percent?: number;
  format?: (percent?: number, successPercent?: number) => React.ReactNode;
  status?: typeof ProgressStatuses[number];
  showInfo?: boolean;
  strokeWidth?: number;
  strokeLinecap?: 'butt' | 'square' | 'round';
  strokeColor?: string | ProgressGradient;
  trailColor?: string;
  width?: number;
  success?: SuccessProps;
  style?: React.CSSProperties;
  gapDegree?: number;
  gapPosition?: 'top' | 'bottom' | 'left' | 'right';
  size?: ProgressSize;
  steps?: number;
  /** @deprecated Use `success` instead */
  successPercent?: number;
}

export default class Progress extends React.Component<ProgressProps> {
  static defaultProps = {
    type: 'line' as ProgressProps['type'],
    percent: 0,
    showInfo: true,
    // null for different theme definition
    trailColor: null,
    size: 'default' as ProgressProps['size'],
    gapDegree: undefined,
    strokeLinecap: 'round' as ProgressProps['strokeLinecap'],
  };

  getPercentNumber() {
    const { percent = 0 } = this.props;
    const successPercent = getSuccessPercent(this.props);
    return parseInt(
      successPercent !== undefined ? successPercent.toString() : percent.toString(),
      10,
    );
  }

  getProgressStatus() {
    const { status } = this.props;
    if (ProgressStatuses.indexOf(status!) < 0 && this.getPercentNumber() >= 100) {
      return 'success';
    }
    return status || 'normal';
  }

  renderProcessInfo(prefixCls: string, progressStatus: typeof ProgressStatuses[number]) {
    const { showInfo, format, type, percent } = this.props;
    const successPercent = getSuccessPercent(this.props);
    if (!showInfo) return null;

    let text;
    const textFormatter = format || (percentNumber => `${percentNumber}%`);
    const isLineType = type === 'line';
    if (format || (progressStatus !== 'exception' && progressStatus !== 'success')) {
      text = textFormatter(validProgress(percent), validProgress(successPercent));
    } else if (progressStatus === 'exception') {
      text = isLineType ? <CloseCircleFilled /> : <CloseOutlined />;
    } else if (progressStatus === 'success') {
      text = isLineType ? <CheckCircleFilled /> : <CheckOutlined />;
    }
    return (
      <span className={`${prefixCls}-text`} title={typeof text === 'string' ? text : undefined}>
        {text}
      </span>
    );
  }

  renderProgress = ({ getPrefixCls, direction }: ConfigConsumerProps) => {
    const { props } = this;
    const {
      prefixCls: customizePrefixCls,
      className,
      size,
      type,
      steps,
      showInfo,
      strokeColor,
      ...restProps
    } = props;
    const prefixCls = getPrefixCls('progress', customizePrefixCls);
    const progressStatus = this.getProgressStatus();
    const progressInfo = this.renderProcessInfo(prefixCls, progressStatus);

    devWarning(
      !('successPercent' in props),
      'Progress',
      '`successPercent` is deprecated. Please use `success.percent` instead.',
    );

    let progress;
    // Render progress shape
    if (type === 'line') {
      progress = steps ? (
        <Steps
          {...this.props}
          strokeColor={typeof strokeColor === 'string' ? strokeColor : undefined}
          prefixCls={prefixCls}
          steps={steps}
        >
          {progressInfo}
        </Steps>
      ) : (
        <Line {...this.props} prefixCls={prefixCls} direction={direction}>
          {progressInfo}
        </Line>
      );
    } else if (type === 'circle' || type === 'dashboard') {
      progress = (
        <Circle {...this.props} prefixCls={prefixCls} progressStatus={progressStatus}>
          {progressInfo}
        </Circle>
      );
    }

    const classString = classNames(
      prefixCls,
      {
        [`${prefixCls}-${(type === 'dashboard' && 'circle') || (steps && 'steps') || type}`]: true,
        [`${prefixCls}-status-${progressStatus}`]: true,
        [`${prefixCls}-show-info`]: showInfo,
        [`${prefixCls}-${size}`]: size,
        [`${prefixCls}-rtl`]: direction === 'rtl',
      },
      className,
    );

    return (
      <div
        {...omit(restProps, [
          'status',
          'format',
          'trailColor',
          'strokeWidth',
          'width',
          'gapDegree',
          'gapPosition',
          'strokeColor',
          'strokeLinecap',
          'percent',
          'steps',
          'success',
          'successPercent',
        ])}
        className={classString}
      >
        {progress}
      </div>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderProgress}</ConfigConsumer>;
  }
}
