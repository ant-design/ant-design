# 更多功能

- order: 1

更多功能。

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
      value: ['0-0-0-value'],
    };
  },
  onChange(value) {
    console.log('onChange ', value, arguments);
    this.setState({ value });
  },
  render() {
    const tProps = {
      treeData: gData,
      value: this.state.value,
      onChange: this.onChange,
      multiple: true,
      treeCheckable: true,
      treeDefaultExpandAll: true,
    };
    return (
      <TreeSelect style={{ width: 360 }} {...tProps} />
    );
  },
});

ReactDOM.render(<Demo />, mountNode);
````
