# 多选

- order: 2

多选，从已有条目中选择（scroll the menu）

---


````jsx
import { Select } from 'antd';
const Option = Select.Option;

let children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

function handleChange(value) {
  console.log('selected ' + value);
}

ReactDOM.render(
  <Select multiple
  style={{width:400}}
  defaultValue={['a10', 'c12']} onChange={handleChange}>
    {children}
  </Select>
, document.getElementById('components-select-demo-multiple'));
````
