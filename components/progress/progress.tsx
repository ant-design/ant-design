import PropTypes from 'prop-types';
import React from 'react';
import Icon from '../icon';
import { Circle } from 'rc-progress';
import classNames from 'classnames';
const statusColorMap = {
  normal: '#108ee9',
  exception: '#ff5500',
  success: '#87d068',
};

export interface ProgressProps {
  prefixCls?: string;
  className?: string;
  type?: 'line' | 'circle' | 'dashboard';
  percent?: number;
  format?: (percent: number) => string;
  status?: 'success' | 'active' | 'exception';
  showInfo?: boolean;
  strokeWidth?: number;
  trailColor?: string;
  width?: number;
  style?: React.CSSProperties;
  gapDegree?: number;
  gapPosition?: 'top' | 'bottom' | 'left' | 'right';
}

export default class Progress extends React.Component<ProgressProps, any> {
  static Line: any;
  static Circle: any;

  static defaultProps = {
    type: 'line',
    percent: 0,
    showInfo: true,
    trailColor: '#f3f3f3',
    prefixCls: 'ant-progress',
  };

  static propTypes = {
    status: PropTypes.oneOf(['normal', 'exception', 'active', 'success']),
    type: PropTypes.oneOf(['line', 'circle', 'dashboard']),
    showInfo: PropTypes.bool,
    percent: PropTypes.number,
    width: PropTypes.number,
    strokeWidth: PropTypes.number,
    trailColor: PropTypes.string,
    format: PropTypes.func,
    gapDegree: PropTypes.number,
  };

  render() {
    const props = this.props;
    const {
      prefixCls, className, percent = 0, status, format, trailColor,
      type, strokeWidth, width, showInfo, gapDegree = 0, gapPosition, ...restProps,
    } = props;
    const progressStatus = parseInt(percent.toString(), 10) >= 100 && !('status' in props) ?
      'success' : (status || 'normal');
    let progressInfo;
    let progress;
    const textFormatter = format || (percentNumber => `${percentNumber}%`);

    if (showInfo) {
      let text;
      const iconType = (type === 'circle' || type === 'dashboard') ? '' : '-circle';
      if (progressStatus === 'exception') {
        text = format ? textFormatter(percent) : <Icon type={`cross${iconType}`} />;
      } else if (progressStatus === 'success') {
        text = format ? textFormatter(percent) : <Icon type={`check${iconType}`} />;
      } else {
        text = textFormatter(percent);
      }
      progressInfo = <span className={`${prefixCls}-text`}>{text}</span>;
    }

    if (type === 'line') {
      const percentStyle = {
        width: `${percent}%`,
        height: strokeWidth || 10,
      };
      progress = (
        <div>
          <div className={`${prefixCls}-outer`}>
            <div className={`${prefixCls}-inner`}>
              <div className={`${prefixCls}-bg`} style={percentStyle} />
            </div>
          </div>
          {progressInfo}
        </div>
      );
    } else if (type === 'circle' || type === 'dashboard') {
      const circleSize = width || 132;
      const circleStyle = {
        width: circleSize,
        height: circleSize,
        fontSize: circleSize * 0.16 + 6,
      };
      const circleWidth = strokeWidth || 6;
      const gapPos = gapPosition || type === 'dashboard' && 'bottom' || 'top';
      const gapDeg = gapDegree || type === 'dashboard' && 75;
      progress = (
        <div className={`${prefixCls}-inner`} style={circleStyle}>
          <Circle
            percent={percent}
            strokeWidth={circleWidth}
            trailWidth={circleWidth}
            strokeColor={statusColorMap[progressStatus]}
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
    }, className);

    return (
      <div {...restProps} className={classString}>
        {progress}
      </div>
    );
  }
}
