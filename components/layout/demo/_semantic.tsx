import React from 'react';
import { Layout } from 'antd';

import useLocale from '../../../.dumi/hooks/useLocale';
import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';

const { Sider } = Layout;

const locales = {
  cn: {
    root: '根元素，包含 Sider 的布局、主题、宽度和折叠状态样式',
    body: '内容包裹元素，包含 Sider 子内容的布局和展示样式',
  },
  en: {
    root: 'Root element with Sider layout, theme, width and collapsed state styles',
    body: 'Body element that wraps Sider children layout and display styles',
  },
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Layout.Sider"
      semantics={[
        { name: 'root', desc: locale.root },
        { name: 'body', desc: locale.body },
      ]}
    >
      <Sider styles={{ body: { minHeight: 96 } }}>Sider</Sider>
    </SemanticPreview>
  );
};

export default App;
