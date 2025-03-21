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

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  const divRef = React.useRef<HTMLDivElement>(null);

  return (
    <SemanticPreview
      semantics={[{ name: 'popup', desc: locale.popup, version: '5.25.0' }]}
      height={200}
    >
      <div ref={divRef} style={{ marginBottom: 80 }}>
        <Select
          open
          defaultValue="aojunhao123"
          options={[
            { value: 'aojunhao123', label: 'aojunhao123' },
            { value: 'thinkasany', label: 'thinkasany' },
          ]}
          placement="bottomLeft"
          getPopupContainer={() => divRef.current!}
          styles={{ popup: { zIndex: 1 } }}
        />
      </div>
    </SemanticPreview>
  );
};

export default App;
