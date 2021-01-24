---
order: 0
title:
  zh-CN: maxLength
  en-US: maxLength
---

## zh-CN

限制输入框长度

## en-US

maxLength example.

```jsx
import { Input } from 'antd';
import {useState} from 'react'

const Max = ()=>{
    const [value,setValue] = useState('123456')
    return (
        <Input placeholder="maxLength" maxLength={5} value={value} onChange={e=>setValue(e.target.value)} />
    )
}
ReactDOM.render(<Max />, mountNode);
```
