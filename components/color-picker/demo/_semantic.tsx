import React from 'react';
import { ColorPicker } from 'antd';

import SemanticPreview from '../../../.dumi/components/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素',
    popup: '弹出菜单元素',
  },
  en: {
    root: 'Root element',
    popup: 'Popup element',
  },
};

const Block: React.FC = (props: any) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  return (
    <div ref={divRef} style={{ height: 300 }}>
      <ColorPicker
        defaultValue="#1677ff"
        open
        {...props}
        getPopupContainer={() => divRef!.current!}
        styles={{ popup: { zIndex: 1 } }}
      />
    </div>
  );
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      semantics={[
        { name: 'root', desc: locale.root },
        { name: 'popup', desc: locale.popup },
      ]}
    >
      <Block />
    </SemanticPreview>
  );
};

export default App;
