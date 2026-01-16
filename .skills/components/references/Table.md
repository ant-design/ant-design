# Table — 表格

## 功能概述

展示行列数据。

## 应用场景

- 当有大量结构化的数据需要展现时；。
- 当需要对数据进行排序、搜索、分页、自定义操作等复杂行为时。

## 输入字段

### Table 属性

#### 必填

- 无必填属性。

#### 可选

- `bordered`: boolean，是否展示外边框和列边框，默认 false。
- `classNames`: Record<[SemanticDOM](#semantic-dom), string> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), string>，用于自定义组件内部各语义化结构的 class，支持对象或函数。
- `columns`: [ColumnsType](#column)\[]，表格列的配置描述，具体项见下表。
- `components`: [TableComponents](https://github.com/react-component/table/blob/75ee0064e54a4b3215694505870c9d6c817e9e4a/src/interface.ts#L129)，覆盖默认的 table 元素。
- `dataSource`: object\[]，数据数组。
- `expandable`: [expandable](#expandable)，配置展开属性。
- `footer`: function(currentPageData)，表格尾部。
- `getPopupContainer`: (triggerNode) => HTMLElement，设置表格内各类浮层的渲染节点，如筛选菜单，默认 () => TableHtmlElement。
- `loading`: boolean | [Spin Props](/components/spin-cn#api)，页面是否加载中，默认 false。
- `locale`: object，默认文案设置，目前包括排序、过滤、空数据文案，默认 [默认值](https://github.com/ant-design/ant-design/blob/6dae4a7e18ad1ba193aedd5ab6867e1d823e2aa4/components/locale/zh_CN.tsx#L20-L37)。
- `pagination`: object | `false`，分页器，参考[配置项](#pagination)或 [pagination](/components/pagination-cn) 文档，设为 false 时不展示和进行分页。
- `rowClassName`: function(record, index): string，表格行的类名。
- `rowKey`: string | function(record): string，表格行 key 的取值，可以是字符串或一个函数，默认 `key`。
- `rowSelection`: object，表格行是否可选择，[配置项](#rowselection)。
- `rowHoverable`: boolean，表格行是否开启 hover 交互，默认 true，版本 5.16.0。
- `scroll`: object，表格是否可滚动，也可以指定滚动区域的宽、高，[配置项](#scroll)。
- `showHeader`: boolean，是否显示表头，默认 true。
- `showSorterTooltip`: boolean | [Tooltip props](/components/tooltip-cn) & `{target?: 'full-header' | 'sorter-icon' }`，表头是否显示下一次排序的 tooltip 提示。当参数类型为对象时，将被设置为 Tooltip 的属性，默认 { target: 'full-header' }，版本 5.16.0。
- `size`: `large` | `middle` | `small`，表格大小，默认 `large`。
- `sortDirections`: Array，支持的排序方式，取值为 `ascend` `descend`，默认 \[`ascend`, `descend`]。
- `sticky`: boolean | `{offsetHeader?: number, offsetScroll?: number, getContainer?: () => HTMLElement}`，设置粘性头部和滚动条，版本 4.6.0 (getContainer: 4.7.0)。
- `styles`: Record<[SemanticDOM](#semantic-dom), CSSProperties> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties>，用于自定义组件内部各语义化结构的行内 style，支持对象或函数。
- `summary`: (currentData) => ReactNode，总结栏。
- `tableLayout`: - | `auto` | `fixed`，表格元素的 [table-layout](https://developer.mozilla.org/zh-CN/docs/Web/CSS/table-layout) 属性，设为 `fixed` 表示内容不会影响列的布局，默认 无<hr />固定表头/列或使用了 `column.ellipsis` 时，默认值为 `fixed`。
- `title`: function(currentPageData)，表格标题。
- `virtual`: boolean，支持虚拟列表，版本 5.9.0。
- `onChange`: function(pagination, filters, sorter, extra: { currentDataSource: \[], action: `paginate` | `sort` | `filter` })，分页、排序、筛选变化时触发。
- `onHeaderRow`: function(columns, index)，设置头部行属性。
- `onRow`: function(record, index)，设置行属性。
- `onScroll`: function(event)，表单内容滚动时触发（虚拟滚动下只有垂直滚动会触发事件），版本 5.16.0。

### Table ref 属性

#### 必填

- 无必填属性。

#### 可选

- `nativeElement`: HTMLDivElement，最外层 div 元素，版本 5.11.0。
- `scrollTo`: (config: { index?: number, key?: React.Key, top?: number, offset?: number }) => void，滚动到目标位置（设置 `key` 时为 Record 对应的 `rowKey`）。当指定 `offset` 时，表格会滚动至目标行顶部对齐并应用指定的偏移量。`offset` 对 `top` 无效，版本 5.11.0。

### Column 属性

#### 必填

- 无必填属性。

#### 可选

- `align`: `left` | `right` | `center`，设置列的对齐方式，默认 `left`。
- `className`: string，列样式类名。
- `colSpan`: number，表头列合并，设置为 0 时，不渲染。
- `dataIndex`: string | string\[]，列数据在数据项中对应的路径，支持通过数组查询嵌套路径。
- `defaultFilteredValue`: string\[]，默认筛选值。
- `filterResetToDefaultFilteredValue`: boolean，点击重置按钮的时候，是否恢复默认筛选值，默认 false。
- `defaultSortOrder`: `ascend` | `descend`，默认排序顺序。
- `ellipsis`: boolean | { showTitle?: boolean }，超过宽度将自动省略，暂不支持和排序筛选一起使用。<br />设置为 `true` 或 `{ showTitle?: boolean }` 时，表格布局将变成 `tableLayout="fixed"`，默认 false，版本 showTitle: 4.3.0。
- `filterDropdown`: ReactNode | (props: [FilterDropdownProps](https://github.com/ant-design/ant-design/blob/ecc54dda839619e921c0ace530408871f0281c2a/components/table/interface.tsx#L79)) => ReactNode，可以自定义筛选菜单，此函数只负责渲染图层，需要自行编写各种交互。
- `filtered`: boolean，标识数据是否经过过滤，筛选图标会高亮，默认 false。
- `filteredValue`: string\[]，筛选的受控属性，外界可用此控制列的筛选状态，值为已筛选的 value 数组。
- `filterIcon`: ReactNode | (filtered: boolean) => ReactNode，自定义 filter 图标，默认 false。
- `filterOnClose`: boolean，是否在筛选菜单关闭时触发筛选，默认 true，版本 5.15.0。
- `filterMultiple`: boolean，是否多选，默认 true。
- `filterMode`: 'menu' | 'tree'，指定筛选菜单的用户界面，默认 'menu'，版本 4.17.0。
- `filterSearch`: boolean | function(input, record):boolean，筛选菜单项是否可搜索，默认 false，版本 boolean:4.17.0 function:4.19.0。
- `filters`: object\[]，表头的筛选菜单项。
- `filterDropdownProps`: [DropdownProps](/components/dropdown#api)，自定义下拉属性，在 `<5.22.0` 之前可用 `filterDropdownOpen` 和 `onFilterDropdownOpenChange`，版本 5.22.0。
- `fixed`: boolean | string，（IE 下无效）列是否固定，可选 `true` (等效于 `'start'`) `'start'` `'end'`，默认 false。
- `key`: string，React 需要的 key，如果已经设置了唯一的 `dataIndex`，可以忽略这个属性。
- `render`: (value: V, record: T, index: number): ReactNode，生成复杂数据的渲染函数，参数分别为当前单元格的值，当前行数据，行索引。
- `responsive`: [Breakpoint](https://github.com/ant-design/ant-design/blob/015109b42b85c63146371b4e32b883cf97b088e8/components/_util/responsiveObserve.ts#L1)\[]，响应式 breakpoint 配置列表。未设置则始终可见，版本 4.2.0。
- `rowScope`: `row` | `rowgroup`，设置列范围，版本 5.1.0。
- `shouldCellUpdate`: (record, prevRecord) => boolean，自定义单元格渲染时机，版本 4.3.0。
- `showSorterTooltip`: boolean | [Tooltip props](/components/tooltip-cn/#api) & `{target?: 'full-header' | 'sorter-icon' }`，表头显示下一次排序的 tooltip 提示, 覆盖 table 中 `showSorterTooltip`，默认 { target: 'full-header' }，版本 5.16.0。
- `sortDirections`: Array，支持的排序方式，覆盖 `Table` 中 `sortDirections`， 取值为 `ascend` `descend`，默认 \[`ascend`, `descend`]。
- `sorter`: function | boolean | { compare: function, multiple: number }，排序函数，本地排序使用一个函数(参考 [Array.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) 的 compareFunction)。需要服务端排序可设为 `true`（单列排序） 或 `{ multiple: number }`（多列排序）。
- `sortOrder`: `ascend` | `descend` | null，排序的受控属性，外界可用此控制列的排序，可设置为 `ascend` `descend` `null`。
- `sortIcon`: (props: { sortOrder }) => ReactNode，自定义 sort 图标，版本 5.6.0。
- `title`: ReactNode | ({ sortColumns, filters }) => ReactNode，列头显示文字（函数用法 `3.10.0` 后支持）。
- `width`: string | number，列宽度（[指定了也不生效？](https://github.com/ant-design/ant-design/issues/13825#issuecomment-449889241)）。
- `minWidth`: number，最小列宽度，只在 `tableLayout="auto"` 时有效，版本 5.21.0。
- `hidden`: boolean，隐藏列，默认 false，版本 5.13.0。
- `onCell`: function(record, rowIndex)，设置单元格属性。
- `onFilter`: function，本地模式下，确定筛选的运行函数。
- `onHeaderCell`: function(column)，设置头部单元格属性。

### ColumnGroup 属性

#### 必填

- 无必填属性。

#### 可选

- `title`: ReactNode，列头显示文字。

### pagination 属性

#### 必填

- 无必填属性。

#### 可选

- `placement`: Array，指定分页显示的位置， 取值为`topStart` | `topCenter` | `topEnd` |`bottomStart` | `bottomCenter` | `bottomEnd`| `none`，默认 \[`bottomEnd`]。
- `~~position~~`: Array，指定分页显示的位置， 取值为`topLeft` | `topCenter` | `topRight` |`bottomLeft` | `bottomCenter` | `bottomRight` | `none`，请使用 `placement` 替换，默认 \[`bottomRight`]。

### expandable 属性

#### 必填

- 无必填属性。

#### 可选

- `childrenColumnName`: string，指定树形结构的列名，默认 children。
- `columnTitle`: ReactNode，自定义展开列表头，版本 4.23.0。
- `columnWidth`: string | number，自定义展开列宽度。
- `defaultExpandAllRows`: boolean，初始时，是否展开所有行，默认 false。
- `defaultExpandedRowKeys`: string\[]，默认展开的行。
- `expandedRowClassName`: string | (record, index, indent) => string，展开行的 className，版本 string: 5.22.0。
- `expandedRowKeys`: string\[]，展开的行，控制属性。
- `expandedRowRender`: function(record, index, indent, expanded): ReactNode，额外的展开行。
- `expandIcon`: function(props): ReactNode，自定义展开图标，参考[示例](https://codesandbox.io/s/fervent-bird-nuzpr)。
- `expandRowByClick`: boolean，通过点击行来展开子行，默认 false。
- `fixed`: boolean | string，控制展开图标是否固定，可选 `true` `'left'` `'right'`，默认 false，版本 4.16.0。
- `indentSize`: number，展示树形数据时，每层缩进的宽度，以 px 为单位，默认 15。
- `rowExpandable`: (record) => boolean，设置是否允许行展开（`dataSource` 若存在 `children` 字段将不生效）。
- `showExpandColumn`: boolean，是否显示展开图标列，默认 true，版本 4.18.0。
- `onExpand`: function(expanded, record)，点击展开图标时触发。
- `onExpandedRowsChange`: function(expandedRows)，展开的行变化时触发。
- `~~expandedRowOffset~~`: number，废弃：展开行的偏移列数，设置后会强制将其前面的列设为固定列。请改用 `Table.EXPAND_COLUMN` 并通过列顺序控制位置，版本 5.26.0。

### rowSelection 属性

#### 必填

- 无必填属性。

#### 可选

- `align`: `left` | `right` | `center`，设置选择列的对齐方式，默认 `left`，版本 5.25.0。
- `checkStrictly`: boolean，checkable 状态下节点选择完全受控（父子数据选中状态不再关联），默认 true，版本 4.4.0。
- `columnTitle`: ReactNode | (originalNode: ReactNode) => ReactNode，自定义列表选择框标题。
- `columnWidth`: string | number，自定义列表选择框宽度，默认 `32px`。
- `fixed`: boolean，把选择框列固定在左边。
- `getCheckboxProps`: function(record)，选择框的默认属性配置。
- `getTitleCheckboxProps`: function()，标题选择框的默认属性配置。
- `hideSelectAll`: boolean，隐藏全选勾选框与自定义选择项，默认 false，版本 4.3.0。
- `preserveSelectedRowKeys`: boolean，当数据被删除时仍然保留选项的 `key`，版本 4.4.0。
- `renderCell`: (checked: boolean, record: T, index: number, originNode: ReactNode): ReactNode，渲染勾选框，用法与 Column 的 `render` 相同，版本 4.1.0。
- `selectedRowKeys`: string\[] | number\[]，指定选中项的 key 数组，需要和 onChange 进行配合，默认 \[]。
- `defaultSelectedRowKeys`: string\[] | number\[]，默认选中项的 key 数组，默认 \[]。
- `selections`: object\[] | boolean，自定义选择项 [配置项](#selection), 设为 `true` 时使用默认选择项，默认 true。
- `type`: `checkbox` | `radio`，多选/单选，默认 `checkbox`。
- `onCell`: function(record, rowIndex)，设置单元格属性，用法与 Column 的 `onCell` 相同，版本 5.5.0。
- `onChange`: function(selectedRowKeys, selectedRows, info: { type })，选中项发生变化时的回调，版本 `info.type`: 4.21.0。
- `onSelect`: function(record, selected, selectedRows, nativeEvent)，用户手动选择/取消选择某行的回调。

### scroll 属性

#### 必填

- 无必填属性。

#### 可选

- `scrollToFirstRowOnChange`: boolean，当分页、排序、筛选变化后是否滚动到表格顶部。
- `x`: string | number | true，设置横向滚动，也可用于指定滚动区域的宽，可以设置为像素值，百分比，`true` 和 ['max-content'](https://developer.mozilla.org/zh-CN/docs/Web/CSS/width#max-content)。
- `y`: string | number，设置纵向滚动，也可用于指定滚动区域的高，可以设置为像素值。

### selection 属性

#### 必填

- 无必填属性。

#### 可选

- `key`: string，React 需要的 key，建议设置。
- `text`: ReactNode，选择项显示的文字。
- `onSelect`: function(changeableRowKeys)，选择项点击回调。

## 方法

无公开方法。

## 常见场景示例

### 基础表格

```tsx
import { Table } from 'antd';
import type { TableColumnsType } from 'antd';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

const columns: TableColumnsType<DataType> = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Age', dataIndex: 'age', key: 'age' },
  { title: 'Address', dataIndex: 'address', key: 'address' },
];

const dataSource: DataType[] = [
  { key: '1', name: 'John', age: 32, address: 'New York' },
  { key: '2', name: 'Jane', age: 28, address: 'London' },
];

const App: React.FC = () => <Table columns={columns} dataSource={dataSource} />;
```

### 排序和筛选

```tsx
const columns: TableColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    filters: [
      { text: 'John', value: 'John' },
      { text: 'Jane', value: 'Jane' },
    ],
    onFilter: (value, record) => record.name.includes(value as string),
    filterSearch: true,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    sorter: (a, b) => a.age - b.age,
    sortDirections: ['descend', 'ascend'],
  },
];
```

### 远程加载（服务端分页/排序/筛选）

```tsx
const App: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: { current: 1, pageSize: 10 },
  });

  const fetchData = () => {
    setLoading(true);
    fetch(`/api/users?${qs.stringify(tableParams)}`)
      .then((res) => res.json())
      .then(({ results, total }) => {
        setData(results);
        setTableParams((prev) => ({
          ...prev,
          pagination: { ...prev.pagination, total },
        }));
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [tableParams.pagination?.current, tableParams.pagination?.pageSize]);

  const handleTableChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter) => {
    setTableParams({ pagination, filters, sortOrder: sorter.order, sortField: sorter.field });
  };

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={tableParams.pagination}
      loading={loading}
      onChange={handleTableChange}
    />
  );
};
```

### 行选择

```tsx
const App: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const rowSelection: TableProps<DataType>['rowSelection'] = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
    }),
  };

  return <Table rowSelection={rowSelection} columns={columns} dataSource={dataSource} />;
};
```

### 可编辑单元格

```tsx
interface EditableCellProps {
  editing: boolean;
  dataIndex: string;
  title: string;
  record: DataType;
  children: ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  record,
  children,
  ...restProps
}) => (
  <td {...restProps}>
    {editing ? (
      <Form.Item name={dataIndex} style={{ margin: 0 }}>
        <Input />
      </Form.Item>
    ) : (
      children
    )}
  </td>
);

<Table components={{ body: { cell: EditableCell } }} columns={mergedColumns} dataSource={data} />;
```

### 树形数据

```tsx
const dataSource = [
  {
    key: '1',
    name: 'Parent 1',
    children: [
      { key: '1-1', name: 'Child 1-1' },
      { key: '1-2', name: 'Child 1-2' },
    ],
  },
];

<Table columns={columns} dataSource={dataSource} />;
```

### 固定列和表头

```tsx
<Table columns={columns} dataSource={dataSource} scroll={{ x: 1500, y: 300 }} />
```

### 虚拟滚动（大数据）

```tsx
<Table
  virtual
  columns={columns}
  dataSource={largeDataSource}
  scroll={{ x: 2000, y: 500 }}
  pagination={false}
/>
```

### 场景判断

| 用户需求      | 推荐配置                          |
| ------------- | --------------------------------- |
| 简单数据展示  | 基础 columns + dataSource         |
| 需要分页      | pagination 配置                   |
| 需要排序      | columns 中配置 sorter             |
| 需要筛选      | columns 中配置 filters + onFilter |
| 后端分页/排序 | onChange + 受控 pagination        |
| 需要选择行    | rowSelection 配置                 |
| 需要展开详情  | expandable 配置                   |
| 大数据量      | virtual + scroll.y                |
| 固定列        | scroll.x + columns.fixed          |
| 可编辑        | components 自定义 + Form          |
| 树形结构      | 数据中包含 children               |

### 类型导入

```tsx
import type { GetProp, TableColumnsType, TableProps } from 'antd';

type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;
type ColumnsType<T> = TableColumnsType<T>;
type TableRowSelection<T extends object> = TableProps<T>['rowSelection'];
```

## 使用建议

结合使用场景选择 表格 的类型与配置，避免过度使用。

## 示例代码

```tsx

```

## 返回结果

渲染一个功能完整的数据表格，支持多种交互和数据展示模式。
