---
order: 4
title: 带下拉框的按钮
---

左边是按钮，右边是额外的相关功能菜单。

````jsx
import { Menu, Dropdown, Button, Icon } from 'antd';

function handleButtonClick(e) {
  console.log('click left button', e);
}

function handleMenuClick(e) {
  console.log('click', e);
}

const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1">第一个菜单项</Menu.Item>
    <Menu.Item key="2">第二个菜单项</Menu.Item>
    <Menu.Item key="3">第三个菜单项</Menu.Item>
  </Menu>
);

ReactDOM.render(
  <div>
    <Dropdown.Button onClick={handleButtonClick} overlay={menu} type="ghost">
      某功能按钮
    </Dropdown.Button>
    <Dropdown overlay={menu}>
      <Button type="ghost" style={{ marginLeft: 8 }}>
        按钮 <Icon type="down" />
      </Button>
    </Dropdown>
  </div>
, mountNode);
````
