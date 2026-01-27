# Table Component

**Purpose**: Display structured data in rows and columns with sorting, filtering, pagination, and selection capabilities.

## When to Use

- Use `Table` for displaying tabular data
- Use when you need sorting, filtering, or pagination
- Use for data that has a clear row/column structure
- Use for large datasets that need pagination or virtualization

## Basic Usage

```typescript
import { Table } from 'antd';

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

const dataSource = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
];

<Table dataSource={dataSource} columns={columns} />
```

## Column Configuration

### Basic Column

```typescript
{
  title: 'Name',           // Column header
  dataIndex: 'name',       // Data field name
  key: 'name',             // Unique key (required if no dataIndex)
}
```

### Column with Custom Render

```typescript
{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  render: (text, record, index) => {
    return <a>{text}</a>;
  },
}
```

### Sorted Column

```typescript
{
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
  sorter: (a, b) => a.age - b.age,
  sortDirections: ['descend', 'ascend'],
}
```

### Filtered Column

```typescript
{
  title: 'Status',
  dataIndex: 'status',
  key: 'status',
  filters: [
    { text: 'Active', value: 'active' },
    { text: 'Inactive', value: 'inactive' },
  ],
  onFilter: (value, record) => record.status === value,
}
```

### Fixed Column

```typescript
{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  fixed: 'left',  // or 'right'
  width: 100,
}
```

## Common Props

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| `dataSource` | Table data | object[] | - |
| `columns` | Column configuration | ColumnType[] | - |
| `rowKey` | Row key function or string | string \| (record) => string | 'key' |
| `pagination` | Pagination config | object \| false | true |
| `loading` | Loading state | boolean \| SpinProps | false |
| `size` | Table size | `'large'` \| `'middle'` \| `'small'` | `'middle'` |
| `bordered` | Show borders | boolean | false |
| `scroll` | Scroll configuration | { x?: number, y?: number } | - |
| `rowSelection` | Row selection config | object | - |
| `expandable` | Expandable rows config | object | - |
| `onChange` | Table change handler | (pagination, filters, sorter, extra) => void | - |

## Examples

### With Pagination

```typescript
<Table
  dataSource={dataSource}
  columns={columns}
  pagination={{
    current: currentPage,
    pageSize: 10,
    total: total,
    onChange: (page) => setCurrentPage(page),
  }}
/>
```

### With Loading

```typescript
<Table
  dataSource={dataSource}
  columns={columns}
  loading={loading}
/>
```

### With Row Selection

```typescript
const [selectedRowKeys, setSelectedRowKeys] = useState([]);

<Table
  rowSelection={{
    selectedRowKeys,
    onChange: (keys) => setSelectedRowKeys(keys),
  }}
  dataSource={dataSource}
  columns={columns}
/>
```

### With Expandable Rows

```typescript
<Table
  expandable={{
    expandedRowRender: (record) => (
      <p style={{ margin: 0 }}>{record.description}</p>
    ),
    rowExpandable: (record) => record.name !== 'Not Expandable',
  }}
  dataSource={dataSource}
  columns={columns}
/>
```

### With Fixed Columns

```typescript
<Table
  columns={columns}
  dataSource={dataSource}
  scroll={{ x: 1500, y: 300 }}
/>
```

### With Custom Row Class

```typescript
<Table
  dataSource={dataSource}
  columns={columns}
  onRow={(record) => ({
    onClick: () => handleRowClick(record),
    className: record.status === 'active' ? 'active-row' : '',
  })}
/>
```

## Column Types

### Action Column

```typescript
{
  title: 'Action',
  key: 'action',
  render: (_, record) => (
    <Space>
      <Button size="small">Edit</Button>
      <Button size="small" danger>Delete</Button>
    </Space>
  ),
}
```

### Image Column

```typescript
{
  title: 'Avatar',
  dataIndex: 'avatar',
  key: 'avatar',
  render: (url) => <Avatar src={url} />,
}
```

### Tag Column

```typescript
{
  title: 'Status',
  dataIndex: 'status',
  key: 'status',
  render: (status) => (
    <Tag color={status === 'active' ? 'green' : 'red'}>
      {status}
    </Tag>
  ),
}
```

### Date Column

```typescript
import dayjs from 'dayjs';

{
  title: 'Date',
  dataIndex: 'date',
  key: 'date',
  sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(),
  render: (date) => dayjs(date).format('YYYY-MM-DD'),
}
```

## Best Practices

1. **Always provide rowKey** - Use unique `rowKey` prop for each row
2. **Use dataIndex** - Always specify `dataIndex` for columns
3. **Optimize renders** - Use `render` function efficiently, avoid inline functions
4. **Handle large data** - Use pagination or virtualization for large datasets
5. **Provide loading states** - Show loading indicator during data fetching
6. **Use appropriate size** - Choose size based on data density
7. **Fixed important columns** - Fix first/last columns for horizontal scrolling
8. **Accessible headers** - Provide clear, descriptive column titles
9. **Sortable columns** - Make numeric and date columns sortable
10. **Filterable columns** - Add filters for categorical data

## Common Patterns

### Server-Side Pagination

```typescript
const [pagination, setPagination] = useState({
  current: 1,
  pageSize: 10,
  total: 0,
});

const handleTableChange = (newPagination) => {
  setPagination(newPagination);
  fetchData(newPagination);
};

<Table
  dataSource={dataSource}
  columns={columns}
  pagination={pagination}
  onChange={handleTableChange}
  loading={loading}
/>
```

### Editable Table

```typescript
const EditableCell = ({ editing, dataIndex, title, record, children, ...restProps }) => {
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[{ required: true, message: `Please input ${title}!` }]}
        >
          <Input />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
```

### Table with Search

```typescript
const [searchText, setSearchText] = useState('');

const filteredData = dataSource.filter(item =>
  item.name.toLowerCase().includes(searchText.toLowerCase())
);

<>
  <Input.Search
    placeholder="Search"
    onSearch={setSearchText}
    style={{ marginBottom: 16 }}
  />
  <Table dataSource={filteredData} columns={columns} />
</>
```

## Accessibility

- Tables are keyboard accessible
- Sortable columns are announced to screen readers
- Row selection is keyboard accessible
- Column headers are properly associated with cells
