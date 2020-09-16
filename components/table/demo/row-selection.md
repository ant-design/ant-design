---
order: 2
title:
  en-US: selection
  zh-CN: 可选择
---

## zh-CN

第一列是联动的选择框。可以通过 `rowSelection.type` 属性指定选择类型，默认为 `checkbox`。

> 默认点击 checkbox 触发选择行为，需要点击行触发可以参考例子：<https://codesandbox.io/s/000vqw38rl>

## en-US

Rows can be selectable by making first column as a selectable column. You can use `rowSelection.type` to set selection type. Default is `checkbox`.

> selection happens when clicking checkbox by default. You can see <https://codesandbox.io/s/000vqw38rl> if you need row-click selection behavior.

```tsx
import React, { useState } from 'react';
import { Table, Radio, Divider } from 'antd';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
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
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
  },
];

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};

const Demo = () => {
  const [selectionType, setSelectionType] = useState('checkbox');

  return (
    <div>
      <Radio.Group
        onChange={({ target: { value } }) => {
          setSelectionType(value);
        }}
        value={selectionType}
      >
        <Radio value="checkbox">Checkbox</Radio>
        <Radio value="radio">radio</Radio>
      </Radio.Group>

      <Divider />

      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        loading={true}
      />
    </div>
  );
};

ReactDOM.render(<Demo />, mountNode);
```
