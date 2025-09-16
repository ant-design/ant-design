import React from 'react';
import { Button, Result, Space } from 'antd';
import type { ResultProps } from 'antd';

const App: React.FC = () => {
  const customClassNames: ResultProps['classNames'] = {
    root: 'custom-result-root',
    icon: 'custom-result-icon',
    title: 'custom-result-title',
    subTitle: 'custom-result-subtitle',
    body: 'custom-result-body',
    extra: 'custom-result-extra',
  };

  const customStyles: ResultProps['styles'] = {
    root: {
      border: '2px solid #1890ff',
      borderRadius: '12px',
      backgroundColor: '#f0f8ff',
      padding: '24px',
    },
    icon: {
      color: '#1890ff',
      fontSize: '48px',
    },
    title: {
      color: '#1890ff',
      fontWeight: 'bold',
      fontSize: '24px',
    },
    subTitle: {
      color: '#666',
      fontStyle: 'italic',
      fontSize: '16px',
    },
    body: {
      backgroundColor: '#fafafa',
      padding: '16px',
      borderRadius: '8px',
      margin: '16px 0',
    },
    extra: {
      gap: '12px',
    },
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">
      <Result
        status="success"
        title="Custom Styled Success Result"
        subTitle="This result demonstrates custom classNames and styles usage with success status"
        classNames={customClassNames}
        styles={customStyles}
        extra={
          <Space>
            <Button type="primary">Go Console</Button>
            <Button>Buy Again</Button>
          </Space>
        }
      >
        <div>The content of the result with custom body styling.</div>
      </Result>

      <Result
        status="info"
        title="Info Result with Custom Styles"
        subTitle="Another example with different styling approach"
        classNames={{
          root: 'info-result',
          icon: 'info-icon',
          title: 'info-title',
        }}
        styles={{
          root: {
            backgroundColor: '#e6f7ff',
            border: '1px solid #91d5ff',
            borderRadius: '8px',
          },
          icon: {
            color: '#1890ff',
          },
          title: {
            color: '#0050b3',
          },
        }}
        extra={<Button type="primary">Action</Button>}
      />
    </Space>
  );
};

export default App;
