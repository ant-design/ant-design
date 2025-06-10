import React from 'react';
import { Button, Descriptions, DescriptionsProps, Divider, Switch } from 'antd';

import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素',
    header: '头部元素',
    title: '标题元素',
    extra: '额外内容',
    label: '标签元素',
    content: '内容元素',
  },
  en: {
    root: 'root element',
    header: 'header element',
    title: 'title element',
    extra: 'extra element',
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
  const [bordered, setBordered] = React.useState(false);

  const handleBorderChange = (checked: boolean) => {
    setBordered(checked);
  };

  return (
    <div ref={divRef} style={{ width: '100%', height: '100%' }}>
      <Switch checked={bordered} onChange={handleBorderChange} /> Toggle Border
      <Divider />
      <Descriptions
        title="User Info"
        items={items}
        extra={<Button type="primary">Edit</Button>}
        bordered={bordered}
        {...props}
      />
    </div>
  );
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Descriptions"
      semantics={[
        { name: 'root', desc: locale.root, version: '5.23.0' },
        { name: 'header', desc: locale.header, version: '5.23.0' },
        { name: 'title', desc: locale.title, version: '5.23.0' },
        { name: 'extra', desc: locale.extra, version: '5.23.0' },
        { name: 'label', desc: locale.label, version: '5.23.0' },
        { name: 'content', desc: locale.content, version: '5.23.0' },
      ]}
    >
      <BlockList />
    </SemanticPreview>
  );
};

export default App;
