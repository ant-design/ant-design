---
order: 7
title:
  zh-CN: 垂直菜单
  en-US: Vertical menu
---

## zh-CN

子菜单是弹出的形式。

## en-US

YM Menu Item

```jsx
import { Menu } from 'antd';

function handleClick(e) {
  console.log('click', e);
}

ReactDOM.render(
  <Menu onClick={handleClick} style={{ width: 256 }} mode="inline" arrow>
    <Menu.Item key="1">Option 1</Menu.Item>
    <Menu.Item key="2">Option 2</Menu.Item>
  </Menu>,
  mountNode,
);
```
