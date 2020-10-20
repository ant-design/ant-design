---
category: Components
type: Data Entry
title: TimePicker
cover: https://gw.alipayobjects.com/zos/alicdn/h04Zsl98I/TimePicker.svg
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

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| allowClear | Whether allow clearing text | boolean | true |  |
| autoFocus | If get focus when component mounted | boolean | false |  |
| bordered | Whether has border style | boolean | true |  |
| className | The className of picker | string | - |  |
| clearIcon | The custom clear icon | ReactNode | - |  |
| clearText | The clear tooltip of icon | string | clear |  |
| defaultValue | To set default time | [moment](http://momentjs.com/) | - |  |
| disabled | Determine whether the TimePicker is disabled | boolean | false |  |
| disabledHours | To specify the hours that cannot be selected | function() | - |  |
| disabledMinutes | To specify the minutes that cannot be selected | function(selectedHour) | - |  |
| disabledSeconds | To specify the seconds that cannot be selected | function(selectedHour, selectedMinute) | - |  |
| format | To set the time format | string | `HH:mm:ss` |  |
| getPopupContainer | To set the container of the floating layer, while the default is to create a div element in body | function(trigger) | - |  |
| hideDisabledOptions | Whether hide the options that can not be selected | boolean | false |  |
| hourStep | Interval between hours in picker | number | 1 |  |
| inputReadOnly | Set the `readonly` attribute of the input tag (avoids virtual keyboard on touch devices) | boolean | false |  |
| minuteStep | Interval between minutes in picker | number | 1 |  |
| onChange | A callback function, can be executed when the selected time is changing | function(time: moment, timeString: string): void | - |  |
| onOpenChange | A callback function which will be called while panel opening/closing | (open: boolean) => void | - |  |
| onSelect | A callback function, executes when a value is selected | function(time: moment): void | - |  |
| open | Whether to popup panel | boolean | false |  |
| placeholder | Display when there's no value | string \| \[string, string] | `Select a time` |  |
| popupClassName | The className of panel | string | - |  |
| popupStyle | The style of panel | CSSProperties | - |  |
| renderExtraFooter | Called from time picker panel to render some addon to its bottom | () => ReactNode | - |  |
| secondStep | Interval between seconds in picker | number | 1 |  |
| showNow | Whether to show `Now` button on panel | boolean | - | 4.4.0 |
| suffixIcon | The custom suffix icon | ReactNode | - |  |
| use12Hours | Display as 12 hours format, with default format `h:mm:ss a` | boolean | false |  |
| value | To set time | [moment](http://momentjs.com/) | - |  |

## Methods

| Name    | Description  | Version |
| ------- | ------------ | ------- |
| blur()  | Remove focus |         |
| focus() | Get focus    |         |

### RangePicker

Same props from [RangePicker](/components/date-picker/#RangePicker) of DatePicker. And includes additional props:

| Property | Description              | Type    | Default | Version |
| -------- | ------------------------ | ------- | ------- | ------- |
| order    | Order start and end time | boolean | true    | 4.1.0   |

<style>
.code-box-demo .ant-picker { margin: 0 8px 12px 0; }
.ant-row-rtl .code-box-demo .ant-picker { margin: 0 0 12px 8px; }
</style>

## FAQ

- [How to use TimePicker with customize date library like dayjs](/docs/react/replace-moment#TimePicker)
