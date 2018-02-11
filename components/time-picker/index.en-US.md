---
category: Components
type: Data Entry
title: TimePicker
---

To select/input a time.

## When To Use

* * *

By clicking the input box, you can select a time from a popup panel.

## API

* * *

```jsx
import moment from 'moment';
<TimePicker defaultValue={moment('13:30:56', 'HH:mm:ss')} />
```

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| addon | called from timepicker panel to render some addon to its bottom | function | - |
| allowEmpty | allow clearing text | boolean | true |
| autoFocus | get focus when component mounted | boolean | false |
| className | className of picker | string | '' |
| clearText | clear tooltip of icon | string | clear |
| defaultOpenValue | default open panel value, used to set utcOffset,locale if value/defaultValue absent | [moment](http://momentjs.com/) | moment() |
| defaultValue | to set default time | [moment](http://momentjs.com/) | - |
| disabled | determine whether the TimePicker is disabled | boolean | false |
| disabledHours | to specify the hours that cannot be selected | function() | - |
| disabledMinutes | to specify the minutes that cannot be selected | function(selectedHour) | - |
| disabledSeconds | to specify the seconds that cannot be selected | function(selectedHour, selectedMinute) | - |
| format | to set the time format | string | "HH:mm:ss" |
| getPopupContainer | to set the container of the floating layer, while the default is to create a div element in body | function(trigger) | - |
| hideDisabledOptions | hide the options that can not be selected | boolean | false |
| hourStep | interval between hours in picker | number | 1 |
| inputReadOnly | Set the `readonly` attribute of the input tag (avoids virtual keyboard on touch devices) | boolean | false |
| minuteStep | interval between minutes in picker | number | 1 |
| open | whether to popup panel | boolean | false |
| placeholder | display when there's no value | string | "Select a time" |
| popupClassName | className of panel | string | '' |
| secondStep | interval between seconds in picker | number | 1 |
| use12Hours | display as 12 hours format, with default format `h:mm:ss a` | boolean | false |
| value | to set time | [moment](http://momentjs.com/) | - |
| onChange | a callback function, can be executed when the selected time is changing | function(time: moment, timeString: string): void | - |
| onOpenChange | a callback function which will be called while panel opening/closing | (open: boolean): void | - |

## Methods

| Name | Description |
| ---- | ----------- |
| blur() | remove focus |
| focus() | get focus |

<style>.code-box-demo .ant-time-picker { margin: 0 8px 12px 0; }</style>
