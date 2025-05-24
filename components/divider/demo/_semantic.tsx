import React from 'react';
import { Divider } from 'antd';
import type { DividerProps } from 'antd';

import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素',
    content: '内容元素',
    rail: '背景条元素',
  },
  en: {
    root: 'Root element',
    content: 'Content element',
    rail: 'Background rail element',
  },
};

const Block: React.FC<DividerProps> = (props) => {
  return (
    <div style={{ width: '100%' }}>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi
        ista probare, quae sunt a te dicta? Refert tamen, quo modo.
      </p>
      <Divider {...props} styles={{ rail: { borderBlockStart: '1px solid #7cb305' } }}>
        Solid
      </Divider>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi
        ista probare, quae sunt a te dicta? Refert tamen, quo modo.
      </p>
      <Divider
        orientation="left"
        {...props}
        styles={{ rail: { borderBlockStart: '1px dotted #7cb305' } }}
      >
        Dotted
      </Divider>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi
        ista probare, quae sunt a te dicta? Refert tamen, quo modo.
      </p>
      <Divider
        orientation="right"
        {...props}
        styles={{ rail: { borderBlockStart: '1px dashed #7cb305' } }}
      >
        Dashed
      </Divider>
    </div>
  );
};
const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Divider"
      semantics={[
        { name: 'root', desc: locale.root },
        { name: 'rail', desc: locale.rail },
        { name: 'content', desc: locale.content },
      ]}
    >
      <Block />
    </SemanticPreview>
  );
};

export default App;
