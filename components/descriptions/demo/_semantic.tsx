import React from 'react';
import { Button, Descriptions, Divider, Switch } from 'antd';
import type { DescriptionsProps } from 'antd';

import useLocale from '../../../.dumi/hooks/useLocale';
import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';

const locales = {
  cn: {
    root: '根元素，包含描述列表容器的基础样式、重置样式、边框样式、布局方向等整体样式',
    header: '头部元素，包含flex布局、对齐方式、下边距等头部区域的布局和样式控制',
    title: '标题元素，包含文本省略、flex占比、颜色、字体权重、字体大小、行高等标题文字样式',
    extra: '额外内容元素，包含左边距、颜色、字体大小等额外操作区域的样式',
    label: '标签元素，包含颜色、字体权重、字体大小、行高、文本对齐、冒号样式等标签文字的样式',
    content: '内容元素，包含表格单元格布局、颜色、字体大小、行高、文字换行等内容展示样式',
  },
  en: {
    root: 'Root element with basic styles, reset styles, border styles, layout direction and other overall styles for description list container',
    header:
      'Header element with flex layout, alignment, bottom margin and other layout and style controls for header area',
    title:
      'Title element with text ellipsis, flex ratio, color, font weight, font size, line height and other title text styles',
    extra:
      'Extra content element with left margin, color, font size and other styles for additional operation area',
    label:
      'Label element with color, font weight, font size, line height, text align, colon styles and other label text styles',
    content:
      'Content element with table cell layout, color, font size, line height, word break and other content display styles',
  },
};

const items: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'Telephone',
    children: '1810000000',
  },
];

const BlockList: React.FC<React.PropsWithChildren<DescriptionsProps>> = (props) => {
  const { children, ...rest } = props;
  const divRef = React.useRef<HTMLDivElement>(null);
  const [bordered, setBordered] = React.useState(false);
  return (
    <div ref={divRef} style={{ width: '100%', height: '100%' }}>
      <Switch checked={bordered} onChange={setBordered} />
      Toggle Border
      <Divider />
      <Descriptions
        title="User Info"
        items={items}
        extra={<Button type="primary">Edit</Button>}
        bordered={bordered}
        {...rest}
      >
        {children}
      </Descriptions>
    </div>
  );
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Descriptions"
      semantics={[
        { name: 'root', desc: locale.root, version: '5.23.0' },
        { name: 'header', desc: locale.header, version: '5.23.0' },
        { name: 'title', desc: locale.title, version: '5.23.0' },
        { name: 'extra', desc: locale.extra, version: '5.23.0' },
        { name: 'label', desc: locale.label, version: '5.23.0' },
        { name: 'content', desc: locale.content, version: '5.23.0' },
      ]}
    >
      <BlockList />
    </SemanticPreview>
  );
};

export default App;
