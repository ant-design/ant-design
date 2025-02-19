import React from 'react';
import { Pagination } from 'antd';

import SemanticPreview from '../../../.dumi/components/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素',
    item: 'Item 元素',
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
      semantics={[
        { name: 'root', desc: locale.root, version: '6.0.0' },
        { name: 'item', desc: locale.item, version: '6.0.0' },
      ]}
    >
      <Pagination defaultCurrent={1} total={50} />
    </SemanticPreview>
  );
};

export default App;
