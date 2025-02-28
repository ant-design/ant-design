import React from 'react';
import { message } from 'antd';

import SemanticPreview from '../../../.dumi/components/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const { _InternalPanelDoNotUseOrYouWillBeFired: InternalPanel } = message;

const locales = {
  cn: {
    root: '根元素',
    icon: '图标元素',
    content: '内容元素',
  },
  en: {
    root: 'Root element',
    icon: 'Icon element',
    content: 'Content element',
  },
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      semantics={[
        { name: 'root', desc: locale.root, version: '6.0.0' },
        { name: 'icon', desc: locale.icon, version: '6.0.0' },
        { name: 'content', desc: locale.content, version: '6.0.0' },
      ]}
    >
      <InternalPanel type="success" content="Hello, Ant Design!" />
    </SemanticPreview>
  );
};

export default App;
