# 远程加载数据

- order: 7

在 `0.11.0` 以后，`dataSource` 远程模式被移除，用户可以自行实现数据读取方式。

这个例子通过简单的 ajax 读取方式，演示了如何从服务端读取并展现数据，具有筛选、排序等功能以及页面 loading 效果。开发者可以自行接入其他数据处理方式。

另外，本例也展示了筛选排序功能如何交给服务端实现，列不需要指定具体的 `onFilter` 和 `sorter` 函数，而是在把筛选和排序的参数发到服务端来处理。

**注意，此示例是静态数据模拟，展示数据不会变化，请打开网络面板查看请求。**

---

````jsx
import { Table } from 'antd';
import reqwest from 'reqwest';

const columns = [{
  title: '姓名',
  dataIndex: 'name',
  filters: [{
    text: '姓李的',
    value: '李'
  }, {
    text: '姓胡的',
    value: '胡'
  }]
}, {
  title: '年龄',
  dataIndex: 'age',
  sorter: true
}, {
  title: '住址',
  dataIndex: 'address'
}];

const Test = React.createClass({
  getInitialState() {
    return {
      data: [],
      pagination: {},
      loading: false,
    };
  },
  handleTableChange(pagination, filters, sorter) {
    const pager = this.state.pagination;
    pager.current = pagination.current;
    this.setState({
      pagination: pager
    });
    const params = {
      pageSize: pagination.pageSize,
      currentPage: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order
    };
    for (let key in filters) {
      params[key] = filters[key];
    }
    this.fetch(params);
  },
  fetch(params = {}) {
    console.log('请求参数：', params);
    this.setState({ loading: true });
    reqwest({
      url: 'demo/data.json',
      method: 'get',
      data: params,
      type: 'json',
      success: (result) => {
        const pagination = this.state.pagination;
        pagination.total = result.totalCount;
        this.setState({
          loading: false,
          data: result.data,
          pagination,
        });
      }
    });
  },
  componentDidMount() {
    this.fetch();
  },
  render() {
    return (
      <Table columns={columns}
             dataSource={this.state.data}
             pagination={this.state.pagination}
             loading={this.state.loading}
             onChange={this.handleTableChange} />
    );
  }
});

ReactDOM.render(<Test />, document.getElementById('components-table-demo-ajax'));
````
