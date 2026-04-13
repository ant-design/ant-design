import React from 'react';
import { Transfer } from 'antd';

import useLocale from '../../../.dumi/hooks/useLocale';
import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';

const locales = {
  cn: {
    root: '根元素，设置flex布局、穿梭框容器的基础样式和布局控制',
    section: '区域元素，设置flex布局、宽度、高度、最小高度、边框、圆角等单侧穿梭框的容器样式',
    'source.section': '源区域元素，仅作用于左侧穿梭框容器样式',
    'target.section': '目标区域元素，仅作用于右侧穿梭框容器样式',
    'source.header': '源头部元素，仅作用于左侧头部区域样式',
    'target.header': '目标头部元素，仅作用于右侧头部区域样式',
    'source.title': '源标题元素，仅作用于左侧标题文本样式',
    'target.title': '目标标题元素，仅作用于右侧标题文本样式',
    'source.body': '源内容元素，仅作用于左侧列表主体区域样式',
    'target.body': '目标内容元素，仅作用于右侧列表主体区域样式',
    'source.list': '源列表元素，仅作用于左侧列表内容区域样式',
    'target.list': '目标列表元素，仅作用于右侧列表内容区域样式',
    'source.item': '源列表项元素，仅作用于左侧列表项样式',
    'target.item': '目标列表项元素，仅作用于右侧列表项样式',
    'source.itemIcon': '源列表项图标元素，仅作用于左侧图标样式',
    'target.itemIcon': '目标列表项图标元素，仅作用于右侧图标样式',
    'source.itemContent': '源列表项内容元素，仅作用于左侧文本内容样式',
    'target.itemContent': '目标列表项内容元素，仅作用于右侧文本内容样式',
    'source.footer': '源页脚元素，仅作用于左侧页脚区域样式',
    'target.footer': '目标页脚元素，仅作用于右侧页脚区域样式',
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
    'source.section':
      'Source section element, only applies to left transfer section container styles',
    'target.section':
      'Target section element, only applies to right transfer section container styles',
    'source.header': 'Source header element, only applies to left header area styles',
    'target.header': 'Target header element, only applies to right header area styles',
    'source.title': 'Source title element, only applies to left title text styles',
    'target.title': 'Target title element, only applies to right title text styles',
    'source.body': 'Source body element, only applies to left list body styles',
    'target.body': 'Target body element, only applies to right list body styles',
    'source.list': 'Source list element, only applies to left list content styles',
    'target.list': 'Target list element, only applies to right list content styles',
    'source.item': 'Source item element, only applies to left list item styles',
    'target.item': 'Target item element, only applies to right list item styles',
    'source.itemIcon': 'Source item icon element, only applies to left icon styles',
    'target.itemIcon': 'Target item icon element, only applies to right icon styles',
    'source.itemContent': 'Source item content element, only applies to left text content styles',
    'target.itemContent': 'Target item content element, only applies to right text content styles',
    'source.footer': 'Source footer element, only applies to left footer area styles',
    'target.footer': 'Target footer element, only applies to right footer area styles',
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
        { name: 'source.section', desc: locale['source.section'] },
        { name: 'target.section', desc: locale['target.section'] },
        { name: 'source.header', desc: locale['source.header'] },
        { name: 'target.header', desc: locale['target.header'] },
        { name: 'source.title', desc: locale['source.title'] },
        { name: 'target.title', desc: locale['target.title'] },
        { name: 'source.body', desc: locale['source.body'] },
        { name: 'target.body', desc: locale['target.body'] },
        { name: 'source.list', desc: locale['source.list'] },
        { name: 'target.list', desc: locale['target.list'] },
        { name: 'source.item', desc: locale['source.item'] },
        { name: 'target.item', desc: locale['target.item'] },
        { name: 'source.itemIcon', desc: locale['source.itemIcon'] },
        { name: 'target.itemIcon', desc: locale['target.itemIcon'] },
        { name: 'source.itemContent', desc: locale['source.itemContent'] },
        { name: 'target.itemContent', desc: locale['target.itemContent'] },
        { name: 'source.footer', desc: locale['source.footer'] },
        { name: 'target.footer', desc: locale['target.footer'] },
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
          source: {
            section: {
              backgroundColor: '#fff7e6',
            },
          },
          target: {
            section: {
              backgroundColor: '#e6f7ff',
            },
          },
        }}
      />
    </SemanticPreview>
  );
};

export default App;
