---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
---

## zh-CN

空格。默认 size 为`default`, 可以设置`small`、`large`, 也可以直接设置为具体的像数值。

## en-US

Space. The default size is `default`, also can use `small`, `large` or custom pixel number.

```jsx
import { Space } from 'antd';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <p>
          this is a space, <Space /> size is default.
        </p>
        <p>
          this is a space, <Space size="small" /> size is small.
        </p>
        <p>
          this is a space, <Space size="large" /> size is large.
        </p>
        <p>
          this is a space, <Space size={5} /> size is 5 pixel.
        </p>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```
