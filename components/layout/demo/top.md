---
order: 0
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
const Header = Layout.Header;
const Content = Layout.Content;
const Footer = Layout.Footer;

ReactDOM.render(
  <Layout className="ant-layout-demo-top">
    <Header>
      <div className="ant-layout-demo-top-nav">
        <div className="ant-layout-demo-top-logo" />
        <Menu theme="dark" mode="horizontal"
          defaultSelectedKeys={['2']} style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </div>
      <div className="ant-layout-demo-top-breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    </Header>
    <Content className="ant-layout-demo-top-content">
      <div className="ant-layout-demo-top-container">
        <div style={{ height: 210 }} />
      </div>
    </Content>
    <Footer className="ant-layout-demo-top-footer">
      Ant Design ©2016 Created by Ant UED
    </Footer>
  </Layout>
, mountNode);
````

````css
.ant-layout-demo-top {
  background: #ececec;
}

.ant-layout-demo-top .ant-layout-demo-top-nav {
  background: #404040;
  height: 64px;
  padding: 0 50px;
}

.ant-layout-demo-top .ant-layout-demo-top-breadcrumb {
  margin: 7px 0 7px 74px;
}

.ant-layout-demo-top .ant-layout-demo-top-logo {
  width: 120px;
  height: 31px;
  background: #333;
  border-radius: 6px;
  margin: 16px 28px 16px 0;
  float: left;
}

.ant-layout-demo-top .ant-layout-demo-top-content {
  padding: 0 50px;
}

.ant-layout-demo-top .ant-layout-demo-top-container {
  background: #fff;
}

.ant-layout-demo-top .ant-layout-demo-top-footer {
  height: 64px;
  line-height: 64px;
  text-align: center;
  font-size: 12px;
  color: #999;
}
````
