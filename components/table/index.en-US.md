---
category: Components
cols: 1
type: Data Display
title: Table
---

A table displays rows data.

## When To Use

- To display a collection of structured data.
- To sort, search, paginate, filter data.

## How To Use

Specify `dataSource` of Table whose value is an array of data.

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

| Property      | Description              | Type            | Default      |
|---------------|--------------------------|-----------------|--------------|
| rowSelection  | row selection [config](#rowSelection)  | object  | null  |
| pagination    | pagination [config](/components/pagination/), hide it via setting to `false` | object |  |
| size          | size of table: `default`, `middle` or `small`  | string | `default` |
| dataSource    | data record array to be rendered | any[] |            |
| columns       | columns of table | [ColumnProps](https://git.io/vMMXC)[] | - |
| rowKey        | get row's key, could be a string or function | string\|Function(record):string | 'key' |
| rowClassName  | get row's className | Function(record, index):string | - |
| expandedRowRender  | expanded container render for each row | Function | - |
| defaultExpandedRowKeys | initial expanded row keys | string[] | - |
| expandedRowKeys | current expanded rows keys | string[] | - |
| defaultExpandAllRows | expand all rows initially | boolean | false |
| onExpandedRowsChange | function to call when the expanded rows change | Function(expandedRows) | |
| onExpand      | function to call when click expand icon | Function(expanded, record) | |
| onChange      | callback that is called when pagination, filters, sorter is changed | Function(pagination, filters, sorter) |  |
| loading       | loading status of table | boolean | false |
| locale        | i18n text include filter, sort, empty text...etc | object | filterConfirm: 'Ok' <br> filterReset: 'Reset' <br> emptyText: 'No Data' <br> [Default](https://github.com/ant-design/ant-design/issues/575#issuecomment-159169511) |
| indentSize    | index pixel size of tree data | number   | 15 |
| onRowClick    | callback that is called when click a row | Function(record, index)   | - |
| bordered  | whether to show table border completely | boolean | false      |
| showHeader  | whether to show table header | boolean          | true      |
| footer | table footer renderer      | Function(currentPageData)   | |
| title  | table title renderer       | Function(currentPageData)   | |
| scroll | whether table can be scroll in x/y direction, `x` or `y` can be a number that indicated the width and height of table body | object   | -  |

### Column

One of Property `columns` for descriping column, Column has the same API.

| Property      | Description              | Type            |  Default     |
|---------------|--------------------------|-----------------|--------------|
| title      | title of this column        | string\|ReactNode | - |
| key        | key of this column | string          | - |
| dataIndex  | display field of the data record, could be set like `a.b.c` | string | - |
| render     | renderer of table cell, has three params: text, record and index of this row. The render value should be a ReactNode, or a object for [colSpan/rowSpan config](#demo-colspan-rowspan) | Function(text, record, index) {} | - |
| filters    | filter menu config        | object[]       | - |
| onFilter   | callback that is called when when click confirm filter button | Function | - |
| filterMultiple | whether to select multiple filtered item | boolean    | true    |
| filterDropdown | customized filter overlay | ReactNode | - |
| filterDropdownVisible | whether filterDropdown is visible | boolean | - |
| onFilterDropdownVisibleChange | called when filterDropdownVisible is changed | function(visible) {} | - |
| filteredValue | controlled filtered value | string[] | - |
| sorter     | sort function for local sort. If you need sort buttons only, set it `true` | Function\|boolean | - |
| colSpan    | span of this column's title | number |         |
| width      | width of this column | string\|number | -  |
| className  | className of this column            | string          |  -      |
| fixed      | set column to be fixed: `true`(same as left) `'left'` `'right'` | boolean\|string | false |
| sortOrder | controlled sorted value: `'ascend'` `'descend'` `false` | boolean\|string | - |
| onCellClick | callback when click cell | Function(record, event) | - |

### ColumnGroup

| Property      | Description              | Type            |  Default     |
|---------------|--------------------------|-----------------|--------------|
| title      | title of the column group   | string\|ReactNode | - |

### rowSelection

Properties for selection.

| Property      | Description              | Type            |  Default     |
|---------------|--------------------------|-----------------|--------------|
| type | `checkbox` or `radio` | string | `checkbox`  |
| selectedRowKeys | controlled selected row keys | string[] | []  |
| onChange | callback that is called when selected rows change | Function(selectedRowKeys, selectedRows) | -   |
| getCheckboxProps | get Checkbox or Radio props | Function(record) |  -   |
| onSelect | callback that is called when select/deselect one row | Function(record, selected, selectedRows) |   -   |
| onSelectAll | callback that is called when select/deselect all | Function(selected, selectedRows, changeRows) |   -   |

## Using in TypeScript

```jsx
import { Table } from 'antd';
import { TableColumnConfig } from 'antd/lib/table/Table';

interface IUser {
  key: number,
  name: string;
}

const columns: TableColumnConfig<IUser>[] = [{
  key: 'name',
  title: 'Name',
  dataIndex: 'name',
}];

const data: IUser[] = [{
  key: 0,
  name: 'Jack',
}];

class UserTable extends Table<IUser> {}

<UserTable columns={columns} dataSource={data} />

// Use JSX style API
class NameColumn extends Table.Column<IUser> {}

<UserTable dataSource={data}>
  <NameColumn key="name" title="Name" dataIndex="name" />
</UserTable>
```

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
