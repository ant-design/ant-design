# Table

- category: Components
- chinese: 表格
- cols: 1
- type: 展示

---

展示行列数据。

## 何时使用

- 当有大量结构化的数据需要展现时；
- 当需要对数据进行排序、搜索、分页、自定义操作等复杂行为时。

## 如何使用

Table 有两种模式，本地数据和远程数据模式。

**本地数据模式**是指数据一次性载入内存，纯前端进行分页、筛选、排序等功能。

通过指定表格的数据源 `dataSource` 为一个数据数组。

```jsx
var dataSource = [{
  key: '1',
  name: '胡彦斌',
  age: 32,
  address: '西湖区湖底公园1号'
}, {
  key: '2',
  name: '胡彦祖',
  age: 42,
  address: '西湖区湖底公园1号'
}];

<Table dataSource={dataSource} />
```

**远程数据模式**是更常见的业务场景，是一次只从服务端读取一页的数据放在前端，执行筛选、排序、切换页码等操作时均向后台发送请求，后台返回当页的数据和相关分页信息。

> 远程数据模式后续可能删除，目前不推荐使用。

通过指定表格的数据源 `dataSource` 为一个 DataSource 的实例如下。

```jsx
var dataSource = new Table.DataSource({
  url: '/api/users',
  resolve: function(result) {
    return result.data;
  },
  getPagination: function(result) {},
  getParams: function(pagination, filters, sorter) {}
});

<Table dataSource={dataSource} />
```

## API

### Table

| 参数          | 说明                     | 类型            |  可选值             | 默认值  |
|---------------|--------------------------|-----------------|---------------------|---------|
| rowSelection  | 列表项是否可选择         | Object          |                     | false   |
| pagination    | 分页器                   | Object   | 配置项参考 [pagination](/components/pagination)，设为 false 时不显示分页 |         |
| size          | 正常或迷你类型           | String          | `default` or `small`| default |
| dataSource    | 数据源，可以为数组（本地模式）或一个数据源描述对象（远程模式） | Array or Object |                     |         |
| columns       | 表格列的配置描述，具体项见下表 | Array |                     |    无    |
| rowKey        | 表格列 key 的取值 | Function(recode, index):string |                     |    record.key    |
| expandIconAsCell  | 设置展开 Icon 是否单独一列 | Boolean |                     |    true    |
| onChange      | 分页、排序、筛选变化时触发 | Function(pagination, filters, sorter) |                     |       |
| loading       | 页面是否加载中 | Boolean |                     | false      |
| locale        | 设置排序、过滤按钮的文字或 `title` | Object         | | [默认值](https://github.com/ant-design/ant-design/issues/575#issuecomment-159169511) |

### Column

列描述数据对象，是 columns 中的一项。

| 参数       | 说明                       | 类型            |  可选值             | 默认值  |
|------------|----------------------------|-----------------|---------------------|---------|
| title      | 列头显示文字               | String or React.Element |             |         |
| dataIndex  | 列数据在 data 中对应的 key | String          |                     |         |
| colSpan    | 表头列合并,设置为 0 时，不渲染 | Number      |                     |         |
| key        | React 需要的 key           | String          |                     |         |
| render     | 生成复杂数据的渲染函数，参数分别为当前列的值，当前列数据，列索引，@return里面可以设置表格[行/列合并](#demo-colspan-rowspan) | Function(text, record, index) {} |            |         |
| filters    | 表头的筛选菜单项           | Array           |                     |         |
| onFilter   | 本地模式下，确定筛选的运行函数 | Function    |                     |         |
| filterMultiple | 是否多选 | Boolean    |                                        | true    |
| sorter     | 排序函数，本地模式下为一个函数，远程模式下为布尔值 | Function or Boolean |  | 无 |
| width      | 列宽度 | String or Number |                                        | 无      |
| className  | 列的 className             | String          |                     | 无      |

### dataSource

远程数据源配置对象。

| 参数          | 说明                     | 类型            |  可选值             | 默认值  |
|---------------|--------------------------|-----------------|---------------------|---------|
| url           | 数据源地址               | String          |                     |         |
| resolve       | 获得数据的解析函数，接收参数为远程数据返回的 result  | Function  |    |    |
| getPagination | 和后台接口返回的分页数据进行适配的函数，返回值会传给表格中的分页器 | Function |  |  |
| getParams     | 和后台接口接收的参数进行适配，返回值会作为请求的参数发送 | Function |  | 无 |

## 注意

按照 React 的[规范](http://facebook.github.io/react/docs/multiple-components.html#dynamic-children)，所有的组件数组必须绑定 key。在 Table 中，默认将每列数据的 `key` 属性作为唯一的标识。

如果你的数据没有这个属性，务必使用 `rowKey` 来指定数据列的主键。若没有指定，控制台会出现以下的提示，表格组件也会出现各类奇怪的错误。

![](https://os.alipayobjects.com/rmsportal/luLdLvhPOiRpyss.png)

```jsx
const rowKey = function(record) {
  return record.uid;  // 比如你的数据主键是 uid
};

return <Table rowKey={rowKey} />;
```
