import * as PropTypes from 'prop-types';
import * as React from 'react';
import Icon from '../icon';
import { Circle } from 'rc-progress';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import { tuple } from '../_util/type';

const statusColorMap: Record<string, string> = {
  normal: '#108ee9',
  exception: '#ff5500',
  success: '#87d068',
};

const ProgressTypes = tuple('line', 'circle', 'dashboard');
export type ProgressType = (typeof ProgressTypes)[number];
const ProgressStatuses = tuple('normal', 'exception', 'active', 'success');
export type ProgressSize = 'default' | 'small';

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
  strokeLinecap?: string;
  strokeColor?: string;
  trailColor?: string;
  width?: number;
  style?: React.CSSProperties;
  gapDegree?: number;
  gapPosition?: 'top' | 'bottom' | 'left' | 'right';
  size?: ProgressSize;
}

const validProgress = (progress: number | undefined) => {
  if (!progress || progress < 0) {
    return 0;
  } else if (progress > 100) {
    return 100;
  }
  return progress;
};

export default class Progress extends React.Component<ProgressProps, {}> {
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
    strokeColor: PropTypes.string,
    trailColor: PropTypes.string,
    format: PropTypes.func,
    gapDegree: PropTypes.number,
    default: PropTypes.oneOf(['default', 'small']),
  };

  renderLine(prefixCls: string, progressInfo: React.ReactNode) {
    const { percent, successPercent, strokeWidth, size, strokeColor, strokeLinecap } = this.props;
    const percentStyle = {
      width: `${validProgress(percent)}%`,
      height: strokeWidth || (size === 'small' ? 6 : 8),
      background: strokeColor,
      borderRadius: strokeLinecap === 'square' ? 0 : '100px',
    };
    const successPercentStyle = {
      width: `${validProgress(successPercent)}%`,
      height: strokeWidth || (size === 'small' ? 6 : 8),
      borderRadius: strokeLinecap === 'square' ? 0 : '100px',
    };
    const successSegment =
      successPercent !== undefined ? (
        <div className={`${prefixCls}-success-bg`} style={successPercentStyle} />
      ) : null;
    return (
      <div>
        <div className={`${prefixCls}-outer`}>
          <div className={`${prefixCls}-inner`}>
            <div className={`${prefixCls}-bg`} style={percentStyle} />
            {successSegment}
          </div>
        </div>
        {progressInfo}
      </div>
    );
  }

  renderCircle(prefixCls: string, progressInfo: React.ReactNode, progressStatus: string) {
    const {
      percent,
      successPercent,
      width,
      strokeWidth,
      strokeColor,
      trailColor,
      strokeLinecap,
      gapPosition,
      gapDegree,
      type,
    } = this.props;
    const circleSize = width || 120;
    const circleStyle = {
      width: circleSize,
      height: circleSize,
      fontSize: circleSize * 0.15 + 6,
    };
    const circleWidth = strokeWidth || 6;
    const gapPos = gapPosition || (type === 'dashboard' && 'bottom') || 'top';
    const gapDeg = gapDegree || (type === 'dashboard' && 75);

    // Merge values
    let percents: number | number[] = validProgress(percent);
    let strokeColors: string | string[] = strokeColor || statusColorMap[progressStatus];

    if (successPercent) {
      const successPercentVal = validProgress(successPercent);
      percents = [successPercentVal, percents - successPercentVal];
      strokeColors = [statusColorMap.success, strokeColors];
    }

    return (
      <div className={`${prefixCls}-inner`} style={circleStyle}>
        <Circle
          percent={percents}
          strokeWidth={circleWidth}
          trailWidth={circleWidth}
          strokeColor={strokeColors}
          strokeLinecap={strokeLinecap}
          trailColor={trailColor}
          prefixCls={prefixCls}
          gapDegree={gapDeg}
          gapPosition={gapPos}
        />
        {progressInfo}
      </div>
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
    const progressStatus =
      parseInt(successPercent ? successPercent.toString() : percent.toString(), 10) >= 100 &&
      !('status' in props)
        ? 'success'
        : status || 'normal';
    let progressInfo;
    let progress;
    const textFormatter = format || (percentNumber => `${percentNumber}%`);

    if (showInfo) {
      let text;
      const iconType = type === 'circle' || type === 'dashboard' ? '' : '-circle';
      if (format || (progressStatus !== 'exception' && progressStatus !== 'success')) {
        text = textFormatter(validProgress(percent), validProgress(successPercent));
      } else if (progressStatus === 'exception') {
        text = <Icon type={`close${iconType}`} theme={type === 'line' ? 'filled' : 'outlined'} />;
      } else if (progressStatus === 'success') {
        text = <Icon type={`check${iconType}`} theme={type === 'line' ? 'filled' : 'outlined'} />;
      }
      progressInfo = (
        <span className={`${prefixCls}-text`} title={typeof text === 'string' ? text : undefined}>
          {text}
        </span>
      );
    }

    if (type === 'line') {
      progress = this.renderLine(prefixCls, progressInfo);
    } else if (type === 'circle' || type === 'dashboard') {
      progress = this.renderCircle(prefixCls, progressInfo, progressStatus);
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
