import React from 'react';
import { ArrowUpOutlined } from '@ant-design/icons';
import { Statistic } from 'antd';

import SemanticPreview from '../../../.dumi/components/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素',
    header: '头部元素',
    title: '标题元素',
    content: '内容元素',
    prefix: '前缀元素',
    suffix: '后缀元素',
  },
  en: {
    root: 'Root element',
    header: 'Header element',
    title: 'Title element',
    content: 'Content element',
    prefix: 'Prefix element',
    suffix: 'Suffix element',
  },
};

const BlockList: React.FC<React.PropsWithChildren> = (props: any) => {
  const divRef = React.useRef<HTMLDivElement>(null);

  return (
    <div ref={divRef} style={{ position: 'absolute' }}>
      <Statistic
        title="Active"
        value={11.28}
        precision={2}
        styles={{ content: { color: '#3f8600' } }}
        prefix={<ArrowUpOutlined />}
        suffix="%"
        {...props}
      />
    </div>
  );
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      semantics={[
        { name: 'root', desc: locale.root, version: '6.0.0' },
        { name: 'header', desc: locale.header, version: '6.0.0' },
        { name: 'title', desc: locale.title, version: '6.0.0' },
        { name: 'prefix', desc: locale.prefix, version: '6.0.0' },
        { name: 'content', desc: locale.content, version: '6.0.0' },
        { name: 'suffix', desc: locale.suffix, version: '6.0.0' },
      ]}
    >
      <BlockList />
    </SemanticPreview>
  );
};

export default App;
