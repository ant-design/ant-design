---
order: 4
title: 自定义时间轴点
---

可以设置为图标或其他自定义元素。

````jsx
import { Timeline, Icon } from 'antd';

ReactDOM.render(
  <Timeline>
    <Timeline.Item>创建服务现场 2015-09-01</Timeline.Item>
    <Timeline.Item>初步排除网络异常 2015-09-01</Timeline.Item>
    <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />} color="red">技术测试异常 2015-09-01</Timeline.Item>
    <Timeline.Item>网络异常正在修复 2015-09-01</Timeline.Item>
  </Timeline>
, mountNode);
````
