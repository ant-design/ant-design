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

指定表格的数据源 `dataSource` 为一个数组。

```jsx
const dataSource = [{
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

const columns = [{
  title: '姓名',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '年龄',
  dataIndex: 'age',
  key: 'age',
}, {
  title: '住址',
  dataIndex: 'address',
  key: 'address',
}];

<Table dataSource={dataSource} columns={columns} />
```

> 注：`dataSource` 在 `0.11.0` 版本后不再支持远程模式。

## API

### Table

| 参数           | 说明                     | 类型             |  可选值              | 默认值   |
|---------------|--------------------------|-----------------|---------------------|---------|
| rowSelection  | 列表项是否可选择         | Object          |  [配置项](#rowSelection)   | null   |
| pagination    | 分页器                   | Object   | 配置项参考 [pagination](/components/pagination)，设为 false 时不显示分页 |         |
| size          | 正常或迷你类型           | String          | `default` or `small`| default |
| dataSource    | 数据数组                 | Array           |                     |         |
| columns       | 表格列的配置描述，具体项见下表 | Array |                     |    无    |
| rowKey        | 表格列 key 的取值 | Function(record, index):string |                     |    record.key    |
| expandedRowRender  | 额外的列展开元素 | Function |                     | - |
| defaultExpandedRowKeys | 默认展开的列 | Array |                     | - |
| onChange      | 分页、排序、筛选变化时触发 | Function(pagination, filters, sorter) |                     |       |
| loading       | 页面是否加载中 | Boolean |                     | false      |
| locale        | 默认文案设置，目前包括排序、过滤、空数据文案 | Object         | | `{ filterConfirm: '确定', filterReset: '重置', emptyText: '暂无数据' }` [默认值](https://github.com/ant-design/ant-design/issues/575#issuecomment-159169511) |
| indentSize    | 展示树形数据时，每层缩进的宽度，以 px 为单位    | Number   |          | 15      |
| onRowClick    | 处理行点击事件              | Function(record, index)   |              |     无     |
| useFixedHeader  | 是否固定表头             | Boolean          |                   | false      |

### Column

列描述数据对象，是 columns 中的一项。

| 参数       | 说明                       | 类型            |  可选值             | 默认值  |
|------------|----------------------------|-----------------|---------------------|---------|
| title      | 列头显示文字               | String or React.Element |             |         |
| key        | React 需要的 key，建议设置 | String          |                     |         |
| dataIndex  | 列数据在数据项中对应的 key | String          |                     |         |
| render     | 生成复杂数据的渲染函数，参数分别为当前列的值，当前列数据，列索引，@return里面可以设置表格[行/列合并](#demo-colspan-rowspan) | Function(text, record, index) {} |            |         |
| filters    | 表头的筛选菜单项           | Array           |                     |         |
| onFilter   | 本地模式下，确定筛选的运行函数 | Function    |                     |         |
| filterMultiple | 是否多选 | Boolean    |                                        | true    |
| sorter     | 排序函数，本地排序使用一个函数，需要服务端排序可设为 true | Function or Boolean |  | 无 |
| colSpan    | 表头列合并,设置为 0 时，不渲染 | Number      |                     |         |
| width      | 列宽度 | String or Number |                                        | 无      |
| className  | 列的 className             | String          |                     | 无      |

### rowSelection

选择功能的配置。

| 参数              | 说明                     | 类型             |  默认值   |
|------------------|--------------------------|-----------------|---------------------|---------|
| type | 多选/单选，`checkbox` or `radio` | String | `checkbox`  |
| selectedRowKeys | 指定选中项的 key 数组，需要和 onChange 进行配合 | Array | []  |
| onChange | 选中项发生变化的时的回调 | Function(selectedRowKeys, selectedRows) | -   |
| getCheckboxProps | 选择框的默认属性配置        | Function(record) |  -   |
| onSelect | 用户手动选择/取消选择某列的回调         | Function(record, selected, selectedRows) |   -   |
| onSelectAll | 用户手动选择/取消选择所有列的回调    | Function(selected, selectedRows, changeRows) |   -   |


## 注意

按照 React 的[规范](http://facebook.github.io/react/docs/multiple-components.html#dynamic-children)，所有的组件数组必须绑定 key。在 Table 中，`dataSource` 和 `columns` 里的数据值都需要指定 `key` 值。对于 `dataSource` 默认将每列数据的 `key` 属性作为唯一的标识。

如果你的数据没有这个属性，务必使用 `rowKey` 来指定数据列的主键。若没有指定，控制台会出现以下的提示，表格组件也会出现各类奇怪的错误。

![](https://os.alipayobjects.com/rmsportal/luLdLvhPOiRpyss.png)

```jsx
// 比如你的数据主键是 uid
return <Table rowKey={record => record.uid} />;
```
