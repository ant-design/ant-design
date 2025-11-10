import React from 'react';
import { InputNumber } from 'antd';
import type { InputNumberProps } from 'antd';

import useLocale from '../../../.dumi/hooks/useLocale';
import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';

const locales = {
  cn: {
    root: '根元素，设置行内块布局、宽度、边框圆角和重置样式',
    input: '输入框元素，设置字体、行高、文本输入和交互样式',
    prefix: '前缀的包裹元素，设置flex布局、对齐方式和右边距样式',
    suffix: '后缀的包裹元素，设置flex布局、边距和过渡动画样式',
    action: '单个操作按钮元素，设置按钮的样式、悬浮效果和点击交互',
    actions: '操作元素，设置绝对定位、宽度、flex布局和数值调节按钮样式',
  },
  en: {
    root: 'Root element, sets inline-block layout, width, border radius and reset styles',
    input: 'Input element, sets font, line height, text input and interaction styles',
    prefix: 'Prefix wrapper element, sets flex layout, alignment and right margin styles',
    suffix: 'Suffix wrapper element, sets flex layout, margin and transition animation styles',
    action:
      'Single action button element, sets button styling, hover effects and click interactions',
    actions:
      'Actions element, sets absolute positioning, width, flex layout and number adjustment button styles',
  },
};

const Block: React.FC<InputNumberProps> = (props) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <InputNumber
        prefix="￥"
        suffix="RMB"
        defaultValue={100}
        style={{ width: 200 }}
        styles={{ actions: { opacity: 1, width: 24 }, suffix: { marginRight: 28 } }}
        {...props}
      />
      <InputNumber
        defaultValue={100}
        style={{ width: 200 }}
        styles={{ actions: { opacity: 1, width: 24 }, suffix: { marginRight: 28 } }}
        mode="spinner"
        {...props}
      />
    </div>
  );
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="InputNumber"
      semantics={[
        { name: 'root', desc: locale.root },
        { name: 'prefix', desc: locale.prefix },
        { name: 'input', desc: locale.input },
        { name: 'suffix', desc: locale.suffix },
        { name: 'actions', desc: locale.actions },
        { name: 'action', desc: locale.action },
      ]}
    >
      <Block />
    </SemanticPreview>
  );
};

export default App;
