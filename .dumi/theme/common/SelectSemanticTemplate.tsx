import React from 'react';
import { Flex, Segmented } from 'antd';

import useLocale from '../../hooks/useLocale';
import SemanticPreview from './SemanticPreview';

export const locales = {
  cn: {
    root: '根元素，包含相对定位、行内 flex 布局、光标样式、过渡动画、边框等选择器容器的基础样式',
    prefix: '前缀元素，包含前缀内容的布局和样式',
    suffix: '后缀元素，包含后缀内容的布局和样式，如清除按钮、箭头图标等',
    input: '输入框元素，包含搜索输入框的样式、光标控制、字体继承等搜索相关样式，去除了边框样式',
    content: '多选容器，包含已选项的布局、间距、换行相关样式',
    clear: '清除按钮元素，包含清除按钮的布局、样式和交互效果',
    item: '多选项元素，包含边框、背景、内边距、外边距样式',
    itemContent: '多选项内容区域，包含文字的省略样式',
    itemRemove: '多选项移除按钮，包含字体相关样式',
    placeholder: '占位符元素，包含占位符文本的字体样式和颜色',
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
    content:
      'Multiple selection container with layout, spacing, and wrapping styles for selected items',
    clear: 'Clear button element with layout, styling and interactive effects for clear button',
    item: 'Multiple selection item element with border, background, padding, and margin styles',
    itemContent: 'Multiple selection item content area with text ellipsis styles',
    itemRemove: 'Multiple selection item remove button with font-related styles',
    placeholder: 'Placeholder element with font styles and colors for placeholder text',
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
  mode: 'single' | 'multiple';
  onModeChange: (mode: 'single' | 'multiple') => void;
  multipleProps?: object;
  singleOnly?: boolean;
  [key: string]: any;
}

const Block: React.FC<BlockProps> = ({
  component: Component,
  options,
  defaultValue,
  mode,
  onModeChange,
  multipleProps,
  singleOnly,
  ...props
}) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  // 多选模式下，优先使用 multipleProps 中的 defaultValue
  const multipleDefaultValue = (multipleProps as any)?.defaultValue;
  const initialValue = mode === 'single' ? defaultValue : multipleDefaultValue;
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(mode === 'single' ? defaultValue : multipleDefaultValue);
  }, [mode, defaultValue, multipleDefaultValue]);

  return (
    <Flex
      ref={divRef}
      style={{ position: 'absolute', marginBottom: 80 }}
      vertical
      gap="middle"
      align="center"
    >
      {!singleOnly && (
        <Segmented<'single' | 'multiple'>
          options={[
            { label: 'Single', value: 'single' },
            { label: 'Multiple', value: 'multiple' },
          ]}
          value={mode}
          onChange={onModeChange}
        />
      )}
      <Component
        {...props}
        open
        placement="bottomLeft"
        value={value}
        onChange={setValue}
        getPopupContainer={() => divRef.current}
        options={options}
        {...(mode === 'multiple' ? multipleProps : {})}
        styles={{ popup: { zIndex: 1 } }}
        maxTagCount="responsive"
        placeholder="Please select"
        allowClear
      />
    </Flex>
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
  multipleProps?: object;
  singleOnly?: boolean;
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
  singleOnly = false,
  ...restProps
}) => {
  const [locale] = useLocale(locales);
  const [mode, setMode] = React.useState<'single' | 'multiple'>(singleOnly ? 'single' : 'single');

  const semanticList =
    mode === 'single'
      ? [
          { name: 'root', desc: locale.root },
          { name: 'prefix', desc: locale.prefix },
          { name: 'content', desc: locale.content },
          { name: 'placeholder', desc: locale.placeholder },
          { name: 'clear', desc: locale.clear },
          { name: 'input', desc: locale.input },
          { name: 'suffix', desc: locale.suffix },
          { name: 'popup.root', desc: locale['popup.root'] },
          { name: 'popup.list', desc: locale['popup.list'] },
          { name: 'popup.listItem', desc: locale['popup.listItem'] },
        ].filter((semantic) => !ignoreSemantics.includes(semantic.name))
      : [
          { name: 'root', desc: locale.root },
          { name: 'prefix', desc: locale.prefix },
          { name: 'content', desc: locale.content },
          { name: 'placeholder', desc: locale.placeholder },
          { name: 'clear', desc: locale.clear },
          { name: 'item', desc: locale.item },
          { name: 'itemContent', desc: locale.itemContent },
          { name: 'itemRemove', desc: locale.itemRemove },
          { name: 'input', desc: locale.input },
          { name: 'suffix', desc: locale.suffix },
          { name: 'popup.root', desc: locale['popup.root'] },
          { name: 'popup.list', desc: locale['popup.list'] },
          { name: 'popup.listItem', desc: locale['popup.listItem'] },
        ].filter((semantic) => !ignoreSemantics.includes(semantic.name));

  return (
    <SemanticPreview
      componentName={componentName}
      semantics={semanticList}
      height={height}
      style={{
        alignItems: 'flex-start',
      }}
    >
      <Block
        component={component}
        defaultValue={defaultValue}
        options={options}
        style={style}
        mode={mode}
        onModeChange={singleOnly ? () => {} : setMode}
        singleOnly={singleOnly}
        {...restProps}
      />
    </SemanticPreview>
  );
};

export default SelectSemanticTemplate;
