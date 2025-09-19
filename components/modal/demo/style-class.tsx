import React, { useState } from 'react';
import { Button, Modal, Space } from 'antd';
import type { ModalProps } from 'antd';

const classNamesFn: ModalProps['classNames'] = (info) => {
  const width = typeof info?.props?.width === 'number' ? info.props.width : 0;
  return width === 520
    ? {
        root: 'demo-modal-root-width-default',
        title: 'demo-modal-title-width-default',
        mask: 'demo-modal-mask-width-default',
      }
    : {
        root: 'demo-modal-root-width-other',
        title: 'demo-modal-title-width-other',
        mask: 'demo-modal-mask-width-other',
      };
};

const stylesFn: ModalProps['styles'] = (info) => {
  const width = typeof info?.props?.width === 'number' ? info.props.width : 0;
  const r = Math.min(255, Math.floor((width / 800) * 255));
  const g = Math.min(255, Math.floor(((800 - width) / 800) * 255));
  const b = Math.min(255, Math.floor(((width % 800) / 800) * 255 * 2));
  const alpha = Math.min(1, width / 600);
  return {
    mask: {
      backgroundColor: `rgba(${r}, ${g}, ${b}, ${alpha})`,
      transition: 'background-color 0.3s ease',
    },
  };
};

const Demo: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [value, setValue] = useState(520);
  return (
    <>
      <Button type="primary" onClick={() => setModalOpen(true)}>
        Open Modal
      </Button>
      <Modal
        width={value}
        title="Modal"
        classNames={classNamesFn}
        styles={stylesFn}
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
      >
        <Space.Compact size="small" style={{ width: '100%' }}>
          <Button onClick={() => setValue(300)}>300</Button>
          <Button onClick={() => setValue(400)}>400</Button>
          <Button onClick={() => setValue(500)}>500</Button>
          <Button onClick={() => setValue(600)}>600</Button>
          <Button onClick={() => setValue(700)}>700</Button>
          <Button onClick={() => setValue(800)}>800</Button>
        </Space.Compact>
      </Modal>
    </>
  );
};

export default Demo;
