import React from 'react';
import { Button, notification } from 'antd';

/** Test usage. Do not use in your production. */
const { _InternalPanelDoNotUseOrYouWillBeFired: InternalPanel } = notification;

const Demo: React.FC = () => (
  <InternalPanel
    title="Hello World!"
    description="Hello World?"
    type="success"
    actions={
      <Button type="primary" size="small">
        My Button
      </Button>
    }
  />
);

export default Demo;
