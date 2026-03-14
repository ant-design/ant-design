import React from 'react';
import { App, Button, Space } from 'antd';

// Sub page
const Page: React.FC = () => {
  const { message, notification } = App.useApp();

  const showMessage = () => {
    message.success('Success!');
  };

  const showNotification = () => {
    notification.info({
      title: 'Notification',
      description: 'Hello, Ant Design!!',
    });
  };

  return (
    <Space wrap>
      <Button type="primary" onClick={showMessage}>
        Message for only one
      </Button>
      <Button type="primary" onClick={showNotification}>
        Notification for bottomLeft
      </Button>
    </Space>
  );
};

// Entry component
const Demo: React.FC = () => (
  <App message={{ maxCount: 1 }} notification={{ placement: 'bottomLeft' }}>
    <Page />
  </App>
);

export default Demo;
