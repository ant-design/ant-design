# 外界控制数据

- order: 11

由父元素控制自身数据展示。

---

````jsx
var Table = antd.Table;
var columns = [{
  title: '姓名',
  dataIndex: 'name',
  render: function(text) {
    return <a href="javascript:;">{text}</a>;
  }
}, {
  title: '年龄',
  dataIndex: 'age'
}, {
  title: '住址',
  dataIndex: 'address'
}];
var data1 = [{
  name: '胡彦斌',
  age: 32,
  address: '西湖区湖底公园1号'
}, {
  name: '胡彦祖',
  age: 42,
  address: '西湖区湖底公园1号'
}, {
  name: '李大嘴',
  age: 32,
  address: '西湖区湖底公园1号'
}];
var data2 = [{
  name: '胡彦斌2',
  age: 32,
  address: '西湖区湖底公园2号'
}, {
  name: '胡彦祖2',
  age: 42,
  address: '西湖区湖底公园2号'
}, {
  name: '李大嘴2',
  age: 32,
  address: '西湖区湖底公园2号'
}];



var App = React.createClass({
  getInitialState() {
    return {
      data: []
    };
  },
  handleClick1() {
    this.setState({
      data: data1
    });
  },
  handleClick2() {
    this.setState({
      data: data2
    });
  },
  render() {
    return <div>
      <Table columns={columns} dataSource={this.state.data} />
      <button className="ant-btn" onClick={this.handleClick1}>加载本地数据1</button>
      &nbsp;
      <button className="ant-btn" onClick={this.handleClick2}>加载本地数据2</button>
    </div>;
  }
})

React.render(<App />
, document.getElementById('components-table-demo-local-data'));
````

