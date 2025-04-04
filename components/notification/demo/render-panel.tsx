import React from 'react';
import { Button, notification } from 'antd';

/** Test usage. Do not use in your production. */
const { _InternalPanelDoNotUseOrYouWillBeFired: InternalPanel } = notification;

export default () => (
  <InternalPanel
    message="Hello World!"
    description="Hello World?"
    type="success"
    actions={
      <Button type="primary" size="small">
        My Button
      </Button>
    }
  />
);
