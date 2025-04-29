import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

import SemanticPreview from '../../../.dumi/components/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素',
    item: 'Item 元素',
    header: '头部元素',
    indicator: '指示器元素',
    content: '内容元素',
    'popup.root': '弹出菜单元素',
  },
  en: {
    root: 'Root element',
    item: 'Item element',
    header: 'Header element',
    indicator: 'Indicator element',
    content: 'Content element',
    'popup.root': 'Popup element',
  },
};

const Block: React.FC<Readonly<TabsProps>> = (props) => {
  return (
    <Tabs
      {...props}
      defaultActiveKey="1"
      style={{ height: 220, width: '100%' }}
      styles={{
        popup: {
          root: { background: '#fff' },
        },
      }}
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
      componentName="Tabs"
      semantics={[
        { name: 'root', desc: locale.root },
        { name: 'header', desc: locale.root },
        { name: 'item', desc: locale.item },
        { name: 'indicator', desc: locale.indicator },
        { name: 'content', desc: locale.content },
        { name: 'popup.root', desc: locale['popup.root'] },
      ]}
    >
      <Block />
    </SemanticPreview>
  );
};

export default App;
