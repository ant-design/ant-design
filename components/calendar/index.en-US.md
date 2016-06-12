---
category: Components
type: Presentation
cols: 1
title: Calendar
---

When to use container for displaying data in calendar form.

## When to use

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
| value        | set date | Date     | current date     |
| defaultValue | set default date | Date     | current date     |
| mode         | can be set to month or year | string | month  |
| fullscreen   | to set whether full-screen display   | bool     | true         |
| dateCellRender     | to set the way of renderer the date cell| function([GregorianCalendar](https://github.com/yiminghe/gregorian-calendar/))| -           |
| monthCellRender    | to set the way of renderer the month cell  | function([GregorianCalendar](https://github.com/yiminghe/gregorian-calendar/))   | -  |
| locale       | set locale | object   | [defualt](https://github.com/ant-design/ant-design/issues/424)  |
| onPanelChange| the callback when panel change | function(date, mode) | - |
