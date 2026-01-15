# Table — 表格

## 功能概述

展示行列数据的表格组件，支持排序、筛选、分页、树形数据、固定列、虚拟滚动等高级功能。

## 核心概念

### 数据流模式

```
dataSource (数据源) + columns (列定义) → Table 渲染
     ↓                    ↓
  每行数据            每列如何渲染
```

### 关键数据结构

#### ColumnType（列定义）

```tsx
interface ColumnType<T> {
  // 基础配置
  title: ReactNode; // 列标题
  dataIndex: string | string[]; // 数据字段名（支持嵌套 ['a', 'b'] 表示 a.b）
  key?: string; // React key，默认取 dataIndex

  // 渲染配置
  render?: (value: any, record: T, index: number) => ReactNode; // 自定义渲染
  align?: 'left' | 'center' | 'right'; // 对齐方式
  ellipsis?: boolean | { showTitle?: boolean }; // 超长省略
  width?: string | number; // 列宽
  fixed?: 'left' | 'right'; // 固定列

  // 排序配置
  sorter?: boolean | ((a: T, b: T) => number) | { compare; multiple };
  sortOrder?: 'ascend' | 'descend' | null; // 受控排序
  defaultSortOrder?: 'ascend' | 'descend';
  sortDirections?: ('ascend' | 'descend')[];
  showSorterTooltip?: boolean | TooltipProps;

  // 筛选配置
  filters?: { text: ReactNode; value: string | number | boolean; children?: [] }[];
  filterMode?: 'menu' | 'tree';
  filterSearch?: boolean | ((input, record) => boolean);
  filterMultiple?: boolean;
  filteredValue?: FilterValue; // 受控筛选
  defaultFilteredValue?: FilterValue;
  onFilter?: (value, record: T) => boolean;
  filterDropdown?: ReactNode | ((props) => ReactNode);
  filterIcon?: ReactNode | ((filtered) => ReactNode);

  // 响应式
  responsive?: Breakpoint[]; // 响应式断点 ['xxl', 'xl', 'lg', 'md', 'sm', 'xs']

  // 分组表头
  children?: ColumnType<T>[]; // 子列（表头分组）

  // 单元格属性
  onCell?: (record: T, index?: number) => HTMLAttributes;
  onHeaderCell?: (column) => HTMLAttributes;
}
```

#### 数据源要求

```tsx
interface DataType {
  key: string | number;  // 必须！每行唯一标识
  // ... 其他业务字段
}

// 或使用 rowKey 指定
<Table rowKey="id" dataSource={data} />
<Table rowKey={(record) => record.uid} dataSource={data} />
```

## 输入字段

### 必填

- `columns`: ColumnType[]，列定义数组
- `dataSource`: object[]，数据源数组

### 常用可选

| 属性         | 类型                                 | 默认值    | 说明       |
| ------------ | ------------------------------------ | --------- | ---------- |
| `rowKey`     | string \| (record) => string         | `'key'`   | 行唯一标识 |
| `loading`    | boolean \| SpinProps                 | `false`   | 加载状态   |
| `size`       | `'large'` \| `'middle'` \| `'small'` | `'large'` | 表格尺寸   |
| `bordered`   | boolean                              | `false`   | 显示边框   |
| `showHeader` | boolean                              | `true`    | 显示表头   |
| `title`      | (data) => ReactNode                  | -         | 表格标题   |
| `footer`     | (data) => ReactNode                  | -         | 表格尾部   |
| `locale`     | { emptyText, ... }                   | -         | 国际化配置 |

### 分页配置

```tsx
pagination?: false | {
  current?: number;           // 当前页（受控）
  pageSize?: number;          // 每页条数（受控）
  total?: number;             // 总条数
  showSizeChanger?: boolean;  // 显示条数切换
  showQuickJumper?: boolean;  // 快速跳转
  showTotal?: (total, range) => ReactNode;  // 显示总数
  position?: ('topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight')[];
  onChange?: (page, pageSize) => void;
}
```

### 行选择配置

```tsx
rowSelection?: {
  type?: 'checkbox' | 'radio';        // 选择类型
  selectedRowKeys?: Key[];            // 选中的行 key（受控）
  defaultSelectedRowKeys?: Key[];     // 默认选中
  onChange?: (selectedRowKeys, selectedRows, info) => void;
  onSelect?: (record, selected, selectedRows, nativeEvent) => void;
  onSelectAll?: (selected, selectedRows, changeRows) => void;
  getCheckboxProps?: (record) => CheckboxProps;  // 单行 checkbox 属性
  selections?: Selection[] | boolean; // 自定义选择项
  hideSelectAll?: boolean;            // 隐藏全选
  fixed?: boolean | 'left' | 'right'; // 固定选择列
  columnWidth?: number;               // 选择列宽度
  columnTitle?: ReactNode;            // 选择列标题
  checkStrictly?: boolean;            // 父子数据选中状态是否关联
  preserveSelectedRowKeys?: boolean;  // 分页时保留已选项
  renderCell?: (value, record, index, originNode) => ReactNode;
}
```

### 展开行配置

```tsx
expandable?: {
  expandedRowKeys?: Key[];           // 展开的行 key（受控）
  defaultExpandedRowKeys?: Key[];    // 默认展开
  expandedRowRender?: (record, index, indent, expanded) => ReactNode;
  expandRowByClick?: boolean;        // 点击行展开
  expandIcon?: (props) => ReactNode; // 自定义展开图标
  onExpand?: (expanded, record) => void;
  onExpandedRowsChange?: (expandedRows) => void;
  fixed?: boolean | 'left' | 'right';
  columnWidth?: number;
  columnTitle?: ReactNode;
  indentSize?: number;               // 缩进大小
  rowExpandable?: (record) => boolean; // 是否可展开
  showExpandColumn?: boolean;        // 显示展开列
  defaultExpandAllRows?: boolean;    // 默认全部展开
}
```

### 滚动配置

```tsx
scroll?: {
  x?: number | string | true;  // 横向滚动宽度
  y?: number | string;         // 纵向滚动高度
  scrollToFirstRowOnChange?: boolean;  // 分页切换滚动到顶部
}

virtual?: boolean;  // 虚拟滚动（5.9.0+，需设置 scroll.y）
```

### 事件回调

```tsx
onChange?: (
  pagination: TablePaginationConfig,
  filters: Record<string, FilterValue | null>,
  sorter: SorterResult | SorterResult[],
  extra: { currentDataSource, action }
) => void;

onRow?: (record, index) => HTMLAttributes & {
  onClick?: (event) => void;
  onDoubleClick?: (event) => void;
  onContextMenu?: (event) => void;
  onMouseEnter?: (event) => void;
  onMouseLeave?: (event) => void;
}
```

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

// 在 Table 中使用
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

// 默认使用 children 字段，可通过 childrenColumnName 自定义
<Table columns={columns} dataSource={dataSource} />;
```

### 固定列和表头

```tsx
<Table
  columns={columns}
  dataSource={dataSource}
  scroll={{ x: 1500, y: 300 }}
  // 在 columns 中设置 fixed: 'left' 或 'right'
/>
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

## 返回结果

渲染一个功能完整的数据表格，支持多种交互和数据展示模式。
