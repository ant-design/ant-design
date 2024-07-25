import type { MouseEvent, MouseEventHandler } from 'react';
import React, { forwardRef, useLayoutEffect, useTransition } from 'react';
import { Link as DumiLink, useLocation, useNavigate } from 'dumi';
import nprogress from 'nprogress';

export interface LinkProps {
  to: string | { pathname?: string; search?: string; hash?: string };
  style?: React.CSSProperties;
  className?: string;
  onClick?: MouseEventHandler;
  component?: React.ComponentType<any>;
}

nprogress.configure({ showSpinner: false });

const Link = forwardRef<HTMLAnchorElement, React.PropsWithChildren<LinkProps>>((props, ref) => {
  const { to, children, component, ...rest } = props;
  const [isPending, startTransition] = useTransition();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const href = React.useMemo<string>(() => {
    if (typeof to === 'object') {
      return `${to.pathname || pathname}${to.search || ''}${to.hash || ''}`;
    }
    return to;
  }, [to]);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    props.onClick?.(e);
    if (!href?.startsWith('http')) {
      // Should support open in new tab
      if (!e.metaKey && !e.ctrlKey && !e.shiftKey) {
        e.preventDefault();
        startTransition(() => {
          if (href) {
            navigate(href);
          }
        });
      }
    }
  };

  useLayoutEffect(() => {
    if (isPending) {
      nprogress.start();
    } else {
      nprogress.done();
    }
  }, [isPending]);

  if (component) {
    return React.createElement(
      component,
      {
        ...rest,
        ref,
        onClick: handleClick,
        href,
      },
      children,
    );
  }

  return (
    <DumiLink ref={ref} onClick={handleClick} {...rest} to={href} prefetch>
      {children}
    </DumiLink>
  );
});

export default Link;
