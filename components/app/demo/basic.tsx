import React from 'react';
import { App, Button, Select } from 'antd';

const TheModal = () => {
  const { modal } = App.useApp();

  return (
    <Button type="primary" onClick={() => modal.confirm({ content: <Select /> })}>
      Open Modal
    </Button>
  );
};

const ReactApp = () => (
  <App>
    <TheModal />
  </App>
);

export default ReactApp;
