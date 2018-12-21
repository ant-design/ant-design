---
order: 3
title:
  zh-CN: 交替展现
  en-US: Alternate
---

## zh-CN

内容在时间轴两侧轮流出现。

## en-US

Alternate timeline.

````jsx
import { Timeline, Icon } from 'antd';

ReactDOM.render(
  <Timeline mode="alternate">
    <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
    <Timeline.Item color="green">Solve initial network problems 2015-09-01</Timeline.Item>
    <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</Timeline.Item>
    <Timeline.Item color="red">Network problems being solved 2015-09-01</Timeline.Item>
    <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
    <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>Technical testing 2015-09-01</Timeline.Item>
  </Timeline>,
  mountNode
);
````
