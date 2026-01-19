import React from 'react';
import { Flex, Segmented } from 'antd';

import useLocale from '../../hooks/useLocale';
import SemanticPreview from './SemanticPreview';

export const locales = {
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

interface BlockProps {
  component: React.ComponentType<any>;
  treeData?: any[];
  defaultValue?: string | string[];
  style?: React.CSSProperties;
  mode: 'single' | 'multiple';
  onModeChange: (mode: 'single' | 'multiple') => void;
  multipleProps?: object;
  [key: string]: any;
}

const Block: React.FC<BlockProps> = ({
  component: Component,
  treeData,
  defaultValue,
  mode,
  onModeChange,
  multipleProps,
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
      <Segmented
        options={[
          { label: 'Single', value: 'single' },
          { label: 'Multiple', value: 'multiple' },
        ]}
        value={mode}
        onChange={(value) => onModeChange(value as 'single' | 'multiple')}
      />
      <Component
        {...props}
        open
        placement="bottomLeft"
        value={value}
        onChange={setValue}
        getPopupContainer={() => divRef.current}
        treeData={treeData}
        {...(mode === 'multiple' ? multipleProps : {})}
        styles={{ popup: { zIndex: 1 } }}
        maxTagCount="responsive"
        placeholder="Please select"
      />
    </Flex>
  );
};

export interface TreeSelectSemanticTemplateProps {
  component: React.ComponentType<any>;
  componentName: string;
  treeData?: any[];
  height?: number;
  onSearch?: (text: string) => void;
  placeholder?: string;
  style?: React.CSSProperties;
  ignoreSemantics?: string[];
  multipleProps?: object;
  [key: string]: any;
}

const TreeSelectSemanticTemplate: React.FC<TreeSelectSemanticTemplateProps> = ({
  component,
  defaultValue,
  treeData,
  height,
  style,
  componentName,
  ignoreSemantics = [],
  ...restProps
}) => {
  const [locale] = useLocale(locales);
  const [mode, setMode] = React.useState<'single' | 'multiple'>('single');

  const semanticList =
    mode === 'single'
      ? [
          { name: 'root', desc: locale.root },
          { name: 'prefix', desc: locale.prefix },
          { name: 'placeholder', desc: locale.placeholder },
          { name: 'input', desc: locale.input },
          { name: 'suffix', desc: locale.suffix },
          { name: 'popup.root', desc: locale['popup.root'] },
          { name: 'popup.item', desc: locale['popup.item'] },
          { name: 'popup.itemTitle', desc: locale['popup.itemTitle'] },
        ].filter((semantic) => !ignoreSemantics.includes(semantic.name))
      : [
          { name: 'root', desc: locale.root },
          { name: 'prefix', desc: locale.prefix },
          { name: 'content', desc: locale.content },
          { name: 'item', desc: locale.item },
          { name: 'itemContent', desc: locale.itemContent },
          { name: 'itemRemove', desc: locale.itemRemove },
          { name: 'input', desc: locale.input },
          { name: 'placeholder', desc: locale.placeholder },
          { name: 'suffix', desc: locale.suffix },
          { name: 'popup.root', desc: locale['popup.root'] },
          { name: 'popup.item', desc: locale['popup.item'] },
          { name: 'popup.itemTitle', desc: locale['popup.itemTitle'] },
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
        treeData={treeData}
        style={style}
        mode={mode}
        onModeChange={setMode}
        {...restProps}
      />
    </SemanticPreview>
  );
};

export default TreeSelectSemanticTemplate;
