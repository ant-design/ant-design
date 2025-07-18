import React from 'react';
import { Timeline } from 'antd';

import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素，包含列表样式重置、外边距、内边距等时间轴容器的基础样式',
    item: '节点元素，包含相对定位、外边距、内边距、字体大小、列表样式重置等单个时间节点的基础样式',
    itemWrapper: '节点内裹元素，包含时间节点内容的包装样式',
    itemIcon: '节点图标元素，包含绝对定位、宽高、背景色、边框、圆角等节点头部图标的样式',
    itemHeader: '节点头部元素',
    itemTitle: '节点标题元素',
    itemSection: '节点区域元素',
    itemContent: '节点内容元素，包含相对定位、顶部偏移、左侧外边距、词汇换行等节点内容的样式',
    itemRail: '节点连接线元素，包含绝对定位、顶部偏移、左侧偏移、高度、边框样式等连接线的样式',
  },
  en: {
    root: 'Root element with list style reset, margin, padding and other timeline container basic styles',
    item: 'Item element with relative positioning, margin, padding, font size, list style reset and other single timeline node basic styles',
    itemWrapper: 'Item wrapper element with timeline node content wrapping styles',
    itemIcon:
      'Item icon element with absolute positioning, width/height, background color, border, border radius and other node head icon styles',
    itemHeader: 'Item header element',
    itemTitle: 'Item title element',
    itemSection: 'Item section element',
    itemContent:
      'Item content element with relative positioning, top offset, left margin, word break and other node content styles',
    itemRail:
      'Item rail element with absolute positioning, top offset, left offset, height, border styles and other connection line styles',
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
