import { Circle as Progresscircle } from 'rc-progress';
import React from 'react';
import Icon from '../icon';

const prefixCls = 'ant-progress';

const statusColorMap = {
  normal: '#2db7f5',
  exception: '#ff5500',
  success: '#87d068'
};

class Line extends React.Component {
  static defaultProps = {
    percent: 0,
    strokeWidth: 10,
    status: 'normal', // exception active
    showInfo: true,
    trailColor: '#f3f3f3'
  }

  static propTypes = {
    status: React.PropTypes.oneOf(['normal', 'exception', 'active', 'success']),
    showInfo: React.PropTypes.bool,
    percent: React.PropTypes.number,
    strokeWidth: React.PropTypes.number,
    trailColor: React.PropTypes.string,
    format: React.PropTypes.func,
  }

  render() {
    let props = { ...this.props };

    if (parseInt(props.percent, 10) === 100) {
      props.status = 'success';
    }

    let progressInfo;
    let fullCls = '';

    const format = props.format || (percent => `${percent}%`);

    if (props.showInfo) {
      if (props.status === 'exception') {
        progressInfo = (
          <span className={`${prefixCls}-line-text`}>
            {props.format ? format(props.percent) : <Icon type="cross-circle" />}
          </span>
        );
      } else if (props.status === 'success') {
        progressInfo = (
          <span className={`${prefixCls}-line-text`}>
            {props.format ? format(props.percent) : <Icon type="check-circle" />}
          </span>
        );
      } else {
        progressInfo = (
          <span className={`${prefixCls}-line-text`}>{format(props.percent)}</span>
        );
      }
    } else {
      fullCls = ` ${prefixCls}-line-wrap-full`;
    }
    let percentStyle = {
      width: `${props.percent}%`,
      height: props.strokeWidth
    };

    return (
      <div className={`${prefixCls}-line-wrap clearfix status-${props.status}${fullCls}`} style={props.style}>
        <div className={`${prefixCls}-line-outer`}>
          <div className={`${prefixCls}-line-inner`}>
            <div className={`${prefixCls}-line-bg`} style={percentStyle}></div>
          </div>
        </div>
        {progressInfo}
      </div>
    );
  }
}

class Circle extends React.Component {
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
          <Progresscircle percent={props.percent} strokeWidth={props.strokeWidth}
            strokeColor={statusColorMap[props.status]} trailColor={props.trailColor} />
          {progressInfo}
        </div>
      </div>
    );
  }
}

export default {
  Line,
  Circle,
};
