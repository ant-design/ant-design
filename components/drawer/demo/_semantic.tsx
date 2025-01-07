import React from 'react';
import { Button, Drawer, Typography } from 'antd';

import SemanticPreview from '../../../.dumi/components/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素',
    mask: '遮罩层元素',
    section: 'Drawer 容器元素',
    header: '头部元素',
    body: '内容元素',
    footer: '底部元素',
    title: '标题元素',
    extra: '额外元素',
  },
  en: {
    root: 'Root element',
    mask: 'Mask element',
    section: 'Drawer container element',
    header: 'Header element',
    body: 'Body element',
    footer: 'Footer element',
    title: 'Title element',
    extra: 'Extra element',
  },
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      semantics={[
        { name: 'root', desc: locale.root, version: '6.0.0' },
        { name: 'mask', desc: locale.mask, version: '5.13.0' },
        { name: 'header', desc: locale.header, version: '5.13.0' },
        { name: 'title', desc: locale.title, version: '6.0.0' },
        { name: 'extra', desc: locale.extra, version: '6.0.0' },
        { name: 'section', desc: locale.section, version: '6.0.0' },
        { name: 'body', desc: locale.body, version: '5.13.0' },
        { name: 'footer', desc: locale.footer, version: '5.13.0' },
      ]}
      height={300}
    >
      <Drawer
        title="Title"
        placement="right"
        footer={<Typography.Link>Footer</Typography.Link>}
        closable={false}
        open
        getContainer={false}
        extra={<Button>Cancel</Button>}
      >
        <p>Some contents...</p>
      </Drawer>
    </SemanticPreview>
  );
};

export default App;
