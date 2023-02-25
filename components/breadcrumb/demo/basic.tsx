import React from 'react';
import { Breadcrumb } from 'antd';

const App: React.FC = () => (
  <Breadcrumb
    routes={[
      {
        breadcrumbName: 'Home',
      },
      {
        breadcrumbName: <a href="">Application Center</a>,
      },
      {
        breadcrumbName: <a href="">Application List</a>,
      },
      {
        breadcrumbName: 'An Application',
      },
    ]}
  />
);

export default App;
