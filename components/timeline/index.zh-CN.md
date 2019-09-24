---
category: Components
subtitle: 时间轴
type: 数据展示
title: Timeline
---

垂直展示的时间流信息。

## 何时使用

- 当有一系列信息需按时间排列时，可正序和倒序。
- 需要有一条时间轴进行视觉上的串联时。

## API

```jsx
<Timeline>
  <Timeline.Item>创建服务现场 2015-09-01</Timeline.Item>
  <Timeline.Item>初步排除网络异常 2015-09-01</Timeline.Item>
  <Timeline.Item>技术测试异常 2015-09-01</Timeline.Item>
  <Timeline.Item>网络异常正在修复 2015-09-01</Timeline.Item>
</Timeline>
```

### Timeline

时间轴。

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| pending | 指定最后一个幽灵节点是否存在或内容 | boolean\|string\|ReactNode | false |  |
| pendingDot | 当最后一个幽灵节点存在時，指定其时间图点 | string\|ReactNode | `<Icon type="loading" />` | 3.3.0 |
| reverse | 节点排序 | boolean | false | 3.5.0 |
| mode | 通过设置 `mode` 可以改变时间轴和内容的相对位置 | `left` \| `alternate` \| `right` | - | 3.8.0 |

### Timeline.Item

时间轴的每一个节点。

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| color | 指定圆圈颜色 `blue, red, green, gray`，或自定义的色值 | string | blue |  |
| dot | 自定义时间轴点 | string\|ReactNode | - |  |
| position | 自定义节点位置 | `left` \| `right` | - | 3.17.0 |
