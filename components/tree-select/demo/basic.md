# 基本

- order: 0

最简单的用法。

---

````jsx
import { TreeSelect } from 'antd';
const TreeNode = TreeSelect.TreeNode;

const x = 3;
const y = 2;
const z = 1;
const gData = []; // 手工构造数据
const generateData = (_level, _preKey, _tns) => {
  const preKey = _preKey || '0';
  const tns = _tns || gData;
  const children = [];
  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`;
    tns.push({
      label: key + '-label',
      value: key + '-value',
      key: key,
    });
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
      value: '',
    };
  },
  onChange(value) {
    console.log(arguments);
    this.setState({ value });
  },
  render() {
    return (<div>
      <h5>使用 treeData</h5>
      <TreeSelect style={{ width: 360 }}
        dropdownStyle={{ maxHeight: 200, overflow: 'auto' }}
        treeData={gData} showSearch
        value={this.state.value}
        treeDefaultExpandAll
        placeholder={<i>请下拉选择</i>}
        searchPlaceholder="please search"
        treeNodeFilterProp="title"
        onChange={this.onChange} />

      <br /><br />
      <h5>手工构造 TreeNode</h5>
      <TreeSelect style={{ width: 360 }}
        value={this.state.value}
        dropdownMenuStyle={{ maxHeight: 400, overflow: 'auto' }}
        treeDefaultExpandAll
        onChange={this.onChange}>
        <TreeNode value="parent 1" title="parent 1" key="0-1">
          <TreeNode value="parent 1-0" title="parent 1-0" key="0-1-1">
            <TreeNode value="leaf1" title="my leaf" key="random" />
            <TreeNode value="leaf2" title="your leaf" key="random1" />
          </TreeNode>
          <TreeNode value="parent 1-1" title="parent 1-1" key="random2">
            <TreeNode value="sss" title={<b style={{ color: 'red' }}>sss</b>} key="random3" />
          </TreeNode>
        </TreeNode>
      </TreeSelect>
    </div>);
  },
});

ReactDOM.render(
  <Demo />
, mountNode);
````
