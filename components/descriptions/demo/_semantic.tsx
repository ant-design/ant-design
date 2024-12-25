import React from 'react';
import { Descriptions, DescriptionsProps } from 'antd';

import SemanticPreview from '../../../.dumi/components/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根节点',
    label: '标签元素',
    content: '内容元素',
  },
  en: {
    root: 'root element',
    label: 'label element',
    content: 'content element',
  },
};

const items: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'Telephone',
    children: '1810000000',
  },
];

const BlockList: React.FC<React.PropsWithChildren> = (props: any) => {
  const divRef = React.useRef<HTMLDivElement>(null);

  return (
    <div ref={divRef}>
      <Descriptions title="User Info" items={items} {...props} />
    </div>
  );
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      semantics={[
        { name: 'root', desc: locale.root, version: '5.23.0' },
        { name: 'label', desc: locale.label, version: '5.23.0' },
        { name: 'content', desc: locale.content, version: '5.23.0' },
      ]}
    >
      <BlockList />
    </SemanticPreview>
  );
};

export default App;
