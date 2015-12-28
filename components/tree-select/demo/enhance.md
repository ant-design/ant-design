# 更多功能

- order: 1

更多功能。

---

````jsx
import { TreeSelect } from 'antd';
const TreeNode = TreeSelect.TreeNode;

const x = 5;
const y = 3;
const z = 2;
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
      value: [],
    };
  },
  onDeselect(selectedValue) {
    console.log('onDeselect', selectedValue);
    const newVal = [...this.state.value];
    newVal.splice(newVal.indexOf(selectedValue), 1);
    this.setState({
      value: newVal,
    });
  },
  onSelect(selectedKey, node, selectedKeys) {
    console.log('selected: ', selectedKey, selectedKeys);
    this.setState({
      value: selectedKeys,
    });
  },
  onCheck(checkedKey, node, checkedKeys) {
    console.log('onCheck:', checkedKey);
    this.setState({
      value: checkedKeys,
    });
  },
  render() {
    const loop = data => {
      return data.map((item) => {
        if (item.children) {
          return <TreeNode key={item.key} value={item.key} title={item.key}>{loop(item.children)}</TreeNode>;
        }
        return <TreeNode key={item.key} value={item.key} title={item.key} />;
      });
    };
    const treeProps = {
      showIcon: false,
      showLine: true,
      checkable: true,
      defaultCheckedKeys: this.state.value,
      defaultSelectedKeys:  this.state.value,
      // selectedKeys:  this.state.value,
      // checkedKeys: this.state.value,
      // onCheck: this.onCheck,
    };
    return (<div style={{padding: '10px 30px'}}>
      <h3>more</h3>
      <TreeSelect style={{width: 300}} defaultValue={this.state.value} multiple treeProps={treeProps}
        onSelect={this.onSelect} onCheck={this.onCheck} onDeselect={this.onDeselect}>
        {loop(gData)}
      </TreeSelect>
    </div>);
  },
});

ReactDOM.render(<div>
  <Demo />
</div>
, document.getElementById('components-tree-select-demo-enhance'));
````
