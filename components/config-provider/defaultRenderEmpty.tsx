import React, { useContext } from 'react';
import type { ConfigConsumerProps } from '.';
import { ConfigContext } from '.';
import Empty from '../empty';

interface EmptyProps {
  componentName?: string;
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
    /* istanbul ignore next */
    default:
      // Should never hit if we take all the component into consider.
      return <Empty />;
  }
};

export type RenderEmptyHandler = (componentName?: string) => React.ReactNode;

export default DefaultRenderEmpty;
