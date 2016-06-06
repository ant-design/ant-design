---
category: Components
chinese: 分页
type: Navigation
english: Pagination
---

采用分页的形式分隔长列表，每次只加载一个页面。

## 何时使用

- 当加载/渲染所有数据将花费很多时间时；
- 可切换页码浏览数据。

## API

```html
<Pagination onChange={onChange} total={50} />
```

| 参数             | 说明                               | 类型          | 默认值                   |
|------------------|------------------------------------|---------------|--------------------------|
| current          | 当前页数                           | Number        | 无                       |
| defaultCurrent   | 默认的当前页数                     | Number        | 1                        |
| total            | 数据总数                           | Number        | 0                        |
| defaultPageSize  | 初始的每页条数                      | Number        | 10                       |
| pageSize         | 每页条数                           | Number        |                          |
| onChange         | 页码改变的回调，参数是改变后的页码 | Function      | noop                     |
| showSizeChanger  | 是否可以改变 pageSize              | Bool          | false                    |
| pageSizeOptions  | 指定每页可以显示多少条             | Array<String> | ['10', '20', '30', '40'] |
| onShowSizeChange | pageSize 变化的回调                | Function      | noop                     |
| showQuickJumper  | 是否可以快速跳转至某页             | Bool          | false                    |
| size             | 当为「small」时，是小尺寸分页      | String        | ""                       |
| simple           | 当添加该属性时，显示为简单分页     | Object        | 无                       |
| showTotal        | 用于显示总共有多少条数据          | Function      | 无                       |
