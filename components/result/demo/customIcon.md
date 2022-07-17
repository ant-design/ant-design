---
order: 8
title:
  zh-CN: 自定义 icon
  en-US: Custom icon
---

## zh-CN

自定义 icon。

## en-US

Custom icon.

```jsx
import { Result, Button } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

ReactDOM.render(
  <Result
    icon={<SmileOutlined />}
    title="Great, we have done all the operations!"
    extra={<Button type="primary">Next</Button>}
  />,
  mountNode,
);
```
