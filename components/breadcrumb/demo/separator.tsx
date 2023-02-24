import React from 'react';
import { Breadcrumb } from 'antd';

const App: React.FC = () => (
  <Breadcrumb
    separator=">"
    routes={[
      {
        breadcrumbName: 'Home',
      },
      {
        breadcrumbName: 'Application Center',
        href: '',
      },
      {
        breadcrumbName: 'Application List',
        href: '',
      },
      {
        breadcrumbName: 'An Application',
      },
    ]}
  />
);

export default App;
