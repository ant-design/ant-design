import React from 'react';
import { App, Button } from 'antd';

// Sub page
const MyPage = () => {
  const { modal } = App.useApp();

  const showModal = () => {
    modal.warning({
      title: 'This is a warning message',
      content: 'some messages...some messages...',
    });
  };

  return (
    <Button type="primary" onClick={showModal}>
      Open modal
    </Button>
  );
};

// Entry component
export default () => (
  <App>
    <MyPage />
  </App>
);
