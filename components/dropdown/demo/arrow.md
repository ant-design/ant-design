---
order: 1
title:
  zh-CN: 箭头
  en-US: Arrow
---

## zh-CN

asd 可以展示一个箭头。

## en-US

You could display an arrow.

```jsx
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
        2nd menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        3rd menu item
      </a>
    </Menu.Item>
    <Menu.Item danger>Log Out</Menu.Item>
  </Menu>
);

ReactDOM.render(
  <Dropdown overlay={menu} arrow placement="bottomRight">
    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
      Hover Me <DownOutlined />
    </a>
  </Dropdown>,
  mountNode,
);
```
