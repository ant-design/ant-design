import React from 'react';
import { ConfigProvider, Skeleton } from 'antd';

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      components: {
        Skeleton: {
          blockRadius: 30,
          titleHeight: 50,
          gradientFromColor: '#222',
          gradientToColor: '#444',
          paragraphMarginTop: 30,
          paragraphLiHeight: 30,
        },
      },
    }}
  >
    <Skeleton loading active />
  </ConfigProvider>
);

export default App;
