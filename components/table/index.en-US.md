---
category: Components
cols: 1
type: Data Display
title: Table
cover: https://gw.alipayobjects.com/zos/alicdn/f-SbcX2Lx/Table.svg
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
| bordered | Whether to show all table borders | boolean | false |  |
| columns | Columns of table | [ColumnsType](#Column)\[] | - |  |
| components | Override default table elements | [TableComponents](https://git.io/fANxz) | - |  |
| dataSource | Data record array to be displayed | object\[] | - |  |
| expandable | Config expandable content | [expandable](#expandable) | - |  |
| footer | Table footer renderer | function(currentPageData) | - |  |
| getPopupContainer | The render container of dropdowns in table | (triggerNode) => HTMLElement | () => TableHtmlElement |  |
| loading | Loading status of table | boolean \| [Spin Props](/components/spin/#API) | false |  |
| locale | The i18n text including filter, sort, empty text, etc | object | filterConfirm: `Ok` <br> filterReset: `Reset` <br> emptyText: `No Data` <br> [Default](https://github.com/ant-design/ant-design/blob/4ad1ccac277782d7ed14f7e5d02d6346aae0db67/components/locale/default.tsx#L19) |  |
| pagination | Config of pagination. You can ref table pagination [config](#pagination) or full [`pagination`](/components/pagination/) document, hide it by setting it to `false` | object | - |  |
| rowClassName | Row's className | function(record, index): string | - |  |
| rowKey | Row's unique key, could be a string or function that returns a string | string \| function(record): string | `key` |  |
| rowSelection | Row selection [config](#rowSelection) | object | - |  |
| scroll | Whether the table can be scrollable, [config](#scroll) | object | - |  |
| showHeader | Whether to show table header | boolean | true |  |
| showSorterTooltip | The header show next sorter direction tooltip. It will be set as the property of Tooltip if its type is object | boolean \| [Tooltip props](/components/tooltip/#API) | true |  |
| size | Size of table | `default` \| `middle` \| `small` | `default` |  |
| sortDirections | Supported sort way, could be `ascend`, `descend` | Array | \[`ascend`, `descend`] |  |
| sticky | Set sticky header and scroll bar | boolean \| `{offsetHeader?: number, offsetScroll?: number, getContainer?: () => HTMLElement}` | - | 4.6.0 (getContainer: 4.7.0) |
| summary | Summary content | (currentData) => ReactNode | - |  |
| tableLayout | The [table-layout](https://developer.mozilla.org/en-US/docs/Web/CSS/table-layout) attribute of table element | - \| `auto` \| `fixed` | -<hr />`fixed` when header/columns are fixed, or using `column.ellipsis` |  |
| title | Table title renderer | function(currentPageData) | - |  |
| onChange | Callback executed when pagination, filters or sorter is changed | function(pagination, filters, sorter, extra: { currentDataSource: \[], action: `paginate` \| `sort` \| `filter` }) | - |  |
| onHeaderRow | Set props on per header row | function(columns, index) | - |  |
| onRow | Set props on per row | function(record, index) | - |  |

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
  onHeaderRow={(columns, index) => {
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
| align | The specify which way that column is aligned | `left` \| `right` \| `center` | `left` |  |
| className | The className of this column | string | - |  |
| colSpan | Span of this column's title | number | - |  |
| dataIndex | Display field of the data record, support nest path by string array | string \| string\[] | - |  |
| defaultFilteredValue | Default filtered values | string\[] | - |  |
| defaultSortOrder | Default order of sorted values | `ascend` \| `descend` | - |  |
| editable | Whether column can be edited | boolean | false |  |
| ellipsis | The ellipsis cell content, not working with sorter and filters for now.<br />tableLayout would be `fixed` when `ellipsis` is `true` or `{ showTitle?: boolean }` | boolean \| {showTitle?: boolean } | false | showTitle: 4.3.0 |
| filterDropdown | Customized filter overlay | ReactNode \| (props: [FilterDropdownProps](https://git.io/fjP5h)) => ReactNode | - |  |
| filterDropdownVisible | Whether `filterDropdown` is visible | boolean | - |  |
| filtered | Whether the `dataSource` is filtered | boolean | false |  |
| filteredValue | Controlled filtered value, filter icon will highlight | string\[] | - |  |
| filterIcon | Customized filter icon | ReactNode \| (filtered: boolean) => ReactNode | - |  |
| filterMultiple | Whether multiple filters can be selected | boolean | true |  |
| filters | Filter menu config | object\[] | - |  |
| fixed | (IE not support) Set column to be fixed: `true`(same as left) `'left'` `'right'` | boolean \| string | false |  |
| key | Unique key of this column, you can ignore this prop if you've set a unique `dataIndex` | string | - |  |
| render | Renderer of the table cell. The return value should be a ReactNode, or an object for [colSpan/rowSpan config](#components-table-demo-colspan-rowspan) | function(text, record, index) {} | - |  |
| responsive | The list of breakpoints at which to display this column. Always visible if not set. | [Breakpoint](https://github.com/ant-design/ant-design/blob/015109b42b85c63146371b4e32b883cf97b088e8/components/_util/responsiveObserve.ts#L1)\[] | - | 4.2.0 |
| shouldCellUpdate | Control cell render logic | (record, prevRecord) => boolean | - | 4.3.0 |
| showSorterTooltip | If header show next sorter direction tooltip, override `showSorterTooltip` in table | boolean \| [Tooltip props](/components/tooltip/) | true |  |
| sortDirections | Supported sort way, override `sortDirections` in `Table`, could be `ascend`, `descend` | Array | \[`ascend`, `descend`] |  |
| sorter | Sort function for local sort, see [Array.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)'s compareFunction. If you need sort buttons only, set to `true` | function \| boolean | - |  |
| sortOrder | Order of sorted values: `'ascend'` `'descend'` `false` | boolean \| string | - |  |
| title | Title of this column | ReactNode \| ({ sortOrder, sortColumn, filters }) => ReactNode | - |  |
| width | Width of this column ([width not working?](https://github.com/ant-design/ant-design/issues/13825#issuecomment-449889241)) | string \| number | - |  |
| onCell | Set props on per cell | function(record, rowIndex) | - |  |
| onFilter | Function that determines if the row is displayed when filtered | function(value, record) => boolean | - |  |
| onFilterDropdownVisibleChange | Callback executed when `filterDropdownVisible` is changed | function(visible) {} | - |  |
| onHeaderCell | Set props on per header cell | function(column) | - |  |

### ColumnGroup

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| title | Title of the column group | ReactNode | - |

### pagination

Properties for pagination.

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| position | Specify the position of `Pagination`, could be`topLeft` \| `topCenter` \| `topRight` \|`bottomLeft` \| `bottomCenter` \| `bottomRight` | Array | \[`bottomRight`] |

More about pagination, please check [`Pagination`](/components/pagination/).

### expandable

Properties for expandable.

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| childrenColumnName | The column contains children to display | string | children |
| columnWidth | Set the width of the expand column | string \| number | - |
| defaultExpandAllRows | Expand all rows initially | boolean | false |
| defaultExpandedRowKeys | Initial expanded row keys | string\[] | - |
| expandedRowClassName | Expanded row's className | function(record, index, indent): string | - |
| expandedRowKeys | Current expanded row keys | string\[] | - |
| expandedRowRender | Expanded container render for each row | function(record, index, indent, expanded): ReactNode | - |
| expandIcon | Customize row expand Icon. Ref [example](https://codesandbox.io/s/fervent-bird-nuzpr) | function(props): ReactNode | - |
| expandIconColumnIndex | Customize expand icon column index. Not render when `-1` | number | - |
| expandRowByClick | Whether to expand row by clicking anywhere in the whole row | boolean | false |
| indentSize | Indent size in pixels of tree data | number | 15 |
| rowExpandable | Enable row can be expandable | (record) => boolean | - |
| onExpand | Callback executed when the row expand icon is clicked | function(expanded, record) | - |
| onExpandedRowsChange | Callback executed when the expanded rows change | function(expandedRows) | - |

### rowSelection

Properties for row selection.

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| checkStrictly | Check table row precisely; parent row and children rows are not associated | boolean | true | 4.4.0 |
| columnTitle | Set the title of the selection column | ReactNode | - |  |
| columnWidth | Set the width of the selection column | string \| number | `32px` |  |
| fixed | Fixed selection column on the left | boolean | - |  |
| getCheckboxProps | Get Checkbox or Radio props | function(record) | - |  |
| hideSelectAll | Hide the selectAll checkbox and custom selection | boolean | false | 4.3.0 |
| preserveSelectedRowKeys | Keep selection `key` even when it removed from `dataSource` | boolean | - | 4.4.0 |
| renderCell | Renderer of the table cell. Same as `render` in column | function(checked, record, index, originNode) {} | - | 4.1.0 |
| selectedRowKeys | Controlled selected row keys | string\[] \| number\[] | \[] |  |
| selections | Custom selection [config](#rowSelection), only displays default selections when set to `true` | object\[] \| boolean | - |  |
| type | `checkbox` or `radio` | `checkbox` \| `radio` | `checkbox` |  |
| onChange | Callback executed when selected rows change | function(selectedRowKeys, selectedRows) | - |  |
| onSelect | Callback executed when select/deselect one row | function(record, selected, selectedRows, nativeEvent) | - |  |
| onSelectAll | Callback executed when select/deselect all rows | function(selected, selectedRows, changeRows) | - |  |
| onSelectInvert | Callback executed when row selection is inverted | function(selectedRowKeys) | - |  |
| onSelectNone | Callback executed when row selection is cleared | function() | - |  |

### scroll

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| scrollToFirstRowOnChange | Whether to scroll to the top of the table when paging, sorting, filtering changes | boolean | - |
| x | Set horizontal scrolling, can also be used to specify the width of the scroll area, could be number, percent value, true and ['max-content'](https://developer.mozilla.org/zh-CN/docs/Web/CSS/width#max-content) | string \| number \| true | - |
| y | Set vertical scrolling, can also be used to specify the height of the scroll area, could be string or number | string \| number | - |

### selection

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| key | Unique key of this selection | string | - |
| text | Display text of this selection | ReactNode | - |
| onSelect | Callback executed when this selection is clicked | function(changeableRowKeys) | - |

## Using in TypeScript

```tsx
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

interface User {
  key: number;
  name: string;
}

const columns: ColumnsType<User> = [
  {
    key: 'name',
    title: 'Name',
    dataIndex: 'name',
  },
];

const data: User[] = [
  {
    key: 0,
    name: 'Jack',
  },
];

export default () => (
  <>
    <Table<User> columns={columns} dataSource={data} />
    /* JSX style usage */
    <Table<User> dataSource={data}>
      <Table.Column<User> key="name" title="Name" dataIndex="name" />
    </Table>
  </>
);
```

Here is the [CodeSandbox for TypeScript](https://codesandbox.io/s/serene-platform-0jo5t).

## Note

According to the [React documentation](https://facebook.github.io/react/docs/lists-and-keys.html#keys), every child in an array should be assigned a unique key. The values inside the Table's `dataSource` and `columns` should follow this rule. By default, `dataSource[i].key` will be treated as the key value for `dataSource`.

![console warning](https://os.alipayobjects.com/rmsportal/luLdLvhPOiRpyss.png)

If `dataSource[i].key` is not provided, then you should specify the primary key of dataSource value via `rowKey`, as shown below. If not, warnings like the one above will show in browser console.

```jsx
// primary key is uid
return <Table rowKey="uid" />;
// or
return <Table rowKey={record => record.uid} />;
```

## Migrate to v4

Table removes `onRowClick`, `onRowDoubleClick`, `onRowMouseEnter`, `onRowMouseLeave` and some other api which is already deprecated in v3. If you only use api listing in official document, that's OK.

Besides, the breaking change is changing `dataIndex` from nest string path like `user.age` to string array path like `['user', 'age']`. This help to resolve developer should additional work on the field which contains `.`.

## FAQ

### How to hide pagination when single page or not data?

You can set `hideOnSinglePage` with `pagination` prop.

### Table will return to first page when filter data.

Table total page count usually reduce after filter data, we defaultly return to first page in case of current page is out of filtered results.

You may need to keep current page after filtering when fetch data from remote service, please check [this demo](https://codesandbox.io/s/yuanchengjiazaishuju-ant-design-demo-7y2uf) as workaround.

Also you can use the action from extra param to determine when return to first page.

### Why Table pagination show size changer?

In order to improve user experience, Pagination show size changer by default when `total > 50` since `4.1.0`. You can set `showSizeChanger=false` to disable this feature.

### Why Table fully render when state change?

Table can not tell what state used in `columns.render`, so it always need fully render to avoid sync issue. You can use `column.shouldCellUpdate` to control render.

### How to handle fixed column display over the mask layout?

Fixed column use `z-index` to make it over other columns. You will find sometime fixed columns also over your mask layout. You can set `z-index` on your mask layout to resolve.
