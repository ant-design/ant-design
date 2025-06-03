import React from 'react';
import { Divider } from 'antd';
import type { DividerProps } from 'antd';

import useLocale from '../../../.dumi/hooks/useLocale';
import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';

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
    <div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi
        ista probare, quae sunt a te dicta? Refert tamen, quo modo.
      </p>
      <Divider {...props} />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi
        ista probare, quae sunt a te dicta? Refert tamen, quo modo.
      </p>
      <Divider {...props}>Solid</Divider>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi
        ista probare, quae sunt a te dicta? Refert tamen, quo modo.
      </p>
      <Divider titlePlacement="left" variant="dotted" {...props}>
        Dotted
      </Divider>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi
        ista probare, quae sunt a te dicta? Refert tamen, quo modo.
      </p>
      <Divider titlePlacement="right" variant="dashed" {...props}>
        Dashed
      </Divider>
      <>
        These
        <Divider orientation="vertical" {...props} />
        are
        <Divider orientation="vertical" {...props} />
        vertical
        <Divider orientation="vertical" {...props} />
        Dividers
      </>
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
