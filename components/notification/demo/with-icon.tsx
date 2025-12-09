import React from 'react';
import { Button, notification, Flex } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const App: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      message: 'Notification Title',
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
  };

  return (
    <>
      {contextHolder}
      <Flex gap={8} wrap="wrap">
        <Button
          color="green"
          variant="outlined"
          onClick={() => openNotificationWithIcon('success')}
        >
          Success
        </Button>
        <Button color="blue" variant="outlined" onClick={() => openNotificationWithIcon('info')}>
          Info
        </Button>
        <Button
          color="yellow"
          variant="outlined"
          onClick={() => openNotificationWithIcon('warning')}
        >
          Warning
        </Button>
        <Button color="red" variant="outlined" onClick={() => openNotificationWithIcon('error')}>
          Error
        </Button>
      </Flex>
    </>
  );
};

export default App;
