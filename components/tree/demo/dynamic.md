---
order: 3
title:
  zh-CN: 异步数据加载
  en-US: load data asynchronously
---

## zh-CN

点击展开节点，动态加载数据。

## en-US

To load data asynchronously when click to expand a treeNode.

```tsx
import React, { useState } from 'react';
import { Tree } from 'antd';

const { TreeNode } = Tree;

const initTreeDate = [
  { title: 'Expand to load', key: '0' },
  { title: 'Expand to load', key: '1' },
  { title: 'Tree Node', key: '2', isLeaf: true },
];

const Demo: React.FC<{}> = () => {
  const [treeData, setTreeData] = useState(initTreeDate);

  function onLoadData({ props: { data } }) {
    return new Promise(resolve => {
      if (data.children) {
        resolve();
        return;
      }
      setTimeout(() => {
        data.children = [
          { title: 'Child Node', key: `${data.key}-0` },
          { title: 'Child Node', key: `${data.key}-1` },
        ];
        setTreeData([...treeData]);
        resolve();
      }, 1000);
    });
  }

  return <Tree loadData={onLoadData} treeData={treeData} />;
};

class Demo1 extends React.Component {
  state = {
    treeData: [
      { title: 'Expand to load', key: '0' },
      { title: 'Expand to load', key: '1' },
      { title: 'Tree Node', key: '2', isLeaf: true },
    ],
  };

  onLoadData = treeNode => {
    const { treeData } = this.state;
    return new Promise(resolve => {
      const { props } = treeNode;
      if (treeNode.props.children) {
        resolve();
        return;
      }
      setTimeout(() => {
        treeNode.props.dataRef.children = [
          { title: 'Child Node', key: `${treeNode.props.eventKey}-0` },
          { title: 'Child Node', key: `${treeNode.props.eventKey}-1` },
        ];
        this.setState({
          treeData: [...this.state.treeData],
        });
        resolve();
      }, 1000);
    });
  };

  render() {
    return <Tree loadData={this.onLoadData} treeData={this.state.treeData} />;
  }
}

ReactDOM.render(<Demo />, mountNode);
```
