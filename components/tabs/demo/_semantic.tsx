import React from 'react';
import { Tabs } from 'antd';

import SemanticPreview from '../../../.dumi/components/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素',
    item: 'Item 元素',
    header: '头部元素',
    indicator: '指示器元素',
    content: '内容元素',
    popup: '弹出菜单元素',
  },
  en: {
    root: 'Root element',
    item: 'Item element',
    header: 'Header element',
    indicator: 'Indicator element',
    content: 'Content element',
    popup: 'Popup element',
  },
};
const Block = (props: any) => {
  return (
    <Tabs
      {...props}
      defaultActiveKey="1"
      style={{ height: 220, width: '100%' }}
      styles={{ popup: { background: '#fff' } }}
      items={Array.from({ length: 30 }, (_, i) => {
        const id = String(i);
        return {
          label: `Tab-${id}`,
          key: id,
          disabled: i === 28,
          children: `Content of tab ${id}`,
        };
      })}
    />
  );
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      semantics={[
        { name: 'root', desc: locale.root, version: '6.0.0' },
        { name: 'header', desc: locale.root, version: '6.0.0' },
        { name: 'item', desc: locale.item, version: '6.0.0' },
        { name: 'indicator', desc: locale.indicator, version: '6.0.0' },
        { name: 'content', desc: locale.content, version: '6.0.0' },
        { name: 'popup', desc: locale.popup, version: '6.0.0' },
      ]}
    >
      <Block />
    </SemanticPreview>
  );
};

export default App;
