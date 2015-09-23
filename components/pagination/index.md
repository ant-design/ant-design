# Pagination

- category: Components
- chinese: 分页
- type: 导航

---

采用分页的形式分隔长列表，每次只加载一个页面。

## 何时使用

- 当加载/渲染所有数据将花费很多时间时；
- 可切换页码浏览数据。

## API

```html
<Pagination onChange={onChange} total={50} />
```

| 参数             | 说明                               | 类型     | 默认值         |
|------------------|------------------------------------|----------|----------------|
| current          | 当前页数                           | Number   | 1              |
| total            | 数据总数                           | Number   | 0              |
| pageSize         | 每页条数                           | Number   | 10             |
| onChange         | 页码改变的回调，参数是改变后的页码 | Function | noop           |
| showSizeChanger  | 是否可以改变 pageSize              | Bool     | false          |
| onShowSizeChange | pageSize 变化的回调                | Function | noop           |
| showQuickJumper  | 是否可以快速跳转至某页             | Bool     | false          |
| className        | 当为「mini」时，是小尺寸分页       | String   | ant-pagination |
| simple           | 当添加该属性时，显示为简单分页     | Object   | 无             |
