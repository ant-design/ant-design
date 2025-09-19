import React, { useState } from 'react';
import { Button, Modal } from 'antd';
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
  return {
    root: { opacity: width / 1000 },
    title: { opacity: width / 1000 },
    mask: { opacity: width / 1000 },
  };
};

const Demo: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <Button type="primary" onClick={() => setModalOpen(true)}>
        Open Modal
      </Button>
      <Modal
        title="Basic Modal"
        classNames={classNamesFn}
        styles={stylesFn}
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default Demo;
