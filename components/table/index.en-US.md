---
category: Components
group: Data Display
title: Table
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*3yz3QqMlShYAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*Sv8XQ50NB40AAAAAAAAAAAAADrJ8AQ/original
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

## Promotion

- [Kitchen Sketch Plugin 💎](https://kitchen.alipay.com)
- [ProTable - Advanced Tables](https://procomponents.ant.design/en-US/components/table)
- [S2 - Analytical Tables](https://github.com/antvis/s2/)

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic Usage</code>
<code src="./demo/jsx.tsx">JSX style API</code>
<code src="./demo/row-selection.tsx">selection</code>
<code src="./demo/row-selection-and-operation.tsx">Selection and operation</code>
<code src="./demo/row-selection-custom.tsx">Custom selection</code>
<code src="./demo/row-selection-debug.tsx" debug>Selection Perf</code>
<code src="./demo/head.tsx">Filter and sorter</code>
<code src="./demo/filter-in-tree.tsx">Filter in Tree</code>
<code src="./demo/filter-search.tsx">Filter search</code>
<code src="./demo/multiple-sorter.tsx">Multiple sorter</code>
<code src="./demo/reset-filter.tsx">Reset filters and sorters</code>
<code src="./demo/custom-filter-panel.tsx">Customized filter panel</code>
<code src="./demo/ajax.tsx">Ajax</code>
<code src="./demo/size.tsx">size</code>
<code src="./demo/narrow.tsx" debug>size</code>
<code src="./demo/bordered.tsx">border, title and footer</code>
<code src="./demo/expand.tsx">Expandable Row</code>
<code src="./demo/order-column.tsx">Order Specific Column</code>
<code src="./demo/colspan-rowspan.tsx">colSpan and rowSpan</code>
<code src="./demo/tree-data.tsx">Tree data</code>
<code src="./demo/tree-table-ellipsis.tsx" debug>Tree data ellipsis debug demo</code>
<code src="./demo/fixed-header.tsx">Fixed Header</code>
<code src="./demo/fixed-columns.tsx">Fixed Columns</code>
<code src="./demo/fixed-gapped-columns.tsx" version="5.14.0">Stack Fixed Columns</code>
<code src="./demo/fixed-columns-header.tsx">Fixed Columns and Header</code>
<code src="./demo/hidden-columns.tsx">Hidden Columns</code>
<code src="./demo/grouping-columns.tsx">Grouping table head</code>
<code src="./demo/edit-cell.tsx">Editable Cells</code>
<code src="./demo/edit-row.tsx">Editable Rows</code>
<code src="./demo/nested-table.tsx">Nested tables</code>
<code src="./demo/drag-sorting.tsx">Drag sorting</code>
<code src="./demo/drag-sorting-handler.tsx">Drag sorting with handler</code>
<code src="./demo/resizable-column.tsx" debug>Resizable column</code>
<code src="./demo/ellipsis.tsx">ellipsis column</code>
<code src="./demo/ellipsis-custom-tooltip.tsx">ellipsis column custom tooltip</code>
<code src="./demo/summary.tsx">Summary</code>
<code src="./demo/virtual-list.tsx" version=">= 5.9.0">Virtual list</code>
<code src="./demo/responsive.tsx">Responsive</code>
<code src="./demo/nest-table-border-debug.tsx" debug>Nested Bordered Table Debug</code>
<code src="./demo/pagination.tsx">Pagination Settings</code>
<code src="./demo/row-selection-custom-debug.tsx" debug>Custom selection group</code>
<code src="./demo/sticky.tsx">Fixed header and scroll bar with the page</code>
<code src="./demo/dynamic-settings.tsx">Dynamic Settings</code>
<code src="./demo/selections-debug.tsx" debug>selections with icon</code>
<code src="./demo/component-token.tsx" debug>Component Token</code>

## API

Common props ref：[Common props](/docs/react/common-props)

### Table

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| bordered | Whether to show all table borders | boolean | false |  |
| columns | Columns of table | [ColumnsType](#column)\[] | - |  |
| components | Override default table elements | [TableComponents](https://github.com/react-component/table/blob/75ee0064e54a4b3215694505870c9d6c817e9e4a/src/interface.ts#L129) | - |  |
| dataSource | Data record array to be displayed | object\[] | - |  |
| expandable | Config expandable content | [expandable](#expandable) | - |  |
| footer | Table footer renderer | function(currentPageData) | - |  |
| getPopupContainer | The render container of dropdowns in table | (triggerNode) => HTMLElement | () => TableHtmlElement |  |
| loading | Loading status of table | boolean \| [Spin Props](/components/spin/#api) | false |  |
| locale | The i18n text including filter, sort, empty text, etc | object | [Default Value](https://github.com/ant-design/ant-design/blob/6dae4a7e18ad1ba193aedd5ab6867e1d823e2aa4/components/locale/en_US.tsx#L19-L37) |  |
| pagination | Config of pagination. You can ref table pagination [config](#pagination) or full [`pagination`](/components/pagination/) document, hide it by setting it to `false` | object \| `false` | - |  |
| rowClassName | Row's className | function(record, index): string | - |  |
| rowKey | Row's unique key, could be a string or function that returns a string | string \| function(record): string | `key` |  |
| rowSelection | Row selection [config](#rowselection) | object | - |  |
| scroll | Whether the table can be scrollable, [config](#scroll) | object | - |  |
| showHeader | Whether to show table header | boolean | true |  |
| showSorterTooltip | The header show next sorter direction tooltip. It will be set as the property of Tooltip if its type is object | boolean \| [Tooltip props](/components/tooltip/#api) | true |  |
| size | Size of table | `large` \| `middle` \| `small` | `large` |  |
| sortDirections | Supported sort way, could be `ascend`, `descend` | Array | \[`ascend`, `descend`] |  |
| sticky | Set sticky header and scroll bar | boolean \| `{offsetHeader?: number, offsetScroll?: number, getContainer?: () => HTMLElement}` | - | 4.6.0 (getContainer: 4.7.0) |
| summary | Summary content | (currentData) => ReactNode | - |  |
| tableLayout | The [table-layout](https://developer.mozilla.org/en-US/docs/Web/CSS/table-layout) attribute of table element | - \| `auto` \| `fixed` | -<hr />`fixed` when header/columns are fixed, or using `column.ellipsis` |  |
| title | Table title renderer | function(currentPageData) | - |  |
| onChange | Callback executed when pagination, filters or sorter is changed | function(pagination, filters, sorter, extra: { currentDataSource: \[], action: `paginate` \| `sort` \| `filter` }) | - |  |
| onHeaderRow | Set props on per header row | function(columns, index) | - |  |
| onRow | Set props on per row | function(record, index) | - |  |
| virtual | Support virtual list | boolean | - | 5.9.0 |

### Table ref

| Property | Description | Type | Version |
| --- | --- | --- | --- |
| nativeElement | The wrap element | HTMLDivElement | 5.11.0 |
| scrollTo | Trigger to scroll to target position. `key` match with record `rowKey` | (config: { index?: number, key?: React.Key, top?: number }) => void | 5.11.0 |

#### onRow usage

Same as `onRow` `onHeaderRow` `onCell` `onHeaderCell`

```jsx
<Table
  onRow={(record, rowIndex) => {
    return {
      onClick: (event) => {}, // click row
      onDoubleClick: (event) => {}, // double click row
      onContextMenu: (event) => {}, // right button click row
      onMouseEnter: (event) => {}, // mouse enter row
      onMouseLeave: (event) => {}, // mouse leave row
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
| filterResetToDefaultFilteredValue | click the reset button, whether to restore the default filter | boolean | false |  |
| defaultSortOrder | Default order of sorted values | `ascend` \| `descend` | - |  |
| ellipsis | The ellipsis cell content, not working with sorter and filters for now.<br />tableLayout would be `fixed` when `ellipsis` is `true` or `{ showTitle?: boolean }` | boolean \| {showTitle?: boolean } | false | showTitle: 4.3.0 |
| filterDropdown | Customized filter overlay | ReactNode \| (props: [FilterDropdownProps](https://github.com/ant-design/ant-design/blob/ecc54dda839619e921c0ace530408871f0281c2a/components/table/interface.tsx#L79)) => ReactNode | - |  |
| filterDropdownOpen | Whether `filterDropdown` is visible | boolean | - |  |
| filtered | Whether the `dataSource` is filtered | boolean | false |  |
| filteredValue | Controlled filtered value, filter icon will highlight | string\[] | - |  |
| filterIcon | Customized filter icon | ReactNode \| (filtered: boolean) => ReactNode | - |  |
| filterOnClose | Whether to trigger filter when the filter menu closes | boolean | true | 5.15.0 |
| filterMultiple | Whether multiple filters can be selected | boolean | true |  |
| filterMode | To specify the filter interface | 'menu' \| 'tree' | 'menu' | 4.17.0 |
| filterSearch | Whether to be searchable for filter menu | boolean \| function(input, record):boolean | false | boolean:4.17.0 function:4.19.0 |
| filters | Filter menu config | object\[] | - |  |
| fixed | (IE not support) Set column to be fixed: `true`(same as left) `'left'` `'right'` | boolean \| string | false |  |
| key | Unique key of this column, you can ignore this prop if you've set a unique `dataIndex` | string | - |  |
| render | Renderer of the table cell. The return value should be a ReactNode | function(text, record, index) {} | - |  |
| responsive | The list of breakpoints at which to display this column. Always visible if not set | [Breakpoint](https://github.com/ant-design/ant-design/blob/015109b42b85c63146371b4e32b883cf97b088e8/components/_util/responsiveObserve.ts#L1)\[] | - | 4.2.0 |
| rowScope | Set scope attribute for all cells in this column | `row` \| `rowgroup` | - | 5.1.0 |
| shouldCellUpdate | Control cell render logic | (record, prevRecord) => boolean | - | 4.3.0 |
| showSorterTooltip | If header show next sorter direction tooltip, override `showSorterTooltip` in table | boolean \| [Tooltip props](/components/tooltip/) | true |  |
| sortDirections | Supported sort way, override `sortDirections` in `Table`, could be `ascend`, `descend` | Array | \[`ascend`, `descend`] |  |
| sorter | Sort function for local sort, see [Array.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)'s compareFunction. If it is server-side sorting, set to `true`, but if you want to support multi-column sorting, you can set it to `{ multiple: number }` | function \| boolean \| { compare: function, multiple: number } | - |  |
| sortOrder | Order of sorted values: `ascend` `descend` `null` | `ascend` \| `descend` \| null | - |  |
| sortIcon | Customized sort icon | (props: { sortOrder }) => ReactNode | - | 5.6.0 |
| title | Title of this column | ReactNode \| ({ sortOrder, sortColumn, filters }) => ReactNode | - |  |
| width | Width of this column ([width not working?](https://github.com/ant-design/ant-design/issues/13825#issuecomment-449889241)) | string \| number | - |  |
| hidden | Hidden this column | boolean | false | 5.13.0 |
| onCell | Set props on per cell | function(record, rowIndex) | - |  |
| onFilter | Function that determines if the row is displayed when filtered | function(value, record) => boolean | - |  |
| onFilterDropdownOpenChange | Callback executed when `filterDropdownOpen` is changed | function(visible) {} | - |  |
| onHeaderCell | Set props on per header cell | function(column) | - |  |

### ColumnGroup

| Property | Description               | Type      | Default |
| -------- | ------------------------- | --------- | ------- |
| title    | Title of the column group | ReactNode | -       |

### pagination

Properties for pagination.

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| position | Specify the position of `Pagination`, could be`topLeft` \| `topCenter` \| `topRight` \|`bottomLeft` \| `bottomCenter` \| `bottomRight` | Array | \[`bottomRight`] |

More about pagination, please check [`Pagination`](/components/pagination/).

### expandable

Properties for expandable.

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| childrenColumnName | The column contains children to display | string | children |  |
| columnTitle | Set the title of the expand column | ReactNode | - | 4.23.0 |
| columnWidth | Set the width of the expand column | string \| number | - |  |
| defaultExpandAllRows | Expand all rows initially | boolean | false |  |
| defaultExpandedRowKeys | Initial expanded row keys | string\[] | - |  |
| expandedRowClassName | Expanded row's className | function(record, index, indent): string | - |  |
| expandedRowKeys | Current expanded row keys | string\[] | - |  |
| expandedRowRender | Expanded container render for each row | function(record, index, indent, expanded): ReactNode | - |  |
| expandIcon | Customize row expand Icon. Ref [example](https://codesandbox.io/s/fervent-bird-nuzpr) | function(props): ReactNode | - |  |
| expandRowByClick | Whether to expand row by clicking anywhere in the whole row | boolean | false |  |
| fixed | Whether the expansion icon is fixed. Optional true `left` `right` | boolean \| string | false | 4.16.0 |
| indentSize | Indent size in pixels of tree data | number | 15 |  |
| rowExpandable | Enable row can be expandable | (record) => boolean | - |  |
| showExpandColumn | Show expand column | boolean | true | 4.18.0 |
| onExpand | Callback executed when the row expand icon is clicked | function(record, event) | - |  |
| onExpandedRowsChange | Callback executed when the expanded rows change | function(expandedRows) | - |  |

### rowSelection

Properties for row selection.

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| checkStrictly | Check table row precisely; parent row and children rows are not associated | boolean | true | 4.4.0 |
| columnTitle | Set the title of the selection column | ReactNode \| (originalNode: ReactNode) => ReactNode | - |  |
| columnWidth | Set the width of the selection column | string \| number | `32px` |  |
| fixed | Fixed selection column on the left | boolean | - |  |
| getCheckboxProps | Get Checkbox or Radio props | function(record) | - |  |
| hideSelectAll | Hide the selectAll checkbox and custom selection | boolean | false | 4.3.0 |
| preserveSelectedRowKeys | Keep selection `key` even when it removed from `dataSource` | boolean | - | 4.4.0 |
| renderCell | Renderer of the table cell. Same as `render` in column | function(checked, record, index, originNode) {} | - | 4.1.0 |
| selectedRowKeys | Controlled selected row keys | string\[] \| number\[] | \[] |  |
| selections | Custom selection [config](#selection), only displays default selections when set to `true` | object\[] \| boolean | - |  |
| type | `checkbox` or `radio` | `checkbox` \| `radio` | `checkbox` |  |
| onCell | Set props on per cell. Same as `onCell` in column | function(record, rowIndex) | - | 5.5.0 |
| onChange | Callback executed when selected rows change | function(selectedRowKeys, selectedRows, info: { type }) | - | `info.type`: 4.21.0 |
| onSelect | Callback executed when select/deselect one row | function(record, selected, selectedRows, nativeEvent) | - |  |
| onSelectAll | Callback executed when select/deselect all rows | function(selected, selectedRows, changeRows) | - |  |
| onSelectInvert | Callback executed when row selection is inverted | function(selectedRowKeys) | - |  |
| onSelectNone | Callback executed when row selection is cleared | function() | - |  |
| onSelectMultiple | Callback executed when row selection is changed by pressing shift | function(selected, selectedRows, changeRows) | - |  |

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
import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

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

const Demo: React.FC = () => (
  <>
    <Table<User> columns={columns} dataSource={data} />
    {/* JSX style usage */}
    <Table<User> dataSource={data}>
      <Table.Column<User> key="name" title="Name" dataIndex="name" />
    </Table>
  </>
);

export default Demo;
```

Here is the [CodeSandbox for TypeScript](https://codesandbox.io/s/serene-platform-0jo5t).

## Design Token

<ComponentTokenTable component="Table"></ComponentTokenTable>

## Note

According to the [React documentation](https://facebook.github.io/react/docs/lists-and-keys.html#keys), every child in an array should be assigned a unique key. The values inside the Table's `dataSource` and `columns` should follow this rule. By default, `dataSource[i].key` will be treated as the key value for `dataSource`.

![console warning](https://os.alipayobjects.com/rmsportal/luLdLvhPOiRpyss.png)

If `dataSource[i].key` is not provided, then you should specify the primary key of dataSource value via `rowKey`, as shown below. If not, warnings like the one above will show in browser console.

```jsx
// primary key is uid
return <Table rowKey="uid" />;
// or
return <Table rowKey={(record) => record.uid} />;
```

## FAQ

### How to hide pagination when single page or no data?

You can set `hideOnSinglePage` with `pagination` prop.

### Table will return to first page when filter data.

Table total page count usually reduce after filter data, we by default return to first page in case of current page is out of filtered results.

You may need to keep current page after filtering when fetch data from remote service, please check [this demo](https://codesandbox.io/s/yuanchengjiazaishuju-ant-design-demo-7y2uf) as workaround.

Also you can use the action from extra param to determine when return to first page.

### Why Table pagination show size changer?

In order to improve user experience, Pagination show size changer by default when `total > 50` since `4.1.0`. You can set `showSizeChanger=false` to disable this feature.

### Why Table fully render when state change?

Table can not tell what state used in `columns.render`, so it always need fully render to avoid sync issue. You can use `column.shouldCellUpdate` to control render.

### How to handle fixed column display over the mask layout?

Fixed column use `z-index` to make it over other columns. You will find sometime fixed columns also over your mask layout. You can set `z-index` on your mask layout to resolve.

### How to custom render Table Checkbox（For example, adding Tooltip）?

Since `4.1.0`, You can use [`rowSelection.renderCell`](https://ant.design/components/table/#rowselection) to custom render Table Checkbox. If you want to add Tooltip, please refer to this [demo](https://codesandbox.io/s/table-row-tooltip-v79j2v).

### Why does components.body.wrapper report an error when virtual is enabled?

Because virtual table needs to get its ref to do some calculations, so you need to use `React.forwardRef` wrapper and pass the ref to the dom
