import type { MouseEvent, MouseEventHandler } from 'react';
import React, { forwardRef, useLayoutEffect, useMemo, useTransition } from 'react';
import { useLocation, useNavigate } from 'dumi';
import nprogress from 'nprogress';

export interface LinkProps {
  to?: string | { pathname?: string; search?: string; hash?: string };
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  onClick?: MouseEventHandler;
}

const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  const { to, children, ...rest } = props;
  const [isPending, startTransition] = useTransition();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const href = useMemo(() => {
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

  return (
    <a ref={ref} onClick={handleClick} {...rest} href={href}>
      {children}
    </a>
  );
});

export default Link;
