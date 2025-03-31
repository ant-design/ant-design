import React from 'react';
import { TreeSelect } from 'antd';

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
const treeData = [
  {
    value: 'contributors',
    title: 'contributors',
    children: [
      {
        value: 'thinkasany',
        title: 'thinkasany',
      },
      {
        value: 'aojunhao123',
        title: 'aojunhao123',
      },
    ],
  },
];

const Block = (props: any) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  const [value, setValue] = React.useState<string>();
  const onChange = (newValue: string) => {
    setValue(newValue);
  };
  return (
    <div ref={divRef}>
      <TreeSelect
        {...props}
        getPopupContainer={() => divRef.current}
        showSearch
        placement="bottomLeft"
        open
        style={{ marginBottom: 100, width: 200 }}
        styles={{
          popup: {
            zIndex: 1,
          },
        }}
        value={value}
        placeholder="Please select"
        treeDefaultExpandAll
        onChange={onChange}
        treeData={treeData}
      />
    </div>
  );
};
const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="TreeSelect"
      semantics={[{ name: 'popup', desc: locale.popup, version: '5.25.0' }]}
      height={200}
    >
      <Block />
    </SemanticPreview>
  );
};

export default App;
