import React from 'react';
import { Avatar, Badge } from 'antd';

import useLocale from '../../../.dumi/hooks/useLocale';
import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';

const locales = {
  cn: {
    root: '根元素，包含相对定位、行内块布局、适应内容宽度等基础布局样式',
    indicator:
      '指示器元素，包含定位、层级、尺寸、颜色、字体、文本对齐、背景、圆角、阴影、过渡动画等完整的徽标样式',
  },
  en: {
    root: 'Root element with relative positioning, inline-block display, and fit-content width for basic layout',
    indicator:
      'Indicator element with positioning, z-index, dimensions, colors, fonts, text alignment, background, border-radius, box-shadow, and transition animations for complete badge styling',
  },
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Badge"
      semantics={[
        { name: 'root', desc: locale.root, version: '5.7.0' },
        { name: 'indicator', desc: locale.indicator, version: '5.7.0' },
      ]}
    >
      <Badge count={5}>
        <Avatar shape="square" size="large" />
      </Badge>
    </SemanticPreview>
  );
};

export default App;
