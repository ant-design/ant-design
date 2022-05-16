import * as React from 'react';
import Empty from '../empty';
import type { ConfigConsumerProps } from '.';
import { ConfigConsumer } from '.';

const defaultRenderEmpty = (componentName?: string): React.ReactNode => (
  <ConfigConsumer>
    {({ getPrefixCls }: ConfigConsumerProps) => {
      const prefix = getPrefixCls('empty');

      switch (componentName) {
        case 'Table':
        case 'List':
          return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;

        case 'Select':
        case 'TreeSelect':
        case 'Cascader':
        case 'Transfer':
        case 'Mentions':
          return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} className={`${prefix}-small`} />;

        /* istanbul ignore next */
        default:
          // Should never hit if we take all the component into consider.
          return <Empty />;
      }
    }}
  </ConfigConsumer>
);

export type RenderEmptyHandler = typeof defaultRenderEmpty;

export default defaultRenderEmpty;
