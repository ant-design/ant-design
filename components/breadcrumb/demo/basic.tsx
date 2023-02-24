import React from 'react';
import { Breadcrumb } from 'antd';

const App: React.FC = () => (
  <Breadcrumb
    routes={[
      {
        breadcrumbName: 'Home',
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
