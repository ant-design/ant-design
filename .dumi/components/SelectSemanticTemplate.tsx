import React from 'react';

import useLocale from '../hooks/useLocale';
import SemanticPreview from './SemanticPreview';

export const locales = {
  cn: {
    root: '根元素',
    prefix: '前缀元素',
    suffix: '后缀元素',
    popup: '弹出菜单元素',
    list: '列表元素',
    listItem: '条目元素',
    input: '输入框元素',
  },
  en: {
    root: 'Root element',
    prefix: 'Prefix element',
    suffix: 'Suffix element',
    popup: 'Popup element',
    list: 'List element',
    listItem: 'Item element',
    input: 'Input element',
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

export interface TemplateSemanticPreviewProps {
  component: React.ComponentType<any>;
  componentName: string;
  defaultValue?: string;
  options?: { value: string; label: string }[];
  height?: number;
  onSearch?: (text: string) => void;
  placeholder?: string;
  style?: React.CSSProperties;
  ignoreSemantics?: string[];
  [key: string]: any;
}

const TemplateSemanticPreview: React.FC<TemplateSemanticPreviewProps> = ({
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
        { name: 'root', desc: locale.root, version: '6.0.0' },
        { name: 'prefix', desc: locale.prefix, version: '6.0.0' },
        { name: 'input', desc: locale.input, version: '6.0.0' },
        { name: 'suffix', desc: locale.suffix, version: '6.0.0' },
        { name: 'popup', desc: locale.popup, version: '6.0.0' },
        { name: 'list', desc: locale.list, version: '6.0.0' },
        { name: 'listItem', desc: locale.listItem, version: '6.0.0' },
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

export default TemplateSemanticPreview;
