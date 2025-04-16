import React from 'react';
import { Progress } from 'antd';

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

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Progress"
      semantics={[
        { name: 'root', desc: locale.root },
        { name: 'icon', desc: locale.icon },
        { name: 'content', desc: locale.content },
      ]}
    >
      <Progress percent={30} />
    </SemanticPreview>
  );
};

export default App;
