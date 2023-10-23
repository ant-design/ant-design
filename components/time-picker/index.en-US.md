---
category: Components
group: Data Entry
title: TimePicker
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*kGmGSLk_1fwAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*1hDmQJIDFJQAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

To select/input a time.

## When To Use

By clicking the input box, you can select a time from a popup panel.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic</code>
<code src="./demo/value.tsx">Under Control</code>
<code src="./demo/size.tsx">Three Sizes</code>
<code src="./demo/disabled.tsx">disabled</code>
<code src="./demo/hide-column.tsx">Hour and minute</code>
<code src="./demo/interval-options.tsx">interval option</code>
<code src="./demo/addon.tsx">Addon</code>
<code src="./demo/12hours.tsx">12 hours</code>
<code src="./demo/colored-popup.tsx" debug>Colored Popup</code>
<code src="./demo/range-picker.tsx">Time Range Picker</code>
<code src="./demo/bordered.tsx">Bordered-less</code>
<code src="./demo/status.tsx">Status</code>
<code src="./demo/suffix.tsx" debug>Suffix</code>
<code src="./demo/render-panel.tsx" debug>_InternalPanelDoNotUseOrYouWillBeFired</code>

## API

---

Common props ref：[Common props](/docs/react/common-props)

```jsx
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

<TimePicker defaultValue={dayjs('13:30:56', 'HH:mm:ss')} />;
```

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| allowClear | Customize clear icon | boolean \| { clearIcon?: ReactNode } | true | 5.8.0: Support object type |
| autoFocus | If get focus when component mounted | boolean | false |  |
| bordered | Whether has border style | boolean | true |  |
| cellRender | Custom rendering function for picker cells | (current: number, info: { originNode: React.ReactElement, today: dayjs, range?: 'start' \| 'end', subType: 'hour' \| 'minute' \| 'second' \| 'meridiem' }) => React.ReactNode | - | 5.4.0 |
| changeOnBlur | Trigger `change` when blur. e.g. datetime picker no need click confirm button | boolean | false | 5.5.0 |
| className | The className of picker | string | - |  |
| defaultValue | To set default time | [dayjs](http://day.js.org/) | - |  |
| disabled | Determine whether the TimePicker is disabled | boolean | false |  |
| disabledTime | To specify the time that cannot be selected | [DisabledTime](#disabledtime) | - | 4.19.0 |
| format | To set the time format | string | `HH:mm:ss` |  |
| getPopupContainer | To set the container of the floating layer, while the default is to create a div element in body | function(trigger) | - |  |
| hideDisabledOptions | Whether hide the options that can not be selected | boolean | false |  |
| hourStep | Interval between hours in picker | number | 1 |  |
| inputReadOnly | Set the `readonly` attribute of the input tag (avoids virtual keyboard on touch devices) | boolean | false |  |
| minuteStep | Interval between minutes in picker | number | 1 |  |
| open | Whether to popup panel | boolean | false |  |
| placeholder | Display when there's no value | string \| \[string, string] | `Select a time` |  |
| placement | The position where the selection box pops up | `bottomLeft` `bottomRight` `topLeft` `topRight` | bottomLeft |  |
| popupClassName | The className of panel | string | - |  |
| popupStyle | The style of panel | CSSProperties | - |  |
| renderExtraFooter | Called from time picker panel to render some addon to its bottom | () => ReactNode | - |  |
| secondStep | Interval between seconds in picker | number | 1 |  |
| showNow | Whether to show `Now` button on panel | boolean | - | 4.4.0 |
| size | To determine the size of the input box, the height of `large` and `small`, are 40px and 24px respectively, while default size is 32px | `large` \| `middle` \| `small` | - |  |
| status | Set validation status | 'error' \| 'warning' \| 'success' \| 'validating' | - | 4.19.0 |
| suffixIcon | The custom suffix icon | ReactNode | - |  |
| use12Hours | Display as 12 hours format, with default format `h:mm:ss a` | boolean | false |  |
| value | To set time | [dayjs](http://day.js.org/) | - |  |
| onChange | A callback function, can be executed when the selected time is changing | function(time: dayjs, timeString: string): void | - |  |
| onOpenChange | A callback function which will be called while panel opening/closing | (open: boolean) => void | - |  |
| onSelect | A callback function, executes when a value is selected | function(time: dayjs): void | - |  |

#### DisabledTime

```typescript
type DisabledTime = (now: Dayjs) => {
  disabledHours?: () => number[];
  disabledMinutes?: (selectedHour: number) => number[];
  disabledSeconds?: (selectedHour: number, selectedMinute: number) => number[];
};
```

## Methods

| Name    | Description  | Version |
| ------- | ------------ | ------- |
| blur()  | Remove focus |         |
| focus() | Get focus    |         |

### RangePicker

Same props from [RangePicker](/components/date-picker/#rangepicker) of DatePicker. And includes additional props:

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| disabledTime | To specify the time that cannot be selected | [RangeDisabledTime](#rangedisabledtime) | - | 4.19.0 |
| order | Order start and end time | boolean | true | 4.1.0 |

### RangeDisabledTime

```typescript
type RangeDisabledTime = (
  now: Dayjs,
  type = 'start' | 'end',
) => {
  disabledHours?: () => number[];
  disabledMinutes?: (selectedHour: number) => number[];
  disabledSeconds?: (selectedHour: number, selectedMinute: number) => number[];
};
```

## Design Token

<ComponentTokenTable component="DatePicker"></ComponentTokenTable>

## FAQ

- [How to use TimePicker with customize date library like dayjs](/docs/react/use-custom-date-library#timepicker)
