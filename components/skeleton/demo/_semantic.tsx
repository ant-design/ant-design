import React from 'react';
import { Skeleton } from 'antd';

import type { SemanticClassNames } from '../../_util/hooks';
import useLocale from '../../../.dumi/hooks/useLocale';
import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';
import type { SemanticName } from '../Skeleton';

const locales: Record<'cn' | 'en', Required<SemanticClassNames<SemanticName>>> = {
  cn: {
    root: '根元素，包含表格显示、宽度、动画效果、圆角等骨架屏容器的基础样式',
    header: '头部元素，包含表格单元格、内边距、垂直对齐等头像占位区域的布局样式',
    section: '区块元素，包含骨架屏内容区域的布局样式',
    avatar: '头像元素，包含行内块显示、垂直对齐、背景色、尺寸、圆角等头像占位的样式',
    title: '标题元素，包含宽度、高度、背景色、圆角等标题占位的样式',
    paragraph: '段落元素，包含内边距、列表项样式、背景色、圆角等段落占位的样式',
  },
  en: {
    root: 'Root element with table display, width, animation effects, border radius and other skeleton container basic styles',
    header:
      'Header element with table cell, padding, vertical alignment and other avatar placeholder area layout styles',
    section: 'Section element with skeleton content area layout styles',
    avatar:
      'Avatar element with inline-block display, vertical alignment, background color, size, border radius and other avatar placeholder styles',
    title:
      'Title element with width, height, background color, border radius and other title placeholder styles',
    paragraph:
      'Paragraph element with padding, list item styles, background color, border radius and other paragraph placeholder styles',
  },
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Skeleton"
      semantics={[
        { name: 'root', desc: locale.root, version: '6.0.0' },
        { name: 'header', desc: locale.header, version: '6.0.0' },
        { name: 'section', desc: locale.section, version: '6.0.0' },
        { name: 'avatar', desc: locale.avatar, version: '6.0.0' },
        { name: 'title', desc: locale.title, version: '6.0.0' },
        { name: 'paragraph', desc: locale.paragraph, version: '6.0.0' },
      ]}
    >
      <Skeleton avatar paragraph={{ rows: 4 }} />
    </SemanticPreview>
  );
};

export default App;
