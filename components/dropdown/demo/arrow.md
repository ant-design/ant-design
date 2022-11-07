---
order: 2
title:
  zh-CN: 箭头
  en-US: Arrow
---

## zh-CN

可以展示一个箭头。

## en-US

You could display an arrow.

```tsx
import type { MenuProps } from 'antd';
import { Button, Dropdown } from 'antd';
import React from 'react';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        1st menu item
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        3rd menu item
      </a>
    ),
  },
];

const App: React.FC = () => (
  <>
    <Dropdown menu={{ items }} placement="bottomLeft" arrow>
      <Button>bottomLeft</Button>
    </Dropdown>
    <Dropdown menu={{ items }} placement="bottom" arrow>
      <Button>bottom</Button>
    </Dropdown>
    <Dropdown menu={{ items }} placement="bottomRight" arrow>
      <Button>bottomRight</Button>
    </Dropdown>
    <br />
    <Dropdown menu={{ items }} placement="topLeft" arrow>
      <Button>topLeft</Button>
    </Dropdown>
    <Dropdown menu={{ items }} placement="top" arrow>
      <Button>top</Button>
    </Dropdown>
    <Dropdown menu={{ items }} placement="topRight" arrow>
      <Button>topRight</Button>
    </Dropdown>
  </>
);

export default App;
```

```css
#components-dropdown-demo-arrow .ant-btn {
  margin-right: 8px;
  margin-bottom: 8px;
}
.ant-row-rtl #components-dropdown-demo-arrow .ant-btn {
  margin-right: 0;
  margin-bottom: 8px;
  margin-left: 8px;
}
```
