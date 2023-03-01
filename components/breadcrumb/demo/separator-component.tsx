import React from 'react';
import { Breadcrumb } from 'antd';

const App: React.FC = () => (
  <Breadcrumb
    separator=""
    routes={[
      {
        title: 'Location',
      },
      {
        separator: ':',
      },
      {
        href: '',
        title: 'Application Center',
      },
      {
        separator: '/',
      },
      {
        href: '',
        title: 'Application List',
      },
      {
        separator: '/',
      },
      {
        title: 'An Application',
      },
    ]}
  />
);

export default App;
