import React from 'react';
import classNames from 'classnames';
import TimelineItem from './TimelineItem';
import splitObject from '../_util/splitObject';

export interface TimelineProps {
  /** 指定最后一个幽灵节点是否存在或内容 */
  pending?: boolean | React.ReactNode;
  style?: React.CSSProperties;
}

export default class Timeline extends React.Component<TimelineProps, any> {
  static Item: React.ReactNode;
  static defaultProps = {
    prefixCls: 'ant-timeline',
  };

  render() {
    const [{
      prefixCls, children, pending, className,
    }, restProps] = splitObject(this.props,
      ['prefixCls', 'children', 'pending', 'className']);
    const pendingNode = typeof pending === 'boolean' ? null : pending;
    const classString = classNames({
      [prefixCls]: true,
      [`${prefixCls}-pending`]: !!pending,
      [className]: className,
    });
    return (
      <ul {...restProps} className={classString}>
        {
          React.Children.map(children, (ele: React.ReactElement<any>, idx) =>
            React.cloneElement(ele, {
              last: idx === children.length - 1,
            })
          )
        }
        {(!!pending)
          ? <TimelineItem pending={!!pending}>{pendingNode}</TimelineItem>
          : null}
      </ul>
    );
  }
}
