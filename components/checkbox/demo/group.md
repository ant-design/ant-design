# 基本用法

- order: 3

checkbox 组。

---

````jsx
import { Checkbox } from 'antd';
const CheckboxGroup = Checkbox.Group;

function onChange(checkedValues) {
  console.log('checked = ', checkedValues);
}

ReactDOM.render(<label>
  <CheckboxGroup options={["apple", "pear"]}onChange={onChange} />
</label>, document.getElementById('components-checkbox-demo-group'));
````
