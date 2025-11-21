import React from 'react';
import type { MenuProps } from 'antd';
import { Menu, Divider } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: '1',
    label: <div>Title-1</div>,
  },
  {
    key: '2',
    label: <div>Title-2</div>,
  },
  {
    key: '3',
    label: 3,
  },
];

const App: React.FC = () => {
  return (
    <>
      <Menu mode={'inline'} items={items} />
      <Divider />
      <Menu mode={'vertical'} items={items} />
      <Divider />
      <Menu mode={'horizontal'} items={items} />
    </>
  );
};

export default App;
