---
order: 2
title: 
  zh-CN: 最后一个
  en-US: Last node
---

## zh-CN

在最后位置添加一个幽灵节点，表示时间轴未完成，还在记录过程中。可以指定 `pending={true}` 或者 `pending={一个 React 元素}`。

## en-US

When the timeline is incomplete and ongoing, put a ghost node at last. set `pending={true}` or `pending={a React Element}`。

````jsx
import { Timeline } from 'antd';

ReactDOM.render(
  <Timeline pending={<a href="#">查看更多</a>}>
    <Timeline.Item>创建服务现场 2015-09-01</Timeline.Item>
    <Timeline.Item>初步排除网络异常 2015-09-01</Timeline.Item>
    <Timeline.Item>技术测试异常 2015-09-01</Timeline.Item>
  </Timeline>
, mountNode);
````
