import * as React from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export interface CardGridProps {
  prefixCls?: string;
  className?: string;
  hoverable?: boolean;
  style?: React.CSSProperties;
}

const Grid: React.FC<CardGridProps> = ({ prefixCls, className, hoverable = true, ...props }) => (
  <ConfigConsumer>
    {({ getPrefixCls }: ConfigConsumerProps) => {
      const prefix = getPrefixCls('card', prefixCls);
      const classString = classNames(
        `${prefix}-grid`,
        className, {
          [`${prefix}-grid-hoverable`]: hoverable,
        }
      );

      return <div {...props} className={classString} />;
    }}
  </ConfigConsumer>
);

export default Grid;
