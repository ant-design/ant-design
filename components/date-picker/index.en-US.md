---
category: Components
type: Data Entry
title: DatePicker
cover: https://gw.alipayobjects.com/zos/alicdn/RT_USzA48/DatePicker.svg
---

To select or input a date.

## When To Use

By clicking the input box, you can select a date from a popup calendar.

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
import locale from 'antd/es/locale/zh_CN';

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
| className | The picker className | string | - |  |
| dateRender | Custom rendering function for date cells | function(currentDate: dayjs, today: dayjs) => React.ReactNode | - |  |
| disabled | Determine whether the DatePicker is disabled | boolean | false |  |
| disabledDate | Specify the date that cannot be selected | (currentDate: dayjs) => boolean | - |  |
| dropdownClassName | To customize the className of the popup calendar | string | - |  |
| getPopupContainer | To set the container of the floating layer, while the default is to create a `div` element in `body` | function(trigger) | - |  |
| locale | Localization configuration | object | [default](https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json) |  |
| mode | The picker panel mode（ [Cannot select year or month anymore?](/docs/react/faq#When-set-mode-to-DatePicker/RangePicker,-cannot-select-year-or-month-anymore?) ) | `time` \| `date` \| `month` \| `year` \| `decade` | - |  |
| open | The open state of picker | boolean | - |  |
| panelRender | Customize panel render | (panelNode) => ReactNode | - | 4.5.0 |
| picker | Set picker type | `date` \| `week` \| `month` \| `quarter` \| `year` | `date` | `quarter`: 4.1.0 |
| placeholder | The placeholder of date input | string \| \[string,string] | - |  |
| popupStyle | To customize the style of the popup calendar | CSSProperties | {} |  |
| size | The determine the size of the input box, the height of `large` and `small`, are 40px and 24px respectively, while default size is 32px | `large` \| `middle` \| `small` | - |  |
| bordered | Whether has border style | boolean | true |  |
| suffixIcon | The custom suffix icon | ReactNode | - |  |
| style | To customize the style of the input box | CSSProperties | {} |  |
| onOpenChange | Callback function, can be executed whether the popup calendar is popped up or closed | function(open) | - |  |
| onPanelChange | Callback when picker panel mode is changed | function(value, mode) | - |  |
| inputReadOnly | Set the `readonly` attribute of the input tag (avoids virtual keyboard on touch devices) | boolean | false |  |

### Common Methods

| Name    | Description  | Version |
| ------- | ------------ | ------- |
| blur()  | Remove focus |         |
| focus() | Get focus    |         |

### DatePicker

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| defaultValue | To set default date, if start time or end time is null or undefined, the date range will be an open interval | [dayjs](https://day.js.org/) | - |  |
| defaultPickerValue | To set default picker date | [dayjs](https://day.js.org/) | - |  |
| disabledTime | To specify the time that cannot be selected | function(date) | - |  |
| format | To set the date format, refer to [dayjs.js](https://day.js.org/). When an array is provided, all values are used for parsing and first value is used for formatting | string \| string[] | `YYYY-MM-DD` |  |
| renderExtraFooter | Render extra footer in panel | (mode) => React.ReactNode | - |  |
| showTime | To provide an additional time selection | object \| boolean | [TimePicker Options](/components/time-picker/#API) |  |
| showTime.defaultValue | To set default time of selected date, [demo](#components-date-picker-demo-disabled-date) | [dayjs](https://day.js.org/) | dayjs() |  |
| showToday | Whether to show `Today` button | boolean | true |  |
| value | To set date | [dayjs](https://day.js.org/) | - |  |
| onChange | Callback function, can be executed when the selected time is changing | function(date: dayjs, dateString: string) | - |  |
| onOk | Callback when click ok button | function() | - |  |
| onPanelChange | Callback function for panel changing | function(value, mode) | - |  |
| showNow | Whether to show 'Now' button on panel when `showTime` is set | boolean | - | 4.4.0 |

### DatePicker\[picker=year]

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| defaultValue | To set default date | [dayjs](https://day.js.org/) | - |  |
| defaultPickerValue | To set default picker date | [dayjs](https://day.js.org/) | - |  |
| format | To set the date format, refer to [dayjs.js](https://day.js.org/) | string | `YYYY` |  |
| renderExtraFooter | Render extra footer in panel | () => React.ReactNode | - |  |
| value | To set date | [dayjs](https://day.js.org/) | - |  |
| onChange | Callback function, can be executed when the selected time is changing | function(date: dayjs, dateString: string) | - |  |

### DatePicker\[picker=quarter]

Added in `4.1.0`.

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| defaultValue | To set default date | [dayjs](https://day.js.org/) | - |  |
| defaultPickerValue | To set default picker date | [dayjs](https://day.js.org/) | - |  |
| format | To set the date format, refer to [dayjs.js](https://day.js.org/) | string | `YYYY-\QQ` |  |
| renderExtraFooter | Render extra footer in panel | () => React.ReactNode | - |  |
| value | To set date | [dayjs](https://day.js.org/) | - |  |
| onChange | Callback function, can be executed when the selected time is changing | function(date: dayjs, dateString: string) | - |  |

### DatePicker\[picker=month]

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| defaultValue | To set default date | [dayjs](https://day.js.org/) | - |  |
| defaultPickerValue | To set default picker date | [dayjs](https://day.js.org/) | - |  |
| format | To set the date format, refer to [dayjs.js](https://day.js.org/) | string | `YYYY-MM` |  |
| monthCellRender | Custom month cell content render method | function(date, locale): ReactNode | - |  |
| renderExtraFooter | Render extra footer in panel | () => React.ReactNode | - |  |
| value | To set date | [dayjs](https://day.js.org/) | - |  |
| onChange | Callback function, can be executed when the selected time is changing | function(date: dayjs, dateString: string) | - |  |

### DatePicker\[picker=week]

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| defaultValue | To set default date | [dayjs](https://day.js.org/) | - |  |
| defaultPickerValue | To set default picker date | [dayjs](https://day.js.org/) | - |  |
| format | To set the date format, refer to [dayjs.js](https://day.js.org/) | string | `YYYY-wo` |  |
| value | To set date | [dayjs](https://day.js.org/) | - |  |
| onChange | Callback function, can be executed when the selected time is changing | function(date: dayjs, dateString: string) | - |  |
| renderExtraFooter | Render extra footer in panel | (mode) => React.ReactNode | - |  |

### RangePicker

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| allowEmpty | Allow start or end input leave empty | \[boolean, boolean] | \[false, false] |  |
| dateRender | Customize date cell. `info` argument is added in 4.3.0 | function(currentDate: dayjs, today: dayjs, info: { range: `start` \| `end` }) => React.ReactNode | - |  |
| defaultValue | To set default date | \[[dayjs](https://day.js.org/), [dayjs](https://day.js.org/)] | - |  |
| defaultPickerValue | To set default picker date | \[[dayjs](https://day.js.org/), [dayjs](https://day.js.org/)\] | - |  |
| disabled | If disable start or end | \[boolean, boolean] | - |  |
| disabledTime | To specify the time that cannot be selected | function(date: dayjs, partial: `start` \| `end`) | - |  |
| format | To set the date format, refer to [dayjs.js](https://day.js.org/). When an array is provided, all values are used for parsing and first value is used for formatting | string \| string[] | `YYYY-MM-DD HH:mm:ss` |  |
| ranges | The preseted ranges for quick selection | { \[range: string]: [dayjs](https://day.js.org/)\[] } \| { \[range: string]: () => [dayjs](https://day.js.org/)\[] } | - |  |
| renderExtraFooter | Render extra footer in panel | () => React.ReactNode | - |  |
| separator | Set separator between inputs | string | `~` |  |
| showTime | To provide an additional time selection | object \| boolean | [TimePicker Options](/components/time-picker/#API) |  |
| showTime.defaultValue | To set default time of selected date, [demo](#components-date-picker-demo-disabled-date) | [dayjs](https://day.js.org/)\[] | \[dayjs(), dayjs()] |  |
| value | To set date | \[[dayjs](https://day.js.org/), [dayjs](https://day.js.org/)] | - |  |
| onCalendarChange | Callback function, can be executed when the start time or the end time of the range is changing. `info` argument is added in 4.4.0 | function(dates: \[dayjs, dayjs], dateStrings: \[string, string], info: { range:`start`\|`end` }) | - |  |
| onChange | Callback function, can be executed when the selected time is changing | function(dates: \[dayjs, dayjs], dateStrings: \[string, string]) | - |  |

## FAQ

### When set mode to DatePicker/RangePicker, cannot select year or month anymore?

Please refer [FAQ](/docs/react/faq#When-set-mode-to-DatePicker/RangePicker,-cannot-select-year-or-month-anymore?)

### How to use DatePicker with customize date library like dayjs?

Please refer [replace dayjs](/docs/react/replace-dayjs#DatePicker)

### Why config dayjs.locale globally not work?

DatePicker default set `locale` as `en` in v4. You can config DatePicker `locale` prop or [ConfigProvider `locale`](/components/config-provider) prop instead.

### How to modify start day of week?

Please use correct [language](/docs/react/i18n) ([#5605](https://github.com/ant-design/ant-design/issues/5605)), or update dayjs `locale` config: https://codesandbox.io/s/dayjs-day-of-week-6dby5

```js
dayjs.locale('en', {
  week: {
    dow: 1,
  },
});
```
