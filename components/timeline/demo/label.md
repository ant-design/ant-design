---
order: 5
title:
  zh-CN: Label 用法
  en-US: Label Usage
---

## zh-CN

使用 `Label` 更好的展示时间

## en-US

Use `Label`

```jsx
import { Timeline } from 'antd';

ReactDOM.render(
  <Timeline mode="label">
    <Timeline.Item label="2015-09-01">Create a services</Timeline.Item>
    <Timeline.Item label="2015-09-01 09:12:11">Solve initial network problems</Timeline.Item>
    <Timeline.Item label="2015-09-01">Technical testing</Timeline.Item>
    <Timeline.Item label="2015-09-01 09:12:11">Network problems being solved</Timeline.Item>
  </Timeline>,
  mountNode,
);
```
