import React from 'react';
import { Button, notification, Space } from 'antd';
import type { GetProp, NotificationArgsProps } from 'antd';
import { createStaticStyles } from 'antd-style';

const classNames = createStaticStyles(({ css }) => ({
  root: css`
    border: 1px solid #91caff;
  `,
}));

const defaultStyles: GetProp<NotificationArgsProps, 'styles', 'Return'> = {
  root: {
    backgroundColor: '#f0f7ff',
    borderRadius: 10,
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
  },
  title: {
    color: '#0958d9',
  },
  description: {
    color: '#4b5563',
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
      },
      title: {
        color: '#cf1322',
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
    classNames: { root: classNames.root },
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
