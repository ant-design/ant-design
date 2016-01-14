# 受控操作示例

- order: 1

受控操作示例

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


function isInclude(smallArray, bigArray) {
  return smallArray.every((ii, i) => {
    return ii === bigArray[i];
  });
}
// console.log(isInclude(['0', '1'], ['0', '10', '1']));

function getCheckedKeys(node, checkedKeys, allCheckedNodesKeys) {
  const nodeKey = node.props.eventKey;
  let newCks = [...checkedKeys];
  let nodePos;
  const unCheck = allCheckedNodesKeys.some(item => {
    if (item.key === nodeKey) {
      nodePos = item.pos;
      return true;
    }
  });
  if (unCheck) {
    const nArr = nodePos.split('-');
    newCks = [];
    allCheckedNodesKeys.forEach(item => {
      const iArr = item.pos.split('-');
      if (item.pos === nodePos ||
        nArr.length > iArr.length && isInclude(iArr, nArr) ||
        nArr.length < iArr.length && isInclude(nArr, iArr)) {
        // 过滤掉 非父级节点 和 所有子节点。
        // 因为 node节点 不选时，其 非父级节点 和 所有子节点 都不选。
        return;
      }
      newCks.push(item.key);
    });
  } else {
    newCks.push(nodeKey);
  }
  return newCks;
}

function loopData(data, callback) {
  const loop = (d, level = 0) => {
    d.forEach((item, index) => {
      const pos = `${level}-${index}`;
      if (item.children) {
        loop(item.children, pos);
      }
      callback(item, index, pos);
    });
  };
  loop(data);
}

function getFilterExpandedKeys(data, expandedKeys) {
  const expandedPosArr = [];
  loopData(data, (item, index, pos) => {
    if (expandedKeys.indexOf(item.key) > -1) {
      expandedPosArr.push(pos);
    }
  });
  const filterExpandedKeys = [];
  loopData(data, (item, index, pos) => {
    expandedPosArr.forEach(p => {
      if ((pos.split('-').length < p.split('-').length
        && p.indexOf(pos) === 0 || pos === p)
        && filterExpandedKeys.indexOf(item.key) === -1) {
        filterExpandedKeys.push(item.key);
      }
    });
  });
  return filterExpandedKeys;
}

const Demo = React.createClass({
  propTypes: {
    multiple: React.PropTypes.bool,
  },
  getDefaultProps() {
    return {
      multiple: false,
    };
  },
  getInitialState() {
    return {
      expandedKeys: getFilterExpandedKeys(gData, ['0-0-0', '0-0-1']),
      checkedKeys: ['0-0-0'],
      selectedKeys: [],
    };
  },
  onExpand(treeNode, expand, expandedKeys) {
    console.log('onExpand', expand, expandedKeys);
    const index = expandedKeys.indexOf(treeNode.props.eventKey);
    if (expand) {
      if (index > -1) {
        expandedKeys.splice(index, 1);
      }
    } else {
      if (index === -1) {
        expandedKeys.push(treeNode.props.eventKey);
      }
    }
    this.setState({
      expandedKeys: expandedKeys,
    });
  },
  onCheck(info) {
    console.log('check: ', info);
    this.setState({
      checkedKeys: getCheckedKeys(info.node, info.checkedKeys, info.allCheckedNodesKeys),
      selectedKeys: ['0-3', '0-4'],
    });
  },
  onSelect(info) {
    console.log('selected: ', info);
    let selectedKeys = [...this.state.selectedKeys];
    const index = selectedKeys.indexOf(info.node.props.eventKey);
    if (index > -1) {
      selectedKeys.splice(index, 1);
    } else if (this.props.multiple) {
      selectedKeys.push(info.node.props.eventKey);
    } else {
      selectedKeys = [info.node.props.eventKey];
    }
    this.setState({
      selectedKeys: selectedKeys,
    });
  },
  render() {
    const loop = data => {
      return data.map((item) => {
        if (item.children) {
          return <TreeNode key={item.key} title={item.key} disableCheckbox={item.key === '0-0-0' ? true : false}>{loop(item.children)}</TreeNode>;
        }
        return <TreeNode key={item.key} title={item.key} />;
      });
    };
    return (<div>
      <h2>controlled</h2>
      <Tree checkable multiple={this.props.multiple} defaultExpandAll
        onExpand={this.onExpand} expandedKeys={this.state.expandedKeys}
        onCheck={this.onCheck} checkedKeys={this.state.checkedKeys}
        onSelect={this.onSelect} selectedKeys={this.state.selectedKeys}>
        {loop(gData)}
      </Tree>
    </div>);
  },
});

ReactDOM.render(<Demo />, mountNode);
````
