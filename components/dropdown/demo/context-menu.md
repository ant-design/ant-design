---
order: 8
title:
  zh-CN: 右键菜单
  en-US: Context Menu
---

## zh-CN

默认是移入触发菜单，可以点击鼠标右键触发。

## en-US

The default trigger mode is `hover`, you can change it to `contextMenu`.

```jsx
import { Menu, Dropdown } from 'antd';

const menu = (
  <Menu>
    <Menu.Item key="1">1st menu item</Menu.Item>
    <Menu.Item key="2">2nd menu item</Menu.Item>
    <Menu.Item key="3">3rd menu item</Menu.Item>
  </Menu>
);

ReactDOM.render(
  <Dropdown overlay={menu} trigger={['contextMenu']}>
    <div
      style={{
        textAlign: 'center',
        background: '#f7f7f7',
        height: 200,
        lineHeight: '200px',
        color: '#777',
      }}
    >
      Right Click on here
    </div>
  </Dropdown>,
  mountNode,
);
```
