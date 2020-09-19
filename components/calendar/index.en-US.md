---
category: Components
type: Data Display
cols: 1
title: Calendar
cover: https://gw.alipayobjects.com/zos/antfincdn/dPQmLq08DI/Calendar.svg
---

Container for displaying data in calendar form.

## When To Use

When data is in the form of dates, such as schedules, timetables, prices calendar, lunar calendar. This component also supports Year/Month switch.

## API

**Note:** Part of the Calendar's locale is read from `value`. So, please set the locale of `dayjs` correctly.

```jsx
// The default locale is en-US, if you want to use other locale, just set locale in entry file globally.
// import 'dayjs/locale/zh-cn'
// dayjs.locale('zh-cn')

<Calendar
  dateCellRender={dateCellRender}
  monthCellRender={monthCellRender}
  onPanelChange={onPanelChange}
  onSelect={onSelect}
/>
```

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| dateCellRender | Customize the display of the date cell, the returned content will be appended to the cell | function(date: dayjs): ReactNode | - |  |
| dateFullCellRender | Customize the display of the date cell, the returned content will override the cell | function(date: dayjs): ReactNode | - |  |
| defaultValue | The date selected by default | [dayjs](https://day.js.org/) | - |  |
| disabledDate | Function that specifies the dates that cannot be selected | (currentDate: dayjs) => boolean | - |  |
| fullscreen | Whether to display in full-screen | boolean | true |  |
| locale | The calendar's locale | object | [(default)](https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json) |  |
| mode | The display mode of the calendar | `month` \| `year` | `month` |  |
| monthCellRender | Customize the display of the month cell, the returned content will be appended to the cell | function(date: dayjs): ReactNode | - |  |
| monthFullCellRender | Customize the display of the month cell, the returned content will override the cell | function(date: dayjs): ReactNode | - |  |
| validRange | To set valid range | \[[dayjs](https://day.js.org/), [dayjs](https://day.js.org/)] | - |  |
| value | The current selected date | [dayjs](https://day.js.org/) | - |  |
| onPanelChange | Callback for when panel changes | function(date: dayjs, mode: string) | - |  |
| onSelect | Callback for when a date is selected | function(date: dayjs | - |  |
| onChange | Callback for when date changes | function(date: dayjs） | - |  |
| headerRender | Render custom header in panel | function(object:{value: dayjs, type: string, onChange: f(), onTypeChange: f()}) | - |  |
