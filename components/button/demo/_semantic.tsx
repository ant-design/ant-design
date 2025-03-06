import React from 'react';
import { AntDesignOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import SemanticPreview from '../../../.dumi/components/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素',
    content: '内容元素',
    icon: '图标元素',
  },
  en: {
    root: 'Root element',
    content: 'Content element',
    icon: 'Icon element',
  },
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      semantics={[
        { name: 'root', desc: locale.root, version: '6.0.0' },
        { name: 'icon', desc: locale.icon, version: '5.5.0' },
        { name: 'content', desc: locale.content, version: '6.0.0' },
      ]}
    >
      <Button type="primary" icon={<AntDesignOutlined />}>
        Ant Design
      </Button>
    </SemanticPreview>
  );
};

export default App;
