import React from 'react';
import { Timeline } from 'antd';

import useLocale from '../../../.dumi/hooks/useLocale';
import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';

const locales = {
  cn: {
    root: '根元素，设置时间轴容器的列表样式重置、垂直布局、点状图标、轮廓样式、交替布局等基础容器样式',
    item: '节点元素，设置单个时间节点的相对定位、外边距、内边距、字体大小、完成状态、颜色主题、布局方向等节点基础样式',
    itemWrapper: '节点包装元素，设置时间节点内容的包装容器样式',
    itemIcon:
      '节点图标元素，设置节点头部图标的绝对定位、宽高尺寸、背景色、边框、圆角、波纹动画等图标样式',
    itemHeader: '节点头部元素，设置包含标题和连接线的头部区域布局、对齐方式、文本方向等样式',
    itemTitle: '节点标题元素，设置节点标题文字的字体大小、行高、颜色等文本样式',
    itemSection: '节点区域元素，设置包含头部和内容的区域容器的Flex布局、换行、间距等布局样式',
    itemContent:
      '节点内容元素，设置节点详细内容的相对定位、顶部偏移、左侧外边距、文字颜色、词汇换行等内容样式',
    itemRail:
      '节点连接线元素，设置连接时间节点的轨道线条的绝对定位、顶部偏移、左侧偏移、高度、边框颜色、宽度、样式等连接线样式',
  },
  en: {
    root: 'Root element with timeline container list style reset, vertical layout, dot icon, outlined style, alternate layout and other basic container styles',
    item: 'Item element with single timeline node relative positioning, margin, padding, font size, finish state, color theme, layout direction and other node basic styles',
    itemWrapper: 'Item wrapper element with timeline node content wrapping container styles',
    itemIcon:
      'Item icon element with node head icon absolute positioning, width/height size, background color, border, border radius, wave animation and other icon styles',
    itemHeader:
      'Item header element with header area layout containing title and rail, alignment, text direction and other styles',
    itemTitle:
      'Item title element with node title text font size, line height, color and other text styles',
    itemSection:
      'Item section element with section container containing header and content flex layout, wrap, gap and other layout styles',
    itemContent:
      'Item content element with node detail content relative positioning, top offset, left margin, text color, word break and other content styles',
    itemRail:
      'Item rail element with timeline node connection track line absolute positioning, top offset, left offset, height, border color, width, style and other connection line styles',
  },
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Timeline"
      semantics={[
        { name: 'root', desc: locale.root },
        { name: 'item', desc: locale.item },
        { name: 'itemWrapper', desc: locale.itemWrapper },
        { name: 'itemIcon', desc: locale.itemIcon },
        { name: 'itemSection', desc: locale.itemSection },
        { name: 'itemHeader', desc: locale.itemHeader },
        { name: 'itemTitle', desc: locale.itemTitle },
        { name: 'itemContent', desc: locale.itemContent },
        { name: 'itemRail', desc: locale.itemRail },
      ]}
    >
      <Timeline
        items={[
          {
            title: '2015-09-01',
            content: 'Create a services',
          },
          {
            title: '2015-09-01 09:12:11',
            content: 'Solve initial network problems',
          },
          {
            content: 'Technical testing',
          },
          {
            title: '2015-09-01 09:12:11',
            content: 'Network problems being solved',
          },
        ]}
      />
    </SemanticPreview>
  );
};

export default App;
