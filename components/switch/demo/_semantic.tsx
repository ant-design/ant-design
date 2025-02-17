import React from 'react';
import { Switch } from 'antd';

import SemanticPreview from '../../../.dumi/components/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素',
    content: '内容元素',
  },
  en: {
    root: 'Root Element',
    content: 'Content Element',
  },
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      semantics={[
        { name: 'root', desc: locale.root, version: '6.0.0' },
        { name: 'content', desc: locale.content, version: '6.0.0' },
      ]}
    >
      <Switch checkedChildren="on" unCheckedChildren="off" defaultChecked />
    </SemanticPreview>
  );
};

export default App;
