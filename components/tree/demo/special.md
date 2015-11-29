# 接收外部传参

- order: 2

受控组件，外部传入参数，控制树对象节点。

---

````jsx
import { Tree, Button } from 'antd';
const TreeNode = Tree.TreeNode;

class TreeDemo extends React.Component {
  constructor(props) {
    super(props);
    ['handleClick', 'handleCheck', 'handleSelect'].forEach((m)=> {
      this[m] = this[m].bind(this);
    });
    this.state = {
      checkedKeys: [],
      selectedKeys: []
    };
  }
  handleClick() {
    this.setState({
      checkedKeys: ['p11'],
      selectedKeys: ['p21', 'p11']
    });
  }
  handleCheck(info) {
    console.log('check: ', info);
    this.setState({
      checkedKeys: ['p21'],
      selectedKeys: ['p1', 'p21']
    });
  }
  handleSelect(info) {
    console.log('selected: ', info);
    this.setState({
      checkedKeys: ['p21'],
      selectedKeys: ['p21']
    });
  }
  render() {
    return (<div>
      <Tree defaultExpandAll checkable
            onCheck={this.handleCheck} checkedKeys={this.state.checkedKeys}
            onSelect={this.handleSelect} selectedKeys={this.state.selectedKeys} multiple>
        <TreeNode title="parent 1" key="p1">
          <TreeNode key="p10" title="leaf"/>
          <TreeNode title="parent 1-1" key="p11">
            <TreeNode title="parent 2-1" key="p21">
              <TreeNode title="test" />
              <TreeNode title={<span>sss</span>}/>
            </TreeNode>
            <TreeNode key="p22" title="leaf"/>
          </TreeNode>
        </TreeNode>
        <TreeNode key="p12" title="leaf"/>
      </Tree>
      <Button type="primary" size="small" onClick={this.handleClick}>点此控制树节点</Button>
    </div>);
  }
}

ReactDOM.render(<TreeDemo />, document.getElementById('components-tree-demo-special'));
````
