# Transfer

- category: Components
- chinese: 穿梭框
- type: 表单
- cols: 1

---

双栏选择框

## 何时使用


## API

### Transfer

| 参数      | 说明                                     | 类型       |  可选值 |默认值 |
|-----------|------------------------------------------|------------|-------|--------|
| dataSource | 数据源 | Array |   | [] |
| render | 渲染每行数据 | Function(record)  |   | false    |
| targetKeys | 显示在右侧框的数据 | Array  |   | |
| onChange | 变化时回调函数 | Function(e:Event) |  |  |
| titles | 标题集合,顺序从左至右 | Array |  | [] |
| operations | 集合,顺序从左至右 | Array |  | [] |
| showSearch | 是否显示搜索框 | Boolean |  | false |
| searchPlaceholder | 搜索框的默认值 | String  |   |  |
