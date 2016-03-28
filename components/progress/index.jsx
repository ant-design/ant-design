import { Circle as Progresscircle } from 'rc-progress';
import React from 'react';
import assign from 'object-assign';
import warning from 'warning';
import Icon from '../icon';

const prefixCls = 'ant-progress';

const statusColorMap = {
  normal: '#2db7f5',
  exception: '#ff5500',
  success: '#87d068'
};

let Line = React.createClass({
  propTypes: {
    status: React.PropTypes.oneOf(['normal', 'exception', 'active', 'success']),
    showInfo: React.PropTypes.bool,
    percent: React.PropTypes.number,
    strokeWidth: React.PropTypes.number,
    trailColor: React.PropTypes.string,
    format: React.PropTypes.oneOfType([
      React.PropTypes.node,
      React.PropTypes.string,
      React.PropTypes.func,
    ]),
  },
  getDefaultProps() {
    return {
      percent: 0,
      strokeWidth: 10,
      status: 'normal', // exception active
      showInfo: true,
      trailColor: '#f3f3f3'
    };
  },
  render() {
    let props = assign({}, this.props);

    if (parseInt(props.percent, 10) === 100) {
      props.status = 'success';
    }

    let progressInfo;
    let fullCls = '';

    if (props.format) {
      warning(typeof props.format === 'function',
       'antd.Progress props.format type is function, change format={xxx} to format={() => xxx}');
    }

    let text = props.format || `${props.percent}%`;
    if (typeof props.format === 'string') {
      // 向下兼容原来的字符串替换方式
      text = props.format.replace('${percent}', props.percent);
    } else if (typeof props.format === 'function') {
      text = props.format(props.percent);
    }

    if (props.showInfo) {
      if (props.status === 'exception') {
        progressInfo = (
          <span className={`${prefixCls}-line-text`}>
            {props.format ? text : <Icon type="cross-circle" />}
          </span>
        );
      } else if (props.status === 'success') {
        progressInfo = (
          <span className={`${prefixCls}-line-text`}>
            {props.format ? text : <Icon type="check-circle" />}
          </span>
        );
      } else {
        progressInfo = (
          <span className={`${prefixCls}-line-text`}>{text}</span>
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
});

let Circle = React.createClass({
  propTypes: {
    status: React.PropTypes.oneOf(['normal', 'exception', 'success']),
    percent: React.PropTypes.number,
    strokeWidth: React.PropTypes.number,
    width: React.PropTypes.number,
    trailColor: React.PropTypes.string,
    format: React.PropTypes.oneOfType([
      React.PropTypes.node,
      React.PropTypes.string,
      React.PropTypes.func,
    ]),
  },
  getDefaultProps() {
    return {
      width: 132,
      percent: 0,
      strokeWidth: 6,
      status: 'normal', // exception
      trailColor: '#f3f3f3',
    };
  },
  render() {
    let props = assign({}, this.props);

    if (parseInt(props.percent, 10) === 100) {
      props.status = 'success';
    }

    let style = {
      width: props.width,
      height: props.width,
      fontSize: props.width * 0.16 + 6
    };
    let progressInfo;
    let text = props.format || `${props.percent}%`;

    if (props.format) {
      warning(typeof props.format === 'function',
       'antd.Progress props.format type is function, change format={xxx} to format={() => xxx}');
    }

    if (typeof props.format === 'string') {
      // 向下兼容原来的字符串替换方式
      text = props.format.replace('${percent}', props.percent);
    } else if (typeof props.format === 'function') {
      text = props.format(props.percent);
    }

    if (props.status === 'exception') {
      progressInfo = (
        <span className={`${prefixCls}-circle-text`}>
          {props.format ? text : <Icon type="exclamation" />}
        </span>
      );
    } else if (props.status === 'success') {
      progressInfo = (
        <span className={`${prefixCls}-circle-text`}>
          {props.format ? text : <Icon type="check" />}
        </span>
      );
    } else {
      progressInfo = (
        <span className={`${prefixCls}-circle-text`}>{text}</span>
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
});

export default {
  Line,
  Circle,
};
