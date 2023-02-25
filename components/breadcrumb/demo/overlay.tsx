import React from 'react';
import { Breadcrumb } from 'antd';

const menuItems = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
        General
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
        Layout
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        Navigation
      </a>
    ),
  },
];

const App: React.FC = () => (
  <Breadcrumb
    routes={[
      {
        breadcrumbName: 'Ant Design',
      },
      {
        breadcrumbName: <a href="">Component</a>,
      },
      {
        breadcrumbName: <a href="">General</a>,
        menu: { items: menuItems },
      },
      {
        breadcrumbName: 'Button',
      },
    ]}
  />
);

export default App;
