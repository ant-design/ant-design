import React from 'react';
import { Button, Modal, Typography } from 'antd';

/** Test usage. Do not use in your production. */
const { _InternalPanelDoNotUseOrYouWillBeFired: InternalPanel } = Modal;

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
    <InternalPanel title="Hello World!" style={{ width: '100%', height: 200 }}>
      Hello World?!
    </InternalPanel>
    <InternalPanel type="success" style={{ width: 200, height: 150 }}>
      A good news!
    </InternalPanel>
    <InternalPanel title="Confirm This?" type="confirm" style={{ width: 300, height: 200 }}>
      Some descriptions.
    </InternalPanel>
    <InternalPanel
      title="Footer Render"
      style={{ width: 520, height: 200 }}
      footer={(_, { OkBtn, CancelBtn }) => (
        <>
          <Button>Custom</Button>
          <CancelBtn />
          <OkBtn />
        </>
      )}
    >
      <Typography.Paragraph>
        Issue
        <Typography.Link href="https://github.com/ant-design/ant-design/issues/44923">
          #44923
        </Typography.Link>
      </Typography.Paragraph>
    </InternalPanel>
  </div>
);
