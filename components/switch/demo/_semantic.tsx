import React from 'react';
import { Switch } from 'antd';

import useLocale from '../../../.dumi/hooks/useLocale';
import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';

const locales = {
  cn: {
    root: '根元素，包含最小宽度、高度、行高、垂直对齐、背景色、边框、圆角、光标样式、过渡动画、用户选择等开关容器的基础样式',
    content:
      '内容元素，包含块级显示、溢出隐藏、圆角、高度、内边距、过渡动画等开关内容区域的布局和样式',
    indicator:
      '指示器元素,包含绝对定位、宽度、高度、背景色、圆角、阴影、过渡动画等开关把手的样式和交互效果',
  },
  en: {
    root: 'Root element with min-width, height, line-height, vertical alignment, background color, border, border radius, cursor style, transition animations, user selection and other basic switch container styles',
    content:
      'Content element with block display, overflow hidden, border radius, height, padding, transition animations and other switch content area layout and styles',
    indicator:
      'Indicator element with absolute positioning, width, height, background color, border radius, shadow, transition animations and other switch handle styles and interactive effects',
  },
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Switch"
      motion
      semantics={[
        { name: 'root', desc: locale.root, version: '6.0.0' },
        { name: 'content', desc: locale.content, version: '6.0.0' },
        { name: 'indicator', desc: locale.indicator, version: '6.3.0' },
      ]}
    >
      <Switch checkedChildren="ON" unCheckedChildren="OFF" defaultChecked />
    </SemanticPreview>
  );
};

export default App;
