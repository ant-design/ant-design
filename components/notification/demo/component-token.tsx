import React from 'react';
import { Button, notification, Space, ConfigProvider } from 'antd';

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
      {contextHolder}
    </>
  );
};

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      components: {
        Notification: {
          colorSuccessBg: '#d9f7be', // Custom light green for success
          colorErrorBg: '#ffccc7', // Custom light red for error
          colorInfoBg: '#bae0ff', // Custom light blue for info
          colorWarningBg: '#ffffb8', // Custom light yellow for warning
        },
      },
    }}
  >
    <CustomThemeDemo />
  </ConfigProvider>
);

export default App;
