import React from 'react';
import { Flex, Steps } from 'antd';
import type { StepsProps } from 'antd';

import useLocale from '../../../.dumi/hooks/useLocale';
import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';
import type { SemanticPreviewInjectionProps } from '../../../.dumi/theme/common/SemanticPreview';

const locales = {
  cn: {
    root: '根元素，包含 flex 布局、禁止换行、对齐方式、CSS 变量等步骤条容器的基础样式',
    item: '步骤项元素，包含 flex 布局、相对定位等单个步骤项的基础容器样式',
    itemWrapper: '步骤项内裹元素，包含 flex 布局、禁止换行、顶部内边距等步骤项内容的包装样式',
    itemIcon: '步骤项图标元素，包含图标的尺寸、定位、字体大小等图标显示相关样式',
    itemHeader: '步骤项头部元素，包含 flex 布局、禁止换行、对齐方式等头部区域的布局样式',
    itemTitle: '步骤项标题元素，包含颜色、字体大小、行高、文字换行、过渡动画等标题文字样式',
    itemSubtitle:
      '步骤项副标题元素，包含颜色、字体权重、字体大小、行高、外边距、文字换行等副标题样式',
    itemSection: '步骤项区域元素，包含步骤项内容区域的布局和样式',
    itemContent: '步骤项内容元素，包含颜色、字体大小、行高、文字换行、过渡动画等内容文字样式',
    itemRail: '步骤项连接线元素，包含边框样式、边框宽度、过渡动画等连接线的样式',
  },
  en: {
    root: 'Root element with flex layout, nowrap, alignment, CSS variables and other basic step container styles',
    item: 'Step item element with flex layout, relative positioning and other basic step item container styles',
    itemWrapper:
      'Step item wrapper element with flex layout, nowrap, top padding and other step content wrapping styles',
    itemIcon:
      'Step item icon element with icon size, positioning, font-size and other icon display related styles',
    itemHeader:
      'Step item header element with flex layout, nowrap, alignment and other header area layout styles',
    itemTitle:
      'Step item title element with color, font-size, line-height, word-break, transitions and other title text styles',
    itemSubtitle:
      'Step item subtitle element with color, font-weight, font-size, line-height, margin, word-break and other subtitle styles',
    itemSection: 'Step item section element with step content area layout and styling',
    itemContent:
      'Step item content element with color, font-size, line-height, word-break, transitions and other content text styles',
    itemRail:
      'Step item rail element with border-style, border-width, transitions and other connecting line styles',
  },
};

const sharedProps: StepsProps = {
  current: 1,
  style: { width: '100%' },
  titlePlacement: 'vertical',
  items: Array.from({ length: 3 }, (_, index) => ({
    title: `Step ${index + 1}`,
    subTitle: `00:0${index}`,
    content: 'This is a content.',
  })),
};

const Block = (props: SemanticPreviewInjectionProps) => (
  <Flex vertical gap="large" style={{ width: '100%' }}>
    <Steps {...sharedProps} {...props} />
    <Steps {...sharedProps} {...props} type="panel" size="small" titlePlacement="horizontal" />
  </Flex>
);

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Steps"
      semantics={[
        { name: 'root', desc: locale.root },
        { name: 'item', desc: locale.item },
        { name: 'itemWrapper', desc: locale.itemWrapper },
        { name: 'itemIcon', desc: locale.itemIcon },
        { name: 'itemHeader', desc: locale.itemHeader },
        { name: 'itemTitle', desc: locale.itemTitle },
        { name: 'itemSubtitle', desc: locale.itemSubtitle },
        { name: 'itemSection', desc: locale.itemSection },
        { name: 'itemContent', desc: locale.itemContent },
        { name: 'itemRail', desc: locale.itemRail },
      ]}
    >
      <Block />
    </SemanticPreview>
  );
};

export default App;
