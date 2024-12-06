import type { MouseEvent, MouseEventHandler } from 'react';
import React, { useMemo } from 'react';
import { Link as DumiLink, useLocation, useAppData, useNavigate } from 'dumi';

export interface LinkProps {
  to: string | { pathname?: string; search?: string; hash?: string };
  style?: React.CSSProperties;
  className?: string;
  onClick?: MouseEventHandler;
  component?: React.ComponentType<any>;
  children?: React.ReactNode;
}

const Link: React.FC<LinkProps> = ({ component, children, to, ...rest }) => {
  const { pathname } = useLocation();
  const { preloadRoute } = useAppData();
  const navigate = useNavigate();
  const href = useMemo<string>(() => {
    if (typeof to === 'object') {
      return `${to.pathname || pathname}${to.search || ''}${to.hash || ''}`;
    }
    return to;
  }, [to]);
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    rest.onClick?.(e);
    if (!href?.startsWith('http')) {
      // Should support open in new tab
      if (!e.metaKey && !e.ctrlKey && !e.shiftKey) {
        e.preventDefault();
        navigate(href);
      }
    }
  };
  if (component) {
    return React.createElement(
      component,
      {
        ...rest,
        href,
        onClick,
        onMouseEnter: () => preloadRoute?.(href),
      },
      children,
    );
  }
  return (
    <DumiLink {...rest} to={to} prefetch>
      {children}
    </DumiLink>
  );
};

export default Link;
