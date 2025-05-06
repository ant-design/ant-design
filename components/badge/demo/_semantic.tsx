import React from 'react';
import { Avatar, Badge } from 'antd';

import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素',
    indicator: '指示器元素',
  },
  en: {
    root: 'Root element',
    indicator: 'Indicator element',
  },
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Badge"
      semantics={[
        { name: 'root', desc: locale.root, version: '5.7.0' },
        { name: 'indicator', desc: locale.indicator, version: '5.7.0' },
      ]}
    >
      <Badge count={5}>
        <Avatar shape="square" size="large" />
      </Badge>
    </SemanticPreview>
  );
};

export default App;
