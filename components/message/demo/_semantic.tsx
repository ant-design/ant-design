import React from 'react';
import { message } from 'antd';

import useLocale from '../../../.dumi/hooks/useLocale';
import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';

const { _InternalPanelDoNotUseOrYouWillBeFired: InternalPanel } = message;

const locales = {
  cn: {
    root: '根元素，设置固定定位、层级、内边距、背景色、圆角、阴影和动画样式',
    icon: '图标元素，设置字体大小、右边距和状态颜色样式',
    content: '内容元素，设置行内块布局、文字颜色和内容展示样式',
  },
  en: {
    root: 'Root element, set fixed positioning, z-index, padding, background color, border radius, shadow and animation styles',
    icon: 'Icon element, set font size, right margin and status color styles',
    content: 'Content element, set inline block layout, text color and content display styles',
  },
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Message"
      semantics={[
        { name: 'root', desc: locale.root, version: '6.0.0' },
        { name: 'icon', desc: locale.icon, version: '6.0.0' },
        { name: 'content', desc: locale.content, version: '6.0.0' },
      ]}
    >
      <InternalPanel type="success" content="Hello, Ant Design!" />
    </SemanticPreview>
  );
};

export default App;
