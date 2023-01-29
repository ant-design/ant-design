import classNames from 'classnames';
import * as React from 'react';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';
import type { AntAnchor } from './Anchor';
import AnchorContext from './context';

export interface AnchorLinkBaseProps {
  prefixCls?: string;
  href: string;
  target?: string;
  title: React.ReactNode;
  className?: string;
}

export interface AnchorLinkProps extends AnchorLinkBaseProps {
  children?: React.ReactNode;
}

const AnchorLink: React.FC<AnchorLinkProps> = (props) => {
  const { href = '#', title, prefixCls: customizePrefixCls, children, className, target } = props;

  const context = React.useContext<AntAnchor | undefined>(AnchorContext);

  const { registerLink, unregisterLink, scrollTo, onClick, activeLink } = context || {};

  React.useEffect(() => {
    registerLink?.(href);
    return () => {
      unregisterLink?.(href);
    };
  }, [href, registerLink, unregisterLink]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    onClick?.(e, { title, href });
    scrollTo?.(href);
  };

  const { getPrefixCls } = React.useContext<ConfigConsumerProps>(ConfigContext);

  const prefixCls = getPrefixCls('anchor', customizePrefixCls);

  const wrapperClassName = classNames(`${prefixCls}-link`, className, {
    [`${prefixCls}-link-active`]: activeLink === href,
  });

  const titleClassName = classNames(`${prefixCls}-link-title`, {
    [`${prefixCls}-link-title-active`]: activeLink === href,
  });

  return (
    <div className={wrapperClassName}>
      <a
        className={titleClassName}
        href={href}
        title={typeof title === 'string' ? title : ''}
        target={target}
        onClick={handleClick}
      >
        {title}
      </a>
      {children}
    </div>
  );
};

export default AnchorLink;
