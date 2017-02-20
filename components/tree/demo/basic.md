---
order: 0
title:
  zh-CN: 基本
  en-US: basic
---

## zh-CN

最简单的用法，展示可勾选，可选中，禁用，默认展开等功能。

## en-US

The most basic usage, tell you how to use checkable, selectable, disabled, defaultExpandKeys, and etc.

````jsx
import { Tree } from 'antd';
const TreeNode = Tree.TreeNode;

class Demo extends React.Component {
  static defaultProps = {
    keys: ['0-0-0', '0-0-1'],
  }
  state = {
    defaultExpandedKeys: this.props.keys,
    defaultSelectedKeys: this.props.keys,
    defaultCheckedKeys: this.props.keys,
  }
  onSelect = (info) => {
    console.log('selected', info);
  }
  onCheck = (info) => {
    console.log('onCheck', info);
  }
  render() {
    return (
      <Tree className="myCls" showLine checkable
        defaultExpandedKeys={this.state.defaultExpandedKeys}
        defaultSelectedKeys={this.state.defaultSelectedKeys}
        defaultCheckedKeys={this.state.defaultCheckedKeys}
        onSelect={this.onSelect} onCheck={this.onCheck}
      >
        <TreeNode title="parent 1" key="0-0">
          <TreeNode title="parent 1-0" key="0-0-0" disabled>
            <TreeNode title="leaf" key="0-0-0-0" disableCheckbox />
            <TreeNode title="leaf" key="0-0-0-1" />
          </TreeNode>
          <TreeNode title="parent 1-1" key="0-0-1">
            <TreeNode title={<span style={{ color: '#08c' }}>sss</span>} key="0-0-1-0" />
          </TreeNode>
        </TreeNode>
      </Tree>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
````
