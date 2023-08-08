import React from 'react';
import { Watermark, Modal, Drawer, Button, Space } from 'antd';

const App: React.FC = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [showDrawer, setShowDrawer] = React.useState(false);

  const closeModal = () => setShowModal(false);
  const closeDrawer = () => setShowDrawer(false);

  return (
    <>
      <Space>
        <Button onClick={() => setShowModal(true)}>Show Modal</Button>
        <Button onClick={() => setShowDrawer(true)}>Show Drawer</Button>
      </Space>

      <Watermark content="Ant Design">
        <Modal
          destroyOnClose
          open={showModal}
          title="Modal"
          onCancel={closeModal}
          onOk={closeModal}
        >
          Modal Content
        </Modal>
        <Drawer open={showDrawer} title="Drawer" onClose={closeDrawer}>
          Drawer Content
        </Drawer>
      </Watermark>
    </>
  );
};

export default App;
