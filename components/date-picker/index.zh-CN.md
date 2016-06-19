---
category: Components
chinese: 日期选择框
type: Form Control
english: DatePicker
---

输入或选择日期的控件。

## 何时使用

当用户需要输入一个日期，可以点击标准输入框，弹出日期面板进行选择。

## API

### DatePicker

```html
<DatePicker defaultValue="2015-01-01" />
```

> 注意：`0.11+` 后 `Datepicker` 改名为 `DatePicker`。


| 参数         | 说明           | 类型     | 默认值       |
|--------------|----------------|----------|--------------|
| value        | 日期           | string or Date   | 无           |
| defaultValue | 默认日期       | string or Date   | 无           |
| format       | 展示的日期格式，配置参考 [GregorianCalendarFormat](https://github.com/yiminghe/gregorian-calendar-format) | string   | "yyyy-MM-dd" |
| disabledDate | 不可选择的日期 | function | 无           |
| onChange     | 时间发生变化的回调，发生在用户选择时间时 | function(date, dateString) | 无           |
| disabled     | 禁用           | bool     | false        |
| style        | 自定义输入框样式     | object     | {}   |
| popupStyle   | 格外的弹出日历样式   | object     | {}   |
| size         | 输入框大小，`large` 高度为 32px，`small` 为 22px，默认是 28px | string   | 无  |
| locale       | 国际化配置 | object   | [默认配置](https://github.com/ant-design/ant-design/issues/424)  |
| onOk         | 点击确定按钮的回调 | function(Date value) | 无 |
| toggleOpen   | 弹出日历和关闭日历的回调 | function(status) | 无 |
| getCalendarContainer | 定义浮层的容器，默认为 body 上新建 div | function(trigger) | 无 |
| showTime     | 增加时间选择功能  | Object or Boolean | [TimePicker Options](http://ant.design/components/time-picker/#api) |

### MonthPicker

| 参数         | 说明           | 类型     | 默认值       |
|--------------|----------------|----------|--------------|
| value        | 日期           | string or Date   | 无           |
| defaultValue | 默认日期       | string or Date   | 无           |
| format       | 展示的日期格式，配置参考 [GregorianCalendarFormat](https://github.com/yiminghe/gregorian-calendar-format) | string   | "yyyy-MM" |
| disabledDate | 不可选择的日期 | function | 无           |
| onChange     | 时间发生变化的回调，发生在用户选择时间时 | function(Date value) | 无           |
| disabled     | 禁用           | bool     | false        |
| style        | 自定义输入框样式     | object     | {}   |
| popupStyle   | 格外的弹出日历样式   | object     | {}   |
| size         | 输入框大小，`large` 高度为 32px，`small` 为 22px，默认是 28px | string   | 无  |
| locale       | 国际化配置 | object   | [默认配置](https://github.com/ant-design/ant-design/issues/424)  |
| getCalendarContainer | 定义浮层的容器，默认为 body 上新建 div | function(trigger) | 无 |

### RangePicker

| 参数         | 说明           | 类型     | 默认值       |
|--------------|----------------|----------|--------------|
| value        | 日期          | [string/Date, string/Date]   | 无           |
| defaultValue | 默认日期       | [string/Date, string/Date]   | 无           |
| format       | 展示的日期格式  | string    | "yyyy-MM-dd HH:mm:ss" |
| onChange     | 时间发生变化的回调，发生在用户选择时间时 | function(date[], dateString[]) | 无           |
| showTime     | 增加时间选择功能  | Object or Boolean | [TimePicker Options](http://ant.design/components/time-picker/#api) |

`disabled` `style` `popupStyle` `size` `locale` `showTime` `onOk` `getCalendarContainer` 属性与 DatePicker 的一致。

<style>
.code-box-demo .ant-calendar-picker {
  margin: 0 8px 12px 0;
}
</style>
