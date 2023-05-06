import React from 'react';
import { Button, ConfigProvider, notification } from 'antd';

/** Test usage. Do not use in your production. */
const { _InternalPanelDoNotUseOrYouWillBeFired: InternalPanel } = notification;

export default () => (
  <ConfigProvider
    theme={{
      components: {
        Notification: {
          width: 200,
          background: '#F0F0F0',
          paddingInlineStart: 10,
          paddingInlineEnd: 20,
          paddingBlockStart: 30,
          paddingBlockEnd: 40,
          marginBottom: 100,
          marginInlineEnd: 80,
        },
      },
    }}
  >
    <InternalPanel
      message="Hello World!"
      description="Hello World?"
      type="success"
      btn={
        <Button type="primary" size="small">
          My Button
        </Button>
      }
    />
  </ConfigProvider>
);
