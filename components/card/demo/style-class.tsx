import React from 'react';
import { EditOutlined, HeartOutlined, ShareAltOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Space } from 'antd';
import type { CardProps } from 'antd';
import { createStyles } from 'antd-style';

const { Meta } = Card;

const useStyles = createStyles(({ token }) => ({
  root: {
    maxWidth: 800,
    backgroundColor: token.colorBgContainer,
    borderRadius: token.borderRadius,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
}));

// 自定义样式卡片的 actions 配置
const customCardActions = [
  <HeartOutlined key="heart" style={{ color: '#ff6b6b' }} />,
  <ShareAltOutlined key="share" style={{ color: '#4ecdc4' }} />,
  <EditOutlined key="edit" style={{ color: '#45b7d1' }} />,
];

const App: React.FC = () => {
  const { styles: classNames } = useStyles();
  const stylesObject: CardProps['styles'] = {
    root: {
      border: 'none',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      borderRadius: '8px',
    },
    header: {
      borderBottom: 'none',
      paddingBottom: '8px',
    },
    title: {
      fontSize: '16px',
      fontWeight: '500',
      color: '#262626',
    },
    body: {
      paddingTop: '0',
    },
  };
  return (
    <Space orientation="vertical">
      <Space>
        <Card
          title="Normal card"
          extra={<Button type="link">More</Button>}
          style={{ width: 300 }}
          actions={customCardActions}
        >
          <Meta
            avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />}
            title="Card title"
            description="This is the description"
          />
        </Card>
        <Card
          title="Semantic card"
          extra={<Button type="link">More</Button>}
          style={{ width: 300 }}
          classNames={classNames}
          styles={stylesObject}
          actions={customCardActions}
        >
          <Meta
            avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />}
            title="Card title"
            description="This is the description"
          />
        </Card>
      </Space>
      <Space>
        <Card title="Normal card" style={{ width: 300 }}>
          <p>This is the description</p>
        </Card>
        <Card
          title="Semantic card"
          style={{ width: 300 }}
          classNames={classNames}
          styles={stylesObject}
        >
          <p>This is the description</p>
        </Card>
      </Space>
    </Space>
  );
};

export default App;
