import React from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

const layoutStyle: React.CSSProperties = {
  position: 'relative',
  minHeight: 360,
};

const siderStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  insetInlineStart: 0,
  zIndex: 10,
};

const items: MenuProps['items'] = [
  PieChartOutlined,
  DesktopOutlined,
  TeamOutlined,
  FileOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));

const App: React.FC = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const currentYear = new Date().getFullYear();

  return (
    <Layout style={layoutStyle}>
      <Sider
        collapsible
        collapsed={collapsed}
        collapsedWidth="0"
        style={siderStyle}
        trigger={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onCollapse={setCollapsed}
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items} />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content style={{ margin: '24px 16px 0' }}>
          <div
            style={{
              padding: 24,
              minHeight: 240,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            Content keeps its full width when the sider overlays it.
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{currentYear} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
