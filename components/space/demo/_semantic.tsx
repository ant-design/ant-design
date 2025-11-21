import React from 'react';
import { Button, Divider, Space } from 'antd';

import useLocale from '../../../.dumi/hooks/useLocale';
import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';

const locales = {
  cn: {
    root: '根元素，包含 flex 布局、间隙设置、对齐方式、换行等间距容器的基础样式',
    item: '包裹的子组件，包含间距项的布局和样式，为每个子元素提供包装用于内联对齐',
    separator: '分隔符，包含分隔元素的样式',
  },
  en: {
    root: 'Root element with flex layout, gap settings, alignment, wrap and other spacing container basic styles',
    item: 'Wrapped item element with spacing item layout and styles, providing wrapper for each child element for inline alignment',
    separator: 'Separator element with divider styling',
  },
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Space"
      semantics={[
        { name: 'root', desc: locale.root },
        { name: 'item', desc: locale.item },
        { name: 'separator', desc: locale.separator },
      ]}
    >
      <Space separator={<Divider vertical />}>
        <Button type="primary">Primary</Button>
        <Button>Default</Button>
        <Button type="dashed">Dashed</Button>
      </Space>
    </SemanticPreview>
  );
};

export default App;
