import React from 'react';
import { Button, notification, ConfigProvider } from 'antd';

const App: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    api.open({
      message: 'Customize progress bar color',
      description: 'You can use component token to customize the progress bar color',
      showProgress: true,
      duration: 20,
    });
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Notification: {
            notificationProgressBg: 'linear-gradient(135deg, #ff9a9e, #fad0c4)',
          },
        },
      }}
    >
      {contextHolder}
      <Button type="primary" onClick={openNotification}>
        Show custom progress color
      </Button>
    </ConfigProvider>
  );
};

export default App;
