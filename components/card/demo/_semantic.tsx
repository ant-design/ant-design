import React from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';

import useLocale from '../../../.dumi/hooks/useLocale';
import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';

const { Meta } = Card;

const locales = {
  cn: {
    header: '卡片头部区域',
    body: '卡片主体内容区域',
    extra: '头部右侧额外内容区域',
    title: '标题区域',
    actions: '底部操作区域',
    cover: '封面图片区域',
  },
  en: {
    header: 'Card header area',
    body: 'Card main content area',
    extra: 'Extra content area on the right side of header',
    title: 'Title area',
    actions: 'Bottom actions area',
    cover: 'Cover image area',
  },
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Card"
      semantics={[
        { name: 'header', desc: locale.header, version: '5.14.0' },
        { name: 'body', desc: locale.body, version: '5.14.0' },
        { name: 'extra', desc: locale.extra, version: '5.14.0' },
        { name: 'title', desc: locale.title, version: '5.14.0' },
        { name: 'actions', desc: locale.actions, version: '5.14.0' },
        { name: 'cover', desc: locale.cover, version: '5.14.0' },
      ]}
    >
      <Card
        style={{ width: 300 }}
        title="Card Title"
        extra={<a href="#">More</a>}
        cover={
          <img
            draggable={false}
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
    </SemanticPreview>
  );
};

export default App;
