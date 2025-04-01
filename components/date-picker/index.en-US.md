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
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';

<DatePicker locale={locale} />;
```

```jsx
// The default locale is en-US, if you want to use other locale, just set locale in entry file globally.
import moment from 'moment';
import 'moment/locale/zh-cn';
import locale from 'antd/es/locale/zh_CN';

<ConfigProvider locale={locale}>
  <DatePicker defaultValue={moment('2015-01-01', 'YYYY-MM-DD')} />
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
| dateRender | Custom rendering function for date cells | function(currentDate: moment, today: moment) => React.ReactNode | - |  |
| disabled | Determine whether the DatePicker is disabled | boolean | false |  |
| disabledDate | Specify the date that cannot be selected | (currentDate: moment) => boolean | - |  |
| popupClassName | To customize the className of the popup calendar | string | - | 4.23.0 |
| getPopupContainer | To set the container of the floating layer, while the default is to create a `div` element in `body` | function(trigger) | - |  |
| inputReadOnly | Set the `readonly` attribute of the input tag (avoids virtual keyboard on touch devices) | boolean | false |  |
| locale | Localization configuration | object | [default](https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json) |  |
| mode | The picker panel mode（ [Cannot select year or month anymore?](/docs/react/faq#When-set-mode-to-DatePicker/RangePicker,-cannot-select-year-or-month-anymore?) ) | `time` \| `date` \| `month` \| `year` \| `decade` | - |  |
| nextIcon | The custom next icon | ReactNode | - | 4.17.0 |
| open | The open state of picker | boolean | - |  |
| panelRender | Customize panel render | (panelNode) => ReactNode | - | 4.5.0 |
| picker | Set picker type | `date` \| `week` \| `month` \| `quarter` \| `year` | `date` | `quarter`: 4.1.0 |
| placeholder | The placeholder of date input | string \| \[string,string] | - |  |
| placement | The position where the selection box pops up | `bottomLeft` `bottomRight` `topLeft` `topRight` | bottomLeft |  |
| popupStyle | To customize the style of the popup calendar | CSSProperties | {} |  |
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
| defaultPickerValue | To set default picker date | [moment](http://momentjs.com/) | - |  |
| defaultOpen | Initial open state of picker | boolean | - |  |
| defaultValue | To set default date, if start time or end time is null or undefined, the date range will be an open interval | [moment](http://momentjs.com/) | - |  |
| disabledTime | To specify the time that cannot be selected | function(date) | - |  |
| format | To set the date format, refer to [moment.js](http://momentjs.com/). When an array is provided, all values are used for parsing and first value is used for formatting, support [Custom Format](#components-date-picker-demo-format) | string \| (value: moment) => string \| (string \| (value: moment) => string)\[] | `YYYY-MM-DD` |  |
| renderExtraFooter | Render extra footer in panel | (mode) => React.ReactNode | - |  |
| showNow | Whether to show 'Now' button on panel when `showTime` is set | boolean | - | 4.4.0 |
| showTime | To provide an additional time selection | object \| boolean | [TimePicker Options](/components/time-picker/#API) |  |
| showTime.defaultValue | To set default time of selected date, [demo](#components-date-picker-demo-disabled-date) | [moment](http://momentjs.com/) | moment() |  |
| showToday | Whether to show `Today` button | boolean | true |  |
| value | To set date | [moment](http://momentjs.com/) | - |  |
| onChange | Callback function, can be executed when the selected time is changing | function(date: moment, dateString: string) | - |  |
| onOk | Callback when click ok button | function() | - |  |
| onPanelChange | Callback function for panel changing | function(value, mode) | - |  |

### DatePicker\[picker=year]

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| defaultPickerValue | To set default picker date | [moment](http://momentjs.com/) | - |  |
| defaultValue | To set default date | [moment](http://momentjs.com/) | - |  |
| format | To set the date format, refer to [moment.js](http://momentjs.com/) | string | `YYYY` |  |
| renderExtraFooter | Render extra footer in panel | () => React.ReactNode | - |  |
| value | To set date | [moment](http://momentjs.com/) | - |  |
| onChange | Callback function, can be executed when the selected time is changing | function(date: moment, dateString: string) | - |  |

### DatePicker\[picker=quarter]

Added in `4.1.0`.

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| defaultPickerValue | To set default picker date | [moment](http://momentjs.com/) | - |  |
| defaultValue | To set default date | [moment](http://momentjs.com/) | - |  |
| format | To set the date format, refer to [moment.js](http://momentjs.com/) | string | `YYYY-\QQ` |  |
| renderExtraFooter | Render extra footer in panel | () => React.ReactNode | - |  |
| value | To set date | [moment](http://momentjs.com/) | - |  |
| onChange | Callback function, can be executed when the selected time is changing | function(date: moment, dateString: string) | - |  |

### DatePicker\[picker=month]

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| defaultPickerValue | To set default picker date | [moment](http://momentjs.com/) | - |  |
| defaultValue | To set default date | [moment](http://momentjs.com/) | - |  |
| format | To set the date format, refer to [moment.js](http://momentjs.com/) | string | `YYYY-MM` |  |
| monthCellRender | Custom month cell content render method | function(date, locale): ReactNode | - |  |
| renderExtraFooter | Render extra footer in panel | () => React.ReactNode | - |  |
| value | To set date | [moment](http://momentjs.com/) | - |  |
| onChange | Callback function, can be executed when the selected time is changing | function(date: moment, dateString: string) | - |  |

### DatePicker\[picker=week]

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| defaultPickerValue | To set default picker date | [moment](http://momentjs.com/) | - |  |
| defaultValue | To set default date | [moment](http://momentjs.com/) | - |  |
| format | To set the date format, refer to [moment.js](http://momentjs.com/) | string | `YYYY-wo` |  |
| renderExtraFooter | Render extra footer in panel | (mode) => React.ReactNode | - |  |
| value | To set date | [moment](http://momentjs.com/) | - |  |
| onChange | Callback function, can be executed when the selected time is changing | function(date: moment, dateString: string) | - |  |

### RangePicker

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| allowEmpty | Allow start or end input leave empty | \[boolean, boolean] | \[false, false] |  |
| dateRender | Customize date cell. `info` argument is added in 4.3.0 | function(currentDate: moment, today: moment, info: { range: `start` \| `end` }) => React.ReactNode | - |  |
| defaultPickerValue | To set default picker date | \[[moment](http://momentjs.com/), [moment](http://momentjs.com/)] | - |  |
| defaultValue | To set default date | \[[moment](http://momentjs.com/), [moment](http://momentjs.com/)] | - |  |
| disabled | If disable start or end | \[boolean, boolean] | - |  |
| disabledTime | To specify the time that cannot be selected | function(date: moment, partial: `start` \| `end`) | - |  |
| format | To set the date format, refer to [moment.js](http://momentjs.com/). When an array is provided, all values are used for parsing and first value is used for formatting | string \| string\[] | `YYYY-MM-DD HH:mm:ss` |  |
| ranges | The preseted ranges for quick selection | { \[range: string]: [moment](http://momentjs.com/)\[] } \| { \[range: string]: () => [moment](http://momentjs.com/)\[] } | - |  |
| renderExtraFooter | Render extra footer in panel | () => React.ReactNode | - |  |
| separator | Set separator between inputs | React.ReactNode | `<SwapRightOutlined />` |  |
| showTime | To provide an additional time selection | object \| boolean | [TimePicker Options](/components/time-picker/#API) |  |
| showTime.defaultValue | To set default time of selected date, [demo](#components-date-picker-demo-disabled-date) | [moment](http://momentjs.com/)\[] | \[moment(), moment()] |  |
| value | To set date | \[[moment](http://momentjs.com/), [moment](http://momentjs.com/)] | - |  |
| onCalendarChange | Callback function, can be executed when the start time or the end time of the range is changing. `info` argument is added in 4.4.0 | function(dates: \[moment, moment], dateStrings: \[string, string], info: { range:`start`\|`end` }) | - |  |
| onChange | Callback function, can be executed when the selected time is changing | function(dates: \[moment, moment], dateStrings: \[string, string]) | - |  |

## FAQ

### When set mode to DatePicker/RangePicker, cannot select year or month anymore?

Please refer [FAQ](/docs/react/faq#When-set-mode-to-DatePicker/RangePicker,-cannot-select-year-or-month-anymore?)

### How to use DatePicker with customize date library like dayjs?

Please refer [replace moment](/docs/react/replace-moment#DatePicker)

### Why config moment.locale globally not work?

DatePicker default set `locale` as `en` in v4. You can config DatePicker `locale` prop or [ConfigProvider `locale`](/components/config-provider) prop instead.

#### Date-related components locale is not working?

See FAQ [Date-related-components-locale-is-not-working?](/docs/react/faq#Date-related-components-locale-is-not-working?)

### How to modify start day of week?

Please use correct [language](/docs/react/i18n) ([#5605](https://github.com/ant-design/ant-design/issues/5605)), or update moment `locale` config:

- Example: <https://codesandbox.io/s/moment-day-of-week-6dby5>
- Alternate example: <https://stackblitz.com/edit/react-9aegkj>

```js
moment.locale('en', {
  week: {
    dow: 1,
  },
});
```

### Why origin panel don't switch when using `panelRender`?

When you change the layout of nodes by `panelRender`, React will unmount and re-mount it which reset the component state. You should keep the layout stable. Please ref [#27263](https://github.com/ant-design/ant-design/issues/27263) for more info.
