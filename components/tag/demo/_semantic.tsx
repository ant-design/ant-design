import React from 'react';
import { AntDesignOutlined } from '@ant-design/icons';
import { Tag } from 'antd';

import useLocale from '../../../.dumi/hooks/useLocale';
import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';

const locales = {
  cn: {
    root: '根元素，包含行内块布局、自动高度、内边距、字体大小、行高、禁止换行、背景色、边框、圆角、透明度、过渡动画、文本对齐、相对定位等标签的基础样式',
    icon: '图标元素，包含字体大小、颜色、光标样式、过渡动画等图标的显示样式',
    content: '内容元素，包含文本内容的颜色、字体样式等内容区域的样式',
  },
  en: {
    root: 'Root element with inline-block display, auto height, padding, font size, line height, nowrap, background color, border, border radius, opacity, transition animations, text alignment, relative positioning and other basic tag styles',
    icon: 'Icon element with font size, color, cursor style, transition animations and other icon display styles',
    content: 'Content element with text content color, font styles and other content area styles',
  },
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Tag"
      semantics={[
        { name: 'root', desc: locale.root, version: '6.0.0' },
        { name: 'icon', desc: locale.icon, version: '6.0.0' },
        { name: 'content', desc: locale.content, version: '6.0.0' },
      ]}
    >
      <Tag icon={<AntDesignOutlined />}>Ant Design</Tag>
    </SemanticPreview>
  );
};

export default App;
