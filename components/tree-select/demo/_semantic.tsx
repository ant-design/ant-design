import React from 'react';
import { TreeSelect } from 'antd';

import TreeSelectSemanticTemplate from '../../../.dumi/theme/common/TreeSelectSemanticTemplate';

const locales = {
  cn: {
    root: '根元素，设置树选择器的基础样式、边框、圆角容器样式',
    prefix: '前缀元素，设置前缀内容的布局和样式',
    input: '输入框元素，设置文本输入、搜索、选择值显示等输入框的核心交互样式',
    suffix: '后缀元素，设置后缀内容、清除按钮、下拉箭头等后缀区域的样式',
    content: '多选容器，包含已选项的布局、间距、换行相关样式',
    item: '多选项元素，包含边框、背景、内边距、外边距样式',
    itemContent: '多选项内容区域，包含文字的省略样式',
    itemRemove: '多选项移除按钮，包含字体相关样式',
    placeholder: '占位符元素，包含占位符文本的字体样式和颜色',
    'popup.root': '弹出菜单元素，设置下拉树形选择面板的定位、层级、背景、边框、阴影等弹层样式',
    'popup.item': '弹出菜单条目元素，设置树节点选项的样式、悬停态、选中态等交互状态',
    'popup.itemTitle': '弹出菜单标题元素，设置树节点标题文字的显示样式',
  },
  en: {
    root: 'Root element with tree selector base styles, border, border radius container styles',
    prefix: 'Prefix element with prefix content layout and styles',
    input:
      'Input element with text input, search, selected value display and other input core interaction styles',
    suffix:
      'Suffix element with suffix content, clear button, dropdown arrow and other suffix area styles',
    content:
      'Multiple selection container with layout, spacing, and wrapping styles for selected items',
    item: 'Multiple selection item element with border, background, padding, and margin styles',
    itemContent: 'Multiple selection item content area with text ellipsis styles',
    itemRemove: 'Multiple selection item remove button with font-related styles',
    placeholder: 'Placeholder element with font styles and colors for placeholder text',
    'popup.root':
      'Popup element with dropdown tree selection panel positioning, z-index, background, border, shadow and other popup layer styles',
    'popup.item':
      'Popup item element with tree node option styles, hover state, selected state and other interaction states',
    'popup.itemTitle': 'Popup title element with tree node title text display styles',
  },
};

const App: React.FC = () => {
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
        {
          value: 'meet-student',
          title: 'meet-student',
        },
      ],
    },
  ];

  return (
    <TreeSelectSemanticTemplate
      component={TreeSelect}
      componentName="TreeSelect"
      locales={locales}
      prefix="prefix"
      style={{ width: 300 }}
      multipleProps={{ multiple: true }}
      treeData={treeData}
      treeDefaultExpandAll
      showSearch
      allowClear
    />
  );
};

export default App;
