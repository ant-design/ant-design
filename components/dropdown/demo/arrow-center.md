---
order: 3
title:
  zh-CN: 箭头指向
  en-US: Arrow pointing at the center
---

## zh-CN

设置 `arrow` 为 `{ pointAtCenter: true }` 后，箭头将指向目标元素的中心。

## en-US

By specifying `arrow` prop with `{ pointAtCenter: true }`, the arrow will point to the center of the target element.

```jsx
import { Menu, Dropdown, Button } from 'antd';

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        3rd menu item
      </a>
    </Menu.Item>
  </Menu>
);

export default () => (
  <>
    <Dropdown overlay={menu} placement="bottomLeft" arrow={{ pointAtCenter: true }}>
      <Button>bottomLeft</Button>
    </Dropdown>
    <Dropdown overlay={menu} placement="bottom" arrow={{ pointAtCenter: true }}>
      <Button>bottom</Button>
    </Dropdown>
    <Dropdown overlay={menu} placement="bottomRight" arrow={{ pointAtCenter: true }}>
      <Button>bottomRight</Button>
    </Dropdown>
    <br />
    <Dropdown overlay={menu} placement="topLeft" arrow={{ pointAtCenter: true }}>
      <Button>topLeft</Button>
    </Dropdown>
    <Dropdown overlay={menu} placement="top" arrow={{ pointAtCenter: true }}>
      <Button>top</Button>
    </Dropdown>
    <Dropdown overlay={menu} placement="topRight" arrow={{ pointAtCenter: true }}>
      <Button>topRight</Button>
    </Dropdown>
  </>
);
```

```css
#components-dropdown-demo-arrow-center .ant-btn {
  margin-right: 8px;
  margin-bottom: 8px;
}
.ant-row-rtl #components-dropdown-demo-arrow-center .ant-btn {
  margin-right: 0;
  margin-bottom: 8px;
  margin-left: 8px;
}
```
