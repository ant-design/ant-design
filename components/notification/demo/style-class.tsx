import React from 'react';
import { Button, Flex, Space, notification } from 'antd';
import type { ArgsProps } from '../interface';

const classNamesObject: ArgsProps['classNames'] = {
  root: 'demo-notification-root',
  title: 'demo-notification-title',
  description: 'demo-notification-description',
  actions: 'demo-notification-actions',
  icon: 'demo-notification-icon',
};

const classNamesFn: ArgsProps['classNames'] = (info) => {
  console.log(info);
  if (info.props.type === 'error') {
    return {
      root: 'demo-notification-root--error',
      title: 'demo-notification-title--error',
      actions: 'demo-notification-actions--error',
    };
  }
  if (info.props.type === 'success') {
    return {
      root: 'demo-notification-root--success',
      title: 'demo-notification-title--success',
      actions: 'demo-notification-actions--success',
    };
  }
  return {
    root: 'demo-notification-root--default',
    title: 'demo-notification-title--default',
    actions: 'demo-notification-actions--default',
  };
};

const stylesObject: ArgsProps['styles'] = {
  root: { borderWidth: 2, borderStyle: 'dashed' },
  title: { fontStyle: 'italic', color: '#1890ff' },
  description: { fontSize: '14px' },
  actions: { marginTop: '8px' },
  icon: { opacity: 0.85 },
};

const stylesFn: ArgsProps['styles'] = (info) => {
  console.log(info);
  if (info.props.type === 'error') {
    return {
      root: {
        backgroundColor: '#fff2f0',
        borderColor: '#ff4d4f',
        borderWidth: 2,
      },
      title: { color: '#ff4d4f', fontWeight: 'bold' },
      actions: { marginTop: '12px' },
    };
  }
  if (info.props.type === 'success') {
    return {
      root: {
        backgroundColor: '#f6ffed',
        borderColor: '#52c41a',
        borderWidth: 2,
      },
      title: { color: '#52c41a', fontWeight: 'bold' },
      actions: { marginTop: '12px' },
    };
  }
  return {
    root: {
      backgroundColor: '#f0f8ff',
      borderColor: '#1890ff',
      borderWidth: 2,
    },
    title: { color: '#1890ff', fontWeight: 'normal' },
    actions: { marginTop: '12px' },
  };
};

const App: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();

  const openClassNamesObject = () => {
    api.info({
      title: 'classNames Object',
      description: 'This notification uses object classNames.',
      actions: (
        <Button size="small" type="primary">
          Action
        </Button>
      ),
      classNames: classNamesObject,
      duration: null,
    });
  };

  const openClassNamesFunction = () => {
    api.error({
      title: 'classNames Function',
      description: 'This notification uses function classNames based on type.',
      actions: (
        <Button size="small" type="default">
          Retry
        </Button>
      ),
      classNames: classNamesFn,
      duration: null,
    });
  };

  const openStylesObject = () => {
    api.info({
      title: 'styles Object',
      description: 'This notification uses object styles.',
      actions: (
        <Button size="small" type="link">
          View Details
        </Button>
      ),
      styles: stylesObject,
      duration: null,
    });
  };

  const openStylesFunction = () => {
    api.success({
      title: 'styles Function',
      description: 'This notification uses function styles based on type.',
      actions: (
        <Button size="small" type="primary">
          Continue
        </Button>
      ),
      styles: stylesFn,
      duration: null,
    });
  };

  return (
    <>
      {contextHolder}
      <Space size={[8, 16]} wrap>
        <Flex gap="small">
          <Button type="default" onClick={openClassNamesObject}>
            classNames Object
          </Button>
          <Button type="primary" onClick={openClassNamesFunction}>
            classNames Function
          </Button>
        </Flex>
        <Flex gap="small">
          <Button type="default" onClick={openStylesObject}>
            styles Object
          </Button>
          <Button type="primary" onClick={openStylesFunction}>
            styles Function
          </Button>
        </Flex>
      </Space>
    </>
  );
};

export default App;
