---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
---

## zh-CN

最简单的下拉菜单。

## en-US

The most basic dropdown menu.

````jsx
import { Menu, Dropdown, Icon } from 'antd';

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">第一个菜单项</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">第二个菜单项</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">第三个菜单项</a>
    </Menu.Item>
  </Menu>
);

ReactDOM.render(
  <Dropdown overlay={menu}>
    <a className="ant-dropdown-link" href="#">
      触发链接 <Icon type="down" />
    </a>
  </Dropdown>
, mountNode);
````
