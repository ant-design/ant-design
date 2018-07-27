---
order: 4
title:
  zh-CN: 自定义时间轴点
  en-US: Right alternate
---

## zh-CN

可以设置为图标或其他自定义元素。

## en-US

Right alternate timeline.

````jsx
import { Timeline, Icon } from 'antd';

ReactDOM.render(
  <Timeline mode="right">
    <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
    <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
    <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />} color="red">Technical testing 2015-09-01</Timeline.Item>
    <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
  </Timeline>,
  mountNode);
````
