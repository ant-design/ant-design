import React from 'react';
import { Space, Rate } from 'antd';

const App: React.FC = () => (
  <>
    <Space>
      <Rate defaultValue={3} />
      <span>allowClear: true</span>
    </Space>
    <br />
    <Space>
      <Rate allowClear={false} defaultValue={3} />
      <span>allowClear: false</span>
    </Space>
  </>
);

export default App;
