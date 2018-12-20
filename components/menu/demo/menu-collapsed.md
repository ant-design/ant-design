---
order: 6
title:
  zh-CN: 缩起内嵌菜单
  en-US: Collapsed menu with icon and text
---

## zh-CN

内嵌菜单可以被缩起/展开。

你可以在 [Layout](/components/layout/#components-layout-demo-side) 里查看侧边布局结合的完整示例。

## en-US

Collapsed menu with icon and text.

Here is [a complete demo](/components/layout/#components-layout-demo-side) with sider layout.

````jsx
import { Menu, Icon, Button } from 'antd';

const SubMenu = Menu.SubMenu;

class App extends React.Component {
  state = {
    collapsed: false,
  }

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <div style={{ width: 256 }}>
        <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
          <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
        </Button>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.state.collapsed}
          width={90}
        >
          <Menu.ItemCollapse key="1">
            <Icon type="pie-chart" />
            <span>Option 1</span>
          </Menu.ItemCollapse>
          <Menu.ItemCollapse key="2">
            <Icon type="desktop" />
            <span>Option 2</span>
          </Menu.ItemCollapse>
          <SubMenu key="sub1" title={<div><div><Icon type="mail" /></div><div>Navigation One</div></div>}>
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}>
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="11">Option 11</Menu.Item>
              <Menu.Item key="12">Option 12</Menu.Item>
            </SubMenu>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
````
