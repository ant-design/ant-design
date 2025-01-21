import React from 'react';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { Segmented } from 'antd';

import SemanticPreview from '../../../.dumi/components/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素',
    item: '包裹的子组件',
    icon: '图标元素',
    label: '内容元素',
  },
  en: {
    root: 'Root element',
    item: 'Wrapped item element',
    icon: 'Icon element',
    label: 'Content element',
  },
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      semantics={[
        { name: 'root', desc: locale.root, version: '6.0.0' },
        { name: 'item', desc: locale.item, version: '6.0.0' },
        { name: 'label', desc: locale.label, version: '6.0.0' },
        { name: 'icon', desc: locale.icon, version: '6.0.0' },
      ]}
    >
      <Segmented
        options={[
          { label: 'List', value: 'List', icon: <BarsOutlined /> },
          { label: 'Kanban', value: 'Kanban', icon: <AppstoreOutlined /> },
        ]}
      />
    </SemanticPreview>
  );
};

export default App;
