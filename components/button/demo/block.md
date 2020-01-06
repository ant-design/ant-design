---
order: 10
title:
  zh-CN: Block 按钮
  en-US: Block Button
---

## zh-CN

`block`属性将使按钮适合其父宽度。

## en-US

`block` property will make the button fit to its parent width.

```jsx
import { Button } from 'antd';

ReactDOM.render(
  <div>
    <Button type="primary" block>
      Primary
    </Button>
    <Button block>Default</Button>
    <Button type="dashed" block>
      Dashed
    </Button>
    <Button type="link" block>
      Link
    </Button>
  </div>,
  mountNode,
);
```
