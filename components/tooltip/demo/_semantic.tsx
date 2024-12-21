import React from 'react';
import { Tooltip } from 'antd';

import SemanticPreview from '../../../.dumi/components/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根节点',
    body: '内容元素',
  },
  en: {
    root: 'Root element',
    body: 'Body element',
  },
};

const BlockList: React.FC<React.PropsWithChildren> = (props: any) => {
  const divRef = React.useRef<HTMLDivElement>(null);

  return (
    <div ref={divRef} style={{ position: 'absolute', height: 100 }}>
      <Tooltip
        title="prompt text"
        open
        placement="bottom"
        getPopupContainer={() => divRef.current}
        {...props}
      >
        <span>Tooltip will show on mouse enter.</span>
      </Tooltip>
    </div>
  );
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      semantics={[
        { name: 'root', desc: locale.root, version: '5.23.0' },
        { name: 'body', desc: locale.body, version: '5.23.0' },
      ]}
    >
      <BlockList />
    </SemanticPreview>
  );
};

export default App;
