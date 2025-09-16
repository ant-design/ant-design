import React from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import type { CardProps } from 'antd';

const { Meta } = Card;

const App: React.FC = () => {
  const cardClassNames: CardProps['classNames'] = {
    header: 'custom-card-header',
    body: 'custom-card-body',
    extra: 'custom-card-extra',
    title: 'custom-card-title',
    actions: 'custom-card-actions',
    cover: 'custom-card-cover',
  };

  const cardStyles: CardProps['styles'] = {
    header: {
      backgroundColor: '#f5f5f5',
      borderBottom: '2px solid #d9d9d9',
      padding: '12px 16px',
    },
    body: {
      padding: '20px',
      backgroundColor: '#fafafa',
    },
    extra: {
      color: '#1890ff',
      fontWeight: 'bold',
    },
    title: {
      color: '#262626',
      fontSize: '18px',
      fontWeight: 600,
    },
    actions: {
      backgroundColor: '#f0f0f0',
      borderTop: '1px solid #e8e8e8',
    },
    cover: {
      borderBottom: '2px solid #e8e8e8',
    },
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Card
        style={{ width: 300 }}
        classNames={cardClassNames}
        styles={cardStyles}
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <Meta
          avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
          title="Card title"
          description="This is the description"
        />
      </Card>

      <Card
        title="Card with Custom Header"
        extra={<a href="#">More</a>}
        style={{ width: 300 }}
        classNames={cardClassNames}
        styles={cardStyles}
      >
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </div>
  );
};

export default App;
