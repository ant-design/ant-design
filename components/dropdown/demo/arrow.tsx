import React from 'react';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';

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
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        3rd menu item
      </a>
    ),
  },
];

const App: React.FC = () => (
  <Space vertical>
    <Space wrap>
      <Dropdown menu={{ items }} placement="bottomLeft" arrow>
        <Button>bottomLeft</Button>
      </Dropdown>
      <Dropdown menu={{ items }} placement="bottom" arrow>
        <Button>bottom</Button>
      </Dropdown>
      <Dropdown menu={{ items }} placement="bottomRight" arrow>
        <Button>bottomRight</Button>
      </Dropdown>
    </Space>
    <Space wrap>
      <Dropdown menu={{ items }} placement="topLeft" arrow>
        <Button>topLeft</Button>
      </Dropdown>
      <Dropdown menu={{ items }} placement="top" arrow>
        <Button>top</Button>
      </Dropdown>
      <Dropdown menu={{ items }} placement="topRight" arrow>
        <Button>topRight</Button>
      </Dropdown>
    </Space>
    <Space wrap>
      <Dropdown menu={{ items }} placement="leftTop" arrow>
        <Button>leftTop</Button>
      </Dropdown>
      <Dropdown menu={{ items }} placement="left" arrow>
        <Button>left</Button>
      </Dropdown>
      <Dropdown menu={{ items }} placement="leftBottom" arrow>
        <Button>leftBottom</Button>
      </Dropdown>
    </Space>
    <Space wrap>
      <Dropdown menu={{ items }} placement="rightTop" arrow>
        <Button>rightTop</Button>
      </Dropdown>
      <Dropdown menu={{ items }} placement="right" arrow>
        <Button>right</Button>
      </Dropdown>
      <Dropdown menu={{ items }} placement="rightBottom" arrow>
        <Button>rightBottom</Button>
      </Dropdown>
    </Space>
  </Space>
);

export default App;
