---
order: 2
title:
  zh-CN: 多选
  en-US: multiple selection
---

## zh-CN

多选，从已有条目中选择。Select 使用了[虚拟滚动](https://github.com/react-component/virtual-list)技术，因而获得了比 [3.0 更好的性能](https://codesandbox.io/s/unruffled-river-ggn7k)。

## en-US

Multiple selection, selecting from existing items. Select use [virtual scroll](https://github.com/react-component/virtual-list) which get better performance [than 3.0](https://codesandbox.io/s/unruffled-river-ggn7k).

```jsx
import { Select } from 'antd';

const { Option } = Select;

const options = [];
for (let i = 10; i < 100000; i++) {
  const value = `${i.toString(36)}${i}`;
  options.push({
    value,
    disabled: i === 10,
  });
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
    options={options}
  />,
  mountNode,
);
```
