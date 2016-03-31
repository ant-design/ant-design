---
order: 1
title: 受控操作示例
---

受控操作示例



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
    tns.push({ title: key, key });
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
  getDefaultProps() {
    return {
      multiple: true,
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
    this.setState({ expandedKeys });
  },
  onCheck(checkedKeys) {
    this.setState({
      checkedKeys,
      selectedKeys: ['0-3', '0-4'],
    });
  },
  onSelect(selectedKeys, info) {
    console.log('onSelect', info);
    this.setState({ selectedKeys });
  },
  render() {
    const loop = data => data.map((item) => {
      if (item.children) {
        return (
          <TreeNode key={item.key} title={item.key} disableCheckbox={item.key === '0-0-0'}>
            {loop(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} title={item.key} />;
    });
    return (
      <Tree checkable multiple={this.props.multiple} defaultExpandAll
        onExpand={this.onExpand} expandedKeys={this.state.expandedKeys}
        onCheck={this.onCheck} checkedKeys={this.state.checkedKeys}
        onSelect={this.onSelect} selectedKeys={this.state.selectedKeys}>
        {loop(gData)}
      </Tree>
    );
  },
});

ReactDOM.render(<Demo />, mountNode);
````
