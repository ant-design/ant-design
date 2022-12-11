import React from 'react';
import { Watermark } from 'antd';

const App: React.FC = () => (
  <Watermark interlace content="Ant Design" gap={[100, 100]}>
    <div style={{ height: 500 }} />
  </Watermark>
);

export default App;
