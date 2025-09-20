import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import type { DrawerProps } from 'antd';

const classNamesFn: DrawerProps['classNames'] = (info) => {
  console.log('classNamesFn Drawer props:', info.props);
  return {
    root: 'demo-drawer-root',
    header: 'demo-drawer-header',
    body: 'demo-drawer-body',
    footer: 'demo-drawer-footer',
    container: 'demo-drawer-container',
    wrapper: 'demo-drawer-wrapper',
    title: 'demo-drawer-title',
    mask: 'demo-drawer-mask',
    extra: 'demo-drawer-extra',
    section: 'demo-drawer-section',
    dragger: 'demo-drawer-dragger',
  };
};

const stylesFn: DrawerProps['styles'] = (info) => {
  console.log('stylesFn Drawer props:', info.props);
  return {
    mask: {
      backgroundImage: `linear-gradient(to top, #18181b 0, rgba(21, 21, 22, 0.2) 100%)`,
    },
    body: {
      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='16' height='16' fill='none'%3e%3ccircle fill='%239988f2' id='pattern-circle' cx='10' cy='10' r='3'%3e%3c/circle%3e%3c/svg%3e")`,
    },
  };
};

const Demo: React.FC = () => {
  const [drawerOpen, setOpen] = useState(false);
  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Open Drawer
      </Button>
      <Drawer
        size={'large'}
        title="Custom Drawer"
        classNames={classNamesFn}
        styles={stylesFn}
        open={drawerOpen}
        onClose={() => setOpen(false)}
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
      </Drawer>
    </>
  );
};

export default Demo;
