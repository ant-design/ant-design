import React, { useState } from 'react';
import { Button, Flex, Modal } from 'antd';
import type { ModalProps, ModalSemanticType } from 'antd';
import { createStaticStyles } from 'antd-style';

const lineStyle: React.CSSProperties = {
  lineHeight: '28px',
};

const sharedContent = (
  <>
    <div style={lineStyle}>
      Following the Ant Design specification, we developed a React UI library antd that contains a
      set of high quality components and demos for building rich, interactive user interfaces.
    </div>
    <div style={lineStyle}>🌈 Enterprise-class UI designed for web applications.</div>
    <div style={lineStyle}>📦 A set of high-quality React components out of the box.</div>
    <div style={lineStyle}>🛡 Written in TypeScript with predictable static types.</div>
    <div style={lineStyle}>⚙️ Whole package of design resources and development tools.</div>
    <div style={lineStyle}>🌍 Internationalization support for dozens of languages.</div>
    <div style={lineStyle}>🎨 Powerful theme customization in every detail.</div>
  </>
);

const classNames = createStaticStyles(({ css }) => ({
  container: css`
    border-radius: 10px;
    padding: 10px;
  `,
}));

const styles: ModalProps['styles'] = {
  mask: {
    backgroundImage: `linear-gradient(to top, #18181b 0, rgba(21, 21, 22, 0.2) 100%)`,
  },
};

const stylesFn: ModalProps['styles'] = (info): ModalSemanticType['styles'] => {
  if (info.props.footer) {
    return {
      container: {
        borderRadius: 14,
        border: '1px solid #ccc',
        padding: 0,
        overflow: 'hidden',
      },
      header: {
        padding: 16,
      },
      body: {
        padding: 16,
      },
      footer: {
        padding: '16px 10px',
        backgroundColor: '#fafafa',
      },
    };
  }
  return {};
};

const App: React.FC = () => {
  const [modalOpen, setOpen] = useState(false);
  const [modalFnOpen, setFnOpen] = useState(false);

  const sharedProps: ModalProps = {
    centered: true,
    classNames,
  };

  const footer: React.ReactNode = (
    <>
      <Button
        onClick={() => setFnOpen(false)}
        styles={{ root: { borderColor: '#ccc', color: '#171717', backgroundColor: '#fff' } }}
      >
        Cancel
      </Button>
      <Button
        type="primary"
        styles={{ root: { backgroundColor: '#171717' } }}
        onClick={() => setOpen(true)}
      >
        Submit
      </Button>
    </>
  );

  return (
    <Flex gap="middle">
      <Button onClick={() => setOpen(true)}>Open Style Modal</Button>
      <Button type="primary" onClick={() => setFnOpen(true)}>
        Open Function Modal
      </Button>
      <Modal
        {...sharedProps}
        footer={null}
        title="Custom Style Modal"
        styles={styles}
        open={modalOpen}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      >
        {sharedContent}
      </Modal>
      <Modal
        {...sharedProps}
        footer={footer}
        title="Custom Function Modal"
        styles={stylesFn}
        mask={{ enabled: true, blur: true }}
        open={modalFnOpen}
        onOk={() => setFnOpen(false)}
        onCancel={() => setFnOpen(false)}
      >
        {sharedContent}
      </Modal>
    </Flex>
  );
};

export default App;
