import React from 'react';
import { Transfer } from 'antd';

import SemanticPreview from '../../../.dumi/components/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素',
    content: '内容元素',
    icon: '图标元素',
  },
  en: {
    root: 'Root element',
    content: 'Content element',
    icon: 'Icon element',
  },
};

const mockData = Array.from({ length: 20 }).map((_, i) => ({
  key: i,
  title: `content ${i + 1}`,
}));

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Button"
      semantics={[
        { name: 'root', desc: locale.root, version: '6.0.0' },
        { name: 'icon', desc: locale.icon, version: '5.5.0' },
        { name: 'content', desc: locale.content, version: '6.0.0' },
      ]}
    >
      <Transfer
        dataSource={mockData}
        selectedKeys={[]}
        targetKeys={[3, 9]}
        render={(item) => item.title}
      />
    </SemanticPreview>
  );
};

export default App;
