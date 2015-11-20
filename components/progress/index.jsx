import {Circle as Progresscircle} from 'rc-progress';
import React from 'react';
import assign from 'object-assign';
import Icon from '../icon';

const prefixCls = 'ant-progress';

const statusColorMap = {
  'normal': '#2db7f5',
  'exception': '#ff6600',
  'success': '#87d068'
};

let Line = React.createClass({
  propTypes: {
    status: React.PropTypes.oneOf(['normal', 'exception', 'active', 'success']),
    showInfo: React.PropTypes.bool,
    percent: React.PropTypes.number,
    strokeWidth: React.PropTypes.number,
  },
  getDefaultProps() {
    return {
      percent: 0,
      strokeWidth: 10,
      status: 'normal', // exception active
      format: '${percent}%',
      showInfo: true,
    };
  },
  render() {
    let props = assign({}, this.props);

    if (parseInt(props.percent, 10) === 100) {
      props.status = 'success';
    }

    let progressInfo;
    let fullCls = '';
    const text = (typeof props.format === 'string') ?
      props.format.replace('${percent}', props.percent) : props.format;

    if(props.showInfo === true){
      if (props.status === 'exception') {
        progressInfo = (
          <span className={prefixCls + '-line-text'}>{text}</span>
        );
      } else if (props.status === 'success') {
        progressInfo = (
          <span className={prefixCls + '-line-text'}>
            <Icon type="check" />
          </span>
        );
      } else {
        progressInfo = (
          <span className={prefixCls + '-line-text'}>{text}</span>
        );
      }
    } else {
      fullCls = ' ' + prefixCls + '-line-wrap-full';
    }
    let percentStyle = {
      width: props.percent + '%',
      height: props.strokeWidth
    };

    return (
      <div className={prefixCls + '-line-wrap clearfix status-' + props.status + fullCls}>
        {progressInfo}
        <div className={prefixCls + '-line-outer'}>
          <div className={prefixCls + '-line-inner'}>
            <div className={prefixCls + '-line-bg'} style={percentStyle}></div>
          </div>
        </div>
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
  },
  getDefaultProps: function () {
    return {
      width: 132,
      percent: 0,
      strokeWidth: 6,
      format: '${percent}%',
      status: 'normal', // exception
    };
  },
  render() {
    let props = assign({}, this.props);

    if (parseInt(props.percent, 10) === 100) {
      props.status = 'success';
    }

    let style = {
      'width': props.width,
      'height': props.width,
      'fontSize': props.width * 0.16 + 6
    };
    let progressInfo;
    const text = (typeof props.format === 'string') ?
      props.format.replace('${percent}', props.percent) : props.format;
    if (props.status === 'exception') {
      progressInfo = (
        <span className={prefixCls + '-circle-text'}>{text}</span>
      );
    } else if (props.status === 'success') {
      progressInfo = (
        <span className={prefixCls + '-circle-text'}>
          <Icon type="check" />
        </span>
      );
    } else {
      progressInfo = (
        <span className={prefixCls + '-circle-text'}>{text}</span>
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
