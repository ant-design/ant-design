---
order: 1
title: 
  zh-CN: 圆圈颜色
  en-US: Color
---

## zh-CN

圆圈颜色，绿色用于已完成、成功状态，红色表示告警或错误状态，蓝色可表示正在进行或其他默认状态。

## en-US 

Set the color of circles. `green` means completed or success status, `red` means warning or error, and `blue` means ongoing or other default status.

````jsx
import { Timeline } from 'antd';

ReactDOM.render(
  <Timeline>
    <Timeline.Item color="green">创建服务现场 2015-09-01</Timeline.Item>
    <Timeline.Item color="green">创建服务现场 2015-09-01</Timeline.Item>
    <Timeline.Item color="red">
      <p>初步排除网络异常1</p>
      <p>初步排除网络异常2</p>
      <p>初步排除网络异常3 2015-09-01</p>
    </Timeline.Item>
    <Timeline.Item>
      <p>技术测试异常1</p>
      <p>技术测试异常2</p>
      <p>技术测试异常3 2015-09-01</p>
    </Timeline.Item>
  </Timeline>
, mountNode);
````
