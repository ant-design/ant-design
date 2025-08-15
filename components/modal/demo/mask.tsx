import React from 'react';
import { Button, Modal, Space } from 'antd';

const modalConfig = {
  title: 'Title',
  content: 'Some contents...',
};
const App: React.FC = () => {
  const [modal, contextHolder] = Modal.useModal();

  return (
    <>
      <Space>
        <Button
          onClick={() => {
            modal.confirm({ ...modalConfig });
          }}
        >
          Default blur
        </Button>
        <Button
          onClick={() => {
            modal.confirm({ ...modalConfig, mask: { blur: false } });
          }}
        >
          Dimmed mask
        </Button>
        <Button
          onClick={() => {
            modal.confirm({ ...modalConfig, mask: false });
          }}
        >
          No mask
        </Button>
      </Space>

      {contextHolder}
    </>
  );
};

export default App;
