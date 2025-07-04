import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, ConfigProvider, Layout, Menu, theme } from 'antd';

const { Header, Content, Sider } = Layout;

const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,
      children: Array.from({ length: 4 }).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  },
);

const App: React.FC = () => {
  const {
    token: { colorBgContainer, colorBgLayout, borderRadiusLG },
  } = theme.useToken();

  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            bodyBg: '#fff',
            headerBg: '#1677ff',
            headerHeight: 64,
            headerPadding: `0 24px`,
            headerColor: colorBgContainer,
            siderBg: '#800080',
          },
        },
      }}
    >
      <Layout>
        <Header style={{ display: 'flex', alignItems: 'center' }}>
          <div className="demo-logo" />
          <div style={{ marginInlineStart: 24, fontSize: 24 }}>Ant Design</div>
        </Header>
        <Layout>
          <ConfigProvider
            theme={{
              components: {
                Layout: {
                  siderBg: 'red',
                },
              },
            }}
          >
            <Sider width={32} />
          </ConfigProvider>
          <Sider width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ borderRight: 0 }}
              items={items2}
            />
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: colorBgLayout,
                borderRadius: borderRadiusLG,
              }}
            >
              Content
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
