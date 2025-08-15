import React from 'react';
import { Button, notification, Space, ConfigProvider } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const App: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      message: `${type.charAt(0).toUpperCase() + type.slice(1)} Notification`,
      description:
        'This notification shows the new component token support for different background colors. Each type now has its own background color token.',
    });
  };

  return (
    <>
      {contextHolder}
      <Space direction="vertical" size="large">
        <div>
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
        </div>

        <div>
          <h4>Custom Theme (Enhanced Colors)</h4>
          <ConfigProvider
            theme={{
              components: {
                Notification: {
                  colorSuccessBgElevated: '#f0f9ff', // Custom light blue for success
                  colorErrorBgElevated: '#fef2f2',   // Custom light red for error
                  colorInfoBgElevated: '#f0f0f0',    // Custom light gray for info
                  colorWarningBgElevated: '#fefce8', // Custom light yellow for warning
                },
              },
            }}
          >
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
          </ConfigProvider>
        </div>
      </Space>
    </>
  );
};

export default App;