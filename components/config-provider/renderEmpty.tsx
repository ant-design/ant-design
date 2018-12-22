import * as React from 'react';
import Empty from '../empty';
import { ConfigConsumer, ConfigConsumerProps } from './';

const renderEmpty = (componentName?: string): React.ReactNode => (
  <ConfigConsumer>
    {({ getPrefixCls }: ConfigConsumerProps) => {
      const prefix = getPrefixCls('empty');

      switch (componentName) {
        case 'Select':
        case 'TreeSelect':
        case 'Cascader':
          return <Empty className={`${prefix}-collapse`} />;

        default:
          return <Empty />;
      }
    }}
  </ConfigConsumer>
);

export type RenderEmptyHandler = typeof renderEmpty;

export default renderEmpty;
