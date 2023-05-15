import * as React from 'react';
import { ConfigContext } from '../config-provider';

const InternalBreadcrumbSeparator = React.forwardRef<HTMLLIElement, { children?: React.ReactNode }>(
  ({ children }, ref) => {
    const { getPrefixCls } = React.useContext(ConfigContext);
    const prefixCls = getPrefixCls('breadcrumb');

    return (
      <li ref={ref} className={`${prefixCls}-separator`} aria-hidden="true">
        {children === '' ? children : children || '/'}
      </li>
    );
  },
);

const BreadcrumbSeparator = Object.assign(InternalBreadcrumbSeparator, {
  /** @internal */
  __ANT_BREADCRUMB_SEPARATOR: true,
});

export default BreadcrumbSeparator;
