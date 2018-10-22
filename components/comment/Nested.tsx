import * as React from 'react';
import classNames from 'classnames';

export interface NestedCommentProps {
  prefixCls?: string;
  style?: React.CSSProperties;
  className?: string;
}

export default (props: NestedCommentProps) => {
  const { prefixCls = 'ant-comment', className, ...others } = props;
  const classString = classNames(`${prefixCls}-nested`, className);
  return <div {...others} className={classString} />;
};
