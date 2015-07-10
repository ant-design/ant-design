# Table

- category: Components
- chinese: 表格
- cols: 1

---

展示行列数据。

## 何时使用

- 当有大量结构化的数据需要展现时；
- 当需要对数据进行排序、搜索、分页、自定义操作等复杂行为时。

## API

### Table

| 参数          | 说明                    | 类型          |  可选值            | 默认值  |
|---------------|-------------------------|---------------|--------------------|---------|
| rowSelection  | 列表项是否可选择        | Object        |                    | false   |
| pagenation    | 分页器                  | React.Element |                    |         |
| size          | 正常或迷你类型          | string        | `normal` or `mini` | normal  |
