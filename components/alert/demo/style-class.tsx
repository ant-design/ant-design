import React from 'react';
import { Alert, Button, Flex, Space } from 'antd';
import type { AlertProps } from 'antd';

const classNamesObject: AlertProps['classNames'] = {
  root: 'demo-alert-root',
  icon: 'demo-alert-icon',
  section: 'demo-alert-section',
  title: 'demo-alert-title',
  description: 'demo-alert-description',
  actions: 'demo-alert-actions',
};

const classNamesFn: AlertProps['classNames'] = (info) => {
  if (info.props.type === 'error') {
    return { root: 'demo-alert-root--error' };
  }
  return { root: 'demo-alert-root--default' };
};

const stylesObject: AlertProps['styles'] = {
  root: { borderWidth: 2, borderStyle: 'dashed' },
  icon: { fontSize: 18 },
  section: { padding: '8px 12px' },
  title: { fontWeight: 'bold' },
  description: { fontStyle: 'italic' },
  actions: { marginTop: 8 },
};

const stylesFn: AlertProps['styles'] = (info) => {
  if (info.props.type === 'success') {
    return {
      root: { backgroundColor: '#f6ffed', borderColor: '#b7eb8f' },
      icon: { color: '#52c41a' },
    };
  }
  return {
    root: { backgroundColor: '#fff7e6', borderColor: '#ffd591' },
    icon: { color: '#fa8c16' },
  };
};

const App: React.FC = () => (
  <Space size={[8, 16]} wrap direction="vertical">
    <Flex gap="small" vertical>
      <Alert
        title="classNames Object"
        description="This alert uses classNames object to customize styles"
        type="info"
        showIcon
        classNames={classNamesObject}
        action={
          <Button size="small" type="text">
            Action
          </Button>
        }
      />
      <Alert
        title="classNames Function"
        description="This alert uses classNames function based on props"
        type="error"
        showIcon
        classNames={classNamesFn}
      />
    </Flex>
    <Flex gap="small" vertical>
      <Alert
        title="styles Object"
        description="This alert uses styles object to customize appearance"
        type="warning"
        showIcon
        styles={stylesObject}
        action={
          <Button size="small" type="primary">
            Confirm
          </Button>
        }
      />
      <Alert
        title="styles Function"
        description="This alert uses styles function based on props"
        type="success"
        showIcon
        styles={stylesFn}
      />
    </Flex>
  </Space>
);

export default App;
