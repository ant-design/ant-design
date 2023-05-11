import type { MouseEvent } from 'react';
import React, { forwardRef, startTransition } from 'react';
import { useNavigate } from 'dumi';

export type LinkProps = {
  to?: string;
  children?: React.ReactNode;
  className?: string;
};

const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  const { to, children, ...rest } = props;
  const navigate = useNavigate();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!to.startsWith('http')) {
      e.preventDefault();
      startTransition(() => {
        navigate(to);
      });
    }
  };

  return (
    <a ref={ref} href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
});

export default Link;
