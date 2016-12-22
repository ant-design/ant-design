---
order: 1
title:
  zh-CN: 上中下布局
  en-US: Header-Content-Footer
---

## zh-CN

最基本的『上-中-下』布局。

## en-US

The most basic "header-content-footer" layout.

````jsx
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;

ReactDOM.render(
  <Layout className="ant-layout-demo-top">
    <Header>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
      </Menu>
    </Header>
    <Content>
      <div className="breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="content">content</div>
    </Content>
    <Footer className="footer">
      Ant Design ©2016 Created by Ant UED
    </Footer>
  </Layout>
, mountNode);
````

````css
.ant-layout-demo-top .breadcrumb {
  padding: 7px 0 7px 24px;
  margin: 0 -24px;
  background: #ececec;
}

.ant-layout-demo-top .logo {
  width: 120px;
  height: 31px;
  background: #333;
  border-radius: 6px;
  margin: 16px 28px 16px 0;
  float: left;
}

.ant-layout-demo-top .content {
  min-height: 280px;
}

.ant-layout-demo-top .footer {
  text-align: center;
}
````
