import React from 'react';
import { Badge, Card } from 'antd';

import SemanticPreview from '../../../.dumi/components/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根节点',
    indicator: '指示器节点',
    content: '文本节点',
  },
  en: {
    root: 'Root element',
    indicator: 'Indicator element',
    content: 'Text element',
  },
};

const BlockList = (props: any) => {
  return (
    <div style={{ width: '100%' }}>
      <Badge.Ribbon {...props} text="Hippies" color="pink">
        <Card title="Pushes open the window" size="small">
          and raises the spyglass.
        </Card>
      </Badge.Ribbon>
    </div>
  );
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      semantics={[
        { name: 'root', desc: locale.root, version: '6.0.0' },
        { name: 'indicator', desc: locale.indicator, version: '6.0.0' },
        { name: 'content', desc: locale.content, version: '6.0.0' },
      ]}
    >
      <BlockList />
    </SemanticPreview>
  );
};

export default App;
