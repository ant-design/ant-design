import React from 'react';
import { Spin } from 'antd';
import type { SpinProps } from 'antd';

import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素，设置绝对定位、显示控制、颜色、字体大小、文本对齐、垂直对齐、透明度和过渡动画(fullscreen 为 false 时才有效)',
    indicator: '指示器元素，设置宽度、高度、字体大小、行内块显示、过渡动画、变换原点、行高和颜色',
  },
  en: {
    root: 'Root element with absolute positioning, display control, color, font size, text alignment, vertical alignment, opacity and transition animation (effective when fullscreen is false)',
    indicator:
      'Indicator element with width, height, font size, inline-block display, transition animation, transform origin, line height and color',
  },
};

const SpinBlock: React.FC<Readonly<SpinProps>> = (props) => {
  return (
    <div
      style={{
        position: 'relative',
        width: 500,
        height: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Spin percent={0} {...props} />
    </div>
  );
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);

  return (
    <SemanticPreview
      componentName="Spin"
      semantics={[
        { name: 'root', desc: locale.root, version: '6.0.0' },
        { name: 'indicator', desc: locale.indicator, version: '6.0.0' },
      ]}
    >
      <SpinBlock />
    </SemanticPreview>
  );
};

export default App;
