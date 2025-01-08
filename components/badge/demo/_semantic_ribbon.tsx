import React from 'react';
import { Badge, Card } from 'antd';

import SemanticPreview from '../../../.dumi/components/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根节点',
    body: '主体节点',
    text: '文本节点',
    corner: '角标节点',
  },
  en: {
    root: 'Root element',
    body: 'Body element',
    text: 'Text element',
    corner: 'Corner element',
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
        { name: 'body', desc: locale.body, version: '6.0.0' },
        { name: 'text', desc: locale.text, version: '6.0.0' },
        { name: 'corner', desc: locale.corner, version: '6.0.0' },
      ]}
    >
      <BlockList />
    </SemanticPreview>
  );
};

export default App;
