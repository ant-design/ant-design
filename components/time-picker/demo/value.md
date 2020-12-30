---
order: 1
title:
  zh-CN: 受控组件
  en-US: Under Control
---

## zh-CN

value 和 onChange 需要配合使用。

## en-US

`value` and `onChange` should be used together,

```jsx
import React, { useState } from 'react';
import { TimePicker } from 'antd';

const Demo = () => {
  const [value, setValue] = useState(null);

  const onChange = time => {
    setValue(time);
  };

  return <TimePicker value={value} onChange={onChange} />;
};

ReactDOM.render(<Demo />, mountNode);
```
