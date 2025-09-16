import React from 'react';
import { Alert, Button, Space } from 'antd';
import type { AlertProps } from 'antd';

const App: React.FC = () => {
  const customClassNames: AlertProps['classNames'] = {
    root: 'custom-alert-root',
    icon: 'custom-alert-icon',
    section: 'custom-alert-section',
    title: 'custom-alert-title',
    description: 'custom-alert-description',
    actions: 'custom-alert-actions',
  };

  const customStyles: AlertProps['styles'] = {
    root: {
      border: '2px solid #1890ff',
      borderRadius: '8px',
      backgroundColor: '#f0f8ff',
    },
    icon: {
      color: '#1890ff',
      fontSize: '18px',
    },
    section: {
      padding: '4px 8px',
    },
    title: {
      color: '#1890ff',
      fontWeight: 'bold',
    },
    description: {
      color: '#666',
      fontStyle: 'italic',
    },
    actions: {
      gap: '8px',
    },
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Alert
        title="Custom Styled Alert"
        description="This alert demonstrates custom classNames and styles usage"
        type="info"
        showIcon
        classNames={customClassNames}
        styles={customStyles}
        action={
          <Space>
            <Button size="small" type="primary">
              Accept
            </Button>
            <Button size="small" danger ghost>
              Decline
            </Button>
          </Space>
        }
      />

      <Alert
        title="Success Alert with Custom Styles"
        description="Another example with different styling"
        type="success"
        showIcon
        classNames={{
          root: 'success-alert',
          icon: 'success-icon',
          title: 'success-title',
        }}
        styles={{
          root: {
            backgroundColor: '#f6ffed',
            border: '1px solid #b7eb8f',
          },
          icon: {
            color: '#52c41a',
          },
          title: {
            color: '#389e0d',
          },
        }}
      />
    </Space>
  );
};

export default App;
