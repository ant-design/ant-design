---
category: Components
group: Data Entry
title: DatePicker
description: To select or input a date.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*xXA9TJ8BTioAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*3OpRQKcygo8AAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

## When To Use

By clicking the input box, you can select a date from a popup calendar.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic</code>
<code src="./demo/range-picker.tsx">Range Picker</code>
<code src="./demo/switchable.tsx">Switchable picker</code>
<code src="./demo/format.tsx">Date Format</code>
<code src="./demo/time.tsx">Choose Time</code>
<code src="./demo/disabled.tsx">Disabled</code>
<code src="./demo/disabled-date.tsx">Disabled Date & Time</code>
<code src="./demo/select-in-range.tsx">Select range dates in 7 days</code>
<code src="./demo/preset-ranges.tsx">Preset Ranges</code>
<code src="./demo/extra-footer.tsx">Extra Footer</code>
<code src="./demo/size.tsx">Three Sizes</code>
<code src="./demo/cell-render.tsx">Customized Cell Rendering</code>
<code src="./demo/status.tsx">Status</code>
<code src="./demo/bordered.tsx">Bordered-less</code>
<code src="./demo/placement.tsx">Placement</code>
<code src="./demo/mode.tsx" debug>Controlled Panels</code>
<code src="./demo/start-end.tsx" debug>Customized Range Picker</code>
<code src="./demo/suffix.tsx" debug>Suffix</code>
<code src="./demo/render-panel.tsx" debug>\_InternalPanelDoNotUseOrYouWillBeFired</code>

## API

There are five kinds of picker:

- DatePicker
- DatePicker\[picker="month"]
- DatePicker\[picker="week"]
- DatePicker\[picker="year"]
- DatePicker\[picker="quarter"] (Added in 4.1.0)
- RangePicker

### Localization

The default locale is en-US, if you need to use other languages, recommend to use internationalized components provided by us at the entrance. Look at: [ConfigProvider](https://ant.design/components/config-provider/).

If there are special needs (only modifying single component language), Please use the property: local. Example: [default](https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json).

```jsx
import 'dayjs/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';

<DatePicker locale={locale} />;
```

```jsx
// The default locale is en-US, if you want to use other locale, just set locale in entry file globally.
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import locale from 'antd/locale/zh_CN';

<ConfigProvider locale={locale}>
  <DatePicker defaultValue={dayjs('2015-01-01', 'YYYY-MM-DD')} />
</ConfigProvider>;
```

### Common API

The following APIs are shared by DatePicker, RangePicker.

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| allowClear | Whether to show clear button | boolean | true |  |
| autoFocus | If get focus when component mounted | boolean | false |  |
| bordered | Whether has border style | boolean | true |  |
| className | The picker className | string | - |  |
| dateRender | Custom rendering function for date cells, >= 5.4.0 use `cellRender` instead. | function(currentDate: dayjs, today: dayjs) => React.ReactNode | - | < 5.4.0 |
| changeOnBlur | Trigger `change` when blur. e.g. datetime picker no need click confirm button | boolean | false | 5.5.0 |
| cellRender | Custom rendering function for picker cells | function(current: dayjs, today: dayjs, info: { originNode: React.ReactElement,today: DateType, range?: 'start' \| 'end', type: PanelMode, locale?: Locale, subType?: 'hour' \| 'minute' \| 'second' \| 'meridiem' }) => React.ReactNode | - | 5.4.0 |
| disabled | Determine whether the DatePicker is disabled | boolean | false |  |
| disabledDate | Specify the date that cannot be selected | (currentDate: dayjs) => boolean | - |  |
| format | To set the date format, support multi-format matching when it is an array, display the first one shall prevail. refer to [dayjs#format](https://day.js.org/docs/en/display/format). for example: [Custom Format](#components-date-picker-demo-format) | [formatType](#formattype) | [rc-picker](https://github.com/react-component/picker/blob/f512f18ed59d6791280d1c3d7d37abbb9867eb0b/src/utils/uiUtil.ts#L155-L177) |  |
| popupClassName | To customize the className of the popup calendar | string | - | 4.23.0 |
| getPopupContainer | To set the container of the floating layer, while the default is to create a `div` element in `body` | function(trigger) | - |  |
| inputReadOnly | Set the `readonly` attribute of the input tag (avoids virtual keyboard on touch devices) | boolean | false |  |
| locale | Localization configuration | object | [default](https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json) |  |
| mode | The picker panel mode（ [Cannot select year or month anymore?](/docs/react/faq#when-set-mode-to-datepickerrangepicker-cannot-select-year-or-month-anymore) ) | `time` \| `date` \| `month` \| `year` \| `decade` | - |  |
| nextIcon | The custom next icon | ReactNode | - | 4.17.0 |
| open | The open state of picker | boolean | - |  |
| panelRender | Customize panel render | (panelNode) => ReactNode | - | 4.5.0 |
| picker | Set picker type | `date` \| `week` \| `month` \| `quarter` \| `year` | `date` | `quarter`: 4.1.0 |
| placeholder | The placeholder of date input | string \| \[string,string] | - |  |
| placement | The position where the selection box pops up | `bottomLeft` `bottomRight` `topLeft` `topRight` | bottomLeft |  |
| popupStyle | To customize the style of the popup calendar | CSSProperties | {} |  |
| presets | The preset ranges for quick selection | { label: React.ReactNode, value: [dayjs](https://day.js.org/) }[] | - |  |
| prevIcon | The custom prev icon | ReactNode | - | 4.17.0 |
| size | To determine the size of the input box, the height of `large` and `small`, are 40px and 24px respectively, while default size is 32px | `large` \| `middle` \| `small` | - |  |
| status | Set validation status | 'error' \| 'warning' | - | 4.19.0 |
| style | To customize the style of the input box | CSSProperties | {} |  |
| suffixIcon | The custom suffix icon | ReactNode | - |  |
| superNextIcon | The custom super next icon | ReactNode | - | 4.17.0 |
| superPrevIcon | The custom super prev icon | ReactNode | - | 4.17.0 |
| onOpenChange | Callback function, can be executed whether the popup calendar is popped up or closed | function(open) | - |  |
| onPanelChange | Callback when picker panel mode is changed | function(value, mode) | - |  |

### Common Methods

| Name    | Description  | Version |
| ------- | ------------ | ------- |
| blur()  | Remove focus |         |
| focus() | Get focus    |         |

### DatePicker

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| defaultPickerValue | To set default picker date | [dayjs](https://day.js.org/) | - |  |
| defaultValue | To set default date, if start time or end time is null or undefined, the date range will be an open interval | [dayjs](https://day.js.org/) | - |  |
| disabledTime | To specify the time that cannot be selected | function(date) | - |  |
| format | To set the date format. refer to [dayjs#format](https://day.js.org/docs/en/display/format) | [formatType](#formattype) | `YYYY-MM-DD` |  |
| renderExtraFooter | Render extra footer in panel | (mode) => React.ReactNode | - |  |
| showNow | Whether to show 'Now' button on panel when `showTime` is set | boolean | - | 4.4.0 |
| showTime | To provide an additional time selection | object \| boolean | [TimePicker Options](/components/time-picker/#api) |  |
| showTime.defaultValue | To set default time of selected date, [demo](#components-date-picker-demo-disabled-date) | [dayjs](https://day.js.org/) | dayjs() |  |
| showToday | Whether to show `Today` button | boolean | true |  |
| value | To set date | [dayjs](https://day.js.org/) | - |  |
| onChange | Callback function, can be executed when the selected time is changing | function(date: dayjs, dateString: string) | - |  |
| onOk | Callback when click ok button | function() | - |  |
| onPanelChange | Callback function for panel changing | function(value, mode) | - |  |

### DatePicker\[picker=year]

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| defaultPickerValue | To set default picker date | [dayjs](https://day.js.org/) | - |  |
| defaultValue | To set default date | [dayjs](https://day.js.org/) | - |  |
| format | To set the date format. refer to [dayjs#format](https://day.js.org/docs/en/display/format) | [formatType](#formattype) | `YYYY` |  |
| renderExtraFooter | Render extra footer in panel | () => React.ReactNode | - |  |
| value | To set date | [dayjs](https://day.js.org/) | - |  |
| onChange | Callback function, can be executed when the selected time is changing | function(date: dayjs, dateString: string) | - |  |

### DatePicker\[picker=quarter]

Added in `4.1.0`.

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| defaultPickerValue | To set default picker date | [dayjs](https://day.js.org/) | - |  |
| defaultValue | To set default date | [dayjs](https://day.js.org/) | - |  |
| format | To set the date format. refer to [dayjs#format](https://day.js.org/docs/en/display/format) | [formatType](#formattype) | `YYYY-\QQ` |  |
| renderExtraFooter | Render extra footer in panel | () => React.ReactNode | - |  |
| value | To set date | [dayjs](https://day.js.org/) | - |  |
| onChange | Callback function, can be executed when the selected time is changing | function(date: dayjs, dateString: string) | - |  |

### DatePicker\[picker=month]

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| defaultPickerValue | To set default picker date | [dayjs](https://day.js.org/) | - |  |
| defaultValue | To set default date | [dayjs](https://day.js.org/) | - |  |
| format | To set the date format. refer to [dayjs#format](https://day.js.org/docs/en/display/format) | [formatType](#formattype) | `YYYY-MM` |  |
| renderExtraFooter | Render extra footer in panel | () => React.ReactNode | - |  |
| value | To set date | [dayjs](https://day.js.org/) | - |  |
| onChange | Callback function, can be executed when the selected time is changing | function(date: dayjs, dateString: string) | - |  |

### DatePicker\[picker=week]

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| defaultPickerValue | To set default picker date | [dayjs](https://day.js.org/) | - |  |
| defaultValue | To set default date | [dayjs](https://day.js.org/) | - |  |
| format | To set the date format. refer to [dayjs#format](https://day.js.org/docs/en/display/format) | [formatType](#formattype) | `YYYY-wo` |  |
| renderExtraFooter | Render extra footer in panel | (mode) => React.ReactNode | - |  |
| value | To set date | [dayjs](https://day.js.org/) | - |  |
| onChange | Callback function, can be executed when the selected time is changing | function(date: dayjs, dateString: string) | - |  |

### RangePicker

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| allowEmpty | Allow start or end input leave empty | \[boolean, boolean] | \[false, false] |  |
| dateRender | Custom rendering function for date cells, >= 5.4.0 use `cellRender` instead. | function(currentDate: dayjs, today: dayjs) => React.ReactNode | - | < 5.4.0 |
| cellRender | Custom rendering function for picker cells | function(current: dayjs, today: dayjs, info: { originNode: React.ReactElement,today: DateType, range?: 'start' \| 'end', type: PanelMode, locale?: Locale, subType?: 'hour' \| 'minute' \| 'second' \| 'meridiem' }) => React.ReactNode | - | 5.4.0 |
| defaultPickerValue | To set default picker date | \[[dayjs](https://day.js.org/), [dayjs](https://day.js.org/)] | - |  |
| defaultValue | To set default date | \[[dayjs](https://day.js.org/), [dayjs](https://day.js.org/)] | - |  |
| disabled | If disable start or end | \[boolean, boolean] | - |  |
| disabledTime | To specify the time that cannot be selected | function(date: dayjs, partial: `start` \| `end`) | - |  |
| format | To set the date format. refer to [dayjs#format](https://day.js.org/docs/en/display/format) | [formatType](#formattype) | `YYYY-MM-DD HH:mm:ss` |  |
| presets | The preset ranges for quick selection | { label: React.ReactNode, value: [dayjs](https://day.js.org/)\[] }[] | - |  |
| renderExtraFooter | Render extra footer in panel | () => React.ReactNode | - |  |
| separator | Set separator between inputs | React.ReactNode | `<SwapRightOutlined />` |  |
| showTime | To provide an additional time selection | object \| boolean | [TimePicker Options](/components/time-picker/#api) |  |
| showTime.defaultValue | To set default time of selected date, [demo](#components-date-picker-demo-disabled-date) | [dayjs](https://day.js.org/)\[] | \[dayjs(), dayjs()] |  |
| value | To set date | \[[dayjs](https://day.js.org/), [dayjs](https://day.js.org/)] | - |  |
| onCalendarChange | Callback function, can be executed when the start time or the end time of the range is changing. `info` argument is added in 4.4.0 | function(dates: \[dayjs, dayjs], dateStrings: \[string, string], info: { range:`start`\|`end` }) | - |  |
| onChange | Callback function, can be executed when the selected time is changing | function(dates: \[dayjs, dayjs], dateStrings: \[string, string]) | - |  |

#### formatType

```typescript
import type { Dayjs } from 'dayjs';

type Generic = string;
type GenericFn = (value: Dayjs) => string;

export type FormatType = Generic | GenericFn | Array<Generic | GenericFn>;
```

## Design Token

<ComponentTokenTable component="DatePicker"></ComponentTokenTable>

## FAQ

### When set mode to DatePicker/RangePicker, cannot select year or month anymore?

Please refer [FAQ](/docs/react/faq#when-set-mode-to-datepickerrangepicker-cannot-select-year-or-month-anymore)

### How to use DatePicker with customize date library like dayjs?

Please refer [Use custom date library](/docs/react/use-custom-date-library#datepicker)

### Why config dayjs.locale globally not work?

DatePicker default set `locale` as `en` in v4. You can config DatePicker `locale` prop or [ConfigProvider `locale`](/components/config-provider) prop instead.

#### Date-related components locale is not working?

See FAQ [Date-related-components-locale-is-not-working?](/docs/react/faq#date-related-components-locale-is-not-working)

### How to modify start day of week?

Please use correct [language](/docs/react/i18n) ([#5605](https://github.com/ant-design/ant-design/issues/5605)), or update dayjs `locale` config:

- Example: <https://codesandbox.io/s/dayjs-day-of-week-x9tuj2?file=/demo.tsx>

```js
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import 'dayjs/plugin/updateLocale';

dayjs.updateLocale('zh-cn', {
  weekStart: 0,
});
```

### Why origin panel don't switch when using `panelRender`?

When you change the layout of nodes by `panelRender`, React will unmount and re-mount it which reset the component state. You should keep the layout stable. Please ref [#27263](https://github.com/ant-design/ant-design/issues/27263) for more info.
