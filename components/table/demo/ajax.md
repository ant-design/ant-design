---
order: 10
title:
  en-US: Ajax
  zh-CN: 远程加载数据
---

## zh-CN

这个例子通过简单的 ajax 读取方式，演示了如何从服务端读取并展现数据，具有筛选、排序等功能以及页面 loading 效果。开发者可以自行接入其他数据处理方式。

另外，本例也展示了筛选排序功能如何交给服务端实现，列不需要指定具体的 `onFilter` 和 `sorter` 函数，而是在把筛选和排序的参数发到服务端来处理。

**注意，此示例使用 [模拟接口](https://randomuser.me)，展示数据可能不准确，请打开网络面板查看请求。**

## en-US

This example shows how to fetch and present data from a remote server, and how to implement filtering and sorting in server side by sending related parameters to server.

**Note, this example use [Mock API](https://randomuser.me) that you can look up in Network Console.**

```jsx
import { Table } from 'antd';
import reqwest from 'reqwest';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    render: name => `${name.first} ${name.last}`,
    width: '20%',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    filters: [
      { text: 'Male', value: 'male' },
      { text: 'Female', value: 'female' },
    ],
    width: '20%',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
];

class App extends React.Component {
  state = {
    data: [],
    pagination: {
      current: 1,
      pageSize: 10,
    },
    loading: false,
  };

  componentDidMount() {
    this.fetch();
  }

  handleTableChange = (pagination, filters, sorter) => {
    this.setState(
      {
        pagination: {
          ...this.state.pagination,
          current: pagination.current,
          pageSize: pagination.pageSize,
        },
      },
      () => {
        this.fetch({
          sortField: sorter.field,
          sortOrder: sorter.order,
          ...filters,
        });
      },
    );
  };

  fetch = (params = {}) => {
    console.log('params', params);
    const { pagination } = this.state;
    this.setState({ loading: true });
    reqwest({
      url: 'https://randomuser.me/api',
      method: 'get',
      data: {
        results: pagination.pageSize,
        page: pagination.current,
        ...params,
      },
      type: 'json',
    }).then(data => {
      console.log(data);
      // This is mock data, you should read it from server
      pagination.total = 200; // pagination.total = data.totalCount;
      this.setState({
        loading: false,
        data: data.results,
      });
    });
  };

  render() {
    const { data, pagination, loading } = this.state;
    return (
      <Table
        columns={columns}
        rowKey={record => record.login.uuid}
        dataSource={data}
        pagination={pagination}
        loading={loading}
        onChange={this.handleTableChange}
      />
    );
  }
}

ReactDOM.render(<App />, mountNode);
```
