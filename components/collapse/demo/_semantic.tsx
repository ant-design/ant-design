import React from 'react';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import { useToken } from '../../theme/internal';

import SemanticPreview from '../../../.dumi/components/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素',
    header: '头部元素',
    title: '标题元素',
    body: '内容元素',
    icon: '图标元素',
  },
  en: {
    root: 'Root element',
    header: 'Header element',
    title: 'Title element',
    body: 'Body element',
    icon: 'Icon element',
  },
};

const BlockCollapse: React.FC = (props) => {
  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'This is panel header',
      children: <p>This is panel body</p>,
    },
  ];
  const [, token] = useToken();
  return (
    <div style={{ position: 'absolute', inset: 0, margin: token.marginXL }}>
      <Collapse {...props} items={items} defaultActiveKey={['1']} />
    </div>
  );
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      semantics={[
        { name: 'root', desc: locale.root, version: '6.0.0' },
        { name: 'header', desc: locale.header, version: '5.21.0' },
        { name: 'icon', desc: locale.icon, version: '6.0.0' },
        { name: 'title', desc: locale.title, version: '6.0.0' },
        { name: 'body', desc: locale.body, version: '5.21.0' },
      ]}
    >
      <BlockCollapse />
    </SemanticPreview>
  );
};

export default App;
