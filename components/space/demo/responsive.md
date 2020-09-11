---
order: 4
title:
  zh-CN: 適應性
  en-US: Responsive
---

## zh-CN

從特定的斷點將空間的方向更改為垂直。

## en-US

Change the space direction to vertical from an specific breakpoint.

```jsx
import { Space, Button } from 'antd';

function Responsive() {
  return (
    <Space responsive="xl" size={10}>
      <Button type="primary">Primary</Button>
      <Button>Default</Button>
      <Button type="dashed">Dashed</Button>
      <Button type="link">Link</Button>
    </Space>
  );
}

ReactDOM.render(<Responsive />, mountNode);
```
