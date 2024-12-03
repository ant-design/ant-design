import React from 'react';
import { Popover } from 'antd';

import SemanticPreview from '../../../.dumi/components/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根节点',
    inner: '内部元素',
  },
  en: {
    root: 'Root element',
    inner: 'inner element',
  },
};

const BlockList: React.FC<React.PropsWithChildren> = (props: any) => {
  const divRef = React.useRef<HTMLDivElement>(null);

  return (
    <div
      ref={divRef}
      style={{
        position: 'absolute',
        height: 100,
      }}
    >
      <Popover
        title="prompt text"
        open
        placement="bottom"
        getPopupContainer={() => divRef.current}
        {...props}
      >
        <span>Content</span>
      </Popover>
    </div>
  );
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      semantics={[
        { name: 'root', desc: locale.root, version: '5.23.0' },
        { name: 'inner', desc: locale.inner, version: '5.23.0' },
      ]}
    >
      <BlockList />
    </SemanticPreview>
  );
};

export default App;
