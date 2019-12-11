---
order: 5
title:
  zh-CN: 连接线
  en-US: Tree with line
---

## zh-CN

节点之间带连接线的树，常用于文件目录结构展示。使用 `showLine` 开启，可以用 `switcherIcon` 修改默认图标。

## en-US

Tree with connected line between nodes, turn on by `showLine`, customize the preseted icon by `switcherIcon`.

```jsx
import { Tree, Icon, Switch } from 'antd';

const { TreeNode } = Tree;

class Demo extends React.Component {
  state = {
    showLine: true,
    showIcon: false,
  }

  onShowLineChange = showLine => {
    this.setState({ showLine });
  }

  onShowIconChange = showIcon => {
    this.setState({ showIcon });
  }

  render() {
    const { showIcon, showLine } = this.state;
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          showLine: <Switch checked={showLine} onChange={this.onShowLineChange} />
          <br />
          <br />
          showIcon: <Switch checked={showIcon} onChange={this.onShowIconChange} />
        </div>
        <Tree
          showLine={showLine}
          showIcon={showIcon}
          defaultExpandedKeys={['0-0-0', '0-0-1', '0-0-2']}
        >
          <TreeNode icon={<Icon type="carry-out" />} title="parent 1" key="0-0">
            <TreeNode icon={<Icon type="carry-out" />} title="parent 1-0" key="0-0-0">
              <TreeNode icon={<Icon type="carry-out" />} title="leaf" key="0-0-0-0" />
              <TreeNode icon={<Icon type="carry-out" />} title="leaf" key="0-0-0-1" />
              <TreeNode icon={<Icon type="carry-out" />} title="leaf" key="0-0-0-2" />
            </TreeNode>
            <TreeNode icon={<Icon type="carry-out" />} title="parent 1-1" key="0-0-1">
              <TreeNode icon={<Icon type="carry-out" />} title="leaf" key="0-0-1-0" />
            </TreeNode>
            <TreeNode icon={<Icon type="carry-out" />} title="parent 1-2" key="0-0-2">
              <TreeNode icon={<Icon type="carry-out" />} title="leaf" key="0-0-2-0" />
              <TreeNode
                switcherIcon={<Icon type="form" />}
                icon={<Icon type="carry-out" />}
                title="leaf"
                key="0-0-2-1"
              />
            </TreeNode>
          </TreeNode>
        </Tree>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```
