---
category: Components
type: Data Entry
title: DatePicker
---

To select or input a date.

## When To Use

By clicking the input box, you can select a date from a popup calendar.

## API

There are four kinds of picker:

- DatePicker
- MonthPicker
- RangePicker
- WeekPicker

### Localization

The default locale is en-US, if you need to use other languages, recommend to use internationalized components provided by us at the entrance. Look at: [LocaleProvider](http://ant.design/components/locale-provider/).

If there are special needs (only modifying single component language), Please use the property: local. Example: [default](https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json).

```jsx
import locale from 'antd/lib/date-picker/locale/zh_CN';

<DatePicker locale={locale} />;
```

**Note:** Part of locale of DatePicker, MonthPicker, RangePicker, WeekPicker is read from value. So, please set the locale of moment correctly.

```jsx
// The default locale is en-US, if you want to use other locale, just set locale in entry file globally.
import moment from 'moment';
import 'moment/locale/zh-cn';

<DatePicker defaultValue={moment('2015-01-01', 'YYYY-MM-DD')} />;
```

### Common API

The following APIs are shared by DatePicker, MonthPicker, RangePicker, WeekPicker.

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| allowClear | Whether to show clear button | boolean | true | 3.0.0 |
| autoFocus | get focus when component mounted | boolean | false | 3.0.0 |
| className | picker className | string | '' | 3.0.0 |
| dateRender | custom rendering function for date cells | function(currentDate: moment, today: moment) => React.ReactNode | - | 3.0.0 |
| disabled | determine whether the DatePicker is disabled | boolean | false | 3.0.0 |
| disabledDate | specify the date that cannot be selected | (currentDate: moment) => boolean | - | 3.0.0 |
| dropdownClassName | to customize the className of the popup calendar | string | - | 3.3.0 |
| getCalendarContainer | to set the container of the floating layer, while the default is to create a `div` element in `body` | function(trigger) | - | 3.0.0 |
| locale | localization configuration | object | [default](https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json) | 3.0.0 |
| mode | picker panel mode（[Cannot select year or month anymore?](/docs/react/faq#When-set-mode-to-DatePicker/RangePicker,-cannot-select-year-or-month-anymore?) | `time|date|month|year|decade` | 'date' | 3.0.0 |
| open | open state of picker | boolean | - | 3.0.0 |
| placeholder | placeholder of date input | string\|RangePicker\[] | - | 3.0.0 |
| popupStyle | to customize the style of the popup calendar | object | {} | 3.0.0 |
| size | determine the size of the input box, the height of `large` and `small`, are 40px and 24px respectively, while default size is 32px | string | - | 3.0.0 |
| suffixIcon | The custom suffix icon | ReactNode | - | 3.10.0 |
| style | to customize the style of the input box | object | {} | 3.0.0 |
| onOpenChange | a callback function, can be executed whether the popup calendar is popped up or closed | function(status) | - | 3.0.0 |
| onPanelChange | callback when picker panel mode is changed | function(value, mode) | - | 3.5.0 |

### Common Methods

| Name    | Description  |
| ------- | ------------ |
| blur()  | remove focus | 3.0.0 |
| focus() | get focus    | 3.0.0 |

### DatePicker

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| defaultValue | to set default date, if start time or end time is null or undefined, the date range will be an open interval | [moment](http://momentjs.com/) | - | 3.0.0 |
| defaultPickerValue | to set default picker date | [moment](http://momentjs.com/) | - | 3.10.8 |
| disabledTime | to specify the time that cannot be selected | function(date) | - | 3.0.0 |
| format | to set the date format, refer to [moment.js](http://momentjs.com/). When an array is provided, all values are used for parsing and first value is used for formatting. | string \| string[] | "YYYY-MM-DD" | 3.0.0 |
| renderExtraFooter | render extra footer in panel | (mode) => React.ReactNode | - | 3.0.0 |
| showTime | to provide an additional time selection | object\|boolean | [TimePicker Options](/components/time-picker/#API) | 3.0.0 |
| showTime.defaultValue | to set default time of selected date, [demo](#components-date-picker-demo-disabled-date) | [moment](http://momentjs.com/) | moment() | 3.0.0 |
| showToday | whether to show "Today" button | boolean | true | 3.0.0 |
| value | to set date | [moment](http://momentjs.com/) | - | 3.0.0 |
| onChange | a callback function, can be executed when the selected time is changing | function(date: moment, dateString: string) | - | 3.0.0 |
| onOk | callback when click ok button | function() | - | 3.0.0 |
| onPanelChange | Callback function for panel changing | function(value, mode) | - | 3.19.8 |

### MonthPicker

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| defaultValue | to set default date | [moment](http://momentjs.com/) | - | 3.0.0 |
| defaultPickerValue | to set default picker date | [moment](http://momentjs.com/) | - | 3.10.8 |
| format | to set the date format, refer to [moment.js](http://momentjs.com/) | string | "YYYY-MM" | 3.0.0 |
| monthCellContentRender | Custom month cell content render method | function(date, locale): ReactNode | - | 3.0.0 |
| renderExtraFooter | render extra footer in panel | () => React.ReactNode | - | 3.0.0 |
| value | to set date | [moment](http://momentjs.com/) | - | 3.0.0 |
| onChange | a callback function, can be executed when the selected time is changing | function(date: moment, dateString: string) | - | 3.0.0 |

### WeekPicker

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| defaultValue | to set default date | [moment](http://momentjs.com/) | - | 3.0.0 |
| defaultPickerValue | to set default picker date | [moment](http://momentjs.com/) | - | 3.10.8 |
| format | to set the date format, refer to [moment.js](http://momentjs.com/) | string | "YYYY-wo" | 3.0.0 |
| value | to set date | [moment](http://momentjs.com/) | - | 3.0.0 |
| onChange | a callback function, can be executed when the selected time is changing | function(date: moment, dateString: string) | - | 3.0.0 |
| renderExtraFooter | render extra footer in panel | (mode) => React.ReactNode | - | 3.12.0 |

### RangePicker

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| defaultValue | to set default date | \[[moment](http://momentjs.com/), [moment](http://momentjs.com/)] | - | 3.0.0 |
| defaultPickerValue | to set default picker date | \[[moment](http://momentjs.com/), [moment](http://momentjs.com/)\] | - | 3.10.8 |
| disabledTime | to specify the time that cannot be selected | function(dates: \[moment, moment], partial: `'start'|'end'`) | - | 3.0.0 |
| format | to set the date format, refer to [moment.js](http://momentjs.com/). When an array is provided, all values are used for parsing and first value is used for formatting. | string \| string[] | "YYYY-MM-DD HH:mm:ss" | 3.0.0 |
| ranges | preseted ranges for quick selection | { \[range: string]: [moment](http://momentjs.com/)\[] } \| { \[range: string]: () => [moment](http://momentjs.com/)\[] } | - | 3.0.0 |
| renderExtraFooter | render extra footer in panel | () => React.ReactNode | - | 3.0.0 |
| separator | set separator between inputs | string | '~' | 3.14.0 |
| showTime | to provide an additional time selection | object\|boolean | [TimePicker Options](/components/time-picker/#API) | 3.0.0 |
| showTime.defaultValue | to set default time of selected date, [demo](#components-date-picker-demo-disabled-date) | [moment](http://momentjs.com/)\[] | \[moment(), moment()] | 3.0.0 |
| value | to set date | \[[moment](http://momentjs.com/), [moment](http://momentjs.com/)] | - | 3.0.0 |
| onCalendarChange | a callback function, can be executed when the start time or the end time of the range is changing | function(dates: \[moment, moment], dateStrings: \[string, string]) | - | 3.10.9 |
| onChange | a callback function, can be executed when the selected time is changing | function(dates: \[moment, moment], dateStrings: \[string, string]) | - | 3.0.0 |
| onOk | callback when click ok button | function(dates: [moment](http://momentjs.com/)\[]) | - | 3.0.0 |

<style>
.code-box-demo .ant-calendar-picker {
  margin: 0 8px 12px 0;
}
</style>

## FAQ

- [When set mode to DatePicker/RangePicker, cannot select year or month anymore?](/docs/react/faq#When-set-mode-to-DatePicker/RangePicker,-cannot-select-year-or-month-anymore?)
