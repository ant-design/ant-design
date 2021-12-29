---
order: 38
title:
  zh-CN: 弹出位置
  en-US: Placement
---

## zh-CN

可以通过 `placement` 手动指定弹出的位置。。

## en-US

Basic Usage.

```jsx
import { Select } from 'antd';

const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}

ReactDOM.render(
  <>
    <Select
      defaultValue="topLeft"
      style={{ width: 120 }}
      onChange={handleChange}
      dropdownStyle={{ minWidth: 500 }}
      placement="topLeft"
    >
      <Option value="topLeft">topLeft</Option>
    </Select>
    <Select
      defaultValue="topRight"
      style={{ width: 120 }}
      onChange={handleChange}
      dropdownStyle={{ minWidth: 500 }}
      placement="topRight"
    >
      <Option value="topRight">topRight</Option>
    </Select>
    <Select
      defaultValue="bottomLeft"
      style={{ width: 120 }}
      onChange={handleChange}
      dropdownStyle={{ minWidth: 500 }}
      placement="bottomLeft"
    >
      <Option value="bottomLeft">bottomLeft</Option>
    </Select>
    <Select
      defaultValue="bottomRight"
      style={{ width: 120 }}
      onChange={handleChange}
      dropdownStyle={{ minWidth: 500 }}
      placement="bottomRight"
    >
      <Option value="bottomRight">bottomRight</Option>
    </Select>
  </>,
  mountNode,
);
```
