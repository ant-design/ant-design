import React from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Space } from 'antd';

const { Meta } = Card;

// Object configuration for custom styled card
const objectStyleConfig = {
  classNames: {
    body: 'custom-card-body',
    extra: 'custom-card-extra',
    header: 'custom-card-header',
    root: 'custom-card-root',
    title: 'custom-card-title',
  },
  styles: {
    body: {
      background: 'rgba(255,255,255,0.05)',
      borderRadius: '0 0 16px 16px',
    },
    extra: {
      color: 'rgba(255,255,255,0.8)',
    },
    header: {
      background: 'rgba(255,255,255,0.1)',
      borderBottom: '1px solid rgba(255,255,255,0.2)',
      borderRadius: '16px 16px 0 0',
    },
    root: {
      borderRadius: '16px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
      color: 'white',
    },
    title: {
      color: 'white',
      fontSize: '18px',
      fontWeight: 'bold',
    },
  },
};

// Function configuration for minimal styled card
const getFunctionStyleConfig = () => ({
  classNames: {
    body: 'minimal-card-body',
    header: 'minimal-card-header',
    root: 'minimal-card-root',
  },
  styles: {
    body: {
      paddingTop: '0',
    },
    header: {
      borderBottom: 'none',
      paddingBottom: '8px',
    },
    root: {
      border: 'none',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    },
    title: {
      color: '#262626',
      fontSize: '16px',
      fontWeight: '500',
    },
  },
});

const App: React.FC = () => {
  const functionConfig = getFunctionStyleConfig();

  return (
    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
      <Card
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
        classNames={objectStyleConfig.classNames}
        extra={<a href="#">More</a>}
        style={{ width: 300 }}
        styles={objectStyleConfig.styles}
        title="Card title"
      >
        <Meta
          avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
          description="Card with object style configuration"
          title="Card meta title"
        />
      </Card>
      <Card
        classNames={functionConfig.classNames}
        style={{ width: 300 }}
        styles={functionConfig.styles}
        title="Card title"
      >
        <p>Card with function style configuration</p>
        <p>Demonstrates semantic styling approach</p>
      </Card>
    </Space>
  );
};

export default App;
