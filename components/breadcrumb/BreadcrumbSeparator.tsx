import * as React from 'react';
import { ConfigContext } from '../config-provider';

const InternalBreadcrumbSeparator = ({ children }: { children?: React.ReactNode }) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('breadcrumb');

  return <span className={`${prefixCls}-separator`}>{children || '/'}</span>;
};

const BreadcrumbSeparator = Object.assign(InternalBreadcrumbSeparator, {
  /** @internal */
  __ANT_BREADCRUMB_SEPARATOR: true,
});

export default BreadcrumbSeparator;
