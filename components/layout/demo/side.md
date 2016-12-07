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
const { Header, Content, Footer, Sider } = Layout;

class SiderDemo extends React.Component {
  state = {
    collapsed: false,
  };
  onCollapse = (collapsedStatus) => {
    console.log(collapsedStatus);
    this.setState({ collapsed: collapsedStatus });
  }
  render() {
    return (
      <Layout className="ant-layout-demo-side">
        <Sider
          className="ant-layout-demo-side-sider"
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
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
          </Header>
          <Content className="ant-layout-demo-side-main">
            <div className="ant-layout-demo-side-breadcrumb">
              <Breadcrumb>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </Content>
          <Footer className="ant-layout-demo-side-footer">
            Ant Design ©2016 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

ReactDOM.render(<SiderDemo />, mountNode);
````

````css
.ant-layout-demo-side {
  background: #ececec;
}

.ant-layout-demo-side .ant-layout-demo-side-nav {
  background: #fff;
  height: 100%;
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

.ant-layout-demo-side .ant-layout-demo-side-main {
  margin: 0 16px 24px 16px;
}

.ant-layout-demo-side .ant-layout-demo-side-breadcrumb {
  padding: 7px 0 7px 24px;
  background: #ececec;
}

.ant-layout-demo-side .ant-layout-sider-collapsed .anticon {
	font-size: 16px;
	transition: all .3s ease;
}

.ant-layout-demo-side .ant-layout-sider-collapsed .nav-text {
	display: none;
}

.ant-layout-demo-side .ant-layout-demo-side-footer {
  background: #fff;
}
````
