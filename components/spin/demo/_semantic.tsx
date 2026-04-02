import React from 'react';
import { Spin } from 'antd';
import type { SpinProps } from 'antd';

import useLocale from '../../../.dumi/hooks/useLocale';
import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';

const locales = {
  cn: {
    root: '根元素，设置绝对定位、显示控制、颜色、字体大小、文本对齐、垂直对齐、透明度和过渡动画(fullscreen 为 false 时才有效)',
    section: '加载元素区域，设置相对定位、弹性盒子布局、对齐方式和颜色',
    indicator: '指示器元素，设置宽度、高度、字体大小、行内块显示、过渡动画、变换原点、行高',
    description: '描述元素，设置字体大小、行高',
    container: '容器元素，放置被 Spin 包裹的子元素，设置透明度和过渡动画',
  },
  en: {
    root: 'The root element, which sets absolute positioning, display control, color, font size, text alignment, vertical alignment, opacity, and transition animation (only effective when fullscreen is false)',
    section:
      'The loading element area, which sets relative positioning, flexbox layout, alignment, and color',
    indicator:
      'The indicator element, which sets width, height, font size, inline-block display, transition animation, transform origin, and line height',
    description: 'The description element, which sets font size and line height',
    container:
      'The container element that holds the child elements wrapped by Spin, setting opacity and transition animation',
  },
};

const sharedStyles: React.CSSProperties = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: '1 1 30%',
  borderInlineEnd: '1px solid rgba(150,150,150,0.2)',
};

const SpinBlock: React.FC<Readonly<SpinProps>> = (props) => {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        minHeight: '100%',
        alignItems: 'stretch',
      }}
    >
      <div style={sharedStyles}>
        <Spin percent={0} {...props} />
      </div>
      <div style={sharedStyles}>
        <Spin percent={0} {...props} description="Loading">
          <div
            style={{
              width: 100,
              height: 100,
              background: 'rgba(150,150,150,0.2)',
              borderRadius: 8,
            }}
          />
        </Spin>
      </div>
      <div style={sharedStyles}>
        <Spin
          percent={0}
          {...props}
          fullscreen
          description="Loading"
          style={{
            position: 'absolute',
          }}
        />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);

  return (
    <SemanticPreview
      padding={false}
      componentName="Spin"
      semantics={[
        { name: 'root', desc: locale.root, version: '6.0.0' },
        { name: 'section', desc: locale.section, version: '6.3.0' },
        { name: 'indicator', desc: locale.indicator, version: '6.0.0' },
        { name: 'description', desc: locale.description, version: '6.3.0' },
        { name: 'container', desc: locale.container, version: '6.3.0' },
      ]}
    >
      <SpinBlock />
    </SemanticPreview>
  );
};

export default App;
