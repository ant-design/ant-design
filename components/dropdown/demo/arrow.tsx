import React from 'react';
import { Button, Dropdown, Menu } from 'antd';

const menu = (
  <Menu
    items={[
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
    ]}
  />
);

const App: React.FC = () => (
  <>
    <Dropdown overlay={menu} placement="bottomLeft" arrow>
      <Button>bottomLeft</Button>
    </Dropdown>
    <Dropdown overlay={menu} placement="bottom" arrow>
      <Button>bottom</Button>
    </Dropdown>
    <Dropdown overlay={menu} placement="bottomRight" arrow>
      <Button>bottomRight</Button>
    </Dropdown>
    <br />
    <Dropdown overlay={menu} placement="topLeft" arrow>
      <Button>topLeft</Button>
    </Dropdown>
    <Dropdown overlay={menu} placement="top" arrow>
      <Button>top</Button>
    </Dropdown>
    <Dropdown overlay={menu} placement="topRight" arrow>
      <Button>topRight</Button>
    </Dropdown>
  </>
);

export default App;
