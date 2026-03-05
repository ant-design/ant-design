import React from 'react';
import { Image, Space } from 'antd';

const App: React.FC = () => {
  return (
    <Space size={12}>
      <Image width={200} height={200} loading />
      <Image width={200} height={200} loading={{ percent: 25 }} />
      <Image width={200} height={200} loading={{ percent: 50 }} />
      <Image width={200} height={200} loading={{ percent: 75 }} />
    </Space>
  );
};

export default App;
