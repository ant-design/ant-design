import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import type { ModalProps } from 'antd';

const classNamesFn: ModalProps['classNames'] = (info) => {
  console.log('classNamesFn Modal props:', info.props);
  return {
    root: 'demo-modal-root',
    header: 'demo-modal-header',
    body: 'demo-modal-body',
    footer: 'demo-modal-footer',
    container: 'demo-modal-container',
    wrapper: 'demo-modal-wrapper',
    title: 'demo-modal-title',
    mask: 'demo-modal-mask',
  };
};

const stylesFn: ModalProps['styles'] = (info) => {
  console.log('stylesFn Modal props:', info.props);
  return {
    container: {
      borderRadius: 0,
    },
    mask: {
      backgroundImage: `linear-gradient(to top, #18181b 0, rgba(21, 21, 22, 0.2) 100%)`,
    },
  };
};

const Demo: React.FC = () => {
  const [modalOpen, setOpen] = useState(false);
  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <Modal
        centered
        footer={null}
        title="Custom Modal"
        classNames={classNamesFn}
        styles={stylesFn}
        open={modalOpen}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      >
        <div style={{ margin: '16px 0', lineHeight: '28px' }}>
          Following the Ant Design specification, we developed a React UI library antd that contains
          a set of high quality components and demos for building rich, interactive user interfaces.
        </div>
        <div style={{ lineHeight: '28px' }}>
          🌈 Enterprise-class UI designed for web applications.
        </div>
        <div style={{ lineHeight: '28px' }}>
          📦 A set of high-quality React components out of the box.
        </div>
        <div style={{ lineHeight: '28px' }}>
          🛡 Written in TypeScript with predictable static types.
        </div>
        <div style={{ lineHeight: '28px' }}>
          ⚙️ Whole package of design resources and development tools.
        </div>
        <div style={{ lineHeight: '28px' }}>
          🌍 Internationalization support for dozens of languages.
        </div>
        <div style={{ marginBottom: 8, lineHeight: '28px' }}>
          🎨 Powerful theme customization in every detail.
        </div>
      </Modal>
    </>
  );
};

export default Demo;
