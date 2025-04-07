import React from 'react';
import { Transfer } from 'antd';

import SemanticPreview from '../../../.dumi/components/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素',
    section: '区域元素',
    header: '头部元素',
    body: '内容元素',
    list: '列表元素',
    listItem: '列表项元素',
    footer: '页脚',
    actions: '操作元素',
  },
  en: {
    root: 'Root element',
    section: 'Section element',
    header: 'Header element',
    body: 'Body element',
    list: 'List element',
    listItem: 'List Item element',
    footer: 'Footer',
    actions: 'Actions element',
  },
};

const mockData = Array.from({ length: 20 }).map((_, i) => ({
  key: i,
  title: `content ${i + 1}`,
}));

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Transfer"
      semantics={[
        { name: 'root', desc: locale.root },
        { name: 'section', desc: locale.section },
        { name: 'header', desc: locale.header },
        { name: 'body', desc: locale.body },
        { name: 'list', desc: locale.list },
        { name: 'listItem', desc: locale.listItem },
        { name: 'footer', desc: locale.footer },
        { name: 'actions', desc: locale.actions },
      ]}
    >
      <Transfer
        showSearch
        dataSource={mockData}
        selectedKeys={[]}
        targetKeys={[3, 9]}
        render={(item) => item.title}
        footer={() => <div style={{ padding: 8 }}>Custom Footer</div>}
        styles={{
          section: {
            height: 250,
          },
        }}
      />
    </SemanticPreview>
  );
};

export default App;
