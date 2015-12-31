# 更多功能

- order: 1

更多功能。

---

````jsx
import { TreeSelect } from 'antd';
const TreeNode = TreeSelect.TreeNode;

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
      value: ['0-0'],
    };
  },
  onSelect(selectedKey, node, selectedKeys) {
    console.log('selected: ', selectedKey, selectedKeys);
    this.setState({
      value: selectedKeys,
    });
  },
  onChange(value) {
    console.log('selected ' + value);
    this.setState({
      value: value,
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
    const tProps = {
      // defaultValue: this.state.value,
      value: this.state.value,
      onChange: this.onChange,
      onSelect: this.onSelect,
      multiple: true,
      // treeCheckable: true,
      treeDefaultExpandAll: true,
    };
    return (<div style={{padding: '10px 30px'}}>
      <h3>more</h3>
      <TreeSelect style={{width: 300}} {...tProps}>
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
