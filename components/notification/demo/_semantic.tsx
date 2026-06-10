import React from 'react';
import { Button, notification } from 'antd';

import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    list: '通知列表根元素，设置定位、层级、宽度、滚动区域和位置样式',
    listContent: '通知列表内容元素，设置通知项排列、间距和高度动画样式',
    root: '通知项根元素，设置背景色、圆角、阴影、内边距和动画样式',
    wrapper: '图标与内容的包裹元素，设置内容布局样式',
    icon: '图标元素，设置绝对定位、字体大小、行高和状态颜色样式',
    section: '内容区域元素，包含标题和描述内容',
    title: '标题元素，设置颜色、字体大小、行高和外边距样式',
    description: '描述元素，设置字体大小、颜色和外边距样式',
    actions: '操作组元素，设置右浮动、上边距和操作按钮布局样式',
    close: '关闭按钮元素，设置位置、尺寸和交互样式',
    progress: '进度条元素，设置自动关闭通知的进度样式',
  },
  en: {
    list: 'Notification list root element, set positioning, z-index, width, scroll area and placement styles',
    listContent:
      'Notification list content element, set notice layout, gap and height transition styles',
    root: 'Notice root element, set background color, border radius, shadow, padding and animation styles',
    wrapper: 'Wrapper element for icon and content with content layout styles',
    icon: 'Icon element, set absolute positioning, font size, line height and status color styles',
    section: 'Content section element that contains title and description',
    title: 'Title element, set color, font size, line height and margin styles',
    description: 'Description element, set font size, color and margin styles',
    actions: 'Actions element, set float right, top margin and action button layout styles',
    close: 'Close button element, set position, size and interaction styles',
    progress: 'Progress element, set progress styles for auto-closing notifications',
  },
};

const PureList = notification._InternalListDoNotUseOrYouWillBeFired;

const previewListStyle: React.CSSProperties = {
  position: 'relative',
  inset: 'auto',
  width: 432,
  maxWidth: '100%',
  height: 'auto',
  padding: 24,
  transform: 'none',
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Notification"
      height={320}
      semantics={[
        { name: 'root', desc: locale.root, version: '6.0.0' },
        { name: 'wrapper', desc: locale.wrapper, version: '6.4.0' },
        { name: 'icon', desc: locale.icon, version: '6.0.0' },
        { name: 'section', desc: locale.section, version: '6.4.0' },
        { name: 'title', desc: locale.title, version: '6.0.0' },
        { name: 'description', desc: locale.description, version: '6.0.0' },
        { name: 'close', desc: locale.close, version: '6.4.0' },
        { name: 'actions', desc: locale.actions, version: '6.0.0' },
        { name: 'progress', desc: locale.progress, version: '6.4.0' },
        { name: 'list', desc: locale.list, version: '6.4.0' },
        { name: 'listContent', desc: locale.listContent, version: '6.4.0' },
      ]}
    >
      <PureList
        placement="topRight"
        style={previewListStyle}
        items={[
          {
            key: 'semantic-notification-1',
            title: 'Hello World!',
            description: 'Hello World?',
            type: 'success',
            duration: false,
            actions: (
              <Button type="primary" size="small">
                My Button
              </Button>
            ),
          },
          {
            key: 'semantic-notification-2',
            title: 'Welcome back!',
            description: 'This is another notification.',
            type: 'info',
            duration: 999999,
            showProgress: true,
          },
        ]}
      />
    </SemanticPreview>
  );
};

export default App;
