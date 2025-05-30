import React from 'react';
import { Popover } from 'antd';
import type { PopoverProps } from 'antd';

import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素 (包含箭头、内容元素)',
    body: '内容元素',
  },
  en: {
    root: 'Root element (including arrows, content elements)',
    body: 'Body element',
  },
};

const BlockList: React.FC<React.PropsWithChildren<PopoverProps>> = (props) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  const { children, ...rest } = props;
  return (
    <div ref={divRef} style={{ position: 'absolute', marginTop: 60 }}>
      <Popover
        title="prompt text"
        open
        placement="top"
        autoAdjustOverflow={false}
        getPopupContainer={() => divRef.current!}
        {...rest}
      >
        {children}
      </Popover>
    </div>
  );
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Popover"
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
