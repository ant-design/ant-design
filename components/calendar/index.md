# Calendar

- category: Components
- type: 展示
- chinese: 日历
- cols: 1

---

按照日历形式展示数据的容器。

## 何时使用

当数据是日期或按照日期划分时，例如日程、课表、价格日历等，农历等。目前支持年/月切换。


## API

```html
<Calendar getDateData={getDateDataMethod} getMonthData={getMonthDataMethod} />
```

| 参数         | 说明           | 类型     | 默认值       |
|--------------|----------------|----------|--------------|
| value        | 展示日期       | gregorian-calendar object   | 当前日期        |
| fullscreen   | 是否全屏显示    | bool   | true           |
| getDateData  | 获取日的显示数据    | function   | 无           |
| getMonthData       | 获取月的显示数据 | function   | 无  |
| dateCellRendar  | 自定义渲染日期单元格    | function   | 无           |
| fullscreenDateCellRendar  | 自定义渲染日期单元格(全屏)    | function   | 无           |
| monthCellRendar       | 自定义渲染月单元格 | function   | 无  |
| locale       | 国际化配置 | object   | [默认配置](https://github.com/ant-design/ant-design/issues/424)  |
| onChange | 日期改变 | bool | 无 |
| onTypeChange | 年月切换 | function | 无 |
