import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素，包含标签页容器的基础样式、布局和方向控制',
    item: 'Item 元素，包含相对定位、内边距、颜色、文本省略、圆角、过渡动画等标签项的样式和交互效果',
    header: '头部元素，包含标签页头部导航的布局、背景、边框等样式',
    indicator: '指示器元素，包含指示条的颜色、位置、尺寸、过渡动画等活跃状态指示样式',
    content: '内容元素，包含标签页内容面板的布局、内边距等内容展示样式',
    'popup.root': '弹出菜单元素，包含下拉菜单的绝对定位、层级、显示控制、最大高度、滚动等样式',
  },
  en: {
    root: 'Root element with basic tab container styles, layout and direction control',
    item: 'Item element with relative positioning, padding, colors, text ellipsis, border-radius, transitions and other tab item styles and interactive effects',
    header:
      'Header element with tab navigation header layout, background, borders and other styles',
    indicator:
      'Indicator element with indicator bar color, position, dimensions, transitions and other active state indication styles',
    content:
      'Content element with tab content panel layout, padding and other content display styles',
    'popup.root':
      'Popup menu element with dropdown absolute positioning, z-index, display control, max-height, scrolling and other styles',
  },
};

const Block: React.FC<Readonly<TabsProps>> = (props) => {
  return (
    <Tabs
      {...props}
      defaultActiveKey="1"
      style={{ height: 220, width: '100%' }}
      styles={{
        popup: {
          root: { background: '#fff' },
        },
      }}
      items={Array.from({ length: 30 }, (_, i) => {
        const id = String(i);
        return {
          label: `Tab-${id}`,
          key: id,
          disabled: i === 28,
          children: `Content of tab ${id}`,
        };
      })}
    />
  );
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Tabs"
      semantics={[
        { name: 'root', desc: locale.root },
        { name: 'header', desc: locale.root },
        { name: 'item', desc: locale.item },
        { name: 'indicator', desc: locale.indicator },
        { name: 'content', desc: locale.content },
        { name: 'popup.root', desc: locale['popup.root'] },
      ]}
    >
      <Block />
    </SemanticPreview>
  );
};

export default App;
