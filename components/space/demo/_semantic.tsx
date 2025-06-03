import React from 'react';
import { Button, Divider, Space } from 'antd';

import useLocale from '../../../.dumi/hooks/useLocale';
import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';

const locales = {
  cn: {
    root: '根元素',
    item: '包裹的子组件',
    separator: '分隔符',
  },
  en: {
    root: 'Root element',
    item: 'Wrapped item element',
    separator: 'Separator element',
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
