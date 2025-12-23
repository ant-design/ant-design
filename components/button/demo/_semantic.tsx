import React from 'react';
import { AntDesignOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import useLocale from '../../../.dumi/hooks/useLocale';
import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';

const locales = {
  cn: {
    root: '根元素，包含边框样式、背景色、内边距、圆角、阴影效果、过渡动画、光标样式、文字权重、对齐方式等完整的按钮外观样式',
    content:
      '内容元素，包装按钮文本内容，控制文本的不换行显示、居中对齐、中文字符间距优化等文本排版样式',
    icon: '图标元素，包含图标的字体大小、颜色继承、SVG 样式重置等图标显示相关样式',
  },
  en: {
    root: 'Root element with comprehensive button styling including border, background, padding, border-radius, box-shadow, transitions, cursor, font-weight, alignment, and layout properties',
    content:
      'Content element that wraps button text with typography styles including nowrap, text-align center, and Chinese character spacing optimization',
    icon: 'Icon element with font-size, color inheritance, and SVG style reset for proper icon display',
  },
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Button"
      semantics={[
        { name: 'root', desc: locale.root, version: '6.0.0' },
        { name: 'icon', desc: locale.icon, version: '5.5.0' },
        { name: 'content', desc: locale.content, version: '6.0.0' },
      ]}
    >
      <Button type="primary" icon={<AntDesignOutlined />}>
        Ant Design
      </Button>
    </SemanticPreview>
  );
};

export default App;
