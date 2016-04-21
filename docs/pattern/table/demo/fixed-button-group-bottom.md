---
order: 4
title: 固定按钮组-底部固定
---

用在表格行数很多时（一般多于 20 行），又想对表格数据进行频繁的操作时，尤其适用在无限加载的表格中。

```jsx
import { Table, Dropdown, Button, Menu, Icon } from 'antd';

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    appName: `我是标题${i}`,
    status: '已上线',
    createTime: '2014-12-24 23:12:00'
  });
}

const columns = [{
  title: '应用名称',
  dataIndex: 'appName',
  key: 'appName',
  render: (text) => <a>{text}</a>
}, {
  title: '状态',
  dataIndex: 'status',
  key: 'status',
  render: () => <span className="c-icon-status">已上线</span>
}, {
  title: '创建时间',
  dataIndex: 'createTime',
  key: 'createTime'
}, {
  title: '操作',
  key: 'operation',
  render() {
    return (
      <span>
        <a>操作1</a>
        <span className="ant-divider"></span>
        <a>更多</a>
      </span>
    );
  }
}];

const rowSelection = {
  onChange(selectedRowKeys, selectedRows) {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect(record, selected, selectedRows) {
    console.log(record, selected, selectedRows);
  },
  onSelectAll(selected, selectedRows, changeRows) {
    console.log(selected, selectedRows, changeRows);
  }
};

const menu = (
  <Menu>
    <Menu.Item key="0">
      <a>操作1</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a>操作2</a>
    </Menu.Item>
    <Menu.Item key="3">操作3</Menu.Item>
  </Menu>
);

class FixedButtonGroupBottom extends React.Component {
  render() {
    return (
      <div className="fixed-button-group-demo-b">
        <div className="fbg-table">
          <Table rowSelection={rowSelection} columns={columns} pagination={false} dataSource={data} />
        </div>
        <div className="fbg-shadow">
          <Button type="primary">按钮</Button>
          <Button type="ghost">按钮</Button>
          <Dropdown overlay={menu} trigger={['click']}>
            <Button type="ghost">
              更多操作<Icon type="down" />
            </Button>
          </Dropdown>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<FixedButtonGroupBottom />, mountNode);
```

```css
.c-icon-status:before {
  content: '';
  display: inline-block;
  height: 6px;
  width: 6px;
  background-color: #87D068;
  vertical-align: middle;
  margin-right: 4px;
  border-radius: 3px;
}

.fixed-button-group-demo-b .ant-btn {
  margin-right: 8px;
  margin-top: 12px;
}

.fixed-button-group-demo-b .fbg-table {
  height: 410px;
  overflow: auto;
}

.fixed-button-group-demo-b .fbg-shadow {
  position: relative;
  z-index: 10;
  text-align: right;
  border-top: 1px solid #e9e9e9;
  box-shadow: 0px -4px 4px -2px rgba(64, 64, 64, 0.2);
}
```
