import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { TreeSelect } from 'antd';
import type { TreeSelectProps } from 'antd';

import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素，设置树选择器的基础样式、边框、圆角容器样式',
    prefix: '前缀元素，设置前缀内容的布局和样式',
    input: '输入框元素，设置文本输入、搜索、选择值显示等输入框的核心交互样式',
    suffix: '后缀元素，设置后缀内容、清除按钮、下拉箭头等后缀区域的样式',
    'popup.item': '弹出菜单条目元素，设置树节点选项的样式、悬停态、选中态等交互状态',
    'popup.itemTitle': '弹出菜单标题元素，设置树节点标题文字的显示样式',
    'popup.root': '弹出菜单元素，设置下拉树形选择面板的定位、层级、背景、边框、阴影等弹层样式',
  },
  en: {
    root: 'Root element with tree selector base styles, border, border radius container styles',
    prefix: 'Prefix element with prefix content layout and styles',
    input:
      'Input element with text input, search, selected value display and other input core interaction styles',
    suffix:
      'Suffix element with suffix content, clear button, dropdown arrow and other suffix area styles',
    'popup.item':
      'Popup item element with tree node option styles, hover state, selected state and other interaction states',
    'popup.itemTitle': 'Popup title element with tree node title text display styles',
    'popup.root':
      'Popup element with dropdown tree selection panel positioning, z-index, background, border, shadow and other popup layer styles',
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
