import React from 'react';
import { Modal } from 'antd';

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
  </div>
);
