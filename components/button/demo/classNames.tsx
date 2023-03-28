import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Tooltip, Space } from 'antd';

const App: React.FC = () => (
  <Space wrap>
    <Tooltip title="search">
      <Button
        type="primary"
        shape="circle"
        icon={<SearchOutlined />}
        classNames={{ icon: 'custom-icon' }}
      />
    </Tooltip>
    <Button type="primary" shape="circle">
      A
    </Button>
    <Button type="primary" icon={<SearchOutlined />} classNames={{ icon: 'custom-icon' }}>
      Search
    </Button>
  </Space>
);

export default App;
