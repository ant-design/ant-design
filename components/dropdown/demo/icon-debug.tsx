import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <Space>
    <Dropdown.Button icon={<DownOutlined />} menu={{ items: [] }}>
      Submit
    </Dropdown.Button>
  </Space>
);

export default App;
