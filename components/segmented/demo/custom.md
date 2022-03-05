---
order: 1
title:
  zh-CN: 自定义渲染
  en-US: Custom Render
---

## zh-CN

使用 ReactNode 自定义渲染每一个 Segmented Item。

## en-US

Custom each Segmented Item by ReactNode.

```jsx
import { Segmented } from 'antd';

ReactDOM.render(
  <div>
    <Segmented
      options={[
        {
          label: (
            <>
              <div>1st Quarter</div>
              <div>2022.01~03</div>
            </>
          ),
          value: 'q1',
        },
        {
          label: (
            <>
              <div>2nd Quarter</div>
              <div>2022.04~06</div>
            </>
          ),
          value: 'q2',
        },
        {
          label: (
            <>
              <div>3rd Quarter</div>
              <div>2022.07~09</div>
            </>
          ),
          value: 'q3',
        },
        {
          label: (
            <>
              <div>4th Quarter</div>
              <div>2022.10~12</div>
            </>
          ),
          value: 'q4',
        },
      ]}
    />
  </div>,
  mountNode,
);
```
