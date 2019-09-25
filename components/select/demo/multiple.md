---
order: 2
title:
  zh-CN: 多选
  en-US: multiple selection
---

## zh-CN

多选，从已有条目中选择。

## en-US

Multiple selection, selecting from existing items.

```jsx
import { Select } from 'antd';

const { Option } = Select;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

function handleChange(value) {
  console.log(`selected ${value}`);
}

ReactDOM.render(
  <Select
    mode="multiple"
    style={{ width: '100%' }}
    placeholder="Please select"
    defaultValue={['a10', 'c12']}
    onChange={handleChange}
  >
    {children}
  </Select>,
  mountNode,
);
```
