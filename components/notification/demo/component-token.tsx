import React from 'react';
import { Button, ConfigProvider, Flex, notification } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const CustomThemeDemo: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Notification`,
      description: 'This notification uses custom component tokens for enhanced background colors.',
      duration: 0,
    });
  };

  return (
    <>
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
      {contextHolder}
    </>
  );
};

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      components: {
        Notification: {
          colorSuccessBg: 'linear-gradient(30deg, #d9f7be, #f6ffed)',
          colorErrorBg: 'linear-gradient(30deg, #ffccc7, #fff1f0)',
          colorInfoBg: 'linear-gradient(30deg, #bae0ff, #e6f4ff)',
          colorWarningBg: 'linear-gradient(30deg, #ffffb8, #feffe6)',
        },
      },
    }}
  >
    <CustomThemeDemo />
  </ConfigProvider>
);

export default App;
