---
order: 6
title:
  zh-CN: 按钮样式
  en-US: Checkbox style
---

## zh-CN

按钮样式的多选组合。

## en-US

The combination of checkbox button style.

```jsx
import { Checkbox } from 'antd';
const CheckboxButton = Checkbox.Button;
const CheckboxGroup = Checkbox.Group;

function onChange(checkedValues) {
  console.log('checked = ', checkedValues);
}

ReactDOM.render(
  <div>
    <CheckboxGroup onChange={onChange} defaultValue={['Apple']}>
        <CheckboxButton value="Apple">Apple</CheckboxButton>
        <CheckboxButton value="Pear">Pear</CheckboxButton>
        <CheckboxButton value="Orange">Orange</CheckboxButton>
    </CheckboxGroup>
  </div>
, mountNode);
```
