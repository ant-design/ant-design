import { ConfigProvider, Skeleton } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      components: {
        Skeleton: {
          skeletonBlockRadius: 30,
          skeletonTitleHeight: 30,
          color: '#222',
          colorGradientEnd: '#444',
        },
      },
    }}
  >
    <Skeleton loading active />
  </ConfigProvider>
);

export default App;
