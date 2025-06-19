import React from 'react';
import type { ColorPickerProps } from 'antd';
import { ColorPicker } from 'antd';

import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素',
    'popup.root': '弹出菜单元素',
  },
  en: {
    root: 'Root element',
    'popup.root': 'Popup element',
  },
};

const Block: React.FC<Readonly<ColorPickerProps>> = (props) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  return (
    <div ref={divRef} style={{ height: 300 }}>
      <ColorPicker
        defaultValue="#1677ff"
        open
        {...props}
        getPopupContainer={() => divRef!.current!}
        styles={{
          popup: {
            root: { zIndex: 1 },
          },
        }}
      />
    </div>
  );
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="ColorPicker"
      semantics={[
        { name: 'root', desc: locale.root },
        { name: 'popup.root', desc: locale['popup.root'] },
      ]}
    >
      <Block />
    </SemanticPreview>
  );
};

export default App;
