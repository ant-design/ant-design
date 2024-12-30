import React from 'react';
import { Button, Result } from 'antd';

import SemanticPreview from '../../../.dumi/components/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素',
    title: '标题元素',
    subTitle: '副标题元素',
    body: '内容元素',
    extra: '额外元素',
    icon: '图标元素',
  },
  en: {
    root: 'Root Element',
    title: 'Title Element',
    subTitle: 'Subtitle Element',
    body: 'Content Element',
    extra: 'Extra Element',
    icon: 'Icon Element',
  },
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      semantics={[
        { name: 'root', desc: locale.root, version: '5.23.0' },
        { name: 'icon', desc: locale.icon, version: '5.23.0' },
        { name: 'title', desc: locale.title, version: '5.23.0' },
        { name: 'subTitle', desc: locale.subTitle, version: '5.23.0' },
        { name: 'extra', desc: locale.extra, version: '5.23.0' },
        { name: 'body', desc: locale.body, version: '5.23.0' },
      ]}
    >
      <Result
        title="title"
        subTitle="subTitle"
        extra={
          <Button type="primary" key="console">
            extra
          </Button>
        }
      >
        <div style={{ textAlign: 'center' }}>The Content of Result</div>
      </Result>
    </SemanticPreview>
  );
};

export default App;
