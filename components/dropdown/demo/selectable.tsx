import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space, Typography } from 'antd';

const menu = (
  <Menu
    selectable
    defaultSelectedKeys={['3']}
    items={[
      {
        key: '1',
        label: 'Item 1',
      },
      {
        key: '2',
        label: 'Item 2',
      },
      {
        key: '3',
        label: 'Item 3',
      },
    ]}
  />
);

const App: React.FC = () => (
  <Dropdown overlay={menu}>
    <Typography.Link>
      <Space>
        Selectable
        <DownOutlined />
      </Space>
    </Typography.Link>
  </Dropdown>
);

export default App;
