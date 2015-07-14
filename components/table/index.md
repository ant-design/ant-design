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

Table 有两种模式，本地数据和远程数据模式。

本地数据是指数据一次性载入内存，纯前端进行分页、筛选、排序等功能。

通过指定表格的数据源 `dataSource` 为一个数据数组。

```jsx
var dataSource = [{
  name: '胡彦斌',
  age: 32,
  address: '西湖区湖底公园1号'
}, {
  name: '胡彦祖',
  age: 42,
  address: '西湖区湖底公园1号'
}];

<Table dataSource={dataSource} />
```

远程数据模式是更常见的业务场景，是一次只从服务端读取一页的数据放在前端，执行筛选、排序、切换页码等操作时均向后台发送请求，后台返回当页的数据和相关分页信息。

通过指定表格的数据源 `dataSource` 为一个对象如下。

```jsx
var dataSource = {
  url: '/api/users',
  resolve: function(result) {
    return result.data;
  },
  getParams: function(column) {},
  getPagination: function(result) {}
};
<Table dataSource={dataSource} />
```

### Table

| 参数          | 说明                     | 类型            |  可选值             | 默认值  |
|---------------|--------------------------|-----------------|---------------------|---------|
| rowSelection  | 列表项是否可选择         | Object          |                     | false   |
| pagenation    | 分页器                   | React.Element   |                     |         |
| size          | 正常或迷你类型           | string          | `normal` or `small` | normal  |
| dataSource    | 数据源                   | Array or Object |                     |         |
