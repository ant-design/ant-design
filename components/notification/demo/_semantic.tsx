import React from 'react';
import { Button, notification } from 'antd';

import useLocale from '../../../.dumi/hooks/useLocale';
import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';

const { _InternalPanelDoNotUseOrYouWillBeFired: InternalPanel } = notification;

const locales = {
  cn: {
    root: '根元素，设置固定定位、层级、内边距、背景色、圆角、阴影和动画样式',
    icon: '图标元素，设置绝对定位、字体大小、行高和状态颜色样式',
    title: '标题元素，设置颜色、字体大小、行高和外边距样式',
    description: '描述元素，设置字体大小、颜色和外边距样式',
    actions: '操作组元素，设置右浮动、上边距和操作按钮布局样式',
  },
  en: {
    root: 'Root element, set fixed positioning, z-index, padding, background color, border radius, shadow and animation styles',
    icon: 'Icon element, set absolute positioning, font size, line height and status color styles',
    title: 'Title element, set color, font size, line height and margin styles',
    description: 'Description element, set font size, color and margin styles',
    actions: 'Actions element, set float right, top margin and action button layout styles',
  },
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Notification"
      semantics={[
        { name: 'root', desc: locale.root, version: '6.0.0' },
        { name: 'icon', desc: locale.icon, version: '6.0.0' },
        { name: 'title', desc: locale.title, version: '6.0.0' },
        { name: 'description', desc: locale.description, version: '6.0.0' },
        { name: 'actions', desc: locale.actions, version: '6.0.0' },
      ]}
    >
      <InternalPanel
        title="Hello World!"
        description="Hello World?"
        type="success"
        actions={
          <Button type="primary" size="small">
            My Button
          </Button>
        }
      />
    </SemanticPreview>
  );
};

export default App;
