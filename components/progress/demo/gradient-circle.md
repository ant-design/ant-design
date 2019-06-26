---
order: 12
title:
  zh-CN: 自定义进度圈渐变色
  en-US: Custom circle gradient
---

## zh-CN

`linear-gradient` 的封装。

## en-US

A package of `linear-gradient`.

```jsx
import { Progress } from 'antd';

const Demo = () => (
  <div>
    <Progress
      type='circle'
      strokeLinecap="round"
      strokeColor={{
        '0%': '#108ee9',
        '100%': '#87d068',
      }}
      percent={90}
    />
  </div>
);

ReactDOM.render(<Demo />, mountNode);
```
