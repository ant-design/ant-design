---
order: 5
title:
  zh-CN: 右侧时间戳轴点
  en-US: Stamp-right
---

## zh-CN

时间戳在轴点右侧，内容在轴点左侧。

## en-US

Stamp right, content left.

```jsx
import { Timeline, Icon } from 'antd';

ReactDOM.render(
  <Timeline mode="stamp-right">
    <Timeline.Item stamp="2015-09-01">Create a services site</Timeline.Item>
    <Timeline.Item stamp="2015-09-02" color="green">
      Solve initial network problems
    </Timeline.Item>
    <Timeline.Item
      stamp="2015-09-03"
      dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}
      color="red"
    >
      Technical testing
    </Timeline.Item>
    <Timeline.Item stamp="2015-09-04">Network problems being solved</Timeline.Item>
  </Timeline>,
  mountNode,
);
```
