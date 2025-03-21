import React from 'react';
import { Select } from 'antd';

import SemanticPreview from '../../../.dumi/components/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    popup: '弹出菜单元素',
  },
  en: {
    popup: 'Popup element',
  },
};

const Block = (prop: any) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  return (
    <div ref={divRef} style={{ position: 'absolute', marginBottom: 80 }}>
      <Select
        {...prop}
        open
        placement="bottomLeft"
        defaultValue="aojunhao123"
        getPopupContainer={() => divRef.current}
        options={[
          { value: 'aojunhao123', label: 'aojunhao123' },
          { value: 'thinkasany', label: 'thinkasany' },
        ]}
        styles={{
          popup: { zIndex: 1 },
        }}
      />
    </div>
  );
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);

  return (
    <SemanticPreview
      semantics={[{ name: 'popup', desc: locale.popup, version: '5.25.0' }]}
      height={200}
    >
      <Block />
    </SemanticPreview>
  );
};

export default App;
