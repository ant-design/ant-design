---
order: 5
title:
  zh-CN: 多个按钮组合
  en-US: Multiple Buttons
---

## zh-CN

按钮组合使用时，推荐使用 1 个主操作 + n 个次操作，3 个以上操作时把更多操作放到 `Dropdown.Button` 中组合使用。

## en-US

If you need several buttons, we recommend that you use 1 primary button + n secondary buttons, and if there are more than three operations, you can group some of them into `Dropdown.Button`.

```jsx
import { Button, Menu, Dropdown, Icon } from 'antd';

function handleMenuClick(e) {
  console.log('click', e);
}

const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1">1st item</Menu.Item>
    <Menu.Item key="2">2nd item</Menu.Item>
    <Menu.Item key="3">3rd item</Menu.Item>
  </Menu>
);

ReactDOM.render(
  <div>
    <Button type="primary">primary</Button>
    <Button>secondary</Button>
    <Dropdown overlay={menu}>
      <Button>
        Actions <Icon type="down" />
      </Button>
    </Dropdown>
  </div>,
  mountNode,
);
```
