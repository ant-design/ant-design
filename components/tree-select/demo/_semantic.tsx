import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { TreeSelect } from 'antd';

import SemanticPreview from '../../../.dumi/components/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素',
    prefix: '前缀元素',
    input: '输入框元素',
    suffix: '后缀元素',
    item: '条目元素',
    itemTitle: '标题元素',
    popup: '弹出菜单元素',
  },
  en: {
    root: 'Root element',
    prefix: 'Prefix element',
    input: 'Input element',
    suffix: 'Suffix element',
    item: 'Item element',
    itemTitle: 'title element',
    popup: 'Popup element',
  },
};
const icon = <SmileOutlined />;
const treeData = [
  {
    value: 'parent 1',
    title: 'parent 1',
    children: [
      {
        value: 'parent 1-0',
        title: 'parent 1-0',
        children: [
          {
            value: 'leaf1',
            title: 'my leaf',
          },
          {
            value: 'leaf2',
            title: 'your leaf',
          },
        ],
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
        prefix="Prefix"
        open
        suffixIcon={icon}
        styles={{
          root: { zIndex: 1 },
          popup: {
            zIndex: 1,
            maxHeight: 400,
            overflow: 'auto',
          },
        }}
        value={value}
        placeholder="Please select"
        allowClear
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
        { name: 'root', desc: locale.root, version: '6.0.0' },
        { name: 'prefix', desc: locale.prefix, version: '6.0.0' },
        { name: 'input', desc: locale.input, version: '6.0.0' },
        { name: 'suffix', desc: locale.suffix, version: '6.0.0' },
        { name: 'popup', desc: locale.popup, version: '6.0.0' },
        { name: 'item', desc: locale.item, version: '6.0.0' },
        { name: 'itemTitle', desc: locale.itemTitle, version: '6.0.0' },
      ]}
    >
      <Block />
    </SemanticPreview>
  );
};

export default App;
