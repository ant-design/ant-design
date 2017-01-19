---
order: 1
title:
  zh-CN: 从数据直接生成
  en-US: Generate form tree data
---

## zh-CN

使用 `treeData` 把 JSON 数据直接生成树结构。

## en-US

The tree structure can be populated using `treeData` property. This is a quick and easy way to provide the tree content.


````__react
import { TreeSelect } from 'antd';

const treeData = [{
  label: 'Node1',
  value: '0-0',
  key: '0-0',
  children: [{
    label: 'Child Node1',
    value: '0-0-1',
    key: '0-0-1',
  }, {
    label: 'Child Node2',
    value: '0-0-2',
    key: '0-0-2',
  }],
}, {
  label: 'Node2',
  value: '0-1',
  key: '0-1',
}];

const Demo = React.createClass({
  getInitialState() {
    return {
      value: undefined,
    };
  },
  onChange(value) {
    console.log(arguments);
    this.setState({ value });
  },
  render() {
    return (
      <TreeSelect
        style={{ width: 300 }}
        value={this.state.value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        treeData={treeData}
        placeholder="Please select"
        treeDefaultExpandAll
        onChange={this.onChange}
      />
    );
  },
});

ReactDOM.render(<Demo />, mountNode);
````
