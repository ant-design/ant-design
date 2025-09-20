import React from 'react';
import { EditOutlined, HeartOutlined, ShareAltOutlined } from '@ant-design/icons';
import { Avatar, Card, Space, Button } from 'antd';

const { Meta } = Card;

// 自定义样式卡片的 classNames 配置
const customCardClassNames = {
  root: 'custom-card-root',
  header: 'custom-card-header',
  body: 'custom-card-body',
  title: 'custom-card-title',
  extra: 'custom-card-extra',
};

// 自定义样式卡片的 styles 配置
const customCardStyles = {
  root: {
    color: 'white',
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
  },
  header: {
    background: 'rgba(255,255,255,0.1)',
    borderBottom: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '16px 16px 0 0',
  },
  title: {
    color: 'white',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  extra: {
    color: 'rgba(255,255,255,0.8)',
  },
  body: {
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '0 0 16px 16px',
  },
};

// 简洁风格卡片的 classNames 配置
const minimalCardClassNames = {
  root: 'minimal-card',
  header: 'minimal-header',
  body: 'minimal-body',
};

// 简洁风格卡片的 styles 配置
const minimalCardStyles = {
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

// 自定义样式卡片的 actions 配置
const customCardActions = [
  <HeartOutlined key="heart" style={{ color: '#ff6b6b' }} />,
  <ShareAltOutlined key="share" style={{ color: '#4ecdc4' }} />,
  <EditOutlined key="edit" style={{ color: '#45b7d1' }} />,
];

// 渲染自定义样式卡片
const renderCustomCard = () => (
  <Card
    title="自定义样式卡片"
    extra={<Button type="link">更多</Button>}
    style={{ width: 300 }}
    classNames={customCardClassNames}
    styles={customCardStyles}
    actions={customCardActions}
  >
    <Meta
      avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />}
      title="自定义样式示例"
      description="通过 classNames 和 styles 属性可以完全自定义卡片的各个部分样式"
    />
  </Card>
);

// 渲染简洁风格卡片
const renderMinimalCard = () => (
  <Card
    title="简洁风格卡片"
    style={{ width: 300 }}
    classNames={minimalCardClassNames}
    styles={minimalCardStyles}
  >
    <p>这是一个简洁风格的卡片示例，展示了如何通过语义化样式属性来定制组件外观。</p>
    <p>所有样式都通过 styles 属性进行精确控制。</p>
  </Card>
);

const App: React.FC = () => {
  return (
    <Space>
      {renderCustomCard()}
      <br />
      {renderMinimalCard()}
    </Space>
  );
};

export default App;
