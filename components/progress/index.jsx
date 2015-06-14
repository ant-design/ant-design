'use strict';

var Progressline = require('rc-progress').Line;
var Progresscircle = require('rc-progress').Circle;
var React = require('react');

var Line = React.createClass({
  getDefaultProps: function(){
    return {
      width: "100px",
      percent: 0,
      strokeWidth: 1,
      status: "normal"
    }
  },
  render() {
    var style = {
      "width": this.props.width
    }
    var progressInfo
    if(this.props.status==='normal'){
      progressInfo = (
        <i className="anticon anticon-check-circle"></i>
      )
    }else {
      progressInfo = (
        <span className="ant-progress-line-text">{this.props.percent}%</span>
      )
    }

    var statusColorMap = {
      "normal": "#3FC7FA",
      "exception": "#FE8C6A"
    };
    return (
      <div className="ant-progress-line-wrap" style={style}>
        <Progressline percent={this.props.percent} strokeWidth={this.props.strokeWidth} strokeColor={statusColorMap[this.props.status]} />
        {progressInfo}
      </div>
    );
  }
});

var Circle = React.createClass({
  getDefaultProps: function(){
    return {
      width: "100px",
      percent: 0,
      strokeWidth: 1,
      status: "normal"
    }
  },
  render() {
    var style = {
      "width": this.props.width,
      "height": this.props.width
    }
    var progressInfo
    if(this.props.status==='normal'){
      progressInfo = (
        <i className="anticon anticon-check-circle"></i>
      )
    }else {
      progressInfo = (
        <span className="ant-progress-line-text">{this.props.percent}%</span>
      )
    }

    var statusColorMap = {
      "normal": "#3FC7FA",
      "exception": "#FE8C6A"
    };
    return (
      <div className="ant-progress-circle-wrap" style={style}>
        <Progresscircle percent={this.props.percent} strokeWidth={this.props.strokeWidth} strokeColor={statusColorMap[this.props.status]} />
        {progressInfo}
      </div>
    );
  }
});

module.exports = {
  Line: Line,
  Circle: Circle
};


