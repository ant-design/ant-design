import React from 'react';
import { Button, Popover, QRCode } from 'antd';

const App: React.FC = () => (
  <Popover
    overlayInnerStyle={{ padding: 0 }}
    content={<QRCode value="https://ant.design" bordered={false} />}
  >
    <Button type="primary">Hover me</Button>
  </Popover>
);

export default App;
