import React from 'react';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';

import SemanticPreview from '../../../.dumi/components/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素',
    item: 'Item 元素',
    separator: '分隔符元素',
  },
  en: {
    root: 'Root Element',
    item: 'Item Element',
    separator: 'Separator Element',
  },
};

const Block = (props: any) => {
  return (
    <Breadcrumb
      {...props}
      items={[
        {
          href: '',
          title: <HomeOutlined />,
        },
        {
          href: '',
          title: (
            <>
              <UserOutlined />
              <span>Application List</span>
            </>
          ),
        },
        {
          title: 'Application',
        },
      ]}
    />
  );
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      semantics={[
        { name: 'root', desc: locale.root, version: '6.0.0' },
        { name: 'item', desc: locale.item, version: '6.0.0' },
        { name: 'separator', desc: locale.separator, version: '6.0.0' },
      ]}
    >
      <Block />
    </SemanticPreview>
  );
};

export default App;
