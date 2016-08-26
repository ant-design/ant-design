---
category: Components
cols: 1
type: Views
title: Table
---

A table displays rows data.

## When to use

- To display a collections of structured data.
- To sort, search, paging, filter data.

## How to use

Sepecify `dataSource` of Table to be an array data.

```jsx
const dataSource = [{
  key: '1',
  name: 'Mike',
  age: 32,
  address: '10 Downing Street'
}, {
  key: '2',
  name: 'John',
  age: 42,
  address: '10 Downing Street'
}];

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}];

<Table dataSource={dataSource} columns={columns} />
```

## API

### Table

| Property      | Type                     | Default         | Description  |
|---------------|--------------------------|-----------------|--------------|
| rowSelection  | row selection [config](#rowSelection)  | Object  | null  |
| pagination    | pagination [config](/components/pagination), hide it via setting to `false` | Object |  |
| size          | size of table: `default` or `small`  | String | `default` |
| dataSource    | data record array to be rendered | Array |            |
| columns       | columns of table | Array | - |
| rowKey        | get row's key, could be a string or function | String or Function(record, index):string | 'key' |
| rowClassName  | get row's className | Function(record, index):string | - |
| expandedRowRender  | expanded container render for each row | Function | - |
| defaultExpandedRowKeys | initial expanded row keys | Array | - |
| expandedRowKeys | current expanded rows keys | Array | - |
| onChange      | callback that is called when pagination, filters, sorter is changed | Function(pagination, filters, sorter) |  |
| loading       | loading status of table | Boolean | false |
| locale        | i18n text include filter, sort, empty text...etc | Object | filterConfirm: 'Ok' <br> filterReset: 'Reset' <br> emptyText: 'No Data' <br> [Default](https://github.com/ant-design/ant-design/issues/575#issuecomment-159169511) |
| indentSize    | index pixel size of tree data | Number   | 15 |
| onRowClick    | callback that is called when click a row | Function(record, index)   | - |
| bordered  | whether to show table border completely | Boolean | false      |
| showHeader  | whether to show table header | Boolean          | true      |
| footer | table footer renderer      | Function(currentPageData)   | |
| title  | table title renderer       | Function(currentPageData)   | |
| scroll | whether table can be scroll in x/y direction, `x` or `y` can be a number that indicated the width and height of table body | Object   | -  |

### Column

One of Property `columns` for descriping column.

| Property      | Type                     | Default         | Description  |
|---------------|--------------------------|-----------------|--------------|
| title      | title of this column        | String or React.Element | - |
| key        | key of this column | String          | - |
| dataIndex  | display field of the data record, could be set like `a.b.c` | String | - |
| render     | renderer of table cell, has three params: text, record and index of this row. The render value should be a ReactNode, or a object for [colSpan/rowSpan config](#demo-colspan-rowspan) | Function(text, record, index) {} | - |
| filters    | filter menu config        | Array       | - |
| onFilter   | callback that is called when when click confirm filter button | Function | - |
| filterMultiple | whether to select multiple filtered item | Boolean    | true    |
| filterDropdown | customized filter overlay | React.Element | - |
| sorter     | sort function for local sort. If you need sort buttons only, set it `true` | Function or Boolean | - |
| colSpan    | colSpan for column title | Number |         |
| width      | width of this column | String or Number | -  |
| className  | className of this column            | String          |  -      |
| fixed      | set column to be fixed: `true`(same as left) `'left'` `'right'` | Boolean or String | false |
| filteredValue | controlled filtered value | Array | - |
| sortOrder | controlled sorted value: `'ascend'` `'descend'` `false` | Boolean or String | - |

### rowSelection

Properties for selection.

| Property      | Type                     | Default         | Description  |
|---------------|--------------------------|-----------------|--------------|
| type | `checkbox` or `radio` | String | `checkbox`  |
| selectedRowKeys | controlled selected row keys | Array | []  |
| onChange | callback that is called when selected rows change | Function(selectedRowKeys, selectedRows) | -   |
| getCheckboxProps | get Checkbox or Radio props | Function(record) |  -   |
| onSelect | callback that is called when select/deselect one row | Function(record, selected, selectedRows) |   -   |
| onSelectAll | callback that is called when select/deselect all | Function(selected, selectedRows, changeRows) |   -   |

## Note

According to [React documentation](http://facebook.github.io/react/docs/multiple-components.html#dynamic-children), every child in array should be assigned a unique key. The value inside `dataSource` and `columns` should follow this in Table, and `dataSource[i].key` would be treated as key value defaultly for `dataSource`.

If `dataSource[i].key` is not existed, then you should specify the primary key of dataSource value via `rowKey`. If not, warnings like above will show in browser console.

![](https://os.alipayobjects.com/rmsportal/luLdLvhPOiRpyss.png)

```jsx
// primary key is uid
return <Table rowKey="uid" />;
// or
return <Table rowKey={record => record.uid} />;
```
