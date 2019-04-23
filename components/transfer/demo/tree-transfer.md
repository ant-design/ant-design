---
order: 6
title:
  zh-CN: 树穿梭框
  en-US: Tree Transfer
---

## zh-CN

使用 Tree 组件作为自定义渲染列表。

## en-US

Customize render list with Tree component.

````jsx
import { Transfer, Tree } from 'antd';

const { TreeNode } = Tree;

// Customize Table Transfer
const generateTree = (treeNodes = [], checkedKeys = []) => {
  return treeNodes.map(({ children, ...props }) => (
    <TreeNode {...props} disabled={checkedKeys.includes(props.key)}>
      {generateTree(children, checkedKeys)}
    </TreeNode>
  ));
};

const TreeTransfer = ({ dataSource, targetKeys, ...restProps }) => {
  const transferDataSource = [];
  function flatten(list = []) {
    list.forEach((item) => {
      transferDataSource.push(item);
      flatten(item.children);
    });
  }
  flatten(dataSource);

  return (
    <Transfer
      {...restProps}
      targetKeys={targetKeys}
      dataSource={transferDataSource}
      className="tree-transfer"
      render={item => item.title}
      showSelectAll={false}
    >
      {({ direction, onItemSelect, selectedKeys }) => {
        if (direction === 'left') {
          return (
            <Tree
              blockNode
              checkable
              checkStrictly
              defaultExpandedAll
              checkedKeys={[...selectedKeys, ...targetKeys]}
              onCheck={(_, { checked, node: { props: { eventKey } } }) => {
                onItemSelect(eventKey, checked);
              }}
            >
              {generateTree(dataSource, targetKeys)}
            </Tree>
          );
        }
        return null;
      }}
    </Transfer>
  );
};

const treeData = [
  { key: '0-0', title: '0-0' },
  { key: '0-1', title: '0-1', children: [
    { key: '0-1-0', title: '0-1-0' },
    { key: '0-1-1', title: '0-1-1' },
  ] },
  { key: '0-2', title: '0-3' },
];

class App extends React.Component {
  state = {
    targetKeys: [],
  }

  onChange = (targetKeys) => {
    console.log('Target Keys:', targetKeys);
    this.setState({ targetKeys });
  }

  render() {
    const { targetKeys } = this.state;
    return (
      <div>
        <TreeTransfer
          dataSource={treeData}
          targetKeys={targetKeys}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
````

<style>
.tree-transfer .ant-transfer-list:first-child {
  width: 50%;
  flex: none;
}
</style>
