import React from 'react';
import Icon from '../icon';

const prefixCls = 'ant-progress';
export default class Line extends React.Component {
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
