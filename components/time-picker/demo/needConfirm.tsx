import React from 'react';
import { TimePicker, Space } from 'antd';

const App: React.FC = () => (
  <Space direction="vertical" size={12}>
    <TimePicker needConfirm />
    <TimePicker needConfirm={false} />
  </Space>
);

export default App;
