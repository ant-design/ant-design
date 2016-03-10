# Checkbox 组

- order: 3

方便的从数组生成 Checkbox 组。

---

````jsx
import { Checkbox } from 'antd';
const CheckboxGroup = Checkbox.Group;

function onChange(checkedValues) {
  console.log('checked = ', checkedValues);
}

const plainOptions = ['Apple', 'Pear', 'Orange'];
const options = [{
  label: '苹果',
  value: 'Apple',
}, {
  label: '梨',
  value: 'Pear',
}, {
  label: '橘',
  value: 'Orange',
}];

ReactDOM.render(
<div>
  <CheckboxGroup options={plainOptions} defaultValue={['Apple']} onChange={onChange} />
  <br />
  <CheckboxGroup options={options} defaultValue={['Pear']} onChange={onChange} />
</div>
, mountNode);
````
