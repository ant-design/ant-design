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
  <Segmented
    options={[
      {
        label: (
          <>
            <div>Spring</div>
            <div>Jan-Mar</div>
          </>
        ),
        value: 'spring',
      },
      {
        label: (
          <>
            <div>Summer</div>
            <div>Apr-Jun</div>
          </>
        ),
        value: 'summer',
      },
      {
        label: (
          <>
            <div>Autumn</div>
            <div>Jul-Sept</div>
          </>
        ),
        value: 'autumn',
      },
      {
        label: (
          <>
            <div>Winter</div>
            <div>Oct-Dec</div>
          </>
        ),
        value: 'winter',
      },
    ]}
  />,
  mountNode,
);
```

```css
.code-box-demo {
  overflow-x: auto;
}

.code-box-demo .ant-segmented {
  margin-bottom: 10px;
}
```
