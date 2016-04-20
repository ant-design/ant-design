---
order: 2
title: 悬浮层编辑
---

适用在上下文对编辑任务不那么重要时。

通过 `onChange` 收集数据，并发往后端即可。

```jsx
import { Table, Icon, Popover, Input } from 'antd';

class EditableTable extends React.Component {
  constructor(props) {
    super(props);

    this.columns = [{
      title: '应用名称',
      dataIndex: 'appName',
      key: 'appName',
      render: (name, record, index) => {
        const content = <Input defaultValue={name} onBlur={e => {this.handleBlur(record, e.target.value);}} />;
        const visible = this.state.visible[index];
        return (
          <div>
            <span className="app-name">
              {name}
            </span>
            <Popover content={content} title="标题" trigger="click" visible={visible} onVisibleChange={value => {this.handleVisibleChange(index, value);}}>
              <Icon type="edit" className={visible ? 'app-name-edit' : 'app-name-normal'} />
            </Popover>
          </div>
        );
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
      render: (name, record) => <a onClick={() => {this.handleOperation(record);}}>
        操作
      </a>,
    }];

    this.state = {
      visible: props.dataSource.map(() => false),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataSource !== this.props.dataSource) {
      this.setState({
        visible: nextProps.dataSource.map(() => false),
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.visible !== nextState.visible || nextProps.dataSource !== this.props.dataSource;
  }

  handleBlur(record, value) {
    console.log(value);
    const dataSource = this.props.dataSource;
    const index = dataSource.indexOf(record);
    const newDataSource = [...dataSource];
    newDataSource[index] = {
      ...record,
      appName: value,
    };
    if (this.props.onChange) {
      this.props.onChange(newDataSource, record, value);
    }
  }

  handleVisibleChange(index, value) {
    const visible = [...this.state.visible];
    visible[index] = value;
    this.setState({
      visible,
    });
  }

  handleOperation(record) {
    console.log(record);
  }

  render() {
    const dataSource = this.props.dataSource;
    return <Table columns={this.columns} pagination={false} bordered dataSource={dataSource} />;
  }
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      dataSource: [{
        appName: '应用名称001',
        creator: '林外',
        detail: '这个一个描述描述描述描述描述1',
        key: 0,
      }, {
        appName: '应用名称002',
        creator: '林外',
        detail: '这个一个描述描述描述描述描述2',
        key: 1,
      }],
    };
  }

  handleChange(dataSource) {
    this.setState({ dataSource });
  }

  render() {
    return <EditableTable dataSource={this.state.dataSource} onChange={this.handleChange} />;
  }
}

ReactDOM.render(<App />, mountNode);
```

```css
.app-name {
  margin-right: 6px;
}
.app-name-edit {
  color: #38bbf6;
  cursor: pointer;
}
.app-name-normal {
  color: #999;
  cursor: pointer;
}
```