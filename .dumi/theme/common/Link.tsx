import type { MouseEvent, MouseEventHandler } from 'react';
import React, { useMemo, forwardRef } from 'react';
import { Link as DumiLink, useLocation, useAppData, useNavigate } from 'dumi';

export interface LinkProps {
  to: string | { pathname?: string; search?: string; hash?: string };
  style?: React.CSSProperties;
  className?: string;
  onClick?: MouseEventHandler;
  component?: React.ComponentType<any>;
  children?: React.ReactNode;
}

const Link = forwardRef<HTMLAnchorElement, React.PropsWithChildren<LinkProps>>(
  ({ component, children, to, ...rest }, ref) => {
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
          ref,
          href,
          onClick,
          onMouseEnter: () => preloadRoute?.(href),
        },
        children,
      );
    }
    return (
      <DumiLink ref={ref} {...rest} to={href} prefetch>
        {children}
      </DumiLink>
    );
  },
);

export default Link;
