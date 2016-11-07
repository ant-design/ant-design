---
category: Components
type: Data Entry
title: DatePicker
subtitle: 日期选择框
---

输入或选择日期的控件。

## 何时使用

当用户需要输入一个日期，可以点击标准输入框，弹出日期面板进行选择。

## API

日期类组件包括以下三种形式。

* DatePicker
* MonthPicker
* RangePicker

**注意：**DatePicker、MonthPicker、RangePicker 部分 locale 是从 value 中读取，所以请先正确设置 moment 的 locale。

```jsx
import moment from 'moment';

// 推荐在入口文件全局设置 locale
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

<DatePicker defaultValue={moment('2015-01-01', 'YYYY-MM-DD')} />
```

### 共同的 API

以下 API 为 DatePicker、MonthPicker、RangePicker 共享的 API。

| 参数          | 说明            | 类型     | 默认值        |
|--------------|----------------|----------|--------------|
| allowClear   | 是否显示清除按钮 | bool     | true         |
| disabled     | 禁用           | bool     | false        |
| style        | 自定义输入框样式     | object     | {}   |
| popupStyle   | 格外的弹出日历样式   | object     | {}   |
| size         | 输入框大小，`large` 高度为 32px，`small` 为 22px，默认是 28px | string   | 无  |
| locale       | 国际化配置 | object   | [默认配置](https://github.com/ant-design/ant-design/issues/424)  |
| disabledDate | 不可选择的日期 | function | 无           |
| getCalendarContainer | 定义浮层的容器，默认为 body 上新建 div | function(trigger) | 无 |
| open | 控制弹层是否展开 | bool | - |
| onOpenChange   | 弹出日历和关闭日历的回调 | function(status) | 无 |

### DatePicker

| 参数         | 说明           | 类型     | 默认值       |
|--------------|----------------|----------|--------------|
| value        | 日期           | [moment](http://momentjs.com/)   | 无           |
| defaultValue | 默认日期       | [moment](http://momentjs.com/)   | 无           |
| format       | 展示的日期格式，配置参考 [moment.js](http://momentjs.com/) | string   | "YYYY-MM-DD" |
| onChange     | 时间发生变化的回调 | function(date: moment, dateString: string) | 无           |
| showTime     | 增加时间选择功能  | Object or Boolean | [TimePicker Options](/components/time-picker/#api) |
| showToday    | 是否展示“今天”按钮 | Boolean | true |
| disabledTime | 不可选择的时间 | function(date) | 无 |

### MonthPicker

| 参数         | 说明           | 类型     | 默认值       |
|--------------|----------------|----------|--------------|
| value        | 日期           | [moment](http://momentjs.com/)   | 无           |
| defaultValue | 默认日期       | [moment](http://momentjs.com/)   | 无           |
| format       | 展示的日期格式，配置参考 [moment.js](http://momentjs.com/) | string   | "YYYY-MM" |
| onChange     | 时间发生变化的回调，发生在用户选择时间时 | function(date: moment, dateString: string) | 无           |
| monthCellContentRender | 自定义的月份渲染方法 | function | 无 |
| cellContentRender | 自定义的月份渲染方法，内容会被附加在月份后面 | function | 无 |

### RangePicker

| 参数         | 说明           | 类型     | 默认值       |
|--------------|----------------|----------|--------------|
| value        | 日期          | [[moment](http://momentjs.com/), [moment](http://momentjs.com/)]   | 无           |
| defaultValue | 默认日期       | [[moment](http://momentjs.com/), [moment](http://momentjs.com/)]   | 无           |
| format       | 展示的日期格式  | string    | "YYYY-MM-DD HH:mm:ss" |
| onChange     | 时间发生变化的回调，发生在用户选择时间时 | function(dates: [moment, moment], dateStrings: [string, string]) | 无           |
| showTime     | 增加时间选择功能  | Object or Boolean | [TimePicker Options](/components/time-picker/#api) |
| disabledTime | 不可选择的时间 | function(dates: [moment, moment], partial: `'start'|'end'`) | 无 |
| ranges       | 预设事件范围快捷选择 | Object { [range: string]: [moment, moment] } | 无 |

<style>
.code-box-demo .ant-calendar-picker {
  margin: 0 8px 12px 0;
}
</style>
