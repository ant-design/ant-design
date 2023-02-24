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
        href: '',
        breadcrumbName: 'Application List',
      },
      {
        breadcrumbName: 'An Application',
      },
    ]}
  />
);

export default App;
