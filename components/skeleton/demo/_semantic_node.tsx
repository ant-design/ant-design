import React from 'react';
import { Skeleton } from 'antd';

import SemanticPreview from '../../../.dumi/components/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素',
    node: '节点元素 (可以是 avatar、button、input、image)',
  },
  en: {
    root: 'Root element',
    node: 'Node element (can be avatar, button, input, image)',
  },
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      semantics={[
        { name: 'root', desc: locale.root, version: '6.0.0' },
        { name: 'node', desc: locale.node, version: '6.0.0' },
      ]}
    >
      <Skeleton.Node />
    </SemanticPreview>
  );
};

export default App;
