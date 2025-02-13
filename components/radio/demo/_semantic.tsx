import React from 'react';
import { Radio } from 'antd';

import SemanticPreview from '../../../.dumi/components/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素',
    icon: '选中框元素',
    label: '文本元素',
  },
  en: {
    root: 'Icon element',
    icon: 'Input element',
    label: 'Label element',
  },
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      semantics={[
        { name: 'root', desc: locale.root, version: '6.0.0' },
        { name: 'icon', desc: locale.icon, version: '6.0.0' },
        { name: 'label', desc: locale.label, version: '6.0.0' },
      ]}
    >
      <Radio>Radio</Radio>
    </SemanticPreview>
  );
};

export default App;
