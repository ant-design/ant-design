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

- DatePicker
- MonthPicker
- RangePicker

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

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| allowClear | 是否显示清除按钮 | boolean | true |
| className | 选择器 className | string | '' |
| disabled | 禁用 | boolean | false |
| disabledDate | 不可选择的日期 | (currentDate: moment) => boolean | 无 |
| getCalendarContainer | 定义浮层的容器，默认为 body 上新建 div | function(trigger) | 无 |
| locale | 国际化配置 | object | [默认配置](https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json) |
| open | 控制弹层是否展开 | boolean | - |
| placeholder | 输入框提示文字 | string\|RangePicker\[] | - |
| popupStyle | 格外的弹出日历样式 | object | {} |
| size | 输入框大小，`large` 高度为 32px，`small` 为 22px，默认是 28px | string | 无 |
| style | 自定义输入框样式 | object | {} |
| onOpenChange | 弹出日历和关闭日历的回调 | function(status) | 无 |

### DatePicker

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultValue | 默认日期 | [moment](http://momentjs.com/) | 无 |
| disabledTime | 不可选择的时间 | function(date) | 无 |
| format | 展示的日期格式，配置参考 [moment.js](http://momentjs.com/) | string | "YYYY-MM-DD" |
| renderExtraFooter | 在面板中添加额外的页脚 | () => React.ReactNode | - |
| showTime | 增加时间选择功能 | Object\|boolean | [TimePicker Options](/components/time-picker/#API) |
| showTime.defaultValue | 设置用户选择日期时默认的时分秒，[例子](https://ant.design/components/date-picker/#components-date-picker-demo-disabled-date) | [moment](http://momentjs.com/) | moment() |
| showToday | 是否展示“今天”按钮 | boolean | true |
| value | 日期 | [moment](http://momentjs.com/) | 无 |
| onChange | 时间发生变化的回调 | function(date: moment, dateString: string) | 无 |
| onOk | 点击确定按钮的回调 | function() | - |

### MonthPicker

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultValue | 默认日期 | [moment](http://momentjs.com/) | 无 |
| format | 展示的日期格式，配置参考 [moment.js](http://momentjs.com/) | string | "YYYY-MM" |
| monthCellContentRender | 自定义的月份内容渲染方法 | function(date, locale): ReactNode | - |
| value | 日期 | [moment](http://momentjs.com/) | 无 |
| onChange | 时间发生变化的回调，发生在用户选择时间时 | function(date: moment, dateString: string) | - |

### RangePicker

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultValue | 默认日期 | [moment](http://momentjs.com/)\[] | 无 |
| disabledTime | 不可选择的时间 | function(dates: [moment, moment], partial: `'start'|'end'`) | 无 |
| format | 展示的日期格式 | string | "YYYY-MM-DD HH:mm:ss" |
| ranges       | 预设时间范围快捷选择 | { [range: string]&#x3A; [moment](http://momentjs.com/)\[] } | 无 |
| renderExtraFooter | 在面板中添加额外的页脚 | () => React.ReactNode | - |
| showTime | 增加时间选择功能 | Object\|boolean | [TimePicker Options](/components/time-picker/#API) |
| showTime.defaultValue | 设置用户选择日期时默认的时分秒，[例子](https://ant.design/components/date-picker/#components-date-picker-demo-disabled-date) | [moment](http://momentjs.com/)\[] | [moment(), moment()] |
| value | 日期 | [moment](http://momentjs.com/)\[] | 无 |
| onChange | 时间发生变化的回调，发生在用户选择时间时 | function(dates: [moment, moment], dateStrings: [string, string]) | 无 |
| onOk | 点击确定按钮的回调 | function() | - |

<style>
.code-box-demo .ant-calendar-picker {
  margin: 0 8px 12px 0;
}
</style>
