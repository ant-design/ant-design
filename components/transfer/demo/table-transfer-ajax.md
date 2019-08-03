---
order: 6
title:
  zh-CN: 表格远程加载数据穿梭框
  en-US: Table Transfer
---

## zh-CN

使用 Table 组件作为自定义渲染列表，通过 ajax 读取方式。

## en-US

Customize render list with Table component, fetch and present data from a remote server.

```jsx
import { Transfer, Table } from 'antd';
import difference from 'lodash/difference';
import uniqBy from 'lodash/uniqBy';
import reqwest from 'reqwest';

const columns = [
  {
    dataIndex: 'id',
    title: 'ID',
  },
  {
    dataIndex: 'title',
    title: 'Title',
  },
];

class TableTransfer extends React.Component {
  state = {
    dataSource: [],
    totalDataSource: [],
    pagination: {
      current: 1,
      pageSize: 10,
    },
    loading: false,
  };
  componentDidMount() {
    this.fetch();
  }
  fetch = (params = this.state.pagination) => {
    this.setState({ loading: true });
    const r = reqwest({
      url: 'http://jsonplaceholder.typicode.com/posts',
      method: 'get',
      data: {
        _start: (params.current - 1) * params.pageSize,
        _limit: params.pageSize,
      },
      type: 'json',
    }).then(result => {
      const pagination = { ...this.state.pagination };
      pagination.total = 100;
      this.setState({
        loading: false,
        dataSource: uniqBy(result, 'id'),
        totalDataSource: uniqBy(this.state.totalDataSource.concat(result), 'id'),
        pagination,
      });
    });
  };

  render() {
    const { targetKeys } = this.props;
    const { dataSource, pagination, totalDataSource, loading } = this.state;

    return (
      <Transfer {...this.props} dataSource={dataSource} rowKey={record => record.id}>
        {({
          direction,
          onItemSelectAll,
          onItemSelect,
          selectedKeys: listSelectedKeys,
          disabled: listDisabled,
        }) => {
          const rowSelection = {
            getCheckboxProps: item => ({
              disabled: listDisabled || item.disabled,
            }),
            onSelectAll(selected, selectedRows) {
              const treeSelectedKeys = selectedRows
                .filter(item => !item.disabled)
                .map(({ id }) => id);
              const diffKeys = selected
                ? difference(treeSelectedKeys, listSelectedKeys)
                : difference(listSelectedKeys, treeSelectedKeys);
              onItemSelectAll(diffKeys, selected);
            },
            onSelect({ id }, selected) {
              onItemSelect(id, selected);
            },
            selectedRowKeys: listSelectedKeys,
          };

          const handleTableChange = pagination => {
            if (direction === 'left') {
              const pager = { ...this.state.pagination };
              pager.current = pagination.current;
              this.setState({
                pagination: pager,
              });
              this.fetch(pagination);
            }
          };

          const rightDataSource = totalDataSource.filter(item => targetKeys.includes(item.id));

          const leftDataSource = dataSource.map(item => ({
            ...item,
            disabled: targetKeys.includes(item.id),
          }));

          return (
            <Table
              rowSelection={rowSelection}
              columns={columns}
              loading={direction === 'left' && loading}
              dataSource={direction === 'left' ? leftDataSource : rightDataSource}
              size="small"
              onRow={({ id, disabled: itemDisabled }) => ({
                onClick: () => {
                  if (itemDisabled) return;
                  onItemSelect(id, !listSelectedKeys.includes(id));
                },
              })}
              onChange={handleTableChange}
              pagination={direction === 'left' ? pagination : true}
            />
          );
        }}
      </Transfer>
    );
  }
}

class App extends React.Component {
  state = {
    targetKeys: [],
  };
  onChange = targetKeys => {
    this.setState({
      targetKeys,
    });
  };
  render() {
    return <TableTransfer targetKeys={this.state.targetKeys} onChange={this.onChange} />;
  }
}

ReactDOM.render(<App />, mountNode);
```
