import React from 'react';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';

import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    header: '头部元素',
    body: '内容元素',
  },
  en: {
    header: 'Header element',
    body: 'Body element',
  },
};

const BlockCollapse: React.FC = (props) => {
  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'This is panel header',
      children: <p>This is panel body</p>,
      ...props,
    },
  ];

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Collapse {...props} items={items} defaultActiveKey={['1']} />
    </div>
  );
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Collapse"
      semantics={[
        { name: 'header', desc: locale.header, version: '5.21.0' },
        { name: 'body', desc: locale.body, version: '5.21.0' },
      ]}
    >
      <BlockCollapse />
    </SemanticPreview>
  );
};

export default App;
