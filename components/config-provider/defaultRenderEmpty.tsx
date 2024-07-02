import React, { useContext } from 'react';

import type { ConfigConsumerProps } from '.';
import { ConfigContext } from '.';
import Empty from '../empty';

type ComponentName =
  | 'Table'
  | 'Table.filter' /* 👈 5.20.0+ */
  | 'List'
  | 'Select'
  | 'TreeSelect'
  | 'Cascader'
  | 'Transfer'
  | 'Mentions';

interface EmptyProps {
  componentName?: ComponentName;
}

const DefaultRenderEmpty: React.FC<EmptyProps> = (props) => {
  const { componentName } = props;
  const { getPrefixCls } = useContext<ConfigConsumerProps>(ConfigContext);
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
    /**
     * This type of component should satisfy the nullish coalescing operator(??) on the left-hand side.
     * to let the component itself implement the logic.
     * For example `Table.filter`.
     */
    case 'Table.filter':
      // why `null`? legacy react16 node type `undefined` is not allowed.
      return null;
    default:
      // Should never hit if we take all the component into consider.
      return <Empty />;
  }
};

export type RenderEmptyHandler = (componentName?: ComponentName) => React.ReactNode;

export default DefaultRenderEmpty;
