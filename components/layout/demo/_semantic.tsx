import React from 'react';
import { Layout } from 'antd';

import useLocale from '../../../.dumi/hooks/useLocale';
import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';

const { Sider } = Layout;

const locales = {
  cn: {
    body: '内部内容容器',
  },
  en: {
    body: 'Inner content wrapper',
  },
};

const SiderBlock: React.FC<React.ComponentProps<typeof Sider>> = (props) => (
  <Layout style={{ width: '100%', height: 240 }}>
    <Sider {...props}>Sider</Sider>
    <Layout.Content style={{ padding: 24 }}>Content</Layout.Content>
  </Layout>
);

const App: React.FC = () => {
  const [locale] = useLocale(locales);

  return (
    <SemanticPreview
      componentName="Layout.Sider"
      height={240}
      semantics={[{ name: 'body', desc: locale.body, version: '6.5.0' }]}
    >
      <SiderBlock />
    </SemanticPreview>
  );
};

export default App;
