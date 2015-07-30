import {Circle as Progresscircle} from 'rc-progress';
import React from 'react';
import assign from 'object-assign';

const prefixCls = 'ant-progress';

const statusColorMap = {
  'normal': '#3FC7FA',
  'exception': '#FE8C6A',
  'success': '#85D262'
};

var Line = React.createClass({
  getDefaultProps() {
    return {
      percent: 0,
      strokeWidth: '10px',
      status: 'normal' // exception
    };
  },
  render() {
    var props = assign({}, this.props);

    if (parseInt(props.percent) === 100) {
      props.status = 'success';
    }

    var progressInfo;
    if (props.status === 'exception') {
      progressInfo = (
        <span className={prefixCls + '-line-text'}>
          <i className="anticon anticon-exclamation-circle"></i>
        </span>
      );
    } else if (props.status === 'success') {
      progressInfo = (
        <span className={prefixCls + '-line-text'}>
          <i className="anticon anticon-check-circle"></i>
        </span>
      );
    } else {
      progressInfo = (
        <span className={prefixCls + '-line-text'}>{props.percent}%</span>
      );
    }
    var persentStyle = {
      width: props.percent + '%',
      height: props.strokeWidth
    };

    return (
      <div className={prefixCls + '-line-wrap clearfix status-' + props.status}>
        {progressInfo}
        <div className={prefixCls + '-line-outer'}>
          <div className={prefixCls + '-line-inner'}>
            <div className={prefixCls + '-line-bg'} style={persentStyle}></div>
          </div>
        </div>
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
    var props = assign({}, this.props);

    if (parseInt(props.percent) === 100) {
      props.status = 'success';
    }

    var style = {
      'width': props.width,
      'height': props.width,
      'fontSize': props.width * 0.16 + 6
    };
    var progressInfo;
    if (props.status === 'exception') {
      progressInfo = (
        <span className={prefixCls + '-circle-text'}>
          <i className='anticon anticon-exclamation'></i>
        </span>
      );
    } else if (props.status === 'success') {
      progressInfo = (
        <span className={prefixCls + '-circle-text'}>
          <i className="anticon anticon-check"></i>
        </span>
      );
    } else {
      progressInfo = (
        <span className={prefixCls + '-circle-text'}>{props.percent}%</span>
      );
    }

    return (
      <div className={prefixCls + '-circle-wrap status-' + props.status} >
        <div className={prefixCls + '-circle-inner'} style={style}>
          <Progresscircle percent={props.percent} strokeWidth={props.strokeWidth}
            strokeColor={statusColorMap[props.status]} trailColor="#e9e9e9" />
          {progressInfo}
        </div>
      </div>
    );
  }
});

export default {
  Line: Line,
  Circle: Circle
};


