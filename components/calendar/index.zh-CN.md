---
category: Components
type: Data Display
subtitle: 日历
cols: 1
title: Calendar
---

按照日历形式展示数据的容器。

## 何时使用

当数据是日期或按照日期划分时，例如日程、课表、价格日历等，农历等。目前支持年/月切换。


## API

```html
<Calendar
  dateCellRender={dateCellRender}
  monthCellRender={monthCellRender}
  onPanelChange={onPanelChange}
/>
```

| 参数         | 说明           | 类型     | 默认值       |
|--------------|----------------|----------|--------------|
| value        | 展示日期       | [moment](http://momentjs.com/)     | 当前日期     |
| defaultValue | 默认展示的日期  | [moment](http://momentjs.com/)     | 默认日期     |
| mode         | 初始模式，`month/year` | string | month  |
| fullscreen   | 是否全屏显示   | boolean     | true         |
| dateCellRender     | 自定义渲染日期单元格| function(date: moment): ReactNode   | 无 |
| monthCellRender    | 自定义渲染月单元格  | function(date: moment): ReactNode   | 无 |
| locale       | 国际化配置     | object   | [默认配置](https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json)  |
| onPanelChange| 日期面板变化回调 | function(date: moment, mode: string) | 无 |
