import React from 'react';
import { Avatar, List } from 'antd';

import SemanticPreview from '../../../.dumi/components/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';
import { ListItemMetaProps } from '../Item';

const locales = {
  cn: {
    root: '根元素',
    section: '容器元素',
    title: '标题',
    description: '描述',
    avatar: '图标元素',
  },
  en: {
    root: 'Root Element',
    section: 'Container Element',
    title: 'Title Element',
    description: 'Description Element',
    avatar: 'Avatar Element',
  },
};

const data = [
  {
    title: 'Ant Design Title 1',
  },
];

const BlockList: React.FC<Readonly<ListItemMetaProps>> = (props) => {
  return (
    <div style={{ position: 'absolute', inset: 0, height: 300, margin: 20 }}>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              {...props}
              avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
              title={<a href="https://ant.design">{item.title}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </List.Item>
        )}
      />
    </div>
  );
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="List"
      height={300}
      semantics={[
        { name: 'root', desc: locale.root },
        { name: 'avatar', desc: locale.avatar },
        { name: 'section', desc: locale.section },
        { name: 'title', desc: locale.title },
        { name: 'description', desc: locale.description },
      ]}
    >
      <BlockList />
    </SemanticPreview>
  );
};

export default App;
