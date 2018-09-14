import * as PropTypes from 'prop-types';
import * as React from 'react';
import Icon from '../icon';
import { Circle } from 'rc-progress';
import classNames from 'classnames';

const statusColorMap = {
  normal: '#108ee9',
  exception: '#ff5500',
  success: '#87d068',
};

export type ProgressType = 'line' | 'circle' | 'dashboard';
export type ProgressSize = 'default' | 'small';

export interface ProgressProps {
  prefixCls?: string;
  className?: string;
  type?: ProgressType;
  percent?: number;
  successPercent?: number;
  format?: (percent?: number, successPercent?: number) => string;
  status?: 'success' | 'active' | 'exception';
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
  icon?: React.ReactElement<any> | { success?: React.ReactNode, exception?: React.ReactNode };
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
  static Line: any;
  static Circle: any;

  static defaultProps = {
    type: 'line' as ProgressType,
    percent: 0,
    showInfo: true,
    trailColor: '#f3f3f3',
    prefixCls: 'ant-progress',
    size: 'default' as ProgressSize,
  };

  static propTypes = {
    status: PropTypes.oneOf(['normal', 'exception', 'active', 'success']),
    type: PropTypes.oneOf(['line', 'circle', 'dashboard']),
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

  render() {
    const props = this.props;
    const {
      prefixCls, className, percent = 0, status, format, trailColor, size, successPercent,
      type, strokeWidth, width, showInfo, gapDegree = 0, gapPosition, strokeColor, strokeLinecap = 'round',
      icon,
      ...restProps
    } = props;
    const progressStatus = parseInt((successPercent ? successPercent.toString() : percent.toString()), 10) >= 100 &&
      !('status' in props) ? 'success' : (status || 'normal');
    let progressInfo;
    let progress;
    const textFormatter = format || (percentNumber => `${percentNumber}%`);

    if (showInfo) {
      let text;
      const iconType = (type === 'circle' || type === 'dashboard') ? '' : '-circle';
      if (format || (progressStatus !== 'exception' && progressStatus !== 'success')) {
        text = textFormatter(validProgress(percent), validProgress(successPercent));
      } else if (progressStatus === 'exception') {
        let exceptionIcon = typeof icon === 'object' && !React.isValidElement(icon) && (icon as any).exception;
        text = exceptionIcon || (React.isValidElement(icon) && icon) ||
          <Icon type={`close${iconType}`} theme={type === 'line' ? 'filled' : 'outlined'} />;
      } else if (progressStatus === 'success') {
        let successIcon = typeof icon === 'object' && !React.isValidElement(icon) && (icon as any).success;
        text = successIcon || (React.isValidElement(icon) && icon) ||
          <Icon type={`check${iconType}`} theme={type === 'line' ? 'filled' : 'outlined'} />;
      }
      progressInfo = <span className={`${prefixCls}-text`}>{text}</span>;
    }

    if (type === 'line') {
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
      const successSegment = successPercent !== undefined
        ? <div className={`${prefixCls}-success-bg`} style={successPercentStyle} />
        : null;
      progress = (
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
    } else if (type === 'circle' || type === 'dashboard') {
      const circleSize = width || 120;
      const circleStyle = {
        width: circleSize,
        height: circleSize,
        fontSize: circleSize * 0.15 + 6,
      };
      const circleWidth = strokeWidth || 6;
      const gapPos = gapPosition || type === 'dashboard' && 'bottom' || 'top';
      const gapDeg = gapDegree || type === 'dashboard' && 75;
      progress = (
        <div className={`${prefixCls}-inner`} style={circleStyle}>
          <Circle
            percent={validProgress(percent)}
            strokeWidth={circleWidth}
            trailWidth={circleWidth}
            strokeColor={(statusColorMap as any)[progressStatus]}
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

    const classString = classNames(prefixCls, {
      [`${prefixCls}-${type === 'dashboard' && 'circle' || type}`]: true,
      [`${prefixCls}-status-${progressStatus}`]: true,
      [`${prefixCls}-show-info`]: showInfo,
      [`${prefixCls}-${size}`]: size,
    }, className);

    return (
      <div {...restProps} className={classString}>
        {progress}
      </div>
    );
  }
}
