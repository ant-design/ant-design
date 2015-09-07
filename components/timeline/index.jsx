import React from 'react';

let Timeline = React.createClass({
  getDefaultProps() {
    return {
      prefixCls: 'ant-timeline'
    };
  },
  render() {
    let children = this.props.children;
    let continuee = this.props.continue;
    return (
      <ul className={this.props.prefixCls}>
        {React.Children.map(children, function (ele, idx) {
          let np = {
            timelineLast: idx === children.length - 1,
            continuee: continuee
          };
          return React.cloneElement(ele, np);
        }, this)}
      </ul>
    );
  }
});

Timeline.Item = React.createClass({
  getDefaultProps() {
    return {
      prefixCls: 'ant-timeline',
      color: 'blue',
      continuee: false
    };
  },
  render() {
    let props = this.props;
    let prefixCls = props.prefixCls;
    let color = props.color;
    let continuee = props.continuee;
    let timelineLast = props.timelineLast;
    let endCls = continuee && timelineLast ? prefixCls + '-item-last' : '';
    let last = continuee && timelineLast ? <div className={prefixCls + '-item-head ' + prefixCls + '-item-head-end'}></div> : null;
    let lastTailShow = (timelineLast && !continuee) ? 'none' : 'block';

    return (
      <li className={prefixCls + '-item ' + endCls}>
        <div style={{display:lastTailShow}} className={prefixCls + '-item-tail'}></div>
        <div className={prefixCls + '-item-head ' + prefixCls + '-item-head-' + color}></div>
        <div className={prefixCls + '-item-content'}>{props.children}</div>
        {last}
      </li>
    );
  }
});

export default Timeline;
