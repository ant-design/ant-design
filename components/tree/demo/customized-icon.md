---
order: 6
title:
  zh-CN: 自定义图标
  en-US: Customize Icon
---

## zh-CN

可以针对不同的节点定制图标。

## en-US

You can customize icons for different nodes.

````jsx
import { Tree, Icon } from 'antd';

const { TreeNode } = Tree;

ReactDOM.render(
  <Tree
    showIcon
    defaultExpandAll
    defaultSelectedKeys={['0-0-0']}
    switcherIcon={<Icon type="down" />}
  >
    <TreeNode icon={<Icon type="smile-o" />} title="parent 1" key="0-0">
      <TreeNode icon={<Icon type="meh-o" />} title="leaf" key="0-0-0" />
      <TreeNode
        icon={({ selected }) => (
          <Icon type={selected ? 'frown' : 'frown-o'} />
        )}
        title="leaf"
        key="0-0-1"
      />
    </TreeNode>
  </Tree>,
  mountNode
);
````
