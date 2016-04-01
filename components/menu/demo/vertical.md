---
order: 3
title: 垂直菜单
---

子菜单是弹出的形式。

````jsx
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function handleClick(e) {
  console.log('click', e);
}

ReactDOM.render(
  <Menu onClick={handleClick} style={{ width: 240 }} mode="vertical">
    <SubMenu key="sub1" title={<span><Icon type="mail" /><span>导航一</span></span>}>
      <MenuItemGroup title="分组1">
        <Menu.Item key="1">选项1</Menu.Item>
        <Menu.Item key="2">选项2</Menu.Item>
      </MenuItemGroup>
      <MenuItemGroup title="分组2">
        <Menu.Item key="3">选项3</Menu.Item>
        <Menu.Item key="4">选项4</Menu.Item>
      </MenuItemGroup>
    </SubMenu>
    <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>导航二</span></span>}>
      <Menu.Item key="5">选项5</Menu.Item>
      <Menu.Item key="6">选项6</Menu.Item>
      <SubMenu key="sub3" title="三级导航">
        <Menu.Item key="7">选项7</Menu.Item>
        <Menu.Item key="8">选项8</Menu.Item>
      </SubMenu>
    </SubMenu>
    <SubMenu key="sub4" title={<span><icon type="setting" /><span>导航三</span></span>}>
      <Menu.Item key="9">选项9</Menu.Item>
      <Menu.Item key="10">选项10</Menu.Item>
      <Menu.Item key="11">选项11</Menu.Item>
      <Menu.Item key="12">选项12</Menu.Item>
    </SubMenu>
  </Menu>
, mountNode);
````
