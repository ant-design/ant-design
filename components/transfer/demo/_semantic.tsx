import React from 'react';
import { Transfer } from 'antd';

import useLocale from '../../../.dumi/hooks/useLocale';
import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';

const locales = {
  cn: {
    root: '根元素，设置flex布局、穿梭框容器的基础样式和布局控制',
    section: '区域元素，设置flex布局、宽度、高度、最小高度、边框、圆角等单侧穿梭框的容器样式',
    header:
      '头部元素，设置flex布局、对齐方式、高度、内边距、颜色、背景色、下边框、圆角等头部区域的样式',
    title: '标题元素，设置文本省略、flex占比、文本对齐、自动左边距等标题文字的布局和样式',
    body: '内容元素，设置列表主体区域的容器样式和布局控制',
    list: '列表元素，设置列表内容的样式、布局和滚动控制',
    item: '列表项元素，设置相对定位、内边距、边框、悬停态、选中态、禁用态等列表项的交互样式',
    itemIcon: '列表项图标元素，设置复选框等图标的样式和交互状态',
    itemContent: '列表项内容元素，设置文本省略、内边距等列表项文本内容的展示样式',
    footer: '页脚元素，设置底部操作区域的样式和布局',
    actions: '操作元素，设置穿梭按钮组的样式、布局和交互状态',
  },
  en: {
    root: 'Root element with flex layout, transfer container base styles and layout control',
    section:
      'Section element with flex layout, width, height, min height, border, border radius and other single-side transfer container styles',
    header:
      'Header element with flex layout, alignment, height, padding, color, background color, bottom border, border radius and other header area styles',
    title:
      'Title element with text ellipsis, flex ratio, text alignment, auto left margin and other title text layout and styles',
    body: 'Body element with list main area container styles and layout control',
    list: 'List element with list content styles, layout and scroll control',
    item: 'List item element with relative positioning, padding, border, hover state, selected state, disabled state and other list item interaction styles',
    itemIcon: 'List item icon element with checkbox and other icon styles and interaction states',
    itemContent:
      'List item content element with text ellipsis, padding and other list item text content display styles',
    footer: 'Footer element with bottom operation area styles and layout',
    actions: 'Actions element with transfer button group styles, layout and interaction states',
  },
};

const mockData = Array.from({ length: 20 }).map((_, i) => ({
  key: i,
  title: `content ${i + 1}`,
}));

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Transfer"
      semantics={[
        { name: 'root', desc: locale.root },
        { name: 'section', desc: locale.section },
        { name: 'header', desc: locale.header },
        { name: 'title', desc: locale.title },
        { name: 'body', desc: locale.body },
        { name: 'list', desc: locale.list },
        { name: 'item', desc: locale.item },
        { name: 'itemIcon', desc: locale.itemIcon },
        { name: 'itemContent', desc: locale.itemContent },
        { name: 'footer', desc: locale.footer },
        { name: 'actions', desc: locale.actions },
      ]}
    >
      <Transfer
        showSearch
        titles={['Source', 'Target']}
        dataSource={mockData}
        selectedKeys={[]}
        targetKeys={[3, 9]}
        render={(item) => item.title}
        footer={() => <div style={{ padding: 8 }}>Custom Footer</div>}
        styles={{
          section: {
            height: 250,
            width: 200,
          },
        }}
      />
    </SemanticPreview>
  );
};

export default App;
