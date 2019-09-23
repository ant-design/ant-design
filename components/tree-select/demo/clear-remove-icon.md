---
order: 13
debug: true
title:
  zh-CN: 清空与清除图标
  en-US: clear and remove icon
---

## zh-CN

最简单的用法。

## en-US

The most basic usage.

```jsx
import { TreeSelect, Icon } from 'antd';

const { TreeNode } = TreeSelect;
const clearIcon = <Icon type="heart" />;
const removeIcon = <Icon type="dislike" />;

class Demo extends React.Component {
  state = {
    value: ['leaf1', 'leaf2'],
  };

  onChange = value => {
    console.log(value);
    this.setState({ value });
  };

  render() {
    return (
      <TreeSelect
        showSearch
        clearIcon={clearIcon}
        removeIcon={removeIcon}
        style={{ width: 300 }}
        value={this.state.value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="Please select"
        multiple
        allowClear
        treeDefaultExpandAll
        onChange={this.onChange}
      >
        <TreeNode value="parent 1" title="parent 1" key="0-1">
          <TreeNode value="parent 1-0" title="parent 1-0" key="0-1-1">
            <TreeNode value="leaf1" title="my leaf" key="random" />
            <TreeNode value="leaf2" title="your leaf" key="random1" />
          </TreeNode>
          <TreeNode value="parent 1-1" title="parent 1-1" key="random2">
            <TreeNode value="sss" title={<b style={{ color: '#08c' }}>sss</b>} key="random3" />
          </TreeNode>
        </TreeNode>
      </TreeSelect>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```
