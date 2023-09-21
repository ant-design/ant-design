import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { createStyles } from 'antd-style';

const useStyle = createStyles(({ token }) => ({
  'my-modal-body': {
    background: token['blue-1'],
    padding: token.paddingSM,
  },
  'my-modal-mask': {
    boxShadow: `inset 0 0 15px #fff`,
  },
  'my-modal-header': {
    borderBottom: `2px solid ${token.colorPrimary}`,
  },
  'my-modal-footer': {
    color: token.colorPrimary,
  },
}));

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { styles } = useStyle();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer="Footer"
        classNames={{
          body: styles['my-modal-body'],
          mask: styles['my-modal-mask'],
          header: styles['my-modal-header'],
          footer: styles['my-modal-footer'],
        }}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default App;
