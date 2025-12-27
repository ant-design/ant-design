import React from 'react';
import { Button, Drawer, Flex, Modal, Switch } from 'antd';

import BreadcrumbPreview from '../../../components/breadcrumb/demo/style-class';
import InputPreview from '../../../components/input/demo/style-class';

const { _InternalPanelDoNotUseOrYouWillBeFired: InternalPanel } = Modal;
const { _InternalPanelDoNotUseOrYouWillBeFired: InternalDrawer } = Drawer;

const SwitchNode = (
  <Flex orientation="horizontal" gap="middle">
    <Switch styles={{ root: { width: 40, backgroundColor: '#F5D2D2' } }} />
    <Switch styles={{ root: { width: 40, backgroundColor: '#BDE3C3' } }} />
  </Flex>
);

const ModalNode = (
  <InternalPanel
    footer={
      <>
        <Button
          styles={{ root: { borderColor: '#ccc', color: '#171717', backgroundColor: '#fff' } }}
        >
          Cancel
        </Button>
        <Button
          type="primary"
          styles={{
            root: { backgroundColor: '#171717', boxShadow: '0 2px 0 rgba(23,23,23,0.31)' },
          }}
        >
          Submit
        </Button>
      </>
    }
    title="Custom Function Modal"
    styles={{
      container: { borderRadius: 14, border: '1px solid #ccc', padding: 0, overflow: 'hidden' },
      header: { padding: 16, margin: 0 },
      body: { padding: '0 16px' },
      footer: { padding: 10, backgroundColor: 'rgba(250,250,250, 0.8)' },
    }}
  >
    <div>🌈 Following the Ant Design specification.</div>
  </InternalPanel>
);

const DrawerNode = (
  <InternalDrawer
    title="Drawer"
    style={{ height: '100%', borderRadius: '10px 0 0 10px', overflow: 'hidden' }}
    styles={{
      header: { padding: 16 },
      body: { padding: 16 },
      footer: { padding: '16px 10px', backgroundColor: 'rgba(250,250,250, 0.8)' },
    }}
    footer={
      <Flex gap="middle" justify="flex-end">
        <Button
          styles={{ root: { borderColor: '#ccc', color: '#171717', backgroundColor: '#fff' } }}
        >
          Cancel
        </Button>
        <Button
          type="primary"
          styles={{
            root: { backgroundColor: '#171717', boxShadow: '0 2px 0 rgba(23,23,23,0.31)' },
          }}
        >
          Submit
        </Button>
      </Flex>
    }
  >
    <div>
      🌈 Following the Ant Design specification, we developed a React UI library antd, interactive
      user interfaces.
    </div>
  </InternalDrawer>
);

const h1Style: React.CSSProperties = {
  fontSize: 20,
  lineHeight: 2,
  fontWeight: 'bold',
};

const Demo: React.FC = () => {
  return (
    <Flex orientation="horizontal" gap="middle" style={{ padding: 10 }}>
      <div style={{ width: '35%' }}>
        <h1 style={h1Style}>Input</h1>
        <InputPreview />
      </div>
      <div style={{ width: '35%' }}>
        <h1 style={h1Style}>Switch</h1>
        {SwitchNode}
        <h1 style={h1Style}>Breadcrumb</h1>
        <BreadcrumbPreview />
        <h1 style={h1Style}>Modal</h1>
        {ModalNode}
      </div>
      <div style={{ width: '30%' }}>{DrawerNode}</div>
    </Flex>
  );
};

export default Demo;
