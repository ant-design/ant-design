import React from 'react';
import { Input } from 'antd';

import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素，设置文本域包装器的样式、边框、圆角、过渡动画和状态控制',
    textarea: '文本域元素，设置字体、行高、内边距、颜色、背景、边框、文本输入和多行文本展示样式',
    count: '文字计数元素，设置字符计数显示的位置、字体、颜色和数值统计样式',
  },
  en: {
    root: 'Root element with textarea wrapper styles, border, border radius, transition animation and state control',
    textarea:
      'Textarea element with font, line height, padding, color, background, border, text input and multi-line text display styles',
    count:
      'Count element with character count display position, font, color and numeric statistics styles',
  },
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Input.TextArea"
      semantics={[
        { name: 'root', desc: locale.root },
        { name: 'textarea', desc: locale.textarea },
        { name: 'count', desc: locale.count },
      ]}
    >
      <Input.TextArea defaultValue="Hello, Ant Design" rows={3} count={{ max: 100, show: true }} />
    </SemanticPreview>
  );
};

export default App;
