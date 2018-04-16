---
order: 7
title:
  zh-CN: 目录
  en-US: directory
---

## zh-CN

内置的目录树

## en-US

Built-in directory tree.

````jsx
import { Tree } from 'antd';
const DirectoryTree = Tree.DirectoryTree;
const TreeNode = Tree.TreeNode;

class Demo extends React.Component {
  onSelect = () => {
    console.log('66666');
  };

  render() {
    return (
      <DirectoryTree
        defaultExpandAll
        onSelect={this.onSelect}
      >
        <TreeNode title="parent 1" key="0-0">
          <TreeNode title="leaf" key="0-0-0" isLeaf />
          <TreeNode title="leaf" key="0-0-1" isLeaf />
        </TreeNode>
      </DirectoryTree>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
````
