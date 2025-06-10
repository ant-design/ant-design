import React from 'react';
import { Input } from 'antd';

import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素',
    textarea: '文本域元素',
    count: '文字计数元素',
  },
  en: {
    root: 'root element',
    textarea: 'textarea element',
    count: 'count element',
  },
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Input.TextArea"
      semantics={[
        { name: 'root', desc: locale.root },
        { name: 'textarea', desc: locale.textarea },
        { name: 'count', desc: locale.count },
      ]}
    >
      <Input.TextArea defaultValue="Hello, Ant Design" rows={3} count={{ max: 100, show: true }} />
    </SemanticPreview>
  );
};

export default App;
