---
order: 99
title:
  zh-CN: 测试 Progress 宽度
  en-US: Test Progress width
debug: true
---

## zh-CN

https://github.com/ant-design/ant-design/issues/19554

## en-US

https://github.com/ant-design/ant-design/issues/19554

```jsx
import { Descriptions, Progress } from 'antd';

ReactDOM.render(
  <Descriptions title="Descriptions">
    <Descriptions.Item label="Line Progress">
      <Progress percent={70} />
    </Descriptions.Item>
    <Descriptions.Item label="Circle Progress">
      <Progress type="circle" percent={70} />
    </Descriptions.Item>
  </Descriptions>,
  mountNode,
);
```
