import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';

const { Header, Content, Sider } = Layout;

const mainItems: MenuProps['items'] = [
  { key: 'dashboard', icon: <PieChartOutlined />, label: 'Dashboard' },
  { key: 'workspace', icon: <DesktopOutlined />, label: 'Workspace' },
  { key: 'team', icon: <TeamOutlined />, label: 'Team' },
  { key: 'files', icon: <FileOutlined />, label: 'Files' },
];

const bottomItems: MenuProps['items'] = [
  { key: 'account', icon: <UserOutlined />, label: 'Account' },
  { key: 'settings', icon: <SettingOutlined />, label: 'Settings' },
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('dashboard');
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const onMenuClick: MenuProps['onClick'] = ({ key }) => {
    setSelectedKey(key);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        styles={{ body: { display: 'flex', flexDirection: 'column' } }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          items={mainItems}
          selectedKeys={[selectedKey]}
          onClick={onMenuClick}
          style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}
        />
        <Menu
          theme="dark"
          mode="inline"
          items={bottomItems}
          selectedKeys={[selectedKey]}
          onClick={onMenuClick}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: 16 }}>
          <div
            style={{
              padding: 24,
              minHeight: 200,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {`Selected: ${selectedKey}`}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
