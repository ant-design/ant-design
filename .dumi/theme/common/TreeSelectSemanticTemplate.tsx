import React from 'react';
import { Flex, Segmented } from 'antd';

import useLocale from '../../hooks/useLocale';
import SemanticPreview from './SemanticPreview';

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
        maxTagCount={1}
        placeholder="Please select"
      />
    </Flex>
  );
};

export interface TreeSelectSemanticTemplateProps {
  component: React.ComponentType<any>;
  componentName: string;
  locales: {
    cn: Record<string, string>;
    en: Record<string, string>;
  };
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
  locales,
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
