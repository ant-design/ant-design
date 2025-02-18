import React from 'react';
import { Anchor } from 'antd';

import SemanticPreview from '../../../.dumi/components/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素',
    item: 'Item 元素',
    title: '标题元素',
  },
  en: {
    root: 'Root Element',
    item: 'Item Element',
    title: 'Title Element',
  },
};

const Block = (props: any) => {
  return (
    <Anchor
      {...props}
      affix={false}
      items={[
        {
          key: 'api',
          href: '#api',
          title: 'API',
          children: [
            {
              key: '4',
              href: '#anchor-props',
              title: 'Anchor Props',
            },
            {
              key: '5',
              href: '#link-props',
              title: 'Link Props',
            },
          ],
        },
        {
          key: '1',
          href: '#anchor-demo-basic',
          title: 'Basic demo',
        },
        {
          key: '2',
          href: '#anchor-demo-static',
          title: 'Static demo',
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
        { name: 'title', desc: locale.title, version: '6.0.0' },
      ]}
    >
      <Block />
    </SemanticPreview>
  );
};

export default App;
