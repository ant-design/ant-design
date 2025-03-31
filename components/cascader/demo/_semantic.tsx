import React from 'react';
import { Cascader } from 'antd';
import type { CascaderProps } from 'antd';

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
const options = [
  {
    value: 'contributors',
    label: 'contributors',
    children: [
      {
        value: 'aojunhao123',
        label: 'aojunhao123',
      },
      {
        value: 'thinkasany',
        label: 'thinkasany',
      },
    ],
  },
];

const Block: React.FC<Readonly<CascaderProps<any, any, any>>> = (props) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  const [value, setValue] = React.useState<string[]>(['contributors', 'aojunhao123']);
  return (
    <div ref={divRef} style={{ marginBottom: 60 }}>
      <Cascader
        {...props}
        open
        styles={{
          popup: {
            zIndex: 1,
            height: 70,
          },
        }}
        getPopupContainer={() => divRef.current!}
        value={value}
        onChange={setValue}
        options={options}
        placement="bottomLeft"
      />
    </div>
  );
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Cascader"
      semantics={[
        { name: 'root', desc: locale.root, version: '5.25.0' },
        { name: 'popup', desc: locale.popup, version: '5.25.0' },
      ]}
    >
      <Block />
    </SemanticPreview>
  );
};

export default App;
