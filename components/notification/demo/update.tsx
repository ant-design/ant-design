import React from 'react';
import { Button, notification } from 'antd';

const key = 'updatable';

const App: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = () => {
    api.open({
      key,
      title: 'Notification Title',
      description: 'description.',
    });

    setTimeout(() => {
      api.open({
        key,
        title: 'New Title',
        description: 'New description.',
      });
    }, 1000);
  };

  return (
    <>
      {contextHolder}
      <Button type="primary" onClick={openNotification}>
        Open the notification box
      </Button>
    </>
  );
};

export default App;
