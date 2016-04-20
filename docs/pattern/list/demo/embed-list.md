---
order: 0
title: 列表嵌入
---

用户可以不用打开新页面或者打开弹框，只要通过点击，就可以直接在上下文中查看该列表项的详情信息

```jsx
import { Table } from 'antd';

const stateMap = {
  online: '已上线',
  offline: '未上线',
  exception: '异常',
  processing: '进行中',
};

const columns = [{
  title: '应用名称',
  dataIndex: 'name',
  key: 'name',
  width: 200,
}, {
  title: '状态',
  dataIndex: 'state',
  key: 'state',
  filters: [{
    text: '已上线',
    value: 'online'
  }, {
    text: '未上线',
    value: 'offline'
  }, {
    text: '异常',
    value: 'exception'
  }, {
    text: '进行中',
    value: 'processing'
  }],
  onFilter: (value, record) => record.state === value,
  sorter: (a, b) => a.state.length - b.state.length,
  render: (text, record) => <span>
    <i className = { `state-dot state-dot-${record.state}` }></i>
    { stateMap[record.state] }
  </span>
}, {
  title: '创建时间',
  dataIndex: 'date',
  key: 'date',
  sorter: (a, b) => new Date(a.date.replace(/-/g, ' ')) - new Date(b.date.replace(/-/g, ' ')),
}, {
  title: '操作',
  dataIndex: '',
  key: 'x',
  render: () => <span>
    <a href="#">操作1</a>
    <span className="ant-divider"></span>
    <a href="#">操作2</a>
  </span>
}];

const data = [
  { key: 1, name: '我是标题', state: 'online', date: '2015-01-01 12:00:01', description: 'Ant Design 是一个致力于提升『用户』和『设计者』使用体验的中台设计语言。它模糊了产品经理、交互设计师、视觉设计师、前端工程师、开发工程师等角色边界，将进行 UE 设计和 UI 设计人员统称为『设计者』，利用统一的规范进行设计赋能，全面提高中台产品体验和研发效率。' },
  { key: 2, name: '我是标题，一个长标题', state: 'exception', date: '2015-03-12 14:00:05', description: 'Ant Design 是一个致力于提升『用户』和『设计者』使用体验的中台设计语言。它模糊了产品经理、交互设计师、视觉设计师、前端工程师、开发工程师等角色边界，将进行 UE 设计和 UI 设计人员统称为『设计者』，利用统一的规范进行设计赋能，全面提高中台产品体验和研发效率。' },
  { key: 3, name: '我是一个更长的标题，比上一个标题还要长,标题标题标题标题', state: 'offline', date: '2016-04-01 08:05:09', description: 'Ant Design 是一个致力于提升『用户』和『设计者』使用体验的中台设计语言。它模糊了产品经理、交互设计师、视觉设计师、前端工程师、开发工程师等角色边界，将进行 UE 设计和 UI 设计人员统称为『设计者』，利用统一的规范进行设计赋能，全面提高中台产品体验和研发效率。' },
  { key: 4, name: '我是标题4', state: 'processing', date: '2016-03-11 12:08:23', description: 'Ant Design 是一个致力于提升『用户』和『设计者』使用体验的中台设计语言。它模糊了产品经理、交互设计师、视觉设计师、前端工程师、开发工程师等角色边界，将进行 UE 设计和 UI 设计人员统称为『设计者』，利用统一的规范进行设计赋能，全面提高中台产品体验和研发效率。' }
];

ReactDOM.render(
<Table columns={columns}
  expandedRowRender={record => <p>{record.description}</p>}
  dataSource={data}
  className="table" />
, mountNode);

```

```css
.state-dot {
	width: 6px;
	height: 6px;
	display: inline-block;
	background-color: #87D068; 
	border-radius: 3px;
	margin-right: 8px;
}
.state-dot-online {
	background-color: #87D068; 	
}
.state-dot-offline {
	background-color: #CCCCCC; 	
}
.state-dot-exception {
	background-color: #FF5500; 	
}
.state-dot-processing {
	background-color: #2DB7F5; 	
}

```
