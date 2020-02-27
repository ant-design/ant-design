import * as React from 'react';
import classNames from 'classnames';
import omit from 'omit.js';
import {
  CloseOutlined,
  CheckOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
} from '@ant-design/icons';

import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import { tuple } from '../_util/type';
import Line from './Line';
import Circle from './Circle';
import Steps from './Steps';
import { validProgress } from './utils';

const ProgressTypes = tuple('line', 'circle', 'dashboard');
export type ProgressType = typeof ProgressTypes[number];
const ProgressStatuses = tuple('normal', 'exception', 'active', 'success');
export type ProgressSize = 'default' | 'small';
export type StringGradients = { [percentage: string]: string };
type FromToGradients = { from: string; to: string };
export type ProgressGradient = { direction?: string } & (StringGradients | FromToGradients);
export interface ProgressProps {
  prefixCls?: string;
  className?: string;
  type?: ProgressType;
  percent?: number;
  successPercent?: number;
  format?: (percent?: number, successPercent?: number) => React.ReactNode;
  status?: typeof ProgressStatuses[number];
  showInfo?: boolean;
  strokeWidth?: number;
  strokeLinecap?: 'butt' | 'square' | 'round';
  strokeColor?: string | ProgressGradient;
  trailColor?: string;
  width?: number;
  style?: React.CSSProperties;
  gapDegree?: number;
  gapPosition?: 'top' | 'bottom' | 'left' | 'right';
  size?: ProgressSize;
  steps?: number;
}

export default class Progress extends React.Component<ProgressProps> {
  static defaultProps = {
    type: 'line',
    percent: 0,
    showInfo: true,
    // null for different theme definition
    trailColor: null,
    size: 'default',
    gapDegree: 0,
    strokeLinecap: 'round',
  };

  getPercentNumber() {
    const { successPercent, percent = 0 } = this.props;
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
    const { showInfo, format, type, percent, successPercent } = this.props;
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
      ...restProps
    } = props;
    const prefixCls = getPrefixCls('progress', customizePrefixCls);
    const progressStatus = this.getProgressStatus();
    const progressInfo = this.renderProcessInfo(prefixCls, progressStatus);
    let progress;
    // Render progress shape
    if (type === 'line') {
      progress = steps ? (
        <Steps {...this.props} prefixCls={prefixCls} steps={steps}>
          {progressInfo}
        </Steps>
      ) : (
        <Line {...this.props} prefixCls={prefixCls}>
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
          'successPercent',
          'strokeWidth',
          'width',
          'gapDegree',
          'gapPosition',
          'strokeColor',
          'strokeLinecap',
          'percent',
          'steps',
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
