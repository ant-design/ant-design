---
order: 10
title:
  zh-CN: 获得选项的文本
  en-US: Get value of selected item
---

## zh-CN

默认情况下 `onChange` 里只能拿到 value，如果需要拿到选中的节点文本 label，可以使用 `labelInValue` 属性。

选中项的 label 会被包装到 value 中传递给 `onChange` 等函数，此时 value 是一个对象。

## en-US

As a default behavior, the onChange callback can only get the value of the selected item. The labelInValue prop can be used to get the label property of the selected item.

The label of the selected item will be packed as an object for passing to the onChange callback.

```jsx
import { Select } from 'antd';

const { Option } = Select;

function handleChange(value) {
  console.log(value); // { key: "lucy", label: "Lucy (101)" }
}

ReactDOM.render(
  <Select
    labelInValue
    defaultValue={{ key: 'lucy' }}
    style={{ width: 120 }}
    onChange={handleChange}
  >
    <Option value="jack">Jack (100)</Option>
    <Option value="lucy">Lucy (101)</Option>
  </Select>,
  mountNode,
);
```
