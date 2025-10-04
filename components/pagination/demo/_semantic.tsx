import React from 'react';
import { Pagination } from 'antd';

import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素，设置flex布局、对齐方式、换行和列表样式',
    item: '页码元素，设置尺寸、内边距、边框、背景色、悬停态和激活态样式',
  },
  en: {
    root: 'Root element, set flex layout, alignment, flex wrap and list styles',
    item: 'Item element, set size, padding, border, background color, hover state and active state styles',
  },
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Pagination"
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
