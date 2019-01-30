---
order: 5
title:
  zh-CN: 带下拉框的按钮
  en-US: Button with dropdown menu
---

## zh-CN

左边是按钮，右边是额外的相关功能菜单。

## en-US

A button is on the left, and a related functional menu is on the right.

````jsx
import {
  Menu, Dropdown, Button, Icon, message,
} from 'antd';

function handleButtonClick(e) {
  message.info('Click on left button.');
  console.log('click left button', e);
}

function handleMenuClick(e) {
  message.info('Click on menu item.');
  console.log('click', e);
}

const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1"><Icon type="user" />1st menu item</Menu.Item>
    <Menu.Item key="2"><Icon type="user" />2nd menu item</Menu.Item>
    <Menu.Item key="3"><Icon type="user" />3rd item</Menu.Item>
  </Menu>
);

ReactDOM.render(
  <div>
    <Dropdown.Button onClick={handleButtonClick} overlay={menu}>
      Dropdown
    </Dropdown.Button>
    <Dropdown.Button
      onClick={handleButtonClick}
      overlay={menu}
      disabled
      style={{ marginLeft: 8 }}
    >
      Dropdown
    </Dropdown.Button>
    <Dropdown overlay={menu}>
      <Button style={{ marginLeft: 8 }}>
        Button <Icon type="down" />
      </Button>
    </Dropdown>
  </div>,
  mountNode
);
````
