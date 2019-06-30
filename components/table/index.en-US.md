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
const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

<Table dataSource={dataSource} columns={columns} />;
```

## API

### Table

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| bordered | Whether to show all table borders | boolean | `false` | 3.0.0 |
| childrenColumnName | The column contains children to display | string\[] | children | 3.4.2 |
| columns | Columns of table | [ColumnProps](https://git.io/vMMXC)\[] | - | 3.0.0 |
| components | Override default table elements | [TableComponents](https://git.io/fANxz) | - | 3.0.0 |
| dataSource | Data record array to be displayed | any\[] | - | 3.0.0 |
| defaultExpandAllRows | Expand all rows initially | boolean | `false` | 3.0.0 |
| defaultExpandedRowKeys | Initial expanded row keys | string\[] | - | 3.0.0 |
| expandedRowKeys | Current expanded row keys | string\[] | - | 3.0.0 |
| expandedRowRender | Expanded container render for each row | Function(record, index, indent, expanded):ReactNode | - | 3.0.0 |
| expandIcon | Customize row expand Icon. Ref [example](http://react-component.github.io/table/examples/expandIcon.html) | Function(props):ReactNode | - | 3.11.3 |
| expandRowByClick | Whether to expand row by clicking anywhere in the whole row | boolean | `false` | 3.0.1 |
| footer | Table footer renderer | Function(currentPageData) |  | 3.0.0 |
| indentSize | Indent size in pixels of tree data | number | 15 | 3.0.0 |
| loading | Loading status of table | boolean\|[object](https://ant.design/components/spin-cn/#API) ([more](https://github.com/ant-design/ant-design/issues/4544#issuecomment-271533135)) | `false` | 3.0.0 |
| locale | i18n text including filter, sort, empty text, etc | object | filterConfirm: 'Ok' <br> filterReset: 'Reset' <br> emptyText: 'No Data' <br> [Default](https://github.com/ant-design/ant-design/issues/575#issuecomment-159169511) | 3.0.0 |
| pagination | Config of pagination. You can ref table pagination [config](#pagination) or full [`pagination`](/components/pagination/) document, hide it by setting it to `false` | object |  | 3.0.0 |
| rowClassName | Row's className | Function(record, index):string | - | 3.0.0 |
| rowKey | Row's unique key, could be a string or function that returns a string | string\|Function(record):string | `key` | 3.0.0 |
| rowSelection | Row selection [config](#rowSelection) | object | null | 3.0.0 |
| scroll | Set horizontal or vertical scrolling, can also be used to specify the width and height of the scroll area, could be number, percent value, `true` and ['max-content'](https://developer.mozilla.org/en-US/docs/Web/CSS/width) | { x: number \| true, y: number } | - | 3.0.0 |
| showHeader | Whether to show table header | boolean | `true` | 3.0.0 |
| size | Size of table | `default` \| `middle` \| `small` | `default` | 3.0.0 |
| title | Table title renderer | Function(currentPageData) |  | 3.0.0 |
| onChange | Callback executed when pagination, filters or sorter is changed | Function(pagination, filters, sorter, extra: { currentDataSource: [] }) |  | 3.0.0 |
| onExpand | Callback executed when the row expand icon is clicked | Function(expanded, record) |  | 3.0.0 |
| onExpandedRowsChange | Callback executed when the expanded rows change | Function(expandedRows) |  | 3.0.0 |
| onHeaderRow | Set props on per header row | Function(column, index) | - | 3.0.0 |
| onRow | Set props on per row | Function(record, index) | - | 3.0.0 |

#### onRow usage

Same as `onRow` `onHeaderRow` `onCell` `onHeaderCell`

```jsx
<Table
  onRow={(record, rowIndex) => {
    return {
      onClick: event => {}, // click row
      onDoubleClick: event => {}, // double click row
      onContextMenu: event => {}, // right button click row
      onMouseEnter: event => {}, // mouse enter row
      onMouseLeave: event => {}, // mouse leave row
    };
  }}
  onHeaderRow={column => {
    return {
      onClick: () => {}, // click header row
    };
  }}
/>
```

### Column

One of the Table `columns` prop for describing the table's columns, Column has the same API.

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| align | specify which way that column is aligned | 'left' \| 'right' \| 'center' | 'left' | 3.3.2 |
| className | className of this column | string | - | 3.0.0 |
| colSpan | Span of this column's title | number |  | 3.0.0 |
| dataIndex | Display field of the data record, could be set like `a.b.c`, `a[0].b.c[1]` | string | - | 3.0.0 |
| defaultSortOrder | Default order of sorted values | 'ascend' \| 'descend' | - | 3.0.0 |
| filterDropdown | Customized filter overlay | ReactNode | - | 3.0.0 |
| filterDropdownVisible | Whether `filterDropdown` is visible | boolean | - | 3.0.0 |
| filtered | Whether the `dataSource` is filtered | boolean | `false` | 3.0.0 |
| filteredValue | Controlled filtered value, filter icon will highlight | string\[] | - | 3.0.0 |
| filterIcon | Customized filter icon | ReactNode\|(filtered: boolean) => ReactNode | `false` | 3.0.0 |
| filterMultiple | Whether multiple filters can be selected | boolean | `true` | 3.0.0 |
| filters | Filter menu config | object\[] | - | 3.0.0 |
| fixed | Set column to be fixed: `true`(same as left) `'left'` `'right'` | boolean\|string | `false` | 3.0.0 |
| key | Unique key of this column, you can ignore this prop if you've set a unique `dataIndex` | string | - | 3.0.0 |
| render | Renderer of the table cell. The return value should be a ReactNode, or an object for [colSpan/rowSpan config](#components-table-demo-colspan-rowspan) | Function(text, record, index) {} | - | 3.0.0 |
| sorter | Sort function for local sort, see [Array.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)'s compareFunction. If you need sort buttons only, set to `true` | Function\|boolean | - | 3.0.0 |
| sortOrder | Order of sorted values: `'ascend'` `'descend'` `false` | boolean\|string | - | 3.0.0 |
| sortDirections | supported sort way, could be `'ascend'`, `'descend'` | Array | `['ascend', 'descend']` | 3.15.2 |
| title | Title of this column | ReactNode\|({ sortOrder, filters }) => ReactNode | - | 3.0.0 |
| width | Width of this column ([width not working?](https://github.com/ant-design/ant-design/issues/13825#issuecomment-449889241)) | string\|number | - | 3.0.0 |
| onCell | Set props on per cell | Function(record, rowIndex) | - | 3.0.0 |
| onFilter | Callback executed when the confirm filter button is clicked | Function | - | 3.0.0 |
| onFilterDropdownVisibleChange | Callback executed when `filterDropdownVisible` is changed | function(visible) {} | - | 3.0.0 |
| onHeaderCell | Set props on per header cell | Function(column) | - | 3.0.0 |

### ColumnGroup

| Property | Description               | Type              | Default | Version |
| -------- | ------------------------- | ----------------- | ------- | ------- |
| title    | Title of the column group | string\|ReactNode | -       | 3.0.0   |

### pagination

Properties for pagination.

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| position | specify the position of `Pagination` | 'top' \| 'bottom' \| 'both' | 'bottom' | 3.3.0 |

More about pagination, please check [`Pagination`](/components/pagination/).

### rowSelection

Properties for row selection.

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| columnWidth | Set the width of the selection column | string\|number | `60px` | 3.3.0 |
| columnTitle | Set the title of the selection column | string\|React.ReactNode | - | 3.8.0 |
| fixed | Fixed selection column on the left | boolean | - | 3.0.0 |
| getCheckboxProps | Get Checkbox or Radio props | Function(record) | - | 3.0.0 |
| hideDefaultSelections | Remove the default `Select All` and `Select Invert` selections when [custom selection](#components-table-demo-row-selection-custom) | boolean | `false` | 3.0.0 |
| selectedRowKeys | Controlled selected row keys | string\[] | \[] | 3.0.0 |
| selections | Custom selection [config](#rowSelection), only displays default selections when set to `true` | object\[]\|boolean | - | 3.0.0 |
| type | `checkbox` or `radio` | `checkbox` \| `radio` | `checkbox` | 3.0.0 |
| onChange | Callback executed when selected rows change | Function(selectedRowKeys, selectedRows) | - | 3.0.0 |
| onSelect | Callback executed when select/deselect one row | Function(record, selected, selectedRows, nativeEvent) | - | 3.0.0 |
| onSelectAll | Callback executed when select/deselect all rows | Function(selected, selectedRows, changeRows) | - | 3.0.0 |
| onSelectInvert | Callback executed when row selection is inverted | Function(selectedRows) | - | 3.0.0 |

### selection

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| key | Unique key of this selection | string | - | 3.0.0 |
| text | Display text of this selection | string\|React.ReactNode | - | 3.0.0 |
| onSelect | Callback executed when this selection is clicked | Function(changeableRowKeys) | - | 3.0.0 |

## Using in TypeScript

```tsx
import { Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';

interface User {
  key: number,
  name: string;
}

const columns: ColumnProps<User>[] = [{
  key: 'name',
  title: 'Name',
  dataIndex: 'name',
}];

const data: User[] = [{
  key: 0,
  name: 'Jack',
}];

class UserTable extends Table<User> {}

<UserTable columns={columns} dataSource={data} />

// Use JSX style API
class NameColumn extends Table.Column<User> {}

<UserTable dataSource={data}>
  <NameColumn key="name" title="Name" dataIndex="name" />
</UserTable>

// after TypeScript 2.9 can write like this
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-9.html#generic-type-arguments-in-jsx-elements
<Table<User> columns={columns} dataSource={data} />
<Table<User> dataSource={data}>
  <Table.Column<User> key="name" title="Name" dataIndex="name" />
</Table>
```

## Note

According to [React documentation](https://facebook.github.io/react/docs/lists-and-keys.html#keys), every child in array should be assigned a unique key. The values inside `dataSource` and `columns` should follow this in Table, and `dataSource[i].key` would be treated as key value default for `dataSource`.

If `dataSource[i].key` is not provided, then you should specify the primary key of dataSource value via `rowKey`. If not, warnings like above will show in browser console.

![console warning](https://os.alipayobjects.com/rmsportal/luLdLvhPOiRpyss.png)

```jsx
// primary key is uid
return <Table rowKey="uid" />;
// or
return <Table rowKey={record => record.uid} />;
```
