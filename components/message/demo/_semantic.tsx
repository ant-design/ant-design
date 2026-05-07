import React from 'react';
import { message } from 'antd';

import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    list: '消息列表根元素，设置定位、层级、宽度、滚动区域和位置样式',
    listContent: '消息列表内容元素，设置消息项排列、间距和高度动画样式',
    root: '消息项根元素，设置背景色、圆角、阴影、内边距和动画样式',
    wrapper: '图标与标题的包裹元素，设置内容布局、间距和对齐样式',
    icon: '图标元素，设置字体大小、行高和状态颜色样式',
    title: '标题元素，设置文本颜色、字号、行高和内容展示样式',
  },
  en: {
    list: 'Message list root element, set positioning, z-index, width, scroll area and placement styles',
    listContent:
      'Message list content element, set notice layout, gap and height transition styles',
    root: 'Message item root element, set background color, border radius, shadow, padding and animation styles',
    wrapper: 'Wrapper element for icon and title, set content layout, gap and alignment styles',
    icon: 'Icon element, set font size, line height and status color styles',
    title: 'Title element, set text color, font size, line height and content display styles',
  },
};

const PureList = message._InternalListDoNotUseOrYouWillBeFired;

const previewListStyle: React.CSSProperties = {
  position: 'relative',
  inset: 'auto',
  width: '100%',
  maxWidth: '100%',
  height: 'auto',
  padding: 24,
  overflow: 'visible',
  transform: 'none',
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Message"
      semantics={[
        { name: 'root', desc: locale.root, version: '6.0.0' },
        { name: 'wrapper', desc: locale.wrapper, version: '6.4.0' },
        { name: 'icon', desc: locale.icon, version: '6.0.0' },
        { name: 'title', desc: locale.title, version: '6.4.0' },
        { name: 'list', desc: locale.list, version: '6.4.0' },
        { name: 'listContent', desc: locale.listContent, version: '6.4.0' },
      ]}
    >
      <PureList
        style={previewListStyle}
        items={[
          {
            key: 'semantic-message-1',
            content: 'Hello, Ant Design!',
            type: 'success',
            duration: false,
          },
          {
            key: 'semantic-message-2',
            content: 'Welcome back!',
            type: 'info',
            duration: false,
          },
        ]}
      />
    </SemanticPreview>
  );
};

export default App;
