import React from 'react';
import { Alert, Button, Space } from 'antd';

import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素，包含边框、背景色、内边距、圆角、位置布局等警告提示框的基础样式',
    section: '内容元素，采用 flex 布局控制内容区域的排版和最小宽度',
    icon: '图标元素，包含图标的颜色、行高、外边距等样式，支持不同类型的状态图标',
    title: '标题元素，包含标题文字的颜色、字体等样式',
    description: '描述元素，包含描述文字的字体大小、行高等排版样式',
    actions: '操作组元素，包含操作按钮的布局和间距样式',
  },
  en: {
    root: 'Root element with border, background, padding, border-radius, and positioning styles for the alert container',
    section:
      'Content element with flex layout controlling content area typography and minimum width',
    icon: 'Icon element with color, line-height, and margin styles, supporting different status icon types',
    title: 'Title element with text color and font styling for the alert title',
    description: 'Description element with font-size and line-height styles for additional content',
    actions: 'Actions element with layout and spacing styles for action buttons',
  },
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Alert"
      semantics={[
        { name: 'root', desc: locale.root, version: '6.0.0' },
        { name: 'icon', desc: locale.icon, version: '6.0.0' },
        { name: 'section', desc: locale.section, version: '6.0.0' },
        { name: 'title', desc: locale.title, version: '6.0.0' },
        { name: 'description', desc: locale.description, version: '6.0.0' },
        { name: 'actions', desc: locale.actions, version: '6.0.0' },
      ]}
    >
      <Alert
        title="Info Text"
        showIcon
        description="Info Description Info Description Info Description Info Description"
        type="info"
        action={
          <Space vertical>
            <Button size="small" type="primary">
              Accept
            </Button>
            <Button size="small" danger ghost>
              Decline
            </Button>
          </Space>
        }
      />
    </SemanticPreview>
  );
};

export default App;
