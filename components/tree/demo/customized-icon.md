---
order: 6
debug: true
title:
  zh-CN: 自定义图标
  en-US: Customize Icon
---

## zh-CN

可以针对不同节点采用样式覆盖的方式定制图标。

## en-US

You can customize icons for different nodes by styles override.

````jsx
import { Tree } from 'antd';
const TreeNode = Tree.TreeNode;

class Demo extends React.Component {
  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  }
  render() {
    return (
      <Tree
        showIcon
        showLine
        defaultExpandedKeys={['0-0-0', '0-0-1']}
        defaultSelectedKeys={['0-0-0', '0-0-1']}
        onSelect={this.onSelect}
      >
        <TreeNode title="parent 1" key="0-0">
          <TreeNode title="parent 1-0" key="0-0-0">
            <TreeNode title="leaf" key="0-0-0-0" />
            <TreeNode title="leaf" key="0-0-0-1" />
          </TreeNode>
          <TreeNode title="parent 1-1" key="0-0-1">
            <TreeNode title="leaf" key="0-0-1-0" />
          </TreeNode>
          <TreeNode title="leaf" key="0-0-2" />
        </TreeNode>
      </Tree>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
````

```css
#components-tree-demo-customized-icon .ant-tree-iconEle {
  position: absolute;
  left: 0;
  background: #fff;
}
#components-tree-demo-customized-icon .ant-tree-iconEle::after {
  font-size: 12px;
  zoom: 1;
  display: inline-block;
  font-family: 'anticon';
  text-rendering: optimizeLegibility;
  color: #999;
  transition: transform .3s ease;
  margin-top: 2px;
  background: #fff;
}
#components-tree-demo-customized-icon .ant-tree-iconEle.ant-tree-icon__docu::after {
  content: "\E664";
}
#components-tree-demo-customized-icon .ant-tree-iconEle.ant-tree-icon__open::after {
  content: "\E699";
}
#components-tree-demo-customized-icon .ant-tree-iconEle.ant-tree-icon__close::after {
  content: "\E662";
}
#components-tree-demo-customized-icon .ant-tree-switcher {
  position: relative;
  z-index: 1;
  background: transparent;
}
#components-tree-demo-customized-icon .ant-tree-switcher::after {
  opacity: 0;
}
```
