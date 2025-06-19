import React from 'react';
import { Calendar } from 'antd';

import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素',
    header: '头部元素',
    body: '主体元素',
    content: '内容元素',
    item: '条目元素',
  },
  en: {
    root: 'Root element',
    header: 'Header element',
    body: 'Body element',
    content: 'Content element',
    item: 'Item element',
  },
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Calendar"
      semantics={[
        { name: 'root', desc: locale.root, version: '6.0.0' },
        { name: 'header', desc: locale.header, version: '6.0.0' },
        { name: 'body', desc: locale.body, version: '6.0.0' },
        { name: 'content', desc: locale.content, version: '6.0.0' },
        { name: 'item', desc: locale.item, version: '6.0.0' },
      ]}
    >
      <Calendar />
    </SemanticPreview>
  );
};

export default App;
