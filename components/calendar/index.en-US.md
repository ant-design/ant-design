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

**Note:** Part of locale of Calendar is read from value. So, please set the locale of moment correctly.

```jsx
import moment from 'moment';

// It's recommended to set locale in entry file globaly.
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

<Calendar
  dateCellRender={dateCellRender}
  monthCellRender={monthCellRender}
  onPanelChange={onPanelChange}
  onSelect={onSelect}
/>
```

| Property         | Description           | Type     | Default       |
|--------------|----------------|----------|--------------|
| value        | set date | [moment](http://momentjs.com/) | current date     |
| defaultValue | set default date | [moment](http://momentjs.com/) | default date     |
| mode         | can be set to month or year | string | month  |
| fullscreen   | to set whether full-screen display   | boolean     | true         |
| dateCellRender      | to set the way of renderer the date cell, the returned content will be appended to the cell | function(date: moment): ReactNode | - |
| monthCellRender     | to set the way of renderer the month cell, the returned content will be appended to the cell | function(date: moment): ReactNode | - |
| dateFullCellRender  | to set the way of renderer the date cell,the returned content will override the cell | function(date: moment): ReactNode | - |
| monthFullCellRender | to set the way of renderer the month cell,the returned content will override the cell | function(date: moment): ReactNode | - |
| locale       | set locale | object   | [default](https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json)  |
| onPanelChange| callback when panel change | function(date: moment, mode: string) | - |
| onSelect     | callback when select date  | function(date: moment）              | - |
