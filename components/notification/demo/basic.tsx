import React, { useLayoutEffect } from 'react';
import { App, Button, ConfigProvider, notification } from 'antd';

const openNotification = () => {
  notification.open({
    message: 'Notification Title',
    description:
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
};
const Demo: React.FC = () => {
  useLayoutEffect(() => {
    ConfigProvider.config({
      container: (children) => (
        <ConfigProvider prefixCls="test" iconPrefixCls="icon">
          <App notification={{ maxCount: 1 }}>{children}</App>
        </ConfigProvider>
      ),
    });
  }, []);
  return (
    <Button type="primary" onClick={openNotification}>
      Open the notification box
    </Button>
  );
};

export default Demo;
