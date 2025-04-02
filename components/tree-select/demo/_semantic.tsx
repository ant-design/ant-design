import React from 'react';
import { TreeSelect } from 'antd';

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
        style={{ width: 200, marginBottom: 80, marginTop: -10 }}
        styles={{
          popup: {
            zIndex: 1,
            height: 90,
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
