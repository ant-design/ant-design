import React from 'react';
import { Button, notification, Space, ConfigProvider } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const DefaultThemeDemo: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      message: `${type.charAt(0).toUpperCase() + type.slice(1)} Notification`,
      description:
        'This notification uses the default component tokens for background colors.',
    });
  };

  return (
    <>
      {contextHolder}
      <h4>Default Theme</h4>
      <Space>
        <Button type="primary" onClick={() => openNotificationWithIcon('success')}>
          Success
        </Button>
        <Button onClick={() => openNotificationWithIcon('info')}>Info</Button>
        <Button onClick={() => openNotificationWithIcon('warning')}>Warning</Button>
        <Button danger onClick={() => openNotificationWithIcon('error')}>
          Error
        </Button>
      </Space>
    </>
  );
};

const CustomThemeDemo: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      message: `${type.charAt(0).toUpperCase() + type.slice(1)} Notification`,
      description:
        'This notification uses custom component tokens for enhanced background colors.',
    });
  };

  return (
    <>
      {contextHolder}
      <h4>Custom Theme (Enhanced Colors)</h4>
      <Space>
        <Button type="primary" onClick={() => openNotificationWithIcon('success')}>
          Custom Success
        </Button>
        <Button onClick={() => openNotificationWithIcon('info')}>Custom Info</Button>
        <Button onClick={() => openNotificationWithIcon('warning')}>Custom Warning</Button>
        <Button danger onClick={() => openNotificationWithIcon('error')}>
          Custom Error
        </Button>
      </Space>
    </>
  );
};

const App: React.FC = () => {
  return (
    <Space direction="vertical" size="large">
      <DefaultThemeDemo />
      <ConfigProvider
        theme={{
          components: {
            Notification: {
              colorSuccessBg: '#f0f9ff', // Custom light blue for success
              colorErrorBg: '#fef2f2',   // Custom light red for error
              colorInfoBg: '#f0f0f0',    // Custom light gray for info
              colorWarningBg: '#fefce8', // Custom light yellow for warning
            },
          },
        }}
      >
        <CustomThemeDemo />
      </ConfigProvider>
    </Space>
  );
};

export default App;