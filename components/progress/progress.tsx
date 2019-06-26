import * as PropTypes from 'prop-types';
import * as React from 'react';
import classNames from 'classnames';
import Icon from '../icon';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import { tuple } from '../_util/type';
import Line from './Line';
import Circle from './Circle';
import { validProgress } from './utils';

const ProgressTypes = tuple('line', 'circle', 'dashboard');
export type ProgressType = (typeof ProgressTypes)[number];
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
  status?: (typeof ProgressStatuses)[number];
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
}

export default class Progress extends React.Component<ProgressProps> {
  static defaultProps = {
    type: 'line',
    percent: 0,
    showInfo: true,
    trailColor: '#f3f3f3',
    size: 'default',
    gapDegree: 0,
    strokeLinecap: 'round',
  };

  static propTypes = {
    status: PropTypes.oneOf(ProgressStatuses),
    type: PropTypes.oneOf(ProgressTypes),
    showInfo: PropTypes.bool,
    percent: PropTypes.number,
    width: PropTypes.number,
    strokeWidth: PropTypes.number,
    strokeLinecap: PropTypes.oneOf(['round', 'square']),
    strokeColor: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    trailColor: PropTypes.string,
    format: PropTypes.func,
    gapDegree: PropTypes.number,
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

  renderProcessInfo(prefixCls: string, progressStatus: (typeof ProgressStatuses)[number]) {
    const { showInfo, format, type, percent, successPercent } = this.props;
    if (!showInfo) return null;

    let text;
    const textFormatter = format || (percentNumber => `${percentNumber}%`);
    const iconType = type === 'circle' || type === 'dashboard' ? '' : '-circle';
    if (format || (progressStatus !== 'exception' && progressStatus !== 'success')) {
      text = textFormatter(validProgress(percent), validProgress(successPercent));
    } else if (progressStatus === 'exception') {
      text = <Icon type={`close${iconType}`} theme={type === 'line' ? 'filled' : 'outlined'} />;
    } else if (progressStatus === 'success') {
      text = <Icon type={`check${iconType}`} theme={type === 'line' ? 'filled' : 'outlined'} />;
    }
    return (
      <span className={`${prefixCls}-text`} title={typeof text === 'string' ? text : undefined}>
        {text}
      </span>
    );
  }

  renderProgress = ({ getPrefixCls }: ConfigConsumerProps) => {
    const props = this.props;
    const {
      prefixCls: customizePrefixCls,
      className,
      percent = 0,
      status,
      format,
      trailColor,
      size,
      successPercent,
      type,
      strokeWidth,
      width,
      showInfo,
      gapDegree = 0,
      gapPosition,
      strokeColor,
      strokeLinecap = 'round',
      ...restProps
    } = props;
    const prefixCls = getPrefixCls('progress', customizePrefixCls);
    const progressStatus = this.getProgressStatus();
    const progressInfo = this.renderProcessInfo(prefixCls, progressStatus);
    let progress;
    // Render progress shape
    if (type === 'line') {
      progress = (
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
        [`${prefixCls}-${(type === 'dashboard' && 'circle') || type}`]: true,
        [`${prefixCls}-status-${progressStatus}`]: true,
        [`${prefixCls}-show-info`]: showInfo,
        [`${prefixCls}-${size}`]: size,
      },
      className,
    );

    return (
      <div {...restProps} className={classString}>
        {progress}
      </div>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderProgress}</ConfigConsumer>;
  }
}
