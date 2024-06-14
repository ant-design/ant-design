import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        1st menu item
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item
      </a>
    ),
  },
];

const App: React.FC = () => (
  <Dropdown menu={{ items }} defaultOpen>
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        Default Open
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
);

export default App;
