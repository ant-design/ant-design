---
category: Components
subtitle: 时间选择框
type: Data Entry
title: TimePicker
---

输入或选择时间的控件。

## 何时使用
--------

当用户需要输入一个时间，可以点击标准输入框，弹出时间面板进行选择。

## API
---

```jsx
import moment from 'moment';
<TimePicker defaultValue={moment('13:30:56', 'HH:mm:ss')} />
```

> 注意：`0.11+` 后 `Timepicker` 改名为 `TimePicker`。

| 参数                 | 说明 | 类型 | 默认值 |
|---------------------|-----|-----|-------|
| defaultValue        | 默认时间 | [moment](http://momentjs.com/) | 无 |
| value               | 当前时间 | [moment](http://momentjs.com/) | 无 |
| placeholder         | 没有值的时候显示的内容 | string | "请选择时间" |
| onChange            | 时间发生变化的回调     | function(time: moment, timeString: string): void | 无 |
| format              | 展示的时间格式 | string | "HH:mm:ss"、"HH:mm"、"mm:ss" |
| disabled            | 禁用全部操作 | boolean | false |
| disabledHours       | 禁止选择部分小时选项 | function() | 无 |
| disabledMinutes     | 禁止选择部分分钟选项 | function(selectedHour) | 无 |
| disabledSeconds     | 禁止选择部分秒选项 | function(selectedHour, selectedMinute) | 无 |
| hideDisabledOptions | 隐藏禁止选择的选项 | boolean | false |
| getPopupContainer   | 定义浮层的容器，默认为 body 上新建 div | function(trigger) | 无 |
| addon | 选择框底部显示自定义的内容 | function | 无 |

<style>.code-box-demo .ant-time-picker { margin: 0 8px 12px 0; }</style>
