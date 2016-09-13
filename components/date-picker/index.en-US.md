---
category: Components
type: Form Controls
title: DatePicker
---

To select/input a date.

## When To Use

By clicking the input box, you can select a date from a popup calendar.

## API

### DatePicker

```jsx
import moment from 'moment-timezone';

// It's recommended to set locale and timezone in entry file globaly.
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
moment.tz.setDefault('Aisa/Shanghai');

<DatePicker defaultValue={moment('2015-01-01', 'YYYY-MM-DD')} />
```

| Property         | Description           | Type     | Default       |
|--------------|----------------|----------|--------------|
| value        | to set date           | [moment](http://momentjs.com/)   | -           |
| defaultValue | to set default date        | [moment](http://momentjs.com/)   | -           |
| format       | to set the date format, refer to [moment.js](http://momentjs.com/) | String   | "YYYY-MM-DD" |
| disabledDate | to specify the date that cannot be selected | function | -           |
| onChange     | a callback function, can be executed when the selected time is changing | function(date: moment, dateString: string) | -           |
| disabled     | determine whether the DatePicker is disabled           | Boolean     | false        |
| style        | to customize the style of the input box     | Object     | {}   |
| popupStyle   | to customize the style of the popup calendar   | Object     | {}   |
| size         | determine the size of the input box, the height of `large` and `small`, are 32px and 22px respectively, while default size is 28px | String   | -  |
| locale       | localization configuration | Object   | [default](https://github.com/ant-design/ant-design/issues/424)  |
| onOk         | a callback function, can be executed when OK-button is clicked | function(Date value) | - |
| open | open state of picker | bool | - |
| toggleOpen   | a callback function, can be executed whether the popup calendar is popped up or closed | function(open) | - |
| getCalendarContainer | to set the container of the floating layer, while the default is to create a `div` element in `body` | function(trigger) | - |
| showTime     | to provide an additional time selection  | Object/Boolean | [TimePicker Options](http://ant.design/components/time-picker/#api) |

### MonthPicker

| Property         | Description           | Type     | Default       |
|--------------|----------------|----------|--------------|
| value        | to set date          | [moment](http://momentjs.com/)   | -           |
| defaultValue | to set default date       | [moment](http://momentjs.com/)   | -           |
| format       | to set the date format, refer to [moment.js](http://momentjs.com/) | String   | "YYYY-MM" |
| disabledDate | to specify the date that cannot be selected | function | -           |
| onChange     | a callback function, can be executed when the selected time is changing | function(date: moment, dateString: string) | -           |
| disabled     | determine whether the MonthPicker is disabled           | Boolean     | false        |
| style        | to customize the style of the input box     | Object     | {}   |
| popupStyle   | to customize the style of the popup calendar   | Object     | {}   |
| size         | determine the size of the input box, the height of `large` and `small`, are 32px and 22px respectively, while default size is 28px | String   | -  |
| locale       | localization configuration | Object   | [default](https://github.com/ant-design/ant-design/issues/424)  |
| getCalendarContainer | to set the container of the floating layer, while the default is to create a `div` element in `body` | function(trigger) | - |

### RangePicker

| Property         | Description           | Type     | Default       |
|--------------|----------------|----------|--------------|
| value        | to set date          | [moment, moment]   | -           |
| defaultValue | to set default date       | [moment, moment]   | -           |
| format       | to set the date format  | String    | "YYYY-MM-DD HH:mm:ss" |
| onChange     | a callback function, can be executed when the selected time is changing | function(dates: [moment, moment], dateStrings: [string, string]) | -           |
| showTime     | to provide an additional time selection  | Object/Boolean | [TimePicker Options](http://ant.design/components/time-picker/#api) |

The following properties are the same with `DatePicker`: `disabled` `style` `popupStyle` `size` `locale` `showTime` `onOk` `getCalendarContainer`


<style>
.code-box-demo .ant-calendar-picker {
  margin: 0 8px 12px 0;
}
</style>
