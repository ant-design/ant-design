---
order: 0
title: 全选数据
---

当使用了分页器，又想实现全选数据的功能，可以结合『Alert』来实现。

```jsx
import { Table, Alert, Dropdown, Menu, Icon } from 'antd';

const mockData = [];
for (let i = 1; i < 100; i++) {
  mockData.push({
    database: `Ant-Dlist-${i}`,
    detail: '我是内容我是内容我是内容',
    key: i,
  });
}

class PagedTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedRowKeys: [],
      showAlert: false,
      allSelected: false,
    };

    ['handleSelected', 'handleSelectAll',
     'handleSelectAllRecords', 'handleClearAllRecords'].forEach((method) => {
       this[method] = this[method].bind(this);
     });

    const menu = (
      <Menu>
        <Menu.Item>操作1</Menu.Item>
        <Menu.Item>操作2</Menu.Item>
      </Menu>
    );

    this.columns = [{
      title: '数据库名称',
      dataIndex: 'database',
      key: 'database',
    }, {
      title: '详情',
      dataIndex: 'detail',
      key: 'detail',
    }, {
      title: '操作',
      key: 'operation',
      render() {
        return (
          <span>
            <a>删除</a>
            <span className="ant-divider"></span>
            <Dropdown overlay={menu}>
              <a>更多 <Icon className="icon-more" type="down" /></a>
            </Dropdown>
          </span>
        );
      },
    }];
    this.pagination = {
      total: mockData.length,
      showQuickJumper: true,
      pageSize: 5,
      defaultCurrent: 6,
    };
  }

  handleSelected(selectedRowKeys) {
    this.setState({ selectedRowKeys });
  }

  handleSelectAll(selected) {
    this.setState({ showAlert: selected });
  }

  handleSelectAllRecords() {
    const selectedRowKeys = this.props.dataSource.map((record) => record.key);
    this.setState({
      allSelected: true,
      selectedRowKeys,
    });
  }

  handleClearAllRecords() {
    this.setState({
      showAlert: false,
      allSelected: false,
      selectedRowKeys: [],
    });
  }

  render() {
    const props = this.props;
    const state = this.state;
    const rowSelection = {
      selectedRowKeys: state.selectedRowKeys,
      onChange: this.handleSelected,
      onSelectAll: this.handleSelectAll,
    };

    const operation = state.allSelected ?
      <a onClick={this.handleClearAllRecords}>清除所选内容</a> :
      <a onClick={this.handleSelectAllRecords}>
        选择全部 {props.dataSource.length} 项
      </a>;
    const tips = !state.allSelected ?
      `已选当前页 ${state.selectedRowKeys.length} 项。` :
      `已选择全部 ${props.dataSource.length}项。`;
    const message = <span>{tips}{operation}</span>;

    return (
      <div>
        { state.showAlert ? <Alert type="info" showIcon message={message} /> : null }
        <Table columns={this.columns} pagination={this.pagination}
          rowSelection={rowSelection}
          dataSource={props.dataSource} />
      </div>
    );
  }
}

ReactDOM.render(<PagedTable dataSource={mockData} />, mountNode);
```

```css
.icon-more {
  font-size: 9px;
}
```
