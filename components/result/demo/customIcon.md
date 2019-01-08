---
order: 0
title:
  zh-CN: 自定义 icon
  en-US: Custom icon
---

## zh-CN

自定义 icon

## en-US

Custom icon

```jsx
import { Result,Icon, Button } from 'antd';

ReactDOM.render(
  <Result
    icon={<Icon type="smile" theme="twoTone" />}
    title="Great, we are done!"
    extra={<Button type="primary">Next</Button>}
  />,
  mountNode
);

```
