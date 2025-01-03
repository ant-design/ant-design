import React from 'react';
import { Avatar, Card } from 'antd';

import SemanticPreview from '../../../.dumi/components/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const { Meta } = Card;

const locales = {
  cn: {
    root: '设置元信息根元素',
    detail: '设置元信息详情',
    avatar: '设置元信息图标',
    title: '设置元信息标题',
    description: '设置元信息描述',
  },
  en: {
    root: 'set `root` of Card.Meta',
    detail: 'set `detail` of Card.Meta',
    avatar: 'set `avatar` of Card.Meta',
    title: 'set `title` of Card.Meta',
    description: 'set `description` of Card.Meta',
  },
};

const BlockCard: React.FC<React.PropsWithChildren> = (props) => {
  const divRef = React.useRef<HTMLDivElement>(null);

  return (
    <div ref={divRef} style={{ position: 'absolute', inset: 0 }}>
      <Card style={{ width: 300 }}>
        <Meta
          {...props}
          avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
          title="Card Meta title"
          description="This is the description"
        />
      </Card>
    </div>
  );
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      semantics={[
        { name: 'root', desc: locale.root, version: '5.23.0' },
        { name: 'detail', desc: locale.detail, version: '5.23.0' },
        { name: 'avatar', desc: locale.avatar, version: '5.23.0' },
        { name: 'title', desc: locale.title, version: '5.23.0' },
        { name: 'description', desc: locale.description, version: '5.23.0' },
      ]}
    >
      <BlockCard />
    </SemanticPreview>
  );
};

export default App;
