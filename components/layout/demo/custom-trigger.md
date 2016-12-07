---
order: 3
title:
  zh-CN: 自定义触发器
  en-US: Custom trigger
---

## zh-CN

要使用自定义触发器，可以设置 `hideTrigger` 来隐藏默认设定。

## en-US

If you want to use a customized trigger, you can hide the default one by setting `hideTrigger`.

````jsx
import { Layout, Menu, Icon } from 'antd';
const { Header, Sider } = Layout;

class SiderDemo extends React.Component {
  state = {
    collapsed: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    return (
      <Layout className="ant-layout-demo-custom">
        <Sider
          hideTrigger
          className="ant-layout-demo-custom-sider"
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="ant-layout-demo-custom-logo" />
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
          </Menu>
        </Sider>
        <Layout>
          <Header>
            <div className="ant-layout-demo-custom-nav">
              {
                this.state.collapsed ?
                <Icon className="ant-layout-demo-custom-trigger" type="menu-unfold" onClick={this.toggle} />
                : <Icon className="ant-layout-demo-custom-trigger" type="menu-fold" onClick={this.toggle} />
              }
            </div>
          </Header>
        </Layout>
      </Layout>
    );
  }
}

ReactDOM.render(<SiderDemo />, mountNode);
````

````css
.ant-layout-demo-custom {
  background: #ececec;
}

.ant-layout-demo-custom .ant-layout-demo-custom-nav {
  background: #fff;
  height: 100%;
}

.ant-layout-demo-custom .ant-layout-demo-custom-trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 16px;
  cursor: pointer;
  transition: color .3s ease;
}

.ant-layout-demo-custom .ant-layout-demo-custom-trigger:hover {
  color: #108ee9;
}

.ant-layout-demo-custom .ant-layout-demo-custom-sider {
	background: #404040;
}

.ant-layout-demo-custom .ant-layout-demo-custom-logo {
  width: 32px;
  height: 32px;
  background: #333;
  border-radius: 6px;
  margin: 16px;
}

.ant-layout-demo-custom .ant-layout-sider-collapsed .anticon {
	font-size: 16px;
	transition: all .3s ease;
}

.ant-layout-demo-custom .ant-layout-sider-collapsed .nav-text {
	display: none;
}
````
