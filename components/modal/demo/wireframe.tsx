import React from 'react';
import { ConfigProvider, Modal } from 'antd';

/** Test usage. Do not use in your production. */
const { _InternalPanelDoNotUseOrYouWillBeFired: InternalPanel } = Modal;

export default () => (
  <ConfigProvider theme={{ token: { wireframe: true } }}>
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
      <InternalPanel title="Hello World!" style={{ width: '100%' }}>
        Hello World?!
      </InternalPanel>
      <InternalPanel type="success" style={{ width: 200 }}>
        A good news!
      </InternalPanel>
      <InternalPanel title="Confirm This?" type="confirm" style={{ width: 300 }}>
        Some descriptions.
      </InternalPanel>
    </div>
  </ConfigProvider>
);
