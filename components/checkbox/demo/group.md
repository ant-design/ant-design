# Checkbox 组

- order: 3

方便的从数组生成 Checkbox 组。若需要 label 和 value 分离请直接使用 Checkbox。

---

````jsx
import { Checkbox } from 'antd';
const CheckboxGroup = Checkbox.Group;

function onChange(checkedValues) {
  console.log('checked = ', checkedValues);
}

ReactDOM.render(
  <CheckboxGroup options={['Apple', 'Pear', 'Orange']} defaultValue={['Apple']} onChange={onChange} />
, mountNode);
````
