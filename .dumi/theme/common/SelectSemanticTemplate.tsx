import React from 'react';

import useLocale from '../../hooks/useLocale';
import SemanticPreview from './SemanticPreview';

export const locales = {
  cn: {
    root: '根元素，包含相对定位、行内 flex 布局、光标样式、过渡动画、边框等选择器容器的基础样式',
    prefix: '前缀元素，包含前缀内容的布局和样式',
    suffix: '后缀元素，包含后缀内容的布局和样式，如清除按钮、箭头图标等',
    input: '输入框元素，包含搜索输入框的样式、光标控制、字体继承等搜索相关样式，去除了边框样式',
    'popup.root': '弹出菜单元素，包含弹出层的定位、层级、背景、边框、阴影等弹出容器样式',
    'popup.list': '弹出菜单列表元素，包含选项列表的布局、滚动、最大高度等列表容器样式',
    'popup.listItem':
      '弹出菜单条目元素，包含选项项的内边距、悬浮效果、选中状态、禁用状态等选项交互样式',
  },
  en: {
    root: 'Root element with relative positioning, inline-flex layout, cursor styles, transitions, border and other basic selector container styles',
    prefix: 'Prefix element with layout and styling for prefix content',
    suffix:
      'Suffix element with layout and styling for suffix content like clear button, arrow icon, etc.',
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

interface BlockProps {
  component: React.ComponentType<any>;
  options?: { value: string; label: string }[];
  defaultValue?: string;
  style?: React.CSSProperties;
  [key: string]: any;
}

const Block: React.FC<BlockProps> = ({ component: Component, options, defaultValue, ...props }) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  return (
    <div ref={divRef} style={{ position: 'absolute', marginBottom: 80 }}>
      <Component
        {...props}
        open
        placement="bottomLeft"
        defaultValue={defaultValue}
        getPopupContainer={() => divRef.current}
        options={options}
        styles={{
          popup: { zIndex: 1 },
        }}
      />
    </div>
  );
};

export interface SelectSemanticTemplateProps {
  component: React.ComponentType<any>;
  componentName: string;
  options?: { value: string; label: string }[];
  height?: number;
  onSearch?: (text: string) => void;
  placeholder?: string;
  style?: React.CSSProperties;
  ignoreSemantics?: string[];
  [key: string]: any;
}

const SelectSemanticTemplate: React.FC<SelectSemanticTemplateProps> = ({
  component,
  defaultValue,
  options,
  height,
  style,
  componentName,
  ignoreSemantics = [],
  ...restProps
}) => {
  const [locale] = useLocale(locales);

  return (
    <SemanticPreview
      componentName={componentName}
      semantics={[
        { name: 'root', desc: locale.root },
        { name: 'prefix', desc: locale.prefix },
        { name: 'input', desc: locale.input },
        { name: 'suffix', desc: locale.suffix },
        { name: 'popup.root', desc: locale['popup.root'] },
        { name: 'popup.list', desc: locale['popup.list'] },
        { name: 'popup.listItem', desc: locale['popup.listItem'] },
      ].filter((semantic) => !ignoreSemantics.includes(semantic.name))}
      height={height}
    >
      <Block
        component={component}
        defaultValue={defaultValue}
        options={options}
        style={style}
        {...restProps}
      />
    </SemanticPreview>
  );
};

export default SelectSemanticTemplate;
