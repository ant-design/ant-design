---
order: 5
title:
  zh-CN: 自定义位置偏移
  en-US: Offset
---

## zh-CN

设置状态点的位置偏移，格式为 `[left, top]`，表示状态点距默认位置左侧、上方的偏移量。

## en-US

Set offset of the badge dot, the format is `[left, top]`, which represents the offset of the status dot from the left and top of the default position.

```jsx
import { Badge } from 'antd';

ReactDOM.render(
  <>
    <Badge count={5} offset={[10, 10]}>
      <a href="#" className="head-example" />
    </Badge>
  </>,
  mountNode,
);
```
