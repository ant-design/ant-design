---
category: Components
type: Data Entry
title: DatePicker
---

To select or input a date.

## When To Use

By clicking the input box, you can select a date from a popup calendar.

## API

There are three kinds of picker:

* DatePicker
* MonthPicker
* RangePicker

**Note:** Part of locale of DatePicker, MonthPicker, RangePicker is read from value. So, please set the locale of moment correctly.

```jsx
import moment from 'moment';

// It's recommended to set locale in entry file globaly.
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

<DatePicker defaultValue={moment('2015-01-01', 'YYYY-MM-DD')} />
```

### Common API

The following APIs are shared by DatePicker, MonthPicker, RangePicker.

| Property     | Description    | Type     | Default      |
|--------------|----------------|----------|--------------|
| allowClear   | Whether to show clear button | boolean | true |
| disabled     | determine whether the DatePicker is disabled           | boolean     | false        |
| style        | to customize the style of the input box     | object     | {}   |
| popupStyle   | to customize the style of the popup calendar   | object     | {}   |
| size         | determine the size of the input box, the height of `large` and `small`, are 32px and 22px respectively, while default size is 28px | string   | -  |
| locale       | localization configuration | object   | [default](https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json)  |
| disabledDate | to specify the date that cannot be selected | function | -           |
| getCalendarContainer | to set the container of the floating layer, while the default is to create a `div` element in `body` | function(trigger) | - |
| open | open state of picker | boolean | - |
| onOpenChange   | a callback function, can be executed whether the popup calendar is popped up or closed | function(status) | - |
| placeholder  | placeholder of date input | string\|RangePicker[] | - |

### DatePicker

| Property         | Description           | Type     | Default       |
|--------------|----------------|----------|--------------|
| value        | to set date           | [moment](http://momentjs.com/)   | -           |
| defaultValue | to set default date        | [moment](http://momentjs.com/)   | -           |
| format       | to set the date format, refer to [moment.js](http://momentjs.com/) | string   | "YYYY-MM-DD" |
| onChange     | a callback function, can be executed when the selected time is changing | function(date: moment, dateString: string) | -           |
| showTime     | to provide an additional time selection  | object\|boolean | [TimePicker Options](/components/time-picker/#API) |
| showToday    | whether to show "Today" button | boolean | true |
| disabledTime | to specify the time that cannot be selected | function(date) | - |

### MonthPicker

| Property         | Description           | Type     | Default       |
|--------------|----------------|----------|--------------|
| value        | to set date          | [moment](http://momentjs.com/)   | -           |
| defaultValue | to set default date       | [moment](http://momentjs.com/)   | -           |
| format       | to set the date format, refer to [moment.js](http://momentjs.com/) | string   | "YYYY-MM" |
| onChange     | a callback function, can be executed when the selected time is changing | function(date: moment, dateString: string) | -           |
| monthCellContentRender | Custom month cell content render method | function(date, locale): ReactNode | - |

### RangePicker

| Property         | Description           | Type     | Default       |
|--------------|----------------|----------|--------------|
| value        | to set date          | [[moment](http://momentjs.com/), [moment](http://momentjs.com/)]   | -           |
| defaultValue | to set default date       | [[moment](http://momentjs.com/), [moment](http://momentjs.com/)]   | -           |
| format       | to set the date format  | string    | "YYYY-MM-DD HH:mm:ss" |
| onChange     | a callback function, can be executed when the selected time is changing | function(dates: [moment, moment], dateStrings: [string, string]) | -           |
| showTime     | to provide an additional time selection  | object\|boolean | [TimePicker Options](/components/time-picker/#API) |
| disabledTime | to specify the time that cannot be selected | function(dates: [moment, moment], partial: `'start'|'end'`) | - |
| ranges       | preseted ranges for quick selection | { [range: string]: [moment](http://momentjs.com/)[] } | - |

<style>
.code-box-demo .ant-calendar-picker {
  margin: 0 8px 12px 0;
}
</style>
