import React from 'react';
import { App, Button } from 'antd';

// Sub page
const MyPage = () => {
  const { notification } = App.useApp();

  const showNotification = () => {
    notification.info({
      message: `Notification topLeft`,
      description: 'Hello, Ant Design!!',
      placement: 'topLeft',
    });
  };

  return (
    <Button type="primary" onClick={showNotification}>
      Open notification
    </Button>
  );
};

// Entry component
export default () => (
  <App>
    <MyPage />
  </App>
);
