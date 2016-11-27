---
order: 2
title:
  zh-CN: 侧边布局
  en-US: Sider
---

## zh-CN

多用在两列式布局。

## en-US

Be used in the two-columns layout.

````jsx
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const Header = Layout.Header;
const Content = Layout.Content;
const Sider = Layout.Sider;
const Footer = Layout.Footer;

ReactDOM.render(
  <Layout className="ant-layout-demo-side">
    <Sider className="ant-layout-demo-side-sider" flexible width="200px" collapsedWidth="64px">
      <div className="ant-layout-demo-side-logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
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
        <Menu.Item key="5">
          <Icon type="heart-o" />
          <span className="nav-text">nav 5</span>
        </Menu.Item>
        <Menu.Item key="6">
          <Icon type="team" />
          <span className="nav-text">nav 6</span>
        </Menu.Item>
      </Menu>
    </Sider>
    <Layout>
      <Header>
        <div className="ant-layout-demo-side-nav" />
        <div className="ant-layout-demo-side-breadcrumb">
          <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </Header>
      <Content className="ant-layout-demo-side-main">content</Content>
      <Footer className="ant-layout-demo-side-footer">
        Ant Design ©2016 Created by Ant UED
      </Footer>
    </Layout>
  </Layout>
, mountNode);
````

````css
.ant-layout-demo-side {
  background: #ececec;
}

.ant-layout-demo-side .ant-layout-demo-side-nav {
  background: #fff;
  height: 64px;
}

.ant-layout-demo-side .ant-layout-demo-side-sider {
	background: #404040;
}

.ant-layout-demo-side .ant-layout-demo-side-logo {
  width: 32px;
  height: 32px;
  background: #333;
  border-radius: 6px;
  margin: 16px;
}

.ant-layout-demo-side .ant-layout-demo-side-breadcrumb {
  margin: 7px 0 7px 24px;
}

.ant-layout-demo-side .ant-layout-demo-side-main {
  padding: 24px;
  background: #fff;
  margin: 0 16px 24px 16px;
}

.ant-layout-demo-side .ant-layout-sider-trigger {
	background: #656565;
	color: #fff;
}

.ant-layout-demo-side .ant-layout-sider-collapsed .anticon {
	font-size: 16px;
	transition: all .3s ease;
}

.ant-layout-demo-side .ant-layout-sider-collapsed .nav-text {
	display: none;
}

.ant-layout-demo-side .ant-layout-demo-side-footer {
  height: 64px;
  line-height: 64px;
  text-align: center;
  font-size: 12px;
  color: #999;
  background: #fff;
}
````
