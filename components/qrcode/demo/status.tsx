import { QRCode, Space } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <Space wrap>
    <QRCode value="https://ant.design/" status="loading" />
    <QRCode value="https://ant.design/" status="expired" onRefresh={() => console.log('refresh')} />
  </Space>
);

export default App;
