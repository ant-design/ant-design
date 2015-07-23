import {default as Progressline, Line} from 'rc-progress';
import {default as Progresscircle, Circle} from 'rc-progress';
import React from 'react';
import assign from 'object-assign';

var Line = React.createClass({
  getDefaultProps() {
    return {
      width: 300,
      percent: 0,
      strokeWidth: 3,
      status: 'normal' // exception
    };
  },
  render() {
    var statusColorMap = {
      'normal': '#3FC7FA',
      'exception': '#FE8C6A',
      'success': '#85D262'
    };

    var props = assign({}, this.props);

    if (parseInt(props.percent) === 100) {
      props.status = 'success';
    }

    var style = {
      'width': props.width
    };
    var fontSize = (props.width / 100 * props.strokeWidth);
    var iconStyle = {
      'fontSize': (fontSize < 12) ? 12 : fontSize
    };
    var textStyle = {
      'color': statusColorMap[props.status]
    };
    var progressInfo;
    if (props.status === 'exception') {
      progressInfo = (
        <span style={textStyle} className='ant-progress-line-text'>
          <i style={iconStyle} className="anticon anticon-exclamation-circle"></i>
        </span>
      );
    } else if (props.status === 'success') {
      progressInfo = (
        <span style={textStyle} className='ant-progress-line-text'>
          <i style={iconStyle} className="anticon anticon-check-circle"></i>
        </span>
      );
    } else {
      progressInfo = (
        <span className='ant-progress-line-text'>{props.percent}%</span>
      );
    }

    return (
      <div className='ant-progress-line-wrap'>
        <div className='ant-progress-line-inner' style={style}>
          <Progressline percent={props.percent} strokeWidth={props.strokeWidth}
            strokeColor={statusColorMap[props.status]} trailColor="#e9e9e9" />
        </div>
        {progressInfo}
      </div>
    );
  }
});

var Circle = React.createClass({
  getDefaultProps: function () {
    return {
      width: 132,
      percent: 0,
      strokeWidth: 6,
      status: 'normal' // exception
    };
  },
  render() {
    var statusColorMap = {
      'normal': '#3FC7FA',
      'exception': '#FE8C6A',
      'success': '#85D262'
    };

    var props = assign({}, this.props);

    if (parseInt(props.percent) === 100) {
      props.status = 'success';
    }

    var style = {
      'width': props.width,
      'height': props.width
    };
    var wrapStyle = {
      'fontSize': props.width * 0.16 + 6
    };
    var textStyle = {
      'color': statusColorMap[props.status]
    };
    var progressInfo;
    if (props.status === 'exception') {
      progressInfo = (
        <span style={textStyle} className='ant-progress-circle-text'>
          <i className='anticon anticon-exclamation'></i>
        </span>
      );
    } else if (props.status === 'success') {
      progressInfo = (
        <span style={textStyle} className='ant-progress-circle-text'>
          <i className="anticon anticon-check"></i>
        </span>
      );
    } else {
      progressInfo = (
        <span className="ant-progress-circle-text">{props.percent}%</span>
      );
    }

    return (
      <div className="ant-progress-circle-wrap" style={wrapStyle}>
        <div className="ant-progress-circle-inner" style={style}>
          <Progresscircle percent={props.percent} strokeWidth={props.strokeWidth}
            strokeColor={statusColorMap[props.status]} trailColor="#e9e9e9" />
          {progressInfo}
        </div>
      </div>
    );
  }
});

module.exports = {
  Line: Line,
  Circle: Circle
};


