import React from 'react';
import { Button, Divider, notification, Space } from 'antd';

const App: React.FC = () => {
  const [api, contextHolder] = notification.useNotification({ stack: { threshold: 5 } });
  const [loading, setLoading] = React.useState(false);

  const openNotification = (delay?: number) => {
    api.info({
      message: `Notification Title`,
      description: 'Notification description.',
      delay,
    });
  };

  return (
    <Space>
      {contextHolder}
      <Divider />
      <Button
        type="primary"
        onClick={() => {
          for (let i = 0; i < 5; i++) {
            openNotification();
          }
        }}
      >
        Poor interaction effect
      </Button>
      <Button
        type="primary"
        loading={loading}
        onClick={() => {
          setLoading(true);
          for (let i = 0; i < 5; i++) {
            openNotification(300 * i);
          }
          setTimeout(() => setLoading(false), 4 * 300);
        }}
      >
        Good interaction effect
      </Button>
    </Space>
  );
};

export default App;
