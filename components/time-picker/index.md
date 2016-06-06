---
category: Components
chinese: 时间选择框
type: Form Control
english: TimePicker
---

输入或选择时间的控件。

何时使用
--------

当用户需要输入一个时间，可以点击标准输入框，弹出时间面板进行选择。

API
---

```html
<TimePicker defaultValue="13:30:56" />
```

> 注意：`0.11+` 后 `Timepicker` 改名为 `TimePicker`。

| 参数                 | 说明 | 类型 | 默认值 |
|---------------------|-----|-----|-------|
| defaultValue        | 初始默认时间 | string or Date | 无 |
| value               | 默认时间 | string or Date | 无 |
| placeholder         | 没有值的时候显示的内容 | string | "请选择时间" |
| onChange            | 时间发生变化的回调     | function(date, dateString) | 无 |
| format              | 展示的时间格式 | string | "HH:mm:ss"、"HH:mm"、"mm:ss" |
| disabled            | 禁用全部操作 | bool | false |
| disabledHours       | 禁止选择部分小时选项 | function() | 无 |
| disabledMinutes     | 禁止选择部分分钟选项 | function(selectedHour) | 无 |
| disabledSeconds     | 禁止选择部分秒选项 | function(selectedHour, selectedMinute) | 无 |
| hideDisabledOptions | 隐藏禁止选择的选项 | boolean | false |
| locale              | 国际化配置 | Object | [默认配置](https://github.com/ant-design/ant-design/issues/1270#issuecomment-201181384) |

<style>.code-box-demo .ant-time-picker { margin: 0 8px 12px 0; }</style>
