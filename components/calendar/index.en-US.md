---
category: Components
group: Data Display
title: Calendar
description: A container that displays data in calendar form.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*nF6_To7pDSAAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*-p-wQLik200AAAAAAAAAAAAADrJ8AQ/original
---

## When To Use

When data is in the form of dates, such as schedules, timetables, prices calendar, lunar calendar. This component also supports Year/Month switch.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx" clientOnly>Basic</code>
<code src="./demo/notice-calendar.tsx" clientOnly>Notice Calendar</code>
<code src="./demo/card.tsx" clientOnly>Card</code>
<code src="./demo/select.tsx" clientOnly>Selectable Calendar</code>
<code src="./demo/lunar.tsx" clientOnly>Lunar Calendar</code>
<code src="./demo/week.tsx" clientOnly version="5.23.0">Show Week</code>
<code src="./demo/customize-header.tsx" clientOnly>Customize Header</code>
<code src="./demo/component-token.tsx" debug>Component Token</code>

## API

Common props ref：[Common props](/docs/react/common-props)

**Note:** Part of the Calendar's locale is read from `value`. So, please set the locale of `dayjs` correctly.

```jsx
// The default locale is en-US, if you want to use other locale, just set locale in entry file globally.
// import dayjs from 'dayjs';
// import 'dayjs/locale/zh-cn';
// dayjs.locale('zh-cn');

<Calendar cellRender={cellRender} onPanelChange={onPanelChange} onSelect={onSelect} />
```

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| cellRender | Customize cell content | function(current: dayjs, info: { prefixCls: string, originNode: React.ReactElement, today: dayjs, range?: 'start' \| 'end', type: PanelMode, locale?: Locale, subType?: 'hour' \| 'minute' \| 'second' \| 'meridiem' }) => React.ReactNode | - | 5.4.0 |
| dateFullCellRender | Customize the display of the date cell, the returned content will override the cell | function(date: Dayjs): ReactNode | - |  |
| fullCellRender | Customize cell content | function(current: dayjs, info: { prefixCls: string, originNode: React.ReactElement, today: dayjs, range?: 'start' \| 'end', type: PanelMode, locale?: Locale, subType?: 'hour' \| 'minute' \| 'second' \| 'meridiem' }) => React.ReactNode | - | 5.4.0 |
| defaultValue | The date selected by default | [dayjs](https://day.js.org/) | - |  |
| disabledDate | Function that specifies the dates that cannot be selected, `currentDate` is same dayjs object as `value` prop which you shouldn't mutate it](https://github.com/ant-design/ant-design/issues/30987) | (currentDate: Dayjs) => boolean | - |  |
| fullscreen | Whether to display in full-screen | boolean | true |  |
| showWeek | Whether to display week number | boolean | false | 5.23.0 |
| headerRender | Render custom header in panel | function(object:{value: Dayjs, type: 'year' \| 'month', onChange: f(), onTypeChange: f()}) | - |  |
| locale | The calendar's locale | object | [(default)](https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json) |  |
| mode | The display mode of the calendar | `month` \| `year` | `month` |  |
| validRange | To set valid range | \[[dayjs](https://day.js.org/), [dayjs](https://day.js.org/)] | - |  |
| value | The current selected date | [dayjs](https://day.js.org/) | - |  |
| onChange | Callback for when date changes | function(date: Dayjs) | - |  |
| onPanelChange | Callback for when panel changes | function(date: Dayjs, mode: string) | - |  |
| onSelect | Callback for when a date is selected, include source info | function(date: Dayjs, info: { source: 'year' \| 'month' \| 'date' \| 'customize' }) | - | `info`: 5.6.0 |

## Design Token

<ComponentTokenTable component="Calendar"></ComponentTokenTable>

## FAQ

### How to use Calendar with customize date library?

See [Use custom date library](/docs/react/use-custom-date-library#calendar)

### How to set locale for date-related components?

See [How to set locale for date-related components](/components/date-picker/#localization)

### Date-related components locale is not working?

See FAQ [Date-related-components-locale-is-not-working?](/docs/react/faq#date-related-components-locale-is-not-working)

### How to get date from panel click?

`onSelect` provide `info.source` to help on this:

```tsx
<Calendar
  onSelect={(date, { source }) => {
    if (source === 'date') {
      console.log('Panel Select:', source);
    }
  }}
/>
```
