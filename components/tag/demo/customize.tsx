import React from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Space, Tag } from 'antd';

const App: React.FC = () => (
  <Space wrap size={[8, 0]}>
    <Tag closable closeIcon="关 闭">
      Tag1
    </Tag>
    <Tag closable closeIcon={<CloseCircleOutlined />}>
      Tag2
    </Tag>
  </Space>
);

export default App;
