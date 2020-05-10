import * as React from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  prefixCls?: string;
}

const Link: React.ForwardRefRenderFunction<HTMLAnchorElement, LinkProps> = (
  { className, prefixCls: customizePrefixCls, ...props },
  ref,
) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('link', customizePrefixCls);
  return <a ref={ref} className={classNames(prefixCls, className)} {...props} />;
};

export default React.forwardRef(Link);
