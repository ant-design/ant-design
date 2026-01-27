import React from 'react';
import { AntDesignOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import useLocale from '../../../.dumi/hooks/useLocale';
import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';

const locales = {
  cn: {
    icon: '图标元素',
  },
  en: {
    icon: 'Icon element',
  },
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Button"
      semantics={[{ name: 'icon', desc: locale.icon, version: '5.5.0' }]}
    >
      <Button type="primary" icon={<AntDesignOutlined />}>
        Ant Design
      </Button>
    </SemanticPreview>
  );
};

export default App;
