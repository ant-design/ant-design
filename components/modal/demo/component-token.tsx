import React from 'react';
import { ConfigProvider, Modal } from 'antd';

/** Test usage. Do not use in your production. */
const { _InternalPanelDoNotUseOrYouWillBeFired: InternalPanel } = Modal;

export default () => (
  <ConfigProvider
    theme={{
      components: {
        Modal: {
          footerBg: '#f6ffed',
          contentBg: '#e6fffb',
          headerBg: '#f9f0ff',
          titleLineHeight: 3,
          titleFontSize: 12,
          titleColor: '#1d39c4',
        },
      },
    }}
  >
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
      <InternalPanel title="Hello World!" style={{ width: '100%', height: 200 }}>
        Hello World?!
      </InternalPanel>
      <ConfigProvider theme={{ token: { wireframe: true } }}>
        <InternalPanel title="Hello World!" style={{ width: '100%', height: 200 }}>
          Hello World?!
        </InternalPanel>
      </ConfigProvider>
      <InternalPanel type="success" style={{ width: 200, height: 150 }}>
        A good news!
      </InternalPanel>
      <InternalPanel title="Confirm This?" type="confirm" style={{ width: 300, height: 200 }}>
        Some descriptions.
      </InternalPanel>
    </div>
  </ConfigProvider>
);
