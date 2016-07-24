---
order: 2
title: 多选
---

多选和勾选框功能。

````jsx
import { TreeSelect } from 'antd';
const SHOW_PARENT = TreeSelect.SHOW_PARENT;

const treeData = [{
  label: '节点一',
  value: '0-0',
  key: '0-0',
  children: [{
    label: '子节点一',
    value: '0-0-0',
    key: '0-0-0',
  }],
}, {
  label: '节点二',
  value: '0-1',
  key: '0-1',
  children: [{
    label: '子节点三',
    value: '0-1-0',
    key: '0-1-0',
  }, {
    label: '子节点四',
    value: '0-1-1',
    key: '0-1-1',
  }, {
    label: '子节点五',
    value: '0-1-2',
    key: '0-1-2',
  }],
}];

const Demo = React.createClass({
  getInitialState() {
    return {
      value: ['0-0-0'],
    };
  },
  onChange(value) {
    console.log('onChange ', value, arguments);
    this.setState({ value });
  },
  render() {
    const tProps = {
      treeData,
      value: this.state.value,
      onChange: this.onChange,
      multiple: true,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      searchPlaceholder: '请选择',
      style: {
        width: 300,
      },
    };
    return <TreeSelect {...tProps} />;
  },
});

ReactDOM.render(<Demo />, mountNode);
````
