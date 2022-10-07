/*
 * version: 4.17.0 */import { Button, Popconfirm } from 'antd';
import React from 'react';

const App: React.FC = () => {
  const confirm = () =>
    new Promise(resolve => {
      setTimeout(() => resolve(null), 3000);
    });

  return (
    <Popconfirm title="Title" onConfirm={confirm} onOpenChange={() => console.log('open change')}>
      <Button type="primary">Open Popconfirm with Promise</Button>
    </Popconfirm>
  );
};

export default App;
