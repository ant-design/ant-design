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
import { Result, Icon, Button } from 'antd';

ReactDOM.render(
  <Result
    icon={<Icon type="smile" theme="twoTone" />}
    title="Great, we have done all the operations!"
    extra={<Button type="primary">Next</Button>}
  />,
  mountNode,
);
```
