---
order: 99
title:
  en-US: Pagination Settings
  zh-CN: 分页设置
---

## zh-CN

表格的分页设置。

## en-US

Table pagination settings.

```jsx
import { Table, Tag, Radio, Space } from 'antd';

const topOptions = [
  { label: 'topLeft', value: 'topLeft' },
  { label: 'topCenter', value: 'topCenter' },
  { label: 'topRight', value: 'topRight' },
  { label: 'none', value: 'none' },
  { label: 'invalid', value: 'invalid' },
];

const bottomOptions = [
  { label: 'bottomLeft', value: 'bottomLeft' },
  { label: 'bottomCenter', value: 'bottomCenter' },
  { label: 'bottomRight', value: 'bottomRight' },
  { label: 'none', value: 'none' },
  { label: 'invalid', value: 'invalid' },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
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
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <span>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

class Demo extends React.Component {
  state = {
    top: 'topLeft',
    bottom: 'bottomRight',
  };

  render() {
    return (
      <div>
        <div>
          <Radio.Group
            style={{ marginBottom: 10 }}
            options={topOptions}
            value={this.state.top}
            onChange={e => {
              this.setState({ top: e.target.value });
            }}
          />
        </div>
        <Radio.Group
          style={{ marginBottom: 10 }}
          options={bottomOptions}
          value={this.state.bottom}
          onChange={e => {
            this.setState({ bottom: e.target.value });
          }}
        />
        <Table
          columns={columns}
          pagination={{ position: [this.state.top, this.state.bottom] }}
          dataSource={data}
        />
      </div>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```
