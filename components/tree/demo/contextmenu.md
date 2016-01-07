# 基本

- order: 0

最简单的用法。

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
    document.body.onclick = (e) => {
      // console.log(e.target);
      if (contains(this.cmContainer, e.target)) {
        return;
      }
      this.componentWillUnmount();
      this.toolTip = null;
    };
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
    this.toolTip = (<Tooltip placement="bottomRight" title="tooltip">
        <span>show tooltip</span>
    </Tooltip>);

    const container = this.getContainer();
    assign(this.cmContainer.style, {
      position: 'absolute',
      left: info.event.pageX + 'px',
      top: info.event.pageY + 'px',
    });

    ReactDOM.render(<div
      style={{padding: 10, backgroundColor: '#fff', border: '1px solid #ccc'}}>
      <h4>{info.node.props.title}</h4>
      {this.toolTip}
      </div>, container);
  },
  render() {
    return (
      <div>
        <h2>right click contextmenu</h2>
        <Tree onRightClick={this.onRightClick} onSelect={this.onSelect}
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
      </div>
    );
  },
});

ReactDOM.render(<Demo />, mountNode);
````
