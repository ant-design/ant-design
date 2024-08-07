import React from 'react';
import { ConfigProvider, theme } from 'antd';

const CssVarProvider = ({ children }: React.PropsWithChildren) => (
  <ConfigProvider
    theme={{
      algorithm: theme.compactAlgorithm,
    }}
  >
    {children}
  </ConfigProvider>
);
export default CssVarProvider;
