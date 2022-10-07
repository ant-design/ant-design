import { QuestionCircleOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <Popconfirm title="Are you sure？" icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
    <a href="#">Delete</a>
  </Popconfirm>
);

export default App;
