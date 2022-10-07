/*
 * debug: true */import React from 'react';
import { Drawer } from 'antd';

/** Test usage. Do not use in your production. */
const { _InternalPanelDoNotUseOrYouWillBeFired: InternalDrawer } = Drawer;

export default () => (
  <InternalDrawer
    title="Hello Title"
    style={{ height: 300, boxShadow: '0 0 5px red' }}
    footer="Footer!"
  >
    Hello Content
  </InternalDrawer>
);
