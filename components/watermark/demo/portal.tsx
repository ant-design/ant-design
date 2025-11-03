import React from 'react';
import { Button, Drawer, Flex, message, Modal, Watermark } from 'antd';

const style: React.CSSProperties = {
  height: 300,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(150, 150, 150, 0.2)',
};

const placeholder = <div style={style}>A mock height</div>;

const App: React.FC = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [showDrawer, setShowDrawer] = React.useState(false);
  const [showDrawer2, setShowDrawer2] = React.useState(false);
  const watermarkRef = React.useRef<HTMLDivElement>(null);

  const closeModal = () => setShowModal(false);
  const closeDrawer = () => setShowDrawer(false);
  const closeDrawer2 = () => setShowDrawer2(false);

  const onRemove = () => {
    message.info('WaterMark dom is hard removed');
  };

  const hardRemoveWatermark = () => {
    const watermarkElement = watermarkRef.current?.querySelector<HTMLDivElement>(
      '[style*="background-image"]',
    );
    if (watermarkElement) {
      watermarkElement.remove();
    }
  };

  return (
    <>
      <Flex gap="middle" wrap>
        <Button type="primary" onClick={() => setShowModal(true)}>
          Show in Modal
        </Button>
        <Button type="primary" onClick={() => setShowDrawer(true)}>
          Show in Drawer
        </Button>
        <Button type="primary" onClick={() => setShowDrawer2(true)}>
          Not Show in Drawer
        </Button>
        <Button danger onClick={hardRemoveWatermark}>
          Hard Remove Watermark
        </Button>
      </Flex>
      <Watermark content="Ant Design">
        <Modal
          destroyOnHidden
          open={showModal}
          title="Modal"
          onCancel={closeModal}
          onOk={closeModal}
        >
          {placeholder}
        </Modal>
        <Drawer destroyOnHidden open={showDrawer} title="Drawer" onClose={closeDrawer}>
          {placeholder}
        </Drawer>
      </Watermark>
      <Watermark content="Ant Design" inherit={false}>
        <Drawer destroyOnHidden open={showDrawer2} title="Drawer" onClose={closeDrawer2}>
          {placeholder}
        </Drawer>
      </Watermark>
      <div ref={watermarkRef} style={{ marginTop: 16 }}>
        <Watermark content="Ant Design" onRemove={onRemove}>
          {placeholder}
        </Watermark>
      </div>
    </>
  );
};

export default App;
