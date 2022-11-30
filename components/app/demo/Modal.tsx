import React from 'react';
import { App, Button } from 'antd';

// Sub page
const MyPage = () => {
  const { Modal } = App.useApp();

  const showModal = () => {
    Modal.warning({
      title: 'This is a warning message',
      content: 'some messages...some messages...',
    });
  };

  return (
    <Button type="primary" onClick={showModal}>
      Open Modal
    </Button>
  );
};

// Entry component
export default () => (
  <App>
    <MyPage />
  </App>
);
