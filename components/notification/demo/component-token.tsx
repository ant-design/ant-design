import React from 'react';
import { Button, ConfigProvider, notification } from 'antd';

/** Test usage. Do not use in your production. */
const { _InternalPanelDoNotUseOrYouWillBeFired: InternalPanel } = notification;

export default () => (
  <ConfigProvider
    theme={{
      components: {
        Notification: {
          componentWidth: 200,
          componentBg: '#F0F0F0',
          componentPaddingInlineStart: 10,
          componentPaddingInlineEnd: 20,
          componentPaddingBlockStart: 30,
          componentPaddingBlockEnd: 40,
          componentMarginBottom: 100,
          componentMarginInlineEnd: 80,
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
