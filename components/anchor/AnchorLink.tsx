import classNames from 'classnames';
import * as React from 'react';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigConsumer } from '../config-provider';
import type { AntAnchor } from './Anchor';
import AnchorContext from './context';

export interface AnchorLinkProps {
  prefixCls?: string;
  href: string;
  target?: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

const AnchorLink: React.FC<AnchorLinkProps> = props => {
  const { href = '#', title, prefixCls: customizePrefixCls, children, className, target } = props;

  const context = React.useContext<AntAnchor | undefined>(AnchorContext);

  const { registerLink, unregisterLink, scrollTo, onClick, activeLink } = context || {};

  React.useEffect(() => {
    registerLink?.(href);
    return () => {
      unregisterLink?.(href);
    };
  }, [href, registerLink, unregisterLink]);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    onClick?.(e, { title, href });
    scrollTo?.(href);
  };

  return (
    <ConfigConsumer>
      {({ getPrefixCls }: ConfigConsumerProps) => {
        const prefixCls = getPrefixCls('anchor', customizePrefixCls);
        const active = activeLink === href;
        const wrapperClassName = classNames(`${prefixCls}-link`, className, {
          [`${prefixCls}-link-active`]: active,
        });
        const titleClassName = classNames(`${prefixCls}-link-title`, {
          [`${prefixCls}-link-title-active`]: active,
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
      }}
    </ConfigConsumer>
  );
};

export default AnchorLink;
