'use strict';

var Progressline = require('rc-progress').Line;
var Progresscircle = require('rc-progress').Circle;
var React = require('react');

var Line = React.createClass({
  getDefaultProps: function () {
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

    if (parseInt(this.props.percent) === 100) {
      this.props.status = 'success';
    }

    var style = {
      'width': this.props.width
    };
    var fontSize = (this.props.width / 100 * this.props.strokeWidth);
    var iconStyle = {
      'font-size': (fontSize < 14) ? 14 : fontSize
    };
    var textStyle = {
      'color': statusColorMap[this.props.status]
    };
    var progressInfo;
    if (this.props.status === 'exception') {
      progressInfo = (
        <span style={textStyle} className='ant-progress-line-text'>
          <i style={iconStyle} className="anticon anticon-exclamation-circle"></i>
        </span>
      );

    } else if(this.props.status === 'success'){
      progressInfo = (
        <span style={textStyle} className='ant-progress-line-text'>
          <i style={iconStyle} className="anticon anticon-check-circle"></i>
        </span>
      );
    }else {
      progressInfo = (
        <span className='ant-progress-line-text'>{this.props.percent}%</span>
      );
    }

    return (
      <div className='ant-progress-line-wrap' >
        <div className='ant-progress-line-inner' style={style}>
          <Progressline percent={this.props.percent} strokeWidth={this.props.strokeWidth}
                        strokeColor={statusColorMap[this.props.status]} trailColor="#e9e9e9" />
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

    if (parseInt(this.props.percent) === 100) {
      this.props.status = 'success';
    }

    var style = {
      'width': this.props.width,
      'height': this.props.width
    };
    var wrapStyle = {
      'font-size': this.props.width * 0.16 + 6
    };
    var textStyle = {
      'color': statusColorMap[this.props.status]
    };
    var progressInfo;
    if (this.props.status === 'exception') {
      progressInfo = (
        <span style={textStyle} className='ant-progress-circle-text'>
          <i className='anticon anticon-exclamation'></i>
        </span>
      );
    }else if(this.props.status === 'success'){
      progressInfo = (
        <span style={textStyle} className='ant-progress-circle-text'>
          <i className="anticon anticon-check"></i>
        </span>
      );
    }else {
      progressInfo = (
        <span className="ant-progress-circle-text">{this.props.percent}%</span>
      );
    }

    return (
      <div className="ant-progress-circle-wrap" style={wrapStyle}>
        <div className="ant-progress-circle-inner" style={style}>
          <Progresscircle percent={this.props.percent} strokeWidth={this.props.strokeWidth}
                        strokeColor={statusColorMap[this.props.status]} trailColor="#e9e9e9" />
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


