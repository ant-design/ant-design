import React from 'react';
import { App, Button } from 'antd';

export default () => {
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
