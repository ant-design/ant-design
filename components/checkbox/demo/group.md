# Checkbox 组

- order: 3

方便的生成一个 Checkbox 组。

---

````jsx
import { Checkbox } from 'antd';
const CheckboxGroup = Checkbox.Group;

function onChange(checkedValues) {
  console.log('checked = ', checkedValues);
}

ReactDOM.render(
  <CheckboxGroup options={['Apple', 'Pear', 'Orange']} defaultValue={['Apple']} onChange={onChange} />
, document.getElementById('components-checkbox-demo-group'));
````
