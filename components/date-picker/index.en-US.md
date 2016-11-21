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
| allowClear   | Whether to show clear button | bool | true |
| disabled     | determine whether the DatePicker is disabled           | Boolean     | false        |
| style        | to customize the style of the input box     | Object     | {}   |
| popupStyle   | to customize the style of the popup calendar   | Object     | {}   |
| size         | determine the size of the input box, the height of `large` and `small`, are 32px and 22px respectively, while default size is 28px | String   | -  |
| locale       | localization configuration | Object   | [default](https://github.com/ant-design/ant-design/issues/424)  |
| disabledDate | to specify the date that cannot be selected | function | -           |
| getCalendarContainer | to set the container of the floating layer, while the default is to create a `div` element in `body` | function(trigger) | - |
| open | open state of picker | bool | - |
| onOpenChange   | a callback function, can be executed whether the popup calendar is popped up or closed | function(status) | - |

### DatePicker

| Property         | Description           | Type     | Default       |
|--------------|----------------|----------|--------------|
| value        | to set date           | [moment](http://momentjs.com/)   | -           |
| defaultValue | to set default date        | [moment](http://momentjs.com/)   | -           |
| format       | to set the date format, refer to [moment.js](http://momentjs.com/) | String   | "YYYY-MM-DD" |
| onChange     | a callback function, can be executed when the selected time is changing | function(date: moment, dateString: string) | -           |
| showTime     | to provide an additional time selection  | Object/Boolean | [TimePicker Options](/components/time-picker/#api) |
| showToday    | whether to show "Today" button | Boolean | true |
| disabledTime | to specify the time that cannot be selected | function(date) | - |

### MonthPicker

| Property         | Description           | Type     | Default       |
|--------------|----------------|----------|--------------|
| value        | to set date          | [moment](http://momentjs.com/)   | -           |
| defaultValue | to set default date       | [moment](http://momentjs.com/)   | -           |
| format       | to set the date format, refer to [moment.js](http://momentjs.com/) | String   | "YYYY-MM" |
| onChange     | a callback function, can be executed when the selected time is changing | function(date: moment, dateString: string) | -           |
| monthCellContentRender | Custom month cell render method | function | 无 |
| cellContentRender | Custom month cell content render method,the content will be appended to the cell. | function | 无 |

### RangePicker

| Property         | Description           | Type     | Default       |
|--------------|----------------|----------|--------------|
| value        | to set date          | [[moment](http://momentjs.com/), [moment](http://momentjs.com/)]   | -           |
| defaultValue | to set default date       | [[moment](http://momentjs.com/), [moment](http://momentjs.com/)]   | -           |
| format       | to set the date format  | String    | "YYYY-MM-DD HH:mm:ss" |
| onChange     | a callback function, can be executed when the selected time is changing | function(dates: [moment, moment], dateStrings: [string, string]) | -           |
| showTime     | to provide an additional time selection  | Object/Boolean | [TimePicker Options](/components/time-picker/#api) |
| disabledTime | to specify the time that cannot be selected | function(dates: [moment, moment], partial: `'start'|'end'`) | - |
| ranges       | preseted ranges for quick selection | Object { [range: string]: [moment, moment] } | - |

<style>
.code-box-demo .ant-calendar-picker {
  margin: 0 8px 12px 0;
}
</style>
