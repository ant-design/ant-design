import * as React from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export interface EmptyProps {
  prefixCls?: string;
  className?: string;
}

const Empty: React.SFC<EmptyProps> = (props: EmptyProps) => (
  <ConfigConsumer>
    {({ getPrefixCls }: ConfigConsumerProps) => {
      const { className } = props;
      const prefixCls = getPrefixCls('empty', props.prefixCls);
      return <div className={classNames(prefixCls, className)}>abc hello!</div>;
    }}
  </ConfigConsumer>
);

export default Empty;
