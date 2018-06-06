---
order: 6
title:
  zh-CN: 多级菜单
  en-US: Cascading menu
---

## zh-CN

传入的菜单里有多个层级。

## en-US

The menu has multiple levels.

````jsx
import { Menu, Dropdown, Icon } from 'antd';
const SubMenu = Menu.SubMenu;

const menu = (
  <Menu>
    <Menu.Item>1st menu item</Menu.Item>
    <Menu.Item>12nd menu item</Menu.Item>
    <SubMenu title="sub menu">
      <Menu.Item>13rd menu item</Menu.Item>
      <Menu.Item>14th menu item</Menu.Item>
    </SubMenu>
    <SubMenu title="disabled sub menu" disabled>
      <Menu.Item>15d menu item</Menu.Item>
      <Menu.Item>16th menu item</Menu.Item>
    </SubMenu>
  </Menu>
);

ReactDOM.render(
  <Dropdown overlay={menu}>
    <a className="ant-dropdown-link" href="#">
      Cascading menu <Icon type="down" />
    </a>
  </Dropdown>
, mountNode);
````
