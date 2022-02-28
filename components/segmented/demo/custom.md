---
order: 1
title:
  zh-CN: 自定义样式
  en-US: Custom style
---

## zh-CN

可以自定义回到顶部按钮的样式，限制宽高：`40px * 40px`。

## en-US

You can customize the style of the button, just note the size limit: no more than `40px * 40px`.

```jsx
import { Segmented } from 'antd';

ReactDOM.render(
  <div>
    <Segmented
      options={[
        {
          label: (
            <div>
              第一季度
              <br />
              2022.01~03
            </div>
          ),
          value: 'hello',
        },
      ]}
    />
  </div>,
  mountNode,
);
```
