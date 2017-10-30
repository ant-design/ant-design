import React from 'react';
import classNames from 'classnames';

export interface CardGridProps {
  prefixCls?: string;
  style?: React.CSSProperties;
  className?: string;
  noHovering?: boolean;
}

export default (props: CardGridProps) => {
  const { prefixCls = 'ant-card', className, noHovering, ...others } = props;
  const classString = classNames(`${prefixCls}-grid`, className, { [`${prefixCls}-grid-no-hovering`]: noHovering });
  return <div {...others} className={classString} />;
};
