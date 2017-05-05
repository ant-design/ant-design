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

| Property                 | Description | Type | Default |
|---------------------|-----|-----|-------|
| defaultValue        | to set default time | [moment](http://momentjs.com/) | - |
| value               | to set time | [moment](http://momentjs.com/) | - |
| open                | whether to popup panel | boolean | false |
| onOpenChange        | a callback function which will be called while panel opening/closing | (open: boolean): void | - |
| placeholder         | display when there's no value | string | "Select a time" |
| onChange            | a callback function, can be executed when the selected time is changing    | function(time: moment, timeString: string): void | - |
| format              | to set the time format | string | "HH:mm:ss" |
| disabled            | determine whether the TimePicker is disabled | boolean | false |
| disabledHours       | to specify the hours that cannot be selected | function() | - |
| disabledMinutes     | to specify the minutes that cannot be selected | function(selectedHour) | - |
| disabledSeconds     | to specify the seconds that cannot be selected | function(selectedHour, selectedMinute) | - |
| hideDisabledOptions | hide the options that can not be selected | boolean | false |
| getPopupContainer   | to set the container of the floating layer, while the default is to create a div element in body | function(trigger) | - |
| addon | called from timepicker panel to render some addon to its bottom | function | - |
| use12Hours | display as 12 hours format, with default format `h:mm:ss a` | boolean | false |
| className | className of picker | string | '' |
| popupClassName | className of panel | string | '' |

<style>.code-box-demo .ant-time-picker { margin: 0 8px 12px 0; }</style>
