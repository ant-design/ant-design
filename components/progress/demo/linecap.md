---
order: 10
title:
  zh-CN: 边缘星座
  en-US: Stroke Linecap
---

## zh-CN

通过设定 `strokeLinecap="round | butt | square"` 可以调整进度条边缘的形状。

## en-US

By setting `strokeLinecap`, you can change the linecaps from round to `butt` or `square`.

```jsx
import { Progress } from 'antd';

export default () => (
  <>
    <Progress strokeLinecap="butt" percent={75} />
    <Progress strokeLinecap="butt" type="circle" percent={75} />
    <Progress strokeLinecap="butt" type="dashboard" percent={75} />
  </>
);
```
