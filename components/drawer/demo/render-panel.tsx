import React from 'react';
import { Drawer } from 'antd';

/** Test usage. Do not use in your production. */
const { _InternalPanelDoNotUseOrYouWillBeFired: InternalDrawer } = Drawer;

export default () => (
  <div style={{ padding: 32, background: '#e6e6e6' }}>
    <InternalDrawer title="Hello Title" style={{ height: 300 }} footer="Footer!">
      Hello Content
    </InternalDrawer>
  </div>
);
