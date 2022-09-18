---
order: 5
title:
  zh-CN: 列表
  en-US: Table
---

## zh-CN

在列表组件中使用加载占位符。

## en-US

Use skeleton in table component.

```tsx
import type Icon from '@ant-design/icons';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, Skeleton, Switch, Table } from 'antd';
import React, { useState } from 'react';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  const onChange = (checked: boolean) => {
    setLoading(!checked);
  };

  const columns = [
    { title: 'Name', dataIndex: 'name' },
    { title: 'Age', dataIndex: 'age' },
    { title: 'Address', dataIndex: 'address' },
  ];

  const data = [
    {
      age: '21',
      name: 'Bob',
      address: '1 Grand St',
    },
    {
      age: '22',
      name: 'John',
      address: '2 Funk St',
    },
    {
      age: '23',
      name: 'Ross',
      address: '3 Purple St',
    },
  ];

  return (
    <>
      <Switch checked={!loading} onChange={onChange} />
      <Table
        loading={{ type: 'skeleton', loading, active: true }}
        columns={columns}
        dataSource={data}
      />
    </>
  );
};

export default App;
```

<style>
.skeleton-demo {
  border: 1px solid #f4f4f4;
}
</style>
