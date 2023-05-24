import { QRCode, Space, Tooltip } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <Tooltip title="二维码上鼠标右键->检查->源码中查看渲染结果">
    <Space>
      <QRCode type="canvas" value="https://ant.design/" />
      <QRCode type="svg" value="https://ant.design/" />
    </Space>
  </Tooltip>
);

export default App;
