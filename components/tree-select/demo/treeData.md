---
order: 1
title: 从数据直接生成
---

使用 `treeData` 把 JSON 数据直接生成树结构。

````jsx
import { TreeSelect } from 'antd';

const treeData = [{
  label: '节点一',
  value: '0-0',
  key: '0-0',
  children: [{
    label: '子节点一',
    value: '0-0-1',
    key: '0-0-1',
  }, {
    label: '子节点二',
    value: '0-0-2',
    key: '0-0-2',
  }],
}, {
  label: '节点二',
  value: '0-1',
  key: '0-1',
}];

const Demo = React.createClass({
  getInitialState() {
    return {
      value: '',
    };
  },
  onChange(value) {
    console.log(arguments);
    this.setState({ value });
  },
  render() {
    return (
      <TreeSelect style={{ width: 300 }}
        value={this.state.value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        treeData={treeData}
        placeholder="请选择"
        treeDefaultExpandAll
        onChange={this.onChange}
      />
    );
  },
});

ReactDOM.render(<Demo />, mountNode);
````
