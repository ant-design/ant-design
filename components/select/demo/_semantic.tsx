import React from 'react';
import { Select } from 'antd';

import SemanticPreview from '../../../.dumi/components/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

export const locales = {
  cn: {
    popup: '弹出菜单元素',
  },
  en: {
    popup: 'Popup element',
  },
};

interface BlockProps {
  component: React.ComponentType<any>;
  options: { value: string; label: string }[];
  defaultValue?: string;
  [key: string]: any;
}

export const Block: React.FC<BlockProps> = ({
  component: Component,
  options,
  defaultValue,
  ...props
}) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  return (
    <div ref={divRef} style={{ position: 'absolute', marginBottom: 80 }}>
      <Component
        {...props}
        open
        placement="bottomLeft"
        defaultValue={defaultValue}
        getPopupContainer={() => divRef.current}
        options={options}
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
      <Block
        component={Select}
        defaultValue="aojunhao123"
        options={[
          { value: 'aojunhao123', label: 'aojunhao123' },
          { value: 'thinkasany', label: 'thinkasany' },
        ]}
      />
    </SemanticPreview>
  );
};

export default App;
