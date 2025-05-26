import React from 'react';
import { Cascader } from 'antd';

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

const Block = (props: any) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  const [value, setValue] = React.useState<string[]>(['contributors', 'aojunhao123']);
  const onChange = (newValue: string[]) => {
    setValue(newValue);
  };
  return (
    <div ref={divRef} style={{ marginBottom: 60 }}>
      <Cascader
        {...props}
        open
        styles={{
          popup: {
            root: {
              zIndex: 1,
              height: 70,
            },
          },
        }}
        getPopupContainer={() => divRef.current}
        value={value}
        onChange={onChange}
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
        { name: 'popup.root', desc: locale['popup.root'], version: '5.25.0' },
      ]}
    >
      <Block />
    </SemanticPreview>
  );
};

export default App;
