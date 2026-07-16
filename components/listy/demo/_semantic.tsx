import React from 'react';
import { Listy } from 'antd';

import useLocale from '../../../.dumi/hooks/useLocale';
import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';

const locales = {
  cn: {
    root: '根元素，即滚动容器，设置字体与相对定位',
    item: '条目元素，设置内间距、分割线与悬浮背景',
    groupHeader: '分组标题元素，设置吸顶定位与背景色',
  },
  en: {
    root: 'Root element, the scroll container, with font and relative positioning',
    item: 'Item element, with padding, split line and hover background',
    groupHeader: 'Group header element, with sticky positioning and background color',
  },
};

interface User {
  id: number;
  name: string;
  team: string;
}

const users: User[] = [
  { id: 0, name: 'Olivia', team: 'Design' },
  { id: 1, name: 'Liam', team: 'Design' },
  { id: 2, name: 'Emma', team: 'Design' },
  { id: 3, name: 'Noah', team: 'Engineering' },
  { id: 4, name: 'Ava', team: 'Engineering' },
  { id: 5, name: 'Ethan', team: 'Engineering' },
];

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Listy"
      semantics={[
        { name: 'root', desc: locale.root },
        { name: 'item', desc: locale.item },
        { name: 'groupHeader', desc: locale.groupHeader },
      ]}
    >
      <Listy<User, string>
        items={users}
        rowKey="id"
        group={{ key: (user) => user.team, title: (team) => team }}
        itemRender={(user) => user.name}
        style={{ width: '100%' }}
      />
    </SemanticPreview>
  );
};

export default App;
