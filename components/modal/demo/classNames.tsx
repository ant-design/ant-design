import React, { useState } from 'react';
import { Button, ConfigProvider, Modal, Space } from 'antd';
import { createStyles, useTheme } from 'antd-style';

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
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const { styles } = useStyle();
  const token = useTheme();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const showModal2 = () => {
    setIsModalOpen2(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk2 = () => {
    setIsModalOpen2(false);
  };

  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };

  return (
    <>
      <Space>
        <Button type="primary" onClick={showModal}>
          Open Modal
        </Button>
        <Button type="primary" onClick={showModal2}>
          ConfigProvider
        </Button>
      </Space>
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
        styles={{
          header: {
            borderLeft: `5px solid ${token.colorPrimary}`,
            borderRadius: 0,
            paddingInlineStart: 5,
          },
          body: {
            boxShadow: 'inset 0 0 10px #ccc',
            borderRadius: 5,
          },
          mask: {
            background: 'rgba(80, 0, 0, 0.5)',
          },
          footer: {
            borderTop: '1px solid #333',
          },
        }}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      <ConfigProvider
        modal={{
          classNames: {
            body: styles['my-modal-body'],
            mask: styles['my-modal-mask'],
            header: styles['my-modal-header'],
            footer: styles['my-modal-footer'],
          },
          styles: {
            header: {
              borderLeft: `5px solid #1d39c4`,
              borderRadius: 0,
              paddingInlineStart: 5,
            },
            body: {
              boxShadow: 'inset 0 0 10px #ccc',
              borderRadius: 5,
            },
            mask: {
              background: 'rgba(80, 0, 0, 0.5)',
            },
            footer: {
              borderTop: '1px solid #333',
            },
          },
        }}
      >
        <Modal
          title="Basic Modal"
          open={isModalOpen2}
          onOk={handleOk2}
          onCancel={handleCancel2}
          footer="Footer"
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </ConfigProvider>
    </>
  );
};

export default App;
