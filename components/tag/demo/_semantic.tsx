import React from 'react';
import { AntDesignOutlined } from '@ant-design/icons';
import { Tag } from 'antd';

import SemanticPreview from '../../../.dumi/components/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素',
    icon: '图标元素',
    content: '内容元素',
  },
  en: {
    root: 'Root element',
    icon: 'Icon element',
    content: 'Content element',
  },
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      semantics={[
        { name: 'root', desc: locale.root, version: '6.0.0' },
        { name: 'icon', desc: locale.icon, version: '6.0.0' },
        { name: 'content', desc: locale.content, version: '6.0.0' },
      ]}
    >
      <Tag icon={<AntDesignOutlined />}>Ant Design</Tag>
    </SemanticPreview>
  );
};

export default App;
