import * as React from 'react';

import { ConfigContext } from '../config-provider';
import BreadcrumbContext from './BreadcrumbContext';
import classNames from 'classnames';

type CompoundedComponent = React.FC<React.PropsWithChildren> & {
  /** @internal */
  __ANT_BREADCRUMB_SEPARATOR: boolean;
};

const BreadcrumbSeparator: CompoundedComponent = ({ children }) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('breadcrumb');
  const breadcrumbContext = React.useContext(BreadcrumbContext);
  const { classNames: mergedClassNames, styles: mergedStyles } = breadcrumbContext;

  return (
    <li
      className={classNames(`${prefixCls}-separator`, mergedClassNames?.separator)}
      style={mergedStyles?.separator}
      aria-hidden="true"
    >
      {children === '' ? children : children || '/'}
    </li>
  );
};

BreadcrumbSeparator.__ANT_BREADCRUMB_SEPARATOR = true;

export default BreadcrumbSeparator;
