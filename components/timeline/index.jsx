import React from 'react';

let Timeline = React.createClass({
  getDefaultProps() {
    return {
      prefixCls: 'ant-timeline'
    };
  },
  render() {
    let children = this.props.children;
    return (
      <ul className={this.props.prefixCls}>
        {React.Children.map(children, function (ele, idx) {
          let np = {
            timelineLast: idx === children.length - 1
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
      end: false
    };
  },
  render() {
    let props = this.props;
    let prefixCls = props.prefixCls;
    let color = props.color;
    let end = props.end;
    let endCls = end ? prefixCls + '-item-tail-end' : '';
    let last = end ? <div className={prefixCls + '-item-head '+ prefixCls + '-item-head-end'}></div> : null;
    let lastLineShow = (props.timelineLast && !end) ? 'none' : 'block';
    
    return (
      <li className={prefixCls + '-item'}>
        <div style={{display:lastLineShow}} className={prefixCls + '-item-tail ' + endCls}></div>
        <div className={prefixCls + '-item-head '+ prefixCls + '-item-head-' + color}></div>
        <div className={prefixCls + '-item-content'}>{props.children}</div>
        {last}
      </li>
    );
  }
});

export default Timeline;
