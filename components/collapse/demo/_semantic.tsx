import React from 'react';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';

import useLocale from '../../../.dumi/hooks/useLocale';
import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';
import { useToken } from '../../theme/internal';

const locales = {
  cn: {
    root: '根元素，包含折叠面板的边框、圆角、背景色等容器样式，控制面板的整体布局和外观',
    header: '头部元素，包含flex布局、内边距、颜色、行高、光标样式、过渡动画等面板头部的交互和样式',
    title: '标题元素，包含flex自适应布局、右边距等标题文字的布局和排版样式',
    body: '内容元素，包含内边距、颜色、背景色等面板内容区域的展示样式',
    icon: '图标元素，包含字体大小、过渡动画、旋转变换等展开收起箭头的样式和动效',
  },
  en: {
    root: 'Root element with border, border-radius, background color and container styles that control the overall layout and appearance of collapse panels',
    header:
      'Header element with flex layout, padding, color, line-height, cursor style, transition animations and other interactive styles for panel headers',
    title:
      'Title element with flex auto layout and margin styles for title text layout and typography',
    body: 'Body element with padding, color, background color and other styles for panel content area display',
    icon: 'Icon element with font size, transition animations, rotation transforms and other styles and animations for expand/collapse arrows',
  },
};

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: 'This is panel header',
    children: <p>This is panel body</p>,
  },
];

const BlockCollapse: React.FC<CollapseProps> = (props) => {
  const [, token] = useToken();
  return (
    <div style={{ position: 'absolute', inset: 0, margin: token.marginXL }}>
      <Collapse {...props} items={items} defaultActiveKey={['1']} />
    </div>
  );
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Collapse"
      itemsAPI="items"
      semantics={[
        { name: 'root', desc: locale.root, version: '6.0.0' },
        { name: 'header', desc: locale.header, version: '5.21.0' },
        { name: 'icon', desc: locale.icon, version: '6.0.0' },
        { name: 'title', desc: locale.title, version: '6.0.0' },
        { name: 'body', desc: locale.body, version: '5.21.0' },
      ]}
    >
      <BlockCollapse />
    </SemanticPreview>
  );
};

export default App;
