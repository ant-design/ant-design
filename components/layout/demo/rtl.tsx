import React from 'react';
import { ConfigProvider, Layout, Menu } from 'antd';

const App = () => {
  const { Header, Footer, Sider, Content } = Layout;
  const items = [
    {
      key: '1',
      label: 'nav 1',
    },
  ];
  return (
    <ConfigProvider direction="rtl">
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible>
          <div className="demo-logo-vertical" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
        </Sider>
        <Layout>
          <Header style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <div
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              content
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
