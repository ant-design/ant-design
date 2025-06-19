import React from 'react';
import { Splitter } from 'antd';
import type { SplitterProps } from 'antd';

import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';
import { Desc } from './size';

const locales = {
  cn: {
    root: '根元素',
    panel: '面板元素',
    dragger: '面板控制元素',
  },
  en: {
    root: 'Root element',
    panel: 'Panel element',
    dragger: 'Panel control element',
  },
};

const Block: React.FC<Readonly<SplitterProps>> = (props) => {
  return (
    <Splitter
      {...props}
      style={{ height: 200, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}
      classNames={{ ...props.classNames, dragger: { default: 'semantic-mark-dragger' } }}
    >
      <Splitter.Panel>
        <Desc text="First" />
      </Splitter.Panel>
      <Splitter.Panel>
        <Desc text="Second" />
      </Splitter.Panel>
    </Splitter>
  );
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Splitter"
      semantics={[
        { name: 'root', desc: locale.root, version: '6.0.0' },
        { name: 'panel', desc: locale.panel, version: '6.0.0' },
        { name: 'dragger', desc: locale.dragger, version: '6.0.0' },
      ]}
    >
      <Block />
    </SemanticPreview>
  );
};

export default App;
