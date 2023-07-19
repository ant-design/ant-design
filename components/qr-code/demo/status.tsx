import React from 'react';
import { QRCode, Space } from 'antd';

const App: React.FC = () => (
  <Space wrap>
    <QRCode value="https://ant.design/" status="loading" />
    <QRCode value="https://ant.design/" status="expired" onRefresh={() => console.log('refresh')} />
  </Space>
);

export default App;
