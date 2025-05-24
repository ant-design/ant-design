import React from 'react';
import { Button, Empty, Typography } from 'antd';

import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素',
    image: '图标元素',
    description: '描述元素',
    footer: '底部元素',
  },
  en: {
    root: 'Root element',
    image: 'Image element',
    description: 'Description element',
    footer: 'Footer element',
  },
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Empty"
      semantics={[
        { name: 'root', desc: locale.root, version: '5.23.0' },
        { name: 'image', desc: locale.image, version: '5.23.0' },
        { name: 'description', desc: locale.description, version: '5.23.0' },
        { name: 'footer', desc: locale.footer, version: '5.23.0' },
      ]}
    >
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        styles={{ image: { height: 60 } }}
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
