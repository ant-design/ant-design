import React, { useState } from 'react';
import { Button, Drawer, Flex } from 'antd';
import type { DrawerProps, DrawerSemanticType } from 'antd';
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

const styles: DrawerProps['styles'] = {
  mask: {
    backgroundImage: `linear-gradient(to top, #18181b 0, rgba(21, 21, 22, 0.2) 100%)`,
  },
};

const stylesFn: DrawerProps['styles'] = (info): DrawerSemanticType['styles'] => {
  if (info.props.footer) {
    return {
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
};

const App: React.FC = () => {
  const [drawerOpen, setOpen] = useState(false);
  const [drawerFnOpen, setFnOpen] = useState(false);

  const sharedProps: DrawerProps = {
    classNames,
    size: 500,
  };

  const footer: React.ReactNode = (
    <Flex gap="middle" justify="flex-end">
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
    </Flex>
  );

  return (
    <Flex gap="middle">
      <Button onClick={() => setOpen(true)}>Open Style Drawer</Button>
      <Button type="primary" onClick={() => setFnOpen(true)}>
        Open Function Drawer
      </Button>
      <Drawer
        {...sharedProps}
        footer={null}
        title="Custom Style Drawer"
        styles={styles}
        open={drawerOpen}
        onClose={() => setOpen(false)}
      >
        {sharedContent}
      </Drawer>
      <Drawer
        {...sharedProps}
        footer={footer}
        title="Custom Function drawer"
        styles={stylesFn}
        mask={{ enabled: true, blur: true }}
        open={drawerFnOpen}
        onClose={() => setFnOpen(false)}
      >
        {sharedContent}
      </Drawer>
    </Flex>
  );
};

export default App;
