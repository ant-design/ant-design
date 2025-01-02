import React from 'react';
import { Button, Empty, Typography } from 'antd';

import SemanticPreview from '../../../.dumi/components/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素',
    icon: '图片元素',
    description: '描述元素',
    footer: '底部元素',
  },
  en: {
    root: 'Root element',
    icon: 'Image element',
    description: 'Description element',
    footer: 'Footer element',
  },
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      semantics={[
        { name: 'root', desc: locale.root, version: '6.0.0' },
        { name: 'icon', desc: locale.icon, version: '6.0.0' },
        { name: 'description', desc: locale.description, version: '6.0.0' },
        { name: 'footer', desc: locale.footer, version: '6.0.0' },
      ]}
    >
      <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        styles={{ icon: { height: 60 } }}
        description={
          <Typography.Text>
            Customize <a href="#API">Description</a>
          </Typography.Text>
        }
      >
        <Button type="primary">Create Now</Button>
      </Empty>
    </SemanticPreview>
  );
};

export default App;
