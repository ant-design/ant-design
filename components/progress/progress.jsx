import React, { PropTypes } from 'react';
import Icon from '../icon';
import { Circle } from 'rc-progress';
import classNames from 'classnames';

const statusColorMap = {
  normal: '#2db7f5',
  exception: '#ff5500',
  success: '#87d068',
};

export default class Line extends React.Component {
  static defaultProps = {
    type: 'line',
    percent: 0,
    showInfo: true,
    trailColor: '#f3f3f3',
    prefixCls: 'ant-progress',
  }

  static propTypes = {
    status: PropTypes.oneOf(['normal', 'exception', 'active', 'success']),
    type: PropTypes.oneOf(['line', 'circle']),
    showInfo: PropTypes.bool,
    percent: PropTypes.number,
    width: PropTypes.number,
    strokeWidth: PropTypes.number,
    trailColor: PropTypes.string,
    format: PropTypes.func,
  }

  render() {
    const { prefixCls, status, format, percent, trailColor,
      type, strokeWidth, width, className, showInfo, ...restProps } = this.props;
    const progressStatus = (parseInt(percent, 10) >= 100 && !('status' in this.props))
      ? 'success' : (status || 'normal');
    let progressInfo;
    let progress;
    const textFormatter = format || (percentNumber => `${percentNumber}%`);

    if (showInfo) {
      let text;
      const iconType = type === 'circle' ? '' : '-circle';
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
              <div className={`${prefixCls}-bg`} style={percentStyle}></div>
            </div>
          </div>
          {progressInfo}
        </div>
      );
    } else if (type === 'circle') {
      const circleSize = width || 132;
      const circleStyle = {
        width: circleSize,
        height: circleSize,
        fontSize: circleSize * 0.16 + 6,
      };
      progress = (
        <div className={`${prefixCls}-inner`} style={circleStyle}>
          <Circle percent={percent} strokeWidth={strokeWidth || 6}
            strokeColor={statusColorMap[progressStatus]} trailColor={trailColor} />
          {progressInfo}
        </div>
      );
    }

    const classString = classNames({
      [`${prefixCls}`]: true,
      [`${prefixCls}-${type}`]: true,
      [`${prefixCls}-status-${progressStatus}`]: true,
      [`${prefixCls}-show-info`]: showInfo,
      [className]: !!className,
    });

    return (
      <div {...restProps} className={classString}>
        {progress}
      </div>
    );
  }
}
