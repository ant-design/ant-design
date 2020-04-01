---
order: 99
title:
  en-US: Custom selection group
  zh-CN: 自定义选择项组
debug: true
---

## zh-CN

自定义选项分组。

## en-US

Customize selection group.

```jsx
import { Table } from 'antd';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
];

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: i % 2 === 0 ? `Edward King ${i}` : 'Another Row',
  });
}

const App = () => {
  const rowSelection = {
    renderCell: (checked, record, index, node) => ({
      props: { rowSpan: index % 2 === 0 ? 2 : 0 },
      children: (
        <>
          {String(checked)}: {node}
        </>
      ),
    }),
  };
  return <Table rowSelection={rowSelection} columns={columns} dataSource={data} />;
};

ReactDOM.render(<App />, mountNode);
```
