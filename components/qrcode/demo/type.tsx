import { QRCode, Space } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <Space>
    <QRCode type="canvas" value="https://ant.design/" />
    <QRCode type="svg" value="https://ant.design/" />
  </Space>
);

export default App;
