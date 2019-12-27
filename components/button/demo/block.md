---
order: 9
title:
  zh-CN: block 按钮
  en-US: block Button
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
    <Button type="primary" danger block>
      Danger
    </Button>
    <Button danger block>
      Danger Default
    </Button>
    <Button type="link" danger block>
      Danger Link
    </Button>
    <Button type="link" block>
      Link
    </Button>
  </div>,
  mountNode,
);
```
