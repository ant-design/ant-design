import * as React from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export interface CardGridProps {
  prefixCls?: string;
  style?: React.CSSProperties;
  className?: string;
}

const Grid: React.SFC<CardGridProps> = props => (
  <ConfigConsumer>
    {({ getPrefixCls }: ConfigConsumerProps) => {
      const { prefixCls: customizePrefixCls, className, ...others } = props;
      const prefixCls = getPrefixCls('card', customizePrefixCls);
      const classString = classNames(`${prefixCls}-grid`, className);
      return <div {...others} className={classString} />;
    }}
  </ConfigConsumer>
);

export default Grid;
