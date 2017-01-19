---
category: Components
type: Data Display
cols: 1
title: Calendar
---

Container for displaying data in calendar form.

## When To Use

When data is in the form of date, such as schedule, timetable, prices calendar, Lunar calendar. This component also supports Year/Month switch.

## API

```html
<Calendar
  dateCellRender={dateCellRender}
  monthCellRender={monthCellRender}
  onPanelChange={onPanelChange}
/>
```

| Property         | Description           | Type     | Default       |
|--------------|----------------|----------|--------------|
| value        | set date | [moment](http://momentjs.com/) | current date     |
| defaultValue | set default date | [moment](http://momentjs.com/) | default date     |
| mode         | can be set to month or year | string | month  |
| fullscreen   | to set whether full-screen display   | boolean     | true         |
| dateCellRender     | to set the way of renderer the date cell | function(date: moment): ReactNode | - |
| monthCellRender    | to set the way of renderer the month cell | function(date: moment): ReactNode | - |
| locale       | set locale | object   | [default](https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json)  |
| onPanelChange| the callback when panel change | function(date: moment, mode: string) | - |
