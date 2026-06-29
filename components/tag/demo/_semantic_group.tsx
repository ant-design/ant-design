import React from 'react';
import { Tag } from 'antd';

import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素，设置标签组的容器样式和布局',
    item: '标签项元素，设置行内块显示、高度、内边距、字体大小、行高、背景色、边框、圆角、透明度、过渡动画、可选中状态等样式',
  },
  en: {
    root: 'Root element with tag group container styles and layout',
    item: 'Tag item element with inline-block display, height, padding, font size, line height, background color, border, border radius, opacity, transition animation, checkable state and other styles',
  },
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Tag"
      semantics={[
        { name: 'root', desc: locale.root },
        { name: 'item', desc: locale.item },
      ]}
    >
      <Tag.CheckableTagGroup
        defaultValue="Books"
        options={['Movies', 'Books', 'Music', 'Sports']}
      />
    </SemanticPreview>
  );
};

export default App;
