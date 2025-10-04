import React from 'react';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { Segmented } from 'antd';

import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素，设置行内块布局、内边距、背景色、圆角、过渡动画和容器样式',
    item: '选项元素，设置相对定位、文本对齐、光标样式、过渡动画、选中态背景色和悬停态样式',
    icon: '图标元素，设置图标的尺寸、颜色和与文本的间距样式',
    label: '标签内容元素，设置最小高度、行高、内边距、文本省略和内容布局样式',
  },
  en: {
    root: 'Root element with inline-block layout, padding, background, border radius, transition and container styles',
    item: 'Option element with relative positioning, text alignment, cursor style, transition, selected state background and hover styles',
    icon: 'Icon element with icon size, color and text spacing styles',
    label:
      'Label content element with min height, line height, padding, text ellipsis and content layout styles',
  },
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Segmented"
      semantics={[
        { name: 'root', desc: locale.root, version: '6.0.0' },
        { name: 'item', desc: locale.item, version: '6.0.0' },
        { name: 'label', desc: locale.label, version: '6.0.0' },
        { name: 'icon', desc: locale.icon, version: '6.0.0' },
      ]}
    >
      <Segmented
        options={[
          { label: 'List', value: 'List', icon: <BarsOutlined /> },
          { label: 'Kanban', value: 'Kanban', icon: <AppstoreOutlined /> },
        ]}
      />
    </SemanticPreview>
  );
};

export default App;
