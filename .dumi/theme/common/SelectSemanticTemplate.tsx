import React from 'react';
import { Flex, Segmented } from 'antd';

import useLocale from '../../hooks/useLocale';
import SemanticPreview from './SemanticPreview';

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
        maxTagCount={1}
        placeholder="Please select"
        allowClear
      />
    </Flex>
  );
};

export interface SelectSemanticTemplateProps {
  component: React.ComponentType<any>;
  componentName: string;
  locales: {
    cn: Record<string, string>;
    en: Record<string, string>;
  };
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
  locales,
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
