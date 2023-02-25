import React from 'react';
import { Breadcrumb } from 'antd';

const App: React.FC = () => (
  <Breadcrumb
    separator=""
    routes={[
      {
        breadcrumbName: 'Location',
      },
      {
        separator: ':',
      },
      {
        href: '',
        breadcrumbName: 'Application Center',
      },
      {
        separator: '/',
      },
      {
        href: '',
        breadcrumbName: 'Application List',
      },
      {
        separator: '/',
      },
      {
        breadcrumbName: 'An Application',
      },
    ]}
  />
);

export default App;
