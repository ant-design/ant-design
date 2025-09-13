import React from 'react';
import { Tooltip } from 'antd';
import type { TooltipProps } from 'antd';

import useLocale from '../../../.dumi/hooks/useLocale';
import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';

const locales = {
  cn: {
    root: '根元素 (包含箭头、内容元素)',
    body: '内容元素',
    lazy: '懒加载容器元素',
  },
  en: {
    root: 'Root element (including arrows, content elements)',
    body: 'Body element',
    lazy: 'Lazy loading container element',
  },
};

const BlockList: React.FC<React.PropsWithChildren<TooltipProps>> = (props) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  const { children, ...rest } = props;
  return (
    <div ref={divRef} style={{ position: 'absolute', marginTop: 60 }}>
      <Tooltip
        title="prompt text"
        open
        placement="top"
        autoAdjustOverflow={false}
        getPopupContainer={() => divRef.current!}
        {...rest}
      >
        {children}
      </Tooltip>
    </div>
  );
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Tooltip"
      semantics={[
        { name: 'root', desc: locale.root, version: '5.23.0' },
        { name: 'body', desc: locale.body, version: '5.23.0' },
        { name: 'lazy', desc: locale.lazy, version: '5.27.x' },
      ]}
    >
      <BlockList />
    </SemanticPreview>
  );
};

export default App;
