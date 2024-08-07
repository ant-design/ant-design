import React from 'react';
import { ConfigProvider } from 'antd';

const CssVarProvider = ({ children }: React.PropsWithChildren) => (
  <ConfigProvider
    theme={{
      cssVar: true,
    }}
  >
    {children}
  </ConfigProvider>
);
export default CssVarProvider;
