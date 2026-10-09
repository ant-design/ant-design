import React from 'react';

import { DatePicker, Space } from 'antd';

const App: React.FC = () => (
  <Space vertical>
    <DatePicker suffix />
    <DatePicker suffix={false} />
    <DatePicker />
    <DatePicker suffix={null} />
    <DatePicker suffix="123" />
  </Space>
);

export default App;
