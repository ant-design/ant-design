import { RcProgressCircle } from 'rc-progress';
import React from 'react';
import Icon from '../icon';

const prefixCls = 'ant-progress';

const statusColorMap = {
  normal: '#2db7f5',
  exception: '#ff5500',
  success: '#87d068'
};

export default class Circle extends React.Component {
  static defaultProps = {
    width: 132,
    percent: 0,
    strokeWidth: 6,
    status: 'normal', // exception
    trailColor: '#f3f3f3',
  }

  static propTypes = {
    status: React.PropTypes.oneOf(['normal', 'exception', 'success']),
    percent: React.PropTypes.number,
    strokeWidth: React.PropTypes.number,
    width: React.PropTypes.number,
    trailColor: React.PropTypes.string,
    format: React.PropTypes.func,
  }

  render() {
    let props = { ...this.props };

    if (parseInt(props.percent, 10) === 100) {
      props.status = 'success';
    }

    let style = {
      width: props.width,
      height: props.width,
      fontSize: props.width * 0.16 + 6
    };
    let progressInfo;

    const format = props.format || (percent => `${percent}%`);

    if (props.status === 'exception') {
      progressInfo = (
        <span className={`${prefixCls}-circle-text`}>
          {props.format ? format(props.percent) : <Icon type="exclamation" />}
        </span>
      );
    } else if (props.status === 'success') {
      progressInfo = (
        <span className={`${prefixCls}-circle-text`}>
          {props.format ? format(props.percent) : <Icon type="check" />}
        </span>
      );
    } else {
      progressInfo = (
        <span className={`${prefixCls}-circle-text`}>{format(props.percent)}</span>
      );
    }

    return (
      <div className={`${prefixCls}-circle-wrap status-${props.status}`} style={props.style}>
        <div className={`${prefixCls}-circle-inner`} style={style}>
          <RcProgressCircle percent={props.percent} strokeWidth={props.strokeWidth}
            strokeColor={statusColorMap[props.status]} trailColor={props.trailColor} />
          {progressInfo}
        </div>
      </div>
    );
  }
}
