---
order: 100
title:
  zh-CN: Menu 完整样式
  en-US: Menu full styles
debug: true
---

## zh-CN

此演示需要注意去掉 Reset 样式后查看 Dropdown 内 Menu 的样式是否正常。

[#19150](https://github.com/ant-design/ant-design/pull/19150)

## en-US

This demo was created for debugging Menu styles inside Dropdown.

[#19150](https://github.com/ant-design/ant-design/pull/19150)

```jsx
import { Menu, Dropdown, Icon } from 'antd';

const { SubMenu } = Menu;

const menu = (
  <Menu selectedKeys={['1']} openKeys={['sub1']}>
    <Menu.ItemGroup key="group" title="Item Group">
      <Menu.Item key="01">Option 0</Menu.Item>
      <Menu.Item key="02">Option 0</Menu.Item>
    </Menu.ItemGroup>
    <SubMenu
      key="sub1"
      title={
        <span>
          <Icon type="mail" />
          <span>Navigation One</span>
        </span>
      }
    >
      <Menu.ItemGroup key="g1" title="Item 1">
        <Menu.Item key="1">Option 1</Menu.Item>
        <Menu.Item key="2">Option 2</Menu.Item>
      </Menu.ItemGroup>
      <Menu.ItemGroup key="g2" title="Item 2">
        <Menu.Item key="3">Option 3</Menu.Item>
        <Menu.Item key="4">Option 4</Menu.Item>
      </Menu.ItemGroup>
    </SubMenu>
    <SubMenu
      key="sub2"
      title={
        <span>
          <Icon type="appstore" />
          <span>Navigation Two</span>
        </span>
      }
    >
      <Menu.Item key="5">Option 5</Menu.Item>
      <Menu.Item key="6">Option 6</Menu.Item>
      <SubMenu key="sub3" title="Submenu">
        <Menu.Item key="7">Option 7</Menu.Item>
        <Menu.Item key="8">Option 8</Menu.Item>
      </SubMenu>
    </SubMenu>
    <SubMenu
      key="sub4"
      title={
        <span>
          <Icon type="setting" />
          <span>Navigation Three</span>
        </span>
      }
    >
      <Menu.Item key="9">Option 9</Menu.Item>
      <Menu.Item key="10">Option 10</Menu.Item>
      <Menu.Item key="11">Option 11</Menu.Item>
      <Menu.Item key="12">Option 12</Menu.Item>
    </SubMenu>
  </Menu>
);

ReactDOM.render(
  <Dropdown overlay={menu}>
    <a className="ant-dropdown-link" href="#">
      Hover to check menu style <Icon type="down" />
    </a>
  </Dropdown>,
  mountNode,
);
```
