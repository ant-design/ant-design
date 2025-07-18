import React from 'react';
import { Transfer } from 'antd';

import useLocale from '../../../.dumi/hooks/useLocale';
import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';

const locales = {
  cn: {
    root: '根元素',
    section: '区域元素',
    header: '头部元素',
    title: '标题元素',
    body: '内容元素',
    list: '列表元素',
    item: '列表项元素',
    itemIcon: '列表项图标元素',
    itemContent: '列表项内容元素',
    footer: '页脚元素',
    actions: '操作元素',
  },
  en: {
    root: 'Root element',
    section: 'Section element',
    header: 'Header element',
    title: 'Title element',
    body: 'Body element',
    list: 'List element',
    item: 'List Item element',
    itemIcon: 'List Item Icon element',
    itemContent: 'List Item Content element',
    footer: 'Footer element',
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
        { name: 'title', desc: locale.title },
        { name: 'body', desc: locale.body },
        { name: 'list', desc: locale.list },
        { name: 'item', desc: locale.item },
        { name: 'itemIcon', desc: locale.itemIcon },
        { name: 'itemContent', desc: locale.itemContent },
        { name: 'footer', desc: locale.footer },
        { name: 'actions', desc: locale.actions },
      ]}
    >
      <Transfer
        showSearch
        titles={['Source', 'Target']}
        dataSource={mockData}
        selectedKeys={[]}
        targetKeys={[3, 9]}
        render={(item) => item.title}
        footer={() => <div style={{ padding: 8 }}>Custom Footer</div>}
        styles={{
          section: {
            height: 250,
            width: 200,
          },
        }}
      />
    </SemanticPreview>
  );
};

export default App;
