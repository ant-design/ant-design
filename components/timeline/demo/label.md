---
order: 5
title:
  zh-CN: 自定义时间显示
  en-US: Label
---

## zh-CN

自定义时间显示。根据不同 `mode` 将 `label` 和 内容 显示在轴线两侧。

## en-US

Label timeline. According to different `mode` , label and content will displayed on the both sides of the axis.

```jsx
import { Timeline } from 'antd';

ReactDOM.render(
  <Timeline>
    <Timeline.Item label="2015-09-01">Create a services site</Timeline.Item>
    <Timeline.Item label="2015-09-02">Solve initial network problems</Timeline.Item>
    <Timeline.Item label="2015-09-03">Technical testing</Timeline.Item>
    <Timeline.Item label="2015-09-04">Network problems being solved</Timeline.Item>
  </Timeline>,
  mountNode,
);
```
