import React from 'react';
import classNames from 'classnames';

export default class TimelineItem extends React.Component {
  static defaultProps = {
    prefixCls: 'ant-timeline',
    color: 'blue',
    last: false,
    pending: false,
  }

  render() {
    const { prefixCls, color, last, children, pending } = this.props;
    const itemClassName = classNames({
      [`${prefixCls}-item`]: true,
      [`${prefixCls}-item-last`]: last,
      [`${prefixCls}-item-pending`]: pending,
    });
    return (
      <li className={itemClassName}>
        <div className={`${prefixCls}-item-tail`} />
        <div className={`${prefixCls}-item-head ${prefixCls}-item-head-${color}`} />
        <div className={`${prefixCls}-item-content`}>{children}</div>
      </li>
    );
  }
}
