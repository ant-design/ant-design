---
category: Components
cols: 1
type: Data Display
title: Table
---

A table displays rows of data.

## When To Use

- To display a collection of structured data.
- To sort, search, paginate, filter data.

## How To Use

Specify `dataSource` of Table as an array of data.

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
| rowSelection  | Row selection [config](#rowSelection)  | object  | null  |
| pagination    | Pagination [config](/components/pagination/), hide it by setting it to `false` | object |  |
| size          | Size of table  | `default` \| `middle` \| `small` | `default` |
| dataSource    | Data record array to be displayed | any[] | - |
| columns       | Columns of table | [ColumnProps](https://git.io/vMMXC)[] | - |
| rowKey        | Row's unique key, could be a string or function that returns a string | string\|Function(record):string | `key` |
| rowClassName  | Row's className | Function(record, index):string | - |
| expandedRowRender  | Expanded container render for each row | Function | - |
| defaultExpandedRowKeys | Initial expanded row keys | string[] | - |
| expandedRowKeys | Current expanded row keys | string[] | - |
| defaultExpandAllRows | Expand all rows initially | boolean | `false` |
| onExpandedRowsChange | Callback executed when the expanded rows change | Function(expandedRows) | |
| onExpand      | Callback executed when the row expand icon is clicked | Function(expanded, record) | |
| onChange      | Callback executed when pagination, filters or sorter is changed | Function(pagination, filters, sorter) |  |
| loading       | Loading status of table | boolean\|[object](https://ant.design/components/spin-cn/#API) ([more](https://github.com/ant-design/ant-design/issues/4544#issuecomment-271533135)) | `false` |
| locale        | i18n text including filter, sort, empty text, etc | object | filterConfirm: 'Ok' <br> filterReset: 'Reset' <br> emptyText: 'No Data' <br> [Default](https://github.com/ant-design/ant-design/issues/575#issuecomment-159169511) |
| indentSize    | Indent size in pixels of tree data | number   | 15 |
| onRowClick    | Callback executed when a row is clicked | Function(record, index, event)   | - |
| onRowDoubleClick| Callback executed when a row is double clicked | Function(record, index, event)   | - |
| onRowMouseEnter | Callback executed when mouse enters a row | Function(record, index, event)   | - |
| onRowMouseLeave | Callback executed when mouse leaves a row | Function(record, index, event)   | - |
| bordered  | Whether to show all table borders | boolean | `false`      |
| showHeader  | Whether to show table header | boolean          | `true`      |
| footer | Table footer renderer      | Function(currentPageData)   | |
| title  | Table title renderer       | Function(currentPageData)   | |
| scroll | Whether table can be scrolled in x/y direction, `x` or `y` can be a number that indicates the width and height of table body | object   | - |

### Column

One of the Table `columns` prop for describing the table's columns, Column has the same API.

| Property      | Description              | Type            |  Default     |
|---------------|--------------------------|-----------------|--------------|
| title      | Title of this column        | string\|ReactNode | - |
| key        | Unique key of this column, you can ignore this prop if you've set a unique `dataIndex` | string  | - |
| dataIndex  | Display field of the data record, could be set like `a.b.c` | string | - |
| render     | Renderer of the table cell. The return value should be a ReactNode, or an object for [colSpan/rowSpan config](#components-table-demo-colspan-rowspan) | Function(text, record, index) {} | - |
| filters    | Filter menu config        | object[]       | - |
| onFilter   | Callback executed when the confirm filter button is clicked | Function | - |
| filterMultiple | Whether multiple filters can be selected | boolean    | `true`    |
| filterDropdown | Customized filter overlay | ReactNode | - |
| filterDropdownVisible | Whether `filterDropdown` is visible | boolean | - |
| onFilterDropdownVisibleChange | Callback executed when `filterDropdownVisible` is changed | function(visible) {} | - |
| filteredValue | Controlled filtered value, filter icon will highlight | string[] | - |
| filtered | Whether the `dataSource` is filtered | boolean | `false` |
| filterIcon | Customized filter icon | ReactNode | `false` |
| sorter     | Sort function for local sort, see [Array.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)'s compareFunction. If you need sort buttons only, set to `true` | Function\|boolean | - |
| colSpan    | Span of this column's title | number |         |
| width      | Width of this column | string\|number | -  |
| className  | className of this column            | string          |  -      |
| fixed      | Set column to be fixed: `true`(same as left) `'left'` `'right'` | boolean\|string | `false` |
| sortOrder | Order of sorted values: `'ascend'` `'descend'` `false` | boolean\|string | - |
| onCellClick | Callback executed when table cell is clicked | Function(record, event) | - |

### ColumnGroup

| Property      | Description              | Type            |  Default     |
|---------------|--------------------------|-----------------|--------------|
| title      | Title of the column group   | string\|ReactNode | - |

### rowSelection

Properties for row selection.

| Property      | Description              | Type            |  Default     |
|---------------|--------------------------|-----------------|--------------|
| type | `checkbox` or `radio` | `checkbox` \| `radio` | `checkbox`  |
| selectedRowKeys | Controlled selected row keys | string[] | []  |
| onChange | Callback executed when selected rows change | Function(selectedRowKeys, selectedRows) | -   |
| getCheckboxProps | Get Checkbox or Radio props | Function(record) |  -   |
| onSelect | Callback executed when select/deselect one row | Function(record, selected, selectedRows) |   -   |
| onSelectAll | Callback executed when select/deselect all rows | Function(selected, selectedRows, changeRows) |   -   |
| onSelectInvert | Callback executed when row selection is inverted | Function(selectedRows) | - |
| selections | Custom selection [config](#rowSelection), only displays default selections when set to `true` | object[]\|boolean | - |
| hideDefaultSelections | Remove the default `Select All` and `Select Invert` selections | boolean | `false` |

### selection

| Property      | Description              | Type            |  Default     |
|---------------|--------------------------|-----------------|--------------|
| key | Unique key of this selection | string | -  |
| text | Display text of this selection | string\|React.ReactNode | -  |
| onSelect | Callback executed when this selection is clicked | Function(changeableRowKeys) | -   |

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

According to [React documentation](https://facebook.github.io/react/docs/lists-and-keys.html#keys), every child in array should be assigned a unique key. The values inside `dataSource` and `columns` should follow this in Table, and `dataSource[i].key` would be treated as key value default for `dataSource`.

If `dataSource[i].key` is not provided, then you should specify the primary key of dataSource value via `rowKey`. If not, warnings like above will show in browser console.

![](https://os.alipayobjects.com/rmsportal/luLdLvhPOiRpyss.png)

```jsx
// primary key is uid
return <Table rowKey="uid" />;
// or
return <Table rowKey={record => record.uid} />;
```
