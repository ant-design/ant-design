---
order: 1
title:
  zh-CN: 顶部-侧边布局
  en-US: Header-Sider
---

## zh-CN

多用在同时拥有顶部导航及侧边栏的页面。

## en-US

Be used in the page which has both the top navigation and the sidebar  .

````jsx
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const Header = Layout.Header;
const Content = Layout.Content;
const Sider = Layout.Sider;
const Footer = Layout.Footer;

ReactDOM.render(
  <Layout className="ant-layout-demo-topside">
    <Header>
      <div className="ant-layout-demo-topside-nav">
        <div className="ant-layout-demo-topside-logo" />
        <Menu theme="dark" mode="horizontal"
          defaultSelectedKeys={['2']} style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </div>
      <div className="ant-layout-demo-topside-breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    </Header>
    <Layout className="ant-layout-demo-topside-main">
      <Sider width="200px">
        <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']}>
          <SubMenu key="sub1" title={<span><Icon type="user" />subnav 1</span>}>
            <Menu.Item key="1">option1</Menu.Item>
            <Menu.Item key="2">option2</Menu.Item>
            <Menu.Item key="3">option3</Menu.Item>
            <Menu.Item key="4">option4</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="laptop" />subnav 2</span>}>
            <Menu.Item key="5">option5</Menu.Item>
            <Menu.Item key="6">option6</Menu.Item>
            <Menu.Item key="7">option7</Menu.Item>
            <Menu.Item key="8">option8</Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>}>
            <Menu.Item key="9">option9</Menu.Item>
            <Menu.Item key="10">option10</Menu.Item>
            <Menu.Item key="11">option11</Menu.Item>
            <Menu.Item key="12">option12</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Content className="ant-layout-demo-topside-content">content</Content>
    </Layout>
    <Footer className="ant-layout-demo-topside-footer">
      Ant Design ©2016 Created by Ant UED
    </Footer>
  </Layout>
, mountNode);
````

````css
.ant-layout-demo-topside {
  background: #ececec;
}

.ant-layout-demo-topside .ant-layout-demo-topside-nav {
  background: #404040;
  height: 64px;
  padding: 0 50px;
}

.ant-layout-demo-topside .ant-layout-demo-topside-breadcrumb {
  margin: 7px 0 7px 74px;
}

.ant-layout-demo-topside .ant-layout-demo-topside-logo {
  width: 120px;
  height: 31px;
  background: #333;
  border-radius: 6px;
  margin: 16px 28px 16px 0;
  float: left;
}

.ant-layout-demo-topside .ant-layout-demo-topside-main {
  margin: 0 50px;
  padding: 24px 0;
  background: #fff;
}

.ant-layout-demo-topside .ant-layout-demo-topside-content {
	padding-left: 24px;
}

.ant-layout-demo-topside .ant-layout-demo-topside-footer {
  height: 64px;
  line-height: 64px;
  text-align: center;
  font-size: 12px;
  color: #999;
}
````