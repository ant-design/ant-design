---
order: 27
title:
  en-US: Override filter panel renderer
  zh-CN: TODO
---

## zh-CN

TODO

## en-US

Override filter panel renderer, injecting `filterDropdown` prop

````jsx
import { Table, Icon, Divider } from 'antd';

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  render: text => <a href="javascript:;">{text}</a>,
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
  filterDropdown: ({ prefixCls, setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
      return (
        <div className={`${prefixCls}-view`}>
          <div>
            <a href="javascript:;" onClick={() => setSelectedKeys([42])}>
              {selectedKeys.indexOf(42) >= 0 && <Icon type="check" />} 42
            </a>
          </div>
          <div>
            <a href="javascript:;" onClick={() => setSelectedKeys([32])}>
              {selectedKeys.indexOf(32) >= 0 && <Icon type="check" />} 32
            </a>
          </div>
          <Divider type="horizontal" style={{ margin: '5px 0' }} />
          <a href="javascript:;" onClick={() => confirm()}>Confirm</a>{' - '}
          <a href="javascript:;" onClick={() => clearFilters()}>Reset</a>
        </div>
      );
    },
    onFilter: (value, record) => value === record.age,
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="javascript:;">Action 一 {record.name}</a>
      <Divider type="vertical" />
      <a href="javascript:;">Delete</a>
      <Divider type="vertical" />
      <a href="javascript:;" className="ant-dropdown-link">
        More actions <Icon type="down" />
      </a>
    </span>
  ),
}];

const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}];

ReactDOM.render(<Table columns={columns} dataSource={data} />, mountNode);
````

````css
.ant-dropdown-custom-view {
  padding: 8px;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
}
````
