---
category: Components
type: Data Entry
title: TimePicker
---

To select/input a time.

## When To Use

---

By clicking the input box, you can select a time from a popup panel.

## API

---

```jsx
import moment from 'moment';
<TimePicker defaultValue={moment('13:30:56', 'HH:mm:ss')} />;
```

| Property | Description | Type | Default | Version Added |
| --- | --- | --- | --- | --- |
| addon | called from timepicker panel to render some addon to its bottom | function | - | 3.0.0 |
| allowClear | allow clearing text | boolean | true | 3.13.0 |
| autoFocus | get focus when component mounted | boolean | false | 3.0.0 |
| className | className of picker | string | '' | 3.0.0 |
| clearText | clear tooltip of icon | string | clear | 3.0.0 |
| defaultOpenValue | default open panel value, used to set utcOffset,locale if value/defaultValue absent | [moment](http://momentjs.com/) | moment() | 3.0.0 |
| defaultValue | to set default time | [moment](http://momentjs.com/) | - | 3.0.0 |
| disabled | determine whether the TimePicker is disabled | boolean | false | 3.0.0 |
| disabledHours | to specify the hours that cannot be selected | function() | - | 3.0.0 |
| disabledMinutes | to specify the minutes that cannot be selected | function(selectedHour) | - | 3.0.0 |
| disabledSeconds | to specify the seconds that cannot be selected | function(selectedHour, selectedMinute) | - | 3.0.0 |
| format | to set the time format | string | "HH:mm:ss" | 3.0.0 |
| getPopupContainer | to set the container of the floating layer, while the default is to create a div element in body | function(trigger) | - | 3.0.0 |
| hideDisabledOptions | hide the options that can not be selected | boolean | false | 3.0.0 |
| hourStep | interval between hours in picker | number | 1 | 3.0.0 |
| inputReadOnly | Set the `readonly` attribute of the input tag (avoids virtual keyboard on touch devices) | boolean | false | 3.3.0 |
| minuteStep | interval between minutes in picker | number | 1 | 3.0.0 |
| open | whether to popup panel | boolean | false | 3.0.0 |
| placeholder | display when there's no value | string | "Select a time" | 3.0.0 |
| popupClassName | className of panel | string | '' | 3.0.0 |
| popupStyle | style of panel | object | - | 3.12.0 |
| secondStep | interval between seconds in picker | number | 1 | 3.0.0 |
| suffixIcon | The custom suffix icon | ReactNode | - | 3.10.0 |
| clearIcon | The custom clear icon | ReactNode | - | 3.14.0 |
| use12Hours | display as 12 hours format, with default format `h:mm:ss a` | boolean | false | 3.0.0 |
| value | to set time | [moment](http://momentjs.com/) | - | 3.0.0 |
| onChange | a callback function, can be executed when the selected time is changing | function(time: moment, timeString: string): void | - | 3.0.0 |
| onOpenChange | a callback function which will be called while panel opening/closing | (open: boolean): void | - | 3.0.0 |

## Methods

| Name    | Description  | Version Added |
| ------- | ------------ | ------------- |
| blur()  | remove focus | 3.0.0         |
| focus() | get focus    | 3.0.0         |

<style>.code-box-demo .ant-time-picker { margin: 0 8px 12px 0; }</style>
