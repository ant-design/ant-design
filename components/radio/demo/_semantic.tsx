import React from 'react';
import { Radio } from 'antd';

import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素，包含布局样式、鼠标样式、禁用状态文字颜色等基础容器样式',
    icon: '选中框元素，包含圆角样式、过渡动画、边框样式、悬停状态、焦点状态等交互样式',
    label: '文本元素，包含内边距、文字颜色、禁用状态、对齐方式等文本样式',
  },
  en: {
    root: 'Root element with layout styles, cursor styles, disabled text color and other basic container styles',
    icon: 'Icon element with border radius, transition animations, border styles, hover states, focus states and other interactive styles',
    label:
      'Label element with padding, text color, disabled states, alignment and other text styles',
  },
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Radio"
      semantics={[
        { name: 'root', desc: locale.root, version: '6.0.0' },
        { name: 'icon', desc: locale.icon, version: '6.0.0' },
        { name: 'label', desc: locale.label, version: '6.0.0' },
      ]}
    >
      <Radio>Radio</Radio>
    </SemanticPreview>
  );
};

export default App;
