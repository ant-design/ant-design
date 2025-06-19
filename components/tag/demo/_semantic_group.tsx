import React from 'react';
import { Tag } from 'antd';

import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素',
    item: '单项元素',
  },
  en: {
    root: 'Root element',
    item: 'Item element',
  },
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Tag"
      semantics={[
        { name: 'root', desc: locale.root },
        { name: 'item', desc: locale.item },
      ]}
    >
      <Tag.CheckableTagGroup
        defaultValue="Books"
        options={['Movies', 'Books', 'Music', 'Sports']}
      />
    </SemanticPreview>
  );
};

export default App;
