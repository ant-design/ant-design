---
order: 2
title:
  zh-CN: 最后一个
  en-US: Last node
---

## zh-CN

当任务状态正在发生，还在记录过程中，可用幽灵节点来表示当前的时间节点（用于时间正序排列）。当 pending 值为 false ，可用定制元件替换默认时间图点。

## en-US

When the timeline is incomplete and ongoing, put a ghost node at last. set `pending={true}` or `pending={a React Element}`. Used in ascend chronological order. When `pending` is not false, set `pendingDot={a React Element}` to replace the default pending dot.

````jsx
import { Timeline } from 'antd';

ReactDOM.render(
  <Timeline pending="Recording...">
    <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
    <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
    <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
  </Timeline>
, mountNode);
````
