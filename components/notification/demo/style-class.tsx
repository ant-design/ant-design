import React from 'react';
import { Button, notification, Space } from 'antd';
import type { NotificationArgsProps } from 'antd';
import { createStyles } from 'antd-style';

const useStyle = createStyles(({ css }) => ({
  root: css`
    border: 2px dashed #ccc;
  `,
}));

const styleFn: NotificationArgsProps['styles'] = ({ props }) => {
  if (props.type === 'error') {
    return {
      root: {
        backgroundColor: `rgba(255, 200, 200, 0.3)`,
      },
    } satisfies NotificationArgsProps['styles'];
  }
  return {};
};

const App: React.FC = () => {
  const { styles } = useStyle();
  const [api, contextHolder] = notification.useNotification();

  const sharedProps: NotificationArgsProps = {
    title: 'Notification Title',
    description: 'This is a notification description.',
    duration: false,
    classNames: { root: styles.root },
  };

  const openDefault = () => {
    api.info({
      ...sharedProps,
      styles: { root: { borderRadius: 8 } },
    });
  };

  const openError = () => {
    api.error({
      ...sharedProps,
      type: 'error',
      styles: styleFn,
    });
  };

  return (
    <>
      {contextHolder}
      <Space>
        <Button type="primary" onClick={openDefault}>
          Default Notification
        </Button>
        <Button onClick={openError}>Error Notification</Button>
      </Space>
    </>
  );
};

export default App;
