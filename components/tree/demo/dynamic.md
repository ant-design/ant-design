# 异步数据加载

- order: 3

异步加载数据

---

````jsx
var Tree = antd.Tree;
var TreeNode = Tree.TreeNode;

const asyncTree = [
  {name: "pNode 01", key: "0-0"},
  {name: "pNode 02", key: "0-1"},
  {name: "pNode 03", key: "0-2"},
  {name: "pNode 04", key: "0-4"},
  {name: "pNode 05", key: "0-5"},
  {name: "pNode 06", key: "0-6"},
  {name: "pNode 07", key: "0-7"},
  {name: "pNode 08", key: "0-8"},
];

const generateTreeNodes = (treeNode) => {
  const arr = [];
  const key = treeNode.props.eventKey;
  //获取自定义数据
  if(key=='0-0'){
    const asyncTree2  = [
       {name: "伯约", key: "0-0-0"},
       {name: "王磊", key: "0-0-1"},
       ];
       asyncTree2.forEach((item) => {
          arr.push({name: item.name, key: item.key});
    });
  }
  //获取默认数据
  else{
    for (let i = 0; i < 6; i++) {
      arr.push({name: `leaf ${key}-${i}`, key: `${key}-${i}`});
    }
  }

  return arr;
}

const TreeDemo = React.createClass({
  propTypes: {},
  timeout(duration = 0) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve.bind(this), duration);
    })
  },
  getInitialState() {
    return {
      treeData: []
    };
  },
  componentDidMount() {
    this.timeout(1000).then(() => {
      this.setState({
        treeData: asyncTree
      });
      return asyncTree;
    });
  },
  handleSelect(info) {
    console.log('selected', info);
  },
  handleDataLoaded(treeNode) {
    return this.timeout(1000).then(() => {
      const child = generateTreeNodes(treeNode);
      const treeData = [...this.state.treeData];
      treeData.forEach((item) => {
        if (item.key === treeNode.props.eventKey) {
          item.children = child;
        }
      });
      this.setState({treeData});
      return child;
    });
  },
  render() {
    const loop = (data) => {
      return data.map((item) => {
        if (item.children) {
          return <TreeNode title={item.name} key={item.key}>{loop(item.children)}</TreeNode>;
        } else {
          return <TreeNode title={item.name} key={item.key}></TreeNode>;
        }
      })
    };
    const parseTreeNode = (data) => {
      return loop(data);
    };
    let treeNodes = parseTreeNode(this.state.treeData);
    return (
      <div>
        <Tree onSelect={this.handleSelect} onDataLoaded={this.handleDataLoaded} showLine={false}>
          {treeNodes}
        </Tree>
      </div>
    )
  }
})

ReactDOM.render(<TreeDemo />, document.getElementById('components-tree-demo-dynamic'));
````
