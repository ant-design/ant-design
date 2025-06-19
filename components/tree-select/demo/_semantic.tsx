import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { TreeSelect } from 'antd';
import type { TreeSelectProps } from 'antd';

import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素',
    prefix: '前缀元素',
    input: '输入框元素',
    suffix: '后缀元素',
    'popup.item': '弹出菜单条目元素',
    'popup.itemTitle': '弹出菜单标题元素',
    'popup.root': '弹出菜单元素',
  },
  en: {
    root: 'Root element',
    prefix: 'Prefix element',
    input: 'Input element',
    suffix: 'Suffix element',
    'popup.item': 'Popup Item element',
    'popup.itemTitle': 'Popup title element',
    'popup.root': 'Popup element',
  },
};
const icon = <SmileOutlined />;
const treeData = [
  {
    value: 'contributors',
    title: 'contributors',
    children: [
      {
        value: 'aojunhao123',
        title: 'aojunhao123',
      },
      {
        value: 'thinkasany',
        title: 'thinkasany',
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
        prefix="Prefix"
        open
        suffixIcon={icon}
        styles={{
          root: { zIndex: 1 },
          popup: {
            root: {
              zIndex: 1,
              maxHeight: 400,
              overflow: 'auto',
            },
          },
        }}
        value={value}
        placeholder="Please select"
        allowClear
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
        { name: 'root', desc: locale.root },
        { name: 'prefix', desc: locale.prefix },
        { name: 'input', desc: locale.input },
        { name: 'suffix', desc: locale.suffix },
        { name: 'popup.root', desc: locale['popup.root'] },
        { name: 'popup.item', desc: locale['popup.item'] },
        { name: 'popup.itemTitle', desc: locale['popup.itemTitle'] },
      ]}
    >
      <Block />
    </SemanticPreview>
  );
};

export default App;
