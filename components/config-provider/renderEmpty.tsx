import * as React from 'react';
import Empty from '../empty';
import { ConfigConsumer, ConfigConsumerProps } from './';
import emptyImg from './empty.svg';

const renderEmpty = (componentName?: string): React.ReactNode => (
  <ConfigConsumer>
    {({ getPrefixCls }: ConfigConsumerProps) => {
      const prefix = getPrefixCls('empty');

      switch (componentName) {
        case 'Table':
        case 'List':
          return <Empty image={emptyImg} className={`${prefix}-normal`} />;

        case 'Select':
        case 'TreeSelect':
        case 'Cascader':
        case 'Transfer':
          return <Empty image={emptyImg} className={`${prefix}-small`} />;

        default:
          return <Empty />;
      }
    }}
  </ConfigConsumer>
);

export type RenderEmptyHandler = typeof renderEmpty;

export default renderEmpty;
