import React from 'react';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';

import SemanticPreview from '../../../.dumi/components/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    header: '设置面板头部区域',
    body: '设置面板内容区域',
  },
  en: {
    header: 'set `header` of Collapse item',
    body: 'set `body` of Collapse item',
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
      semantics={[
        { name: 'header', desc: locale.header, version: '5.20.3' },
        { name: 'body', desc: locale.body, version: '5.20.3' },
      ]}
    >
      <BlockCollapse />
    </SemanticPreview>
  );
};

export default App;
