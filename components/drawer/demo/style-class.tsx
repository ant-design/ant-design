import React, { useState } from 'react';
import { Button, Drawer, Flex } from 'antd';
import type { DrawerProps, FlexProps } from 'antd';
import { createStyles } from 'antd-style';

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

const useStyles = createStyles(() => ({
  container: {
    borderRadius: 10,
    padding: 10,
  },
}));

const styles: DrawerProps['styles'] = {
  mask: {
    backgroundImage: `linear-gradient(to top, #18181b 0, rgba(21, 21, 22, 0.2) 100%)`,
  },
};

const stylesFn: DrawerProps['styles'] = (info) => {
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
    } satisfies DrawerProps['styles'];
  }
  return {};
};

const App: React.FC = () => {
  const [drawerOpen, setOpen] = useState(false);
  const [drawerFnOpen, setFnOpen] = useState(false);
  const { styles: classNames } = useStyles();

  const sharedProps: DrawerProps = {
    classNames,
    size: 500,
  };

  const renderFooter = (config: FlexProps): React.ReactNode => {
    return (
      <Flex {...config}>
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
  };

  return (
    <Flex gap="middle">
      <Button onClick={() => setOpen(true)}>Open Style Drawer</Button>
      <Button type="primary" onClick={() => setFnOpen(true)}>
        Open Function Drawer
      </Button>
      <Drawer
        {...sharedProps}
        placement="bottom"
        closeIcon={null}
        footer={renderFooter({ vertical: true, gap: 16 })}
        size={450}
        title="Custom Style Drawer"
        styles={{
          ...styles,
          section: { borderRadius: '10px 10px 0 0', display: 'flex', alignItems: 'center' },
          footer: { borderTop: 'none', width: 600 },
          body: { width: 600, padding: 20 },
        }}
        open={drawerOpen}
        onClose={() => setOpen(false)}
      >
        {sharedContent}
      </Drawer>
      <Drawer
        {...sharedProps}
        footer={renderFooter({ gap: 'middle', justify: 'flex-end' })}
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
