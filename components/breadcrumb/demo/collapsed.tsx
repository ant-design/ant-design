import React from 'react';
import { Breadcrumb } from 'antd';

const App: React.FC = () => (
  <Breadcrumb
    collapsed
    keepCount={3}
    items={[
      {
        title: <a href="">Home</a>,
      },
      {
        title: <a href="">Application Center</a>,
      },
      {
        title: <a href="">Application List</a>,
      },
      {
        title: <a href="">Application</a>,
      },
      {
        title: 'Function',
      },
    ]}
  />
);

export default App;
