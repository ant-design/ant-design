import classNames from 'classnames';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import type { ConfigConsumerProps } from '../config-provider';

export interface CardGridProps extends React.HTMLAttributes<HTMLDivElement> {
  prefixCls?: string;
  className?: string;
  hoverable?: boolean;
  style?: React.CSSProperties;
}

const Grid: React.FC<CardGridProps> = ({ prefixCls, className, hoverable = true, ...props }) => {
  const { getPrefixCls } = React.useContext<ConfigConsumerProps>(ConfigContext);
  const prefix = getPrefixCls('card', prefixCls);
  const classString = classNames(`${prefix}-grid`, className, {
    [`${prefix}-grid-hoverable`]: hoverable,
  });
  return <div {...props} className={classString} />;
};

export default Grid;
