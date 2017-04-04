---
order: 4
title:
  zh-CN: 自定义触发器
  en-US: Custom trigger
---

## zh-CN

要使用自定义触发器，可以设置 `trigger={null}` 来隐藏默认设定。

## en-US

If you want to use a customized trigger, you can hide the default one by setting `trigger={null}`.

````jsx
import { Layout, Menu, Icon } from 'antd';
const { Header, Sider, Content } = Layout;

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
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo" />
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
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            Content
          </Content>
        </Layout>
      </Layout>
    );
  }
}

ReactDOM.render(<SiderDemo />, mountNode);
````

````css
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 16px;
  cursor: pointer;
  transition: color .3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #108ee9;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: #333;
  border-radius: 6px;
  margin: 16px;
}

#components-layout-demo-custom-trigger .ant-layout-sider-collapsed .anticon {
  font-size: 16px;
}

#components-layout-demo-custom-trigger .ant-layout-sider-collapsed .nav-text {
  display: none;
}
````
