import * as React from 'react';
import { ConfigContext } from '../config-provider';

type CompoundedComponent = React.FC<{ children?: React.ReactNode }> & {
  /** @internal */
  __ANT_BREADCRUMB_SEPARATOR: boolean;
};

const BreadcrumbSeparator: CompoundedComponent = ({ children }) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('breadcrumb');

  return <span className={`${prefixCls}-separator`}>{children || '/'}</span>;
};

BreadcrumbSeparator.__ANT_BREADCRUMB_SEPARATOR = true;

export default BreadcrumbSeparator;
