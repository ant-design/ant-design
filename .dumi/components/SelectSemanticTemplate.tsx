import React from 'react';

import useLocale from '../hooks/useLocale';
import SemanticPreview from './SemanticPreview';

export const locales = {
  cn: {
    root: '根元素',
    prefix: '前缀元素',
    suffix: '后缀元素',
    input: '输入框元素',
    'popup.root': '弹出菜单元素',
    'popup.list': '弹出菜单列表元素',
    'popup.listItem': '弹出菜单条目元素',
  },
  en: {
    root: 'Root element',
    prefix: 'Prefix element',
    suffix: 'Suffix element',
    input: 'Input element',
    'popup.root': 'Popup element',
    'popup.list': 'Popup List element',
    'popup.listItem': 'Popup Item element',
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
