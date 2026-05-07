import React from 'react';
import { Button, notification, Space } from 'antd';
import type { GetProp, NotificationArgsProps } from 'antd';

const defaultStyles: GetProp<NotificationArgsProps, 'styles', 'Return'> = {
  root: {
    backgroundColor: '#f6ffed',
    border: '2px solid #95de64',
    borderRadius: 16,
    boxShadow: '4px 4px 0 #d9f7be',
  },
  icon: {
    color: '#237804',
  },
  title: {
    color: '#237804',
    fontWeight: 600,
  },
  description: {
    color: '#3f6600',
  },
};

const styleFn: NotificationArgsProps['styles'] = ({
  props,
}): GetProp<NotificationArgsProps, 'styles', 'Return'> => {
  if (props.type === 'error') {
    return {
      ...defaultStyles,
      root: {
        ...defaultStyles.root,
        backgroundColor: '#fff2f0',
        borderColor: '#ffccc7',
        boxShadow: '4px 4px 0 #ffccc7',
      },
      icon: {
        color: '#cf1322',
      },
      title: {
        color: '#cf1322',
      },
      description: {
        color: '#5c0011',
      },
    };
  }
  return defaultStyles;
};

const App: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();

  const sharedProps: NotificationArgsProps = {
    title: 'Notification Title',
    description: 'This is a notification description.',
    duration: false,
  };

  const openDefault = () => {
    api.info({
      ...sharedProps,
      styles: defaultStyles,
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
