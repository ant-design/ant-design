# 右键菜单

- order: 0

右键菜单示例

---

````jsx
import { Tree, Tooltip } from 'antd';
import assign from 'object-assign';
const TreeNode = Tree.TreeNode;

function contains(root, n) {
  let node = n;
  while (node) {
    if (node === root) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}

const Demo = React.createClass({
  propTypes: {},
  componentDidMount() {
    this.getContainer();
    // console.log(ReactDOM.findDOMNode(this), this.cmContainer);
    console.log(contains(ReactDOM.findDOMNode(this), this.cmContainer));
  },
  componentWillUnmount() {
    if (this.cmContainer) {
      ReactDOM.unmountComponentAtNode(this.cmContainer);
      document.body.removeChild(this.cmContainer);
      this.cmContainer = null;
    }
  },
  onSelect(info) {
    console.log('selected', info);
  },
  onRightClick(info) {
    console.log('right click', info);
    this.renderCm(info);
  },
  onMouseEnter(info) {
    console.log('enter', info);
    this.renderCm(info);
  },
  onMouseLeave(info) {
    console.log('leave', info);
  },
  getContainer() {
    if (!this.cmContainer) {
      this.cmContainer = document.createElement('div');
      document.body.appendChild(this.cmContainer);
    }
    return this.cmContainer;
  },
  renderCm(info) {
    if (this.toolTip) {
      ReactDOM.unmountComponentAtNode(this.cmContainer);
      this.toolTip = null;
    }
    this.toolTip = (<Tooltip trigger="click" placement="bottomRight" prefixCls="rc-tree-contextmenu" defaultVisible overlay={<h4>{info.node.props.title}</h4>}>
        <span></span>
    </Tooltip>);

    const container = this.getContainer();
    assign(this.cmContainer.style, {
      position: 'absolute',
      left: info.event.pageX + 'px',
      top: info.event.pageY + 'px',
    });

    ReactDOM.render(this.toolTip, container);
  },
  render() {
    return (
      <div>
        <h2>right click contextmenu</h2>
        <Tree onRightClick={this.onRightClick} onSelect={this.onSelect}
          defaultSelectedKeys={['0-1', '0-1-1']}
          multiple defaultExpandAll showLine>
          <TreeNode title="parent 1" key="0-1">
            <TreeNode title="parent 1-0" key="0-1-1">
              <TreeNode title="leaf0" />
              <TreeNode title="leaf1" />
              <TreeNode title="leaf2" />
            </TreeNode>
            <TreeNode title="parent 1-1">
              <TreeNode title="leaf" />
            </TreeNode>
          </TreeNode>
        </Tree>
        <h2>hover popup contextmenu</h2>
        <Tree onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} onSelect={this.onSelect} multiple defaultExpandAll showLine>
          <TreeNode title="parent 1" key="0-1">
            <TreeNode title="parent 1-0" key="0-1-1">
              <TreeNode title="leaf" />
              <TreeNode title="leaf" />
            </TreeNode>
            <TreeNode title="parent 1-1">
              <TreeNode title="leaf" />
            </TreeNode>
          </TreeNode>
        </Tree>
      </div>
    );
  },
});

ReactDOM.render(<Demo />, mountNode);
````
