# 基本

- order: 0

最简单的用法。

---

````jsx
import { TreeSelect } from 'antd';
const TreeNode = TreeSelect.TreeNode;

const Demo = React.createClass({
  getInitialState() {
    return {
      value: 'leaf1',
    };
  },
  onChange(e) {
    let value;
    if (e.target) {
      value = e.target.value;
    } else {
      value = e;
    }
    this.setState({value});
  },
  render() {
    return (
      <div style={{margin: 20}}>
        <h2>Single Select</h2>
        <TreeSelect style={{width: 300}} showSearch
              value={this.state.value} optionLabelProp="title"
              dropdownMenuStyle={{maxHeight: 200, overflow: 'auto'}}
              treeDefaultExpandAll
              onChange={this.onChange}>
          <TreeNode value="parent 1" title="parent 1" key="0-1">
            <TreeNode value="parent 1-0" title="parent 1-0" key="0-1-1">
              <TreeNode value="leaf1" title="my leaf" key="random" />
              <TreeNode value="leaf2" title="your leaf" key="random1" />
            </TreeNode>
            <TreeNode value="parent 1-1" title="parent 1-1" key="random2">
              <TreeNode value="sss" title={<span style={{color: 'red'}}>sss</span>} key="random3" />
            </TreeNode>
          </TreeNode>
        </TreeSelect>
      </div>
    );
  },
});

ReactDOM.render(
  <Demo />
, document.getElementById('components-tree-select-demo-basic'));
````
