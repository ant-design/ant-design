---
order: 4
title:
  zh-CN: 带下拉框的按钮
  en-US: Button with dropdown menu
---

## zh-CN

左边是按钮，右边是额外的相关功能菜单。

## en-US

A button is on the left, and a related functional menu is on the right.

````jsx
import { Menu, Dropdown } from 'antd';
const DropdownButton = Dropdown.Button;

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
  <DropdownButton onClick={handleButtonClick} overlay={menu} type="primary">
    某功能按钮
  </DropdownButton>
, mountNode);
````
