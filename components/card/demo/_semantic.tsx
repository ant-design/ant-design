import React from 'react';

import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';

const { Meta } = Card;

const locales = {
  cn: {
    header: '设置卡片头部区域',
    body: '设置卡片内容区域',
    extra: '设置卡片右上角的操作区域',
    title: '设置卡片标题',
    actions: '设置卡片底部操作组',
    cover: '设置标题封面',
  },
  en: {
    header: 'set `header` of card',
    body: 'set `body` of card',
    extra: 'set `extra` of card',
    title: 'set `title` of card',
    actions: 'set `actions` of card',
    cover: 'set `cover` of card',
  },
};

const BlockCard: React.FC<React.PropsWithChildren> = (props) => {
  const divRef = React.useRef<HTMLDivElement>(null);

  return (
    <div ref={divRef} style={{ position: 'absolute', inset: 0 }}>
      <Card
        {...props}
        title="Card title"
        extra="More"
        style={{ width: 300 }}
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
      />
    </div>
  );
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Card"
      semantics={[
        { name: 'header', desc: locale.header, version: '5.14.0' },
        { name: 'title', desc: locale.title, version: '5.14.0' },
        { name: 'extra', desc: locale.extra, version: '5.14.0' },
        { name: 'cover', desc: locale.cover, version: '5.14.0' },
        { name: 'body', desc: locale.body, version: '5.14.0' },
        { name: 'actions', desc: locale.actions, version: '5.14.0' },
      ]}
    >
      <BlockCard>
        <Meta
          avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
          title="Card Meta title"
          description="This is the description"
        />
      </BlockCard>
    </SemanticPreview>
  );
};

export default App;
