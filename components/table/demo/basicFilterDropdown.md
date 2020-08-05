---
order: 8.5
title:
  en-US: Basic Filter Dropdown
---

## en-US

Use `BasicFilterDropdown` for a simple text filter.  Use `FilterIcon` as the default icon for text filtering.

```jsx
import { Table } from '@allenai/varnish';

const { BasicFilterDropdown, FilterIcon } = Table;

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    filterDropdown: BasicFilterDropdown,
    filterIcon: FilterIcon,
    onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend'],
  },
  {
    title: 'Age',
    dataIndex: 'age',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    sorter: (a, b) => a.address.length - b.address.length,
    sortDirections: ['descend', 'ascend'],
  },
];

const data = [
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
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
];

function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}

ReactDOM.render(<Table columns={columns} dataSource={data} onChange={onChange} />, mountNode);
```
