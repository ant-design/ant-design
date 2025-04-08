import React from 'react';

import useLocale from '../hooks/useLocale';
import SemanticPreview from './SemanticPreview';

export const locales = {
  cn: {
    root: '根元素',
    popup: '弹出菜单元素',
  },
  en: {
    root: 'Root element',
    popup: 'Popup element',
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
  [key: string]: any;
}

const TemplateSemanticPreview: React.FC<TemplateSemanticPreviewProps> = ({
  component,
  defaultValue,
  options,
  height,
  style,
  componentName,
  ...restProps
}) => {
  const [locale] = useLocale(locales);

  return (
    <SemanticPreview
      componentName={componentName}
      semantics={[
        { name: 'root', desc: locale.root, version: '5.25.0' },
        { name: 'popup', desc: locale.popup, version: '5.25.0' },
      ]}
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
