import React from 'react';
import { Popconfirm } from 'antd';

const App: React.FC = () => (
  <Popconfirm title="Are you sure？" okText="Yes" cancelText="No">
    <a href="#">Delete</a>
  </Popconfirm>
);

export default App;
