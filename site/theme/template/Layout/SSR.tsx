import * as React from 'react';
import { ConfigProvider } from 'antd';

export interface SSRProps {
  children?: React.ReactNode;
}

const SSR: React.FC<SSRProps> = ({ children }: SSRProps) => {
  return children;
};

if (process.env.NODE_ENV === 'development') {
  SSR.displayName = 'ServerRenderWrapper';
}

export default SSR;
