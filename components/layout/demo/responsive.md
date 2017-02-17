---
order: 5
title:
  zh-CN: 响应式布局
  en-US: Responsive
---

## zh-CN

Layout.Sider 支持响应式布局。

## en-US

Layout.Sider supports responsive layout.

````jsx
import { Layout, Menu, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

ReactDOM.render(<Layout>
  <Sider breakpoint="lg" onResponse={(below) => { console.log(below); }}>
    <div className="logo" />
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
      <Menu.Item key="1">
        <Icon type="user" />
        <span className="nav-text">nav 1</span>
      </Menu.Item>
      <Menu.Item key="2">
        <Icon type="video-camera" />
        <span className="nav-text">nav 2</span>
      </Menu.Item>
      <Menu.Item key="3">
        <Icon type="upload" />
        <span className="nav-text">nav 3</span>
      </Menu.Item>
      <Menu.Item key="4">
        <Icon type="user" />
        <span className="nav-text">nav 4</span>
      </Menu.Item>
    </Menu>
  </Sider>
  <Layout>
    <Header style={{ background: '#fff', padding: 0 }} />
    <Content style={{ margin: '24px 16px 0' }}>
      <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
        content
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>
      Ant Design ©2016 Created by Ant UED
    </Footer>
  </Layout>
</Layout>, mountNode);
````

````css
#components-layout-demo-responsive .logo {
  height: 32px;
  background: #333;
  border-radius: 6px;
  margin: 16px;
}
````
