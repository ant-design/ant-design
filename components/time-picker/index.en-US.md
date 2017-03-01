---
category: Components
type: Data Entry
title: TimePicker
---

To select/input a time.

## When To Use
--------

By clicking the input box, you can select a time from a popup panel.

## API
---

```jsx
import moment from 'moment';
<TimePicker defaultValue={moment('13:30:56', 'HH:mm:ss')} />
```

> Note: `TimePicker` is renamed to `TimePicker` after 0.11.

| Property                 | Description | Type | Default |
|---------------------|-----|-----|-------|
| defaultValue        | to set default time | [moment](http://momentjs.com/) | - |
| value               | to set time | [moment](http://momentjs.com/) | - |
| placeholder         | display when there's no value | string | "Select a time" |
| onChange            | a callback function, can be executed when the selected time is changing    | function(time: moment, timeString: string): void | - |
| format              | to set the time format | string | "HH:mm:ss"、"HH:mm"、"mm:ss" |
| disabled            | determine whether the TimePicker is disabled | boolean | false |
| disabledHours       | to specify the hours that cannot be selected | function() | - |
| disabledMinutes     | to specify the minutes that cannot be selected | function(selectedHour) | - |
| disabledSeconds     | to specify the seconds that cannot be selected | function(selectedHour, selectedMinute) | - |
| hideDisabledOptions | hide the options that can not be selected | boolean | false |
| getPopupContainer   | to set the container of the floating layer, while the default is to create a div element in body | function(trigger) | - |
| addon | called from timepicker panel to render some addon to its bottom | function | 无 |

<style>.code-box-demo .ant-time-picker { margin: 0 8px 12px 0; }</style>
