import React from 'react';
import { Button, Result } from 'antd';

import useLocale from '../../../.dumi/hooks/useLocale';
import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';

const locales = {
  cn: {
    root: '根元素，包含文本对齐、布局样式等基础容器样式',
    title: '标题元素，包含字体大小、文字颜色、行高、对齐方式等文字样式',
    subTitle: '副标题元素，包含字体大小、文字颜色、行高等文字样式',
    body: '内容元素，包含外边距、内边距、背景色等内容区域样式',
    extra: '操作区域元素，包含外边距、文本对齐、内部元素间距等布局样式',
    icon: '图标元素，包含外边距、文本对齐、字体大小、状态颜色等图标样式',
  },
  en: {
    root: 'Root element with text alignment, layout styles and other basic container styles',
    title:
      'Title element with font size, text color, line height, text alignment and other text styles',
    subTitle: 'Subtitle element with font size, text color, line height and other text styles',
    body: 'Content element with margin, padding, background color and other content area styles',
    extra:
      'Action area element with margin, text alignment, inner element spacing and other layout styles',
    icon: 'Icon element with margin, text alignment, font size, status colors and other icon styles',
  },
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Result"
      semantics={[
        { name: 'root', desc: locale.root, version: '6.0.0' },
        { name: 'icon', desc: locale.icon, version: '6.0.0' },
        { name: 'title', desc: locale.title, version: '6.0.0' },
        { name: 'subTitle', desc: locale.subTitle, version: '6.0.0' },
        { name: 'extra', desc: locale.extra, version: '6.0.0' },
        { name: 'body', desc: locale.body, version: '6.0.0' },
      ]}
    >
      <Result
        title="title"
        subTitle="subTitle"
        extra={
          <Button type="primary" key="console">
            extra
          </Button>
        }
      >
        <div style={{ textAlign: 'center' }}>The Content of Result</div>
      </Result>
    </SemanticPreview>
  );
};

export default App;
