import React from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';

const App: React.FC = () => (
  <Popconfirm
    title="删除任务"
    description="Are you sure？"
    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
  >
    <a href="#">Delete</a>
  </Popconfirm>
);

export default App;
