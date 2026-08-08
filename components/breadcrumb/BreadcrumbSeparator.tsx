import * as React from 'react';
import { clsx } from 'clsx';

import { ConfigContext } from '../config-provider';
import BreadcrumbContext from './BreadcrumbContext';

type CompoundedComponent = React.FC<
  React.PropsWithChildren<{
    className?: string;
  }>
> & {
  /** @internal */
  __ANT_BREADCRUMB_SEPARATOR: boolean;
};

const BreadcrumbSeparator: CompoundedComponent = ({ children, className }) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('breadcrumb');
  const breadcrumbContext = React.useContext(BreadcrumbContext);
  const { classNames: mergedClassNames, styles: mergedStyles } = breadcrumbContext;

  return (
    <li
      className={clsx(`${prefixCls}-separator`, className, mergedClassNames?.separator)}
      style={mergedStyles?.separator}
      aria-hidden="true"
    >
      {children === '' ? children : children || '/'}
    </li>
  );
};

BreadcrumbSeparator.__ANT_BREADCRUMB_SEPARATOR = true;

export default BreadcrumbSeparator;
