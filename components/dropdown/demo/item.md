---
order: 1
title:
  zh-CN: 其他元素
  en-US: Other elements
---

## zh-CN

分割线和不可用菜单项。

## en-US

Divider and disabled menu item.

````jsx
import { Menu, Dropdown, Icon } from 'antd';

const menu = (
  <Menu>
    <Menu.Item key="0">
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">第一个菜单项</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">第二个菜单项</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3" disabled>第三个菜单项（不可用）</Menu.Item>
  </Menu>
);

ReactDOM.render(
  <Dropdown overlay={menu}>
    <a className="ant-dropdown-link" href="#">
      鼠标移入 <Icon type="down" />
    </a>
  </Dropdown>
, mountNode);
````
