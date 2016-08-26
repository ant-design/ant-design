---
category: Components
type: Form Controls
title: TimePicker
---

To select/input a time.

## When to use
--------

By clicking the input box, you can select a time from a popup panel.

## API
---

```html
<TimePicker defaultValue="13:30:56" />
```

> Warning: `TimePicker` is renamed to `TimePicker` after 0.11.

| Property                 | Description | Type | Default |
|---------------------|-----|-----|-------|
| defaultValue        | to set default time | string or Date | - |
| value               | to set time | string or Date | - |
| placeholder         | display when there's no value | string | "Select a time" |
| onChange            | a callback function, can be executed when the selected time is changing    | function(date, dateString) | - |
| format              | to set the time format | string | "HH:mm:ss"、"HH:mm"、"mm:ss" |
| disabled            | determine whether the TimePicker is disabled | bool | false |
| disabledHours       | to specify the hours that cannot be selected | function() | - |
| disabledMinutes     | to specify the minites that cannot be selected | function(selectedHour) | - |
| disabledSeconds     | to specify the seconds that cannot be selected | function(selectedHour, selectedMinute) | - |
| hideDisabledOptions | hide the options that can not be selected | boolean | false |
| getPopupContainer   | to set the container of the floating layer, while the default is to create a div element in body | function(trigger) | - |
| locale              | localization configuration | Object | [default](https://github.com/ant-design/ant-design/issues/1270#issuecomment-201181384) |

<style>.code-box-demo .ant-time-picker { margin: 0 8px 12px 0; }</style>
