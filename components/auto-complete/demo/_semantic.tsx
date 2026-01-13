import React from 'react';
import { AutoComplete } from 'antd';

import SelectSemanticTemplate from '../../../.dumi/theme/common/SelectSemanticTemplate';

const locales = {
  cn: {
    root: '根元素，包含相对定位、行内 flex 布局、光标样式、过渡动画、边框等选择器容器的基础样式',
    prefix: '前缀元素，包含前缀内容的布局和样式',
    content: '多选容器，包含已选项的布局、间距、换行相关样式',
    placeholder: '占位符元素，包含占位符文本的字体样式和颜色',
    clear: '清除按钮元素，包含清除按钮的布局、样式和交互效果',
    input: '输入框元素，包含搜索输入框的样式、光标控制、字体继承等搜索相关样式，去除了边框样式',
    'popup.root': '弹出菜单元素，包含弹出层的定位、层级、背景、边框、阴影等弹出容器样式',
    'popup.list': '弹出菜单列表元素，包含选项列表的布局、滚动、最大高度等列表容器样式',
    'popup.listItem':
      '弹出菜单条目元素，包含选项项的内边距、悬浮效果、选中状态、禁用状态等选项交互样式',
  },
  en: {
    root: 'Root element with relative positioning, inline-flex layout, cursor styles, transitions, border and other basic selector container styles',
    prefix: 'Prefix element with layout and styling for prefix content',
    content:
      'Multiple selection container with layout, spacing, and wrapping styles for selected items',
    placeholder: 'Placeholder element with font styles and colors for placeholder text',
    clear: 'Clear button element with layout, styling and interactive effects for clear button',
    input:
      'Input element with search input styling, cursor control, font inheritance and other search-related styles. Remove border styles',
    'popup.root':
      'Popup element with popup layer positioning, z-index, background, border, box-shadow and other popup container styles',
    'popup.list':
      'Popup list element with option list layout, scrolling, max-height and other list container styles',
    'popup.listItem':
      'Popup item element with option item padding, hover effects, selected states, disabled states and other option interactive styles',
  },
};

const mockVal = (str: string, repeat = 1) => ({
  value: str.repeat(repeat),
  label: str.repeat(repeat),
});

const getPanelValue = (searchText: string) =>
  !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];

const App: React.FC = () => {
  const [options, setOptions] = React.useState([
    { value: 'aojunhao123', label: 'aojunhao123' },
    { value: 'thinkasany', label: 'thinkasany' },
    { value: 'meet-student', label: 'meet-student' },
  ]);

  return (
    <SelectSemanticTemplate
      component={AutoComplete}
      componentName="AutoComplete"
      locales={locales}
      prefix="prefix"
      style={{ width: 200 }}
      options={options}
      onSearch={(text: string) => setOptions(getPanelValue(text))}
      placeholder="input here"
      ignoreSemantics={['suffix']}
      singleOnly
    />
  );
};

export default App;
