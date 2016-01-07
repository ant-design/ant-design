# 拖动示例

- order: 2

拖动示例

---

````jsx
import { Tree } from 'antd';
const TreeNode = Tree.TreeNode;

const x = 3;
const y = 2;
const z = 1;
const gData = [];

const generateData = (_level, _preKey, _tns) => {
  const preKey = _preKey || '0';
  const tns = _tns || gData;

  const children = [];
  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`;
    tns.push({title: key, key: key});
    if (i < y) {
      children.push(key);
    }
  }
  if (_level < 0) {
    return tns;
  }
  const __level = _level - 1;
  children.forEach((key, index) => {
    tns[index].children = [];
    return generateData(__level, key, tns[index].children);
  });
};
generateData(z);

const Demo = React.createClass({
  getInitialState() {
    return {
      gData: gData,
      expandedKeys: ['0-0', '0-0-0', '0-0-0-0'],
    };
  },
  onTreeDragStart() {
  },
  onTreeDragEnter(info) {
    // console.log(info);
    this.setState({
      expandedKeys: info.expandedKeys,
    });
  },
  onTreeDrop(info) {
    console.log(info);
    const dropKey = info.node.props.eventKey;
    const dragKey = info.dragNode.props.eventKey;
    // const dragNodesKeys = info.dragNodesKeys;
    const loop = (data, key, callback) => {
      data.forEach((item, index, arr) => {
        if (item.key === key) {
          return callback(item, index, arr);
        }
        if (item.children) {
          return loop(item.children, key, callback);
        }
      });
    };
    const data = [...this.state.gData];
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });
    if (info.dropToGap) {
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      ar.splice(i, 0, dragObj);
    } else {
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert 示例添加到尾部，可以是随意位置
        item.children.push(dragObj);
      });
    }
    this.setState({
      gData: data,
      expandedKeys: info.originExpandedKeys,
    });
  },
  render() {
    const loop = data => {
      return data.map((item) => {
        if (item.children) {
          return <TreeNode key={item.key} title={item.key}>{loop(item.children)}</TreeNode>;
        }
        return <TreeNode key={item.key} title={item.key} />;
      });
    };
    return (<div className="draggable-demo">
      <h2>draggable </h2>
      <p>drag a node into another node</p>
      <div className="draggable-container">
        <Tree defaultExpandedKeys={this.state.expandedKeys} openAnimation={{}} draggable
              onTreeDragStart={this.onTreeDragStart}
              onTreeDragEnter={this.onTreeDragEnter}
              onTreeDrop={this.onTreeDrop}
              >
          {loop(this.state.gData)}
        </Tree>
      </div>
    </div>);
  },
});

ReactDOM.render(<Demo />, mountNode);
````
