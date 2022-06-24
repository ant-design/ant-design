---
category: Components
type: 数据展示
subtitle: 日历
cols: 1
title: Calendar
cover: https://gw.alipayobjects.com/zos/antfincdn/dPQmLq08DI/Calendar.svg
---

按照日历形式展示数据的容器。

## 何时使用

当数据是日期或按照日期划分时，例如日程、课表、价格日历等，农历等。目前支持年/月切换。

## API

```jsx
<Calendar
  dateCellRender={dateCellRender}
  monthCellRender={monthCellRender}
  onPanelChange={onPanelChange}
  onSelect={onSelect}
/>
```

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| dateCellRender | 自定义渲染日期单元格，返回内容会被追加到单元格 | function(date: Moment): ReactNode | - |  |
| dateFullCellRender | 自定义渲染日期单元格，返回内容覆盖单元格 | function(date: Moment): ReactNode | - |  |
| defaultValue | 默认展示的日期 | [moment](http://momentjs.com/) | - |  |
| disabledDate | 不可选择的日期，参数为当前 `value`，注意使用时[不要直接修改](https://github.com/ant-design/ant-design/issues/30987) | (currentDate: Moment) => boolean | - |  |
| fullscreen | 是否全屏显示 | boolean | true |  |
| headerRender | 自定义头部内容 | function(object:{value: Moment, type: string, onChange: f(), onTypeChange: f()}) | - |  |
| locale | 国际化配置 | object | [(默认配置)](https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json) |  |
| mode | 初始模式 | `month` \| `year` | `month` |  |
| monthCellRender | 自定义渲染月单元格，返回内容会被追加到单元格 | function(date: Moment): ReactNode | - |  |
| monthFullCellRender | 自定义渲染月单元格，返回内容覆盖单元格 | function(date: Moment): ReactNode | - |  |
| validRange | 设置可以显示的日期 | \[[moment](http://momentjs.com/), [moment](http://momentjs.com/)] | - |  |
| value | 展示日期 | [moment](http://momentjs.com/) | - |  |
| onChange | 日期变化回调 | function(date: Moment) | - |  |
| onPanelChange | 日期面板变化回调 | function(date: Moment, mode: string) | - |  |
| onSelect | 点击选择日期回调 | function(date: Moment） | - |  |

## FAQ

- [如何在 Calendar 中使用自定义日期库（如 dayjs ）](/docs/react/replace-moment#Calendar)
- [如何给日期类组件配置国际化](/components/date-picker/#%E5%9B%BD%E9%99%85%E5%8C%96%E9%85%8D%E7%BD%AE)
