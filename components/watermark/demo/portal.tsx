import React from 'react';
import { Button, Drawer, Modal, Space, Watermark } from 'antd';

const placeholder = (
  <div
    style={{
      height: 300,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'rgba(150, 150, 150, 0.2)',
    }}
  >
    A mock height
  </div>
);

const App: React.FC = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [showDrawer, setShowDrawer] = React.useState(false);
  const [showDrawer2, setShowDrawer2] = React.useState(false);

  const closeModal = () => setShowModal(false);
  const closeDrawer = () => setShowDrawer(false);
  const closeDrawer2 = () => setShowDrawer2(false);

  return (
    <>
      <Space>
        <Button onClick={() => setShowModal(true)}>Show in Modal</Button>
        <Button onClick={() => setShowDrawer(true)}>Show in Drawer</Button>
        <Button onClick={() => setShowDrawer2(true)}>Not Show in Drawer</Button>
      </Space>

      <Watermark content="Ant Design">
        <Modal
          destroyOnClose
          open={showModal}
          title="Modal"
          onCancel={closeModal}
          onOk={closeModal}
        >
          {placeholder}
        </Modal>
        <Drawer destroyOnClose open={showDrawer} title="Drawer" onClose={closeDrawer}>
          {placeholder}
        </Drawer>
      </Watermark>
      <Watermark content="Ant Design" inherit={false}>
        <Drawer destroyOnClose open={showDrawer2} title="Drawer" onClose={closeDrawer2}>
          {placeholder}
        </Drawer>
      </Watermark>
    </>
  );
};

export default App;
