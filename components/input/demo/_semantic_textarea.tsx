import React from 'react';
import { Input } from 'antd';

import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    textarea: '输入框元素',
    count: '文字计数元素',
  },
  en: {
    textarea: 'textarea element',
    count: 'count element',
  },
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="TextArea"
      semantics={[
        { name: 'textarea', desc: locale.textarea, version: '5.4.0' },
        { name: 'count', desc: locale.count, version: '5.4.0' },
      ]}
    >
      <Input.TextArea defaultValue="Hello, Ant Design" rows={3} count={{ max: 100, show: true }} />
    </SemanticPreview>
  );
};

export default App;
