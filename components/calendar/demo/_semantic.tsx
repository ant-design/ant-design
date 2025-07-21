import React from 'react';
import { Calendar } from 'antd';

import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素，包含日历组件的背景色、边框、圆角等基础样式和整体布局结构',
    header: '头部元素，包含年份选择器、月份选择器、模式切换器的布局和样式控制',
    body: '主体元素，包含日历表格的内边距、布局控制等样式，用于容纳日历网格',
    content: '内容元素，包含日历表格的宽度、高度等尺寸控制和表格样式',
    item: '条目元素，包含日历单元格的背景色、边框、悬停态、选中态等交互样式',
  },
  en: {
    root: 'Root element containing background, border, border-radius and overall layout structure of the calendar component',
    header:
      'Header element with layout and style control for year selector, month selector and mode switcher',
    body: 'Body element with padding and layout control for the calendar table that contains the calendar grid',
    content: 'Content element with width, height and table styling control for the calendar table',
    item: 'Item element with background, border, hover state, selected state and other interactive styles for calendar cells',
  },
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Calendar"
      semantics={[
        { name: 'root', desc: locale.root, version: '6.0.0' },
        { name: 'header', desc: locale.header, version: '6.0.0' },
        { name: 'body', desc: locale.body, version: '6.0.0' },
        { name: 'content', desc: locale.content, version: '6.0.0' },
        { name: 'item', desc: locale.item, version: '6.0.0' },
      ]}
    >
      <Calendar />
    </SemanticPreview>
  );
};

export default App;
