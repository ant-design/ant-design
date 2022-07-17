import * as React from 'react';
import { ConfigContext } from '../config-provider';

interface BreadcrumbSeparatorInterface extends React.FC {
  __ANT_BREADCRUMB_SEPARATOR: boolean;
}

const BreadcrumbSeparator: BreadcrumbSeparatorInterface = ({ children }) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('breadcrumb');

  return <span className={`${prefixCls}-separator`}>{children || '/'}</span>;
};

BreadcrumbSeparator.__ANT_BREADCRUMB_SEPARATOR = true;

export default BreadcrumbSeparator;
