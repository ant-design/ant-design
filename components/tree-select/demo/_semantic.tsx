import React from 'react';
import { TreeSelect } from 'antd';
import type { TreeSelectProps } from 'antd';

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

const Block: React.FC<Readonly<TreeSelectProps>> = (props) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  const [value, setValue] = React.useState<string>();
  return (
    <div ref={divRef}>
      <TreeSelect
        {...props}
        getPopupContainer={() => divRef.current!}
        showSearch
        placement="bottomLeft"
        open
        style={{ width: 200, marginBottom: 80, marginTop: -10 }}
        styles={{ popup: { root: { zIndex: 1, height: 90 } } }}
        value={value}
        placeholder="Please select"
        treeDefaultExpandAll
        onChange={setValue}
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
