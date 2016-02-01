# 大小

- order: 2

不同大小的 TreeSelect。

---

````jsx
import { TreeSelect } from 'antd';

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
    this.setState({ value });
  },
  render() {
    return (
      <div>
        <TreeSelect size="large" style={{ width: 360 }}
          dropdownMenuStyle={{ maxHeight: 400, overflow: 'auto' }}
          treeData={gData}
          value={this.state.value}
          treeDefaultExpandAll
          onChange={this.onChange} />
        <br /><br />
        <TreeSelect style={{ width: 360 }}
          dropdownMenuStyle={{ maxHeight: 400, overflow: 'auto' }}
          treeData={gData}
          value={this.state.value}
          treeDefaultExpandAll
          onChange={this.onChange} />
        <br /><br />
        <TreeSelect size="small" style={{ width: 360 }}
          dropdownMenuStyle={{ maxHeight: 400, overflow: 'auto' }}
          treeData={gData}
          value={this.state.value}
          treeDefaultExpandAll
          onChange={this.onChange} />
      </div>
    );
  },
});

ReactDOM.render(
  <Demo />
, mountNode);
````
