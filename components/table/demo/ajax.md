# 动态加载数据

- order: 7

远程读取的表格是**更为常见的模式**，下面的表格使用了 `dataSource` 对象和远程数据源绑定和适配，并具有筛选、排序等功能以及页面 loading 效果。

**注意，此示例是静态数据模拟，数据并不准确，请打开网络面板查看请求。**

---

````jsx
import { Table, Button } from 'antd';

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

const dataSource = new Table.DataSource({
  url: '/components/table/demo/data.json',
  resolve: function(result) {
    return result.data;
  },
  data: {},
  // 和后台接口返回的分页数据进行适配
  getPagination: function(result) {
    return {
      total: result.totalCount,
      pageSize: result.pageSize
    };
  },
  // 和后台接口接收的参数进行适配
  // 参数里提供了分页、筛选、排序的信息
  getParams: function(pagination, filters, sorter) {
    console.log('getParams 的参数是：', pagination, filters, sorter);
    const params = {
      pageSize: pagination.pageSize,
      currentPage: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order
    };
    for (let key in filters) {
      params[key] = filters[key];
    }
    console.log('请求参数：', params);
    return params;
  }
});

const Test = React.createClass({
  getInitialState() {
    return {
      dataSource: null,
      pagination: {
        onChange: this.hanlePageChange
      }
    };
  },
  hanlePageChange(page) {
    // 使用受控属性 current，方便外部设置页数
    const pagination = this.state.pagination;
    pagination.current = page;
    this.setState({ pagination });
  },
  refresh() {
    // 回到第一页
    const pagination = this.state.pagination;
    pagination.current = 1;
    this.setState({
      dataSource: dataSource.clone()
    });
  },
  changeAndRefresh() {
    // 回到第一页
    const pagination = this.state.pagination;
    pagination.current = 1;
    // 可以修改原来的 dataSource 再发请求
    this.setState({
      dataSource: dataSource.clone({
        data: { city: 'hz' }
      }),
      pagination,
    });
  },
  render() {
    return <div>
      <Table columns={columns} dataSource={this.state.dataSource} pagination={this.state.pagination} />
      <Button type="primary" onClick={this.refresh}>
        加载初始数据
      </Button>
      &nbsp;
      <Button onClick={this.changeAndRefresh}>
        加载 city=hz 的数据
      </Button>
    </div>;
  }
});

ReactDOM.render(<Test />, document.getElementById('components-table-demo-ajax'));
````
