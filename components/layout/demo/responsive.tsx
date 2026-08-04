import React, { useEffect, useState } from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Grid, Layout, Menu, Radio, theme } from 'antd';

const { Header, Content, Footer, Sider } = Layout;
const { useBreakpoint } = Grid;

const items = [UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
  (icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label: `nav ${index + 1}`,
  }),
);

const SiderWithBreakpoint = () => (
  <Sider
    breakpoint="lg"
    collapsedWidth="0"
    onBreakpoint={(broken) => {
      console.log('onBreakpoint:', broken);
    }}
  >
    <div className="demo-logo-vertical" />
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
  </Sider>
);

const SiderWithHook = () => {
  const screens = useBreakpoint();
  const [collapsed, setCollapsed] = useState(!screens.lg);

  useEffect(() => {
    setCollapsed(!screens.lg);
  }, [screens.lg]);

  return (
    <Sider
      collapsible={!screens.lg}
      collapsed={collapsed}
      onCollapse={setCollapsed}
      collapsedWidth="0"
    >
      <div className="demo-logo-vertical" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
    </Sider>
  );
};

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [useMode, setUseMode] = useState<'breakpoint' | 'hook'>('hook');

  const currentYear = new Date().getFullYear();

  return (
    <>
      <div style={{ textAlign: 'end', padding: 16 }}>
        <Radio.Group
          value={useMode}
          onChange={(e) => setUseMode(e.target.value)}
          optionType="button"
          buttonStyle="solid"
        >
          <Radio.Button value="hook">useBreakpoint</Radio.Button>
          <Radio.Button value="breakpoint">breakpoint prop</Radio.Button>
        </Radio.Group>
      </div>

      <Layout>
        {useMode === 'breakpoint' ? <SiderWithBreakpoint /> : <SiderWithHook />}
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }} />
          <Content style={{ margin: '24px 16px 0' }}>
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              Current mode: {useMode === 'hook' ? 'useBreakpoint (controlled)' : 'breakpoint prop'}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©{currentYear} Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default App;
