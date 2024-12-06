import type { MouseEventHandler } from 'react';
import React from 'react';
import { Link as DumiLink } from 'dumi';

export interface LinkProps {
  to: string | { pathname?: string; search?: string; hash?: string };
  style?: React.CSSProperties;
  className?: string;
  onClick?: MouseEventHandler;
  component?: React.ComponentType<any>;
  children?: React.ReactNode;
}

const Link: React.FC<LinkProps> = (props) => <DumiLink {...props} prefetch />;

export default Link;
