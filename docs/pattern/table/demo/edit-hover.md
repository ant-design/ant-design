---
order: 2
title: 悬浮层编辑
---

适用在上下文对编辑任务不那么重要时。

通过 `blur` 收集数据，并发往后端即可。

```jsx
import { Table, Icon, Popover, Input } from 'antd';
import React, { Component } from 'react';


class EditableTable extends Component {
  constructor(props) {
    super(props);

    this.handleBlur = this.handleBlur.bind(this);
    this.handleOperation = this.handleOperation.bind(this);

    this.columns = [{
      title: '应用名称',
      dataIndex: 'appName',
      key: 'appName',
      render: (name, record) => {
        const content = (<Input defaultValue={name} onBlur={(e) => {
          this.handleBlur(record, e.target.value);
        }} />);

        return (<div>

          <span style={{
            marginRight: 6,
          }}>
            {name}
          </span>

          <Popover overlay={content} title="标题" trigger="click">
            <a style={{
              color: '#666',
            }}>
              <Icon type="edit" />
            </a>
          </Popover>

        </div>);
      },
    }, {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator',
    }, {
      title: '详情',
      dataIndex: 'detail',
      key: 'detail',
    }, {
      title: '操作',
      key: 'operation',
      render: (name, record) => {
        return (<a onClick={this.handleOperation(record)}>
          操作
        </a>);
      },
    }];

    this.state = {
      dataSource: props.dataSource,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataSource !== this.props.dataSource) {
      this.setState({
        dataSource: nextProps.dataSource,
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.dataSource !== this.state.dataSource;
  }

  handleBlur(record, value) {
    console.log(value);

    // 这里用 setTimeout 模拟网络请求
    setTimeout(() => {
      // 调用接口请求修改名称，成功后则可调用 this.setState 来设置 dataSource
      // 在这里例子中，需要保证的是 dataSource 为 immutable data
      const dataSource = this.state.dataSource;
      const index = dataSource.indexOf(record);
      const newDataSource = [...dataSource];
      newDataSource[index] = {
        ...record,
        appName: value,
      };
      this.setState({
        dataSource: newDataSource,
      });
      if (this.props.onChange) {
        this.props.onChange(newDataSource);
      }
    }, 200);
  }

  handleOperation(record) {
    console.log(record);
  }

  render() {
    const dataSource = this.state.dataSource;
    return (
      <Table columns={this.columns} pagination={false} bordered
        dataSource={dataSource} />
    );
  }
}

const mockData = [{
  appName: '应用名称001',
  creator: '林外',
  detail: '这个一个描述描述描述描述描述1',
  key: 0,
}, {
  appName: '应用名称002',
  creator: '林外',
  detail: '这个一个描述描述描述描述描述2',
  key: 1,
}];

ReactDOM.render(<EditableTable dataSource={mockData} onChange={data => {
  // 当编辑成功调用得到新的数据
  console.log(data);
}} />);
```
