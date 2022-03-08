---
order: 1
title:
  zh-CN: 可清除的受控下拉组件
  en-US: Controllable Select with `allowClear`
---

## zh-CN

可清除的受控下拉组件

## en-US

Controllable Select with `allowClear`.

```jsx
import { useState } from 'react';
import { Select } from 'antd';

const { Option } = Select;

function App() {
  const [value, setValue] = useState(null);
  const [loading, setLoading] = useState(false);

  function onChange(newValue) {
    // The `newValue` should be `undefined` when user cleared the select.
    // Delay 1 seconds then update the value.
    setTimeout(() => {
      setValue(newValue === undefined ? null : newValue);
    }, 1000);
  }

  return (
    <Select allowClear value={value} onChange={onChange} loading={loading}>
      {/** Attention, value should not be `null` if you want to clear select. */}
      <Option value="a">A</Option>
      <Option value="b">B</Option>
      <Option value="c">C</Option>
    </Select>
  )
}

ReactDOM.render(
  <App />,
  mountNode,
);
```
