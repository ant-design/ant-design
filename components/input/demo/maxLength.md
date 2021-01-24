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
import { Input ,Button} from 'antd';
import {useState} from 'react'

const Max = ()=>{
    const [value,setValue] = useState('1234')
    
    return (
        <>
        <Input placeholder="maxLength" maxLength={5} value={value} onChange={e=>setValue(e.target.value)} />
        <Input.TextArea placeholder="maxLength" maxLength={5} value={value} onChange={e=>setValue(e.target.value)} showCount />
        <Button onClick={()=>setValue('123456')}> add </Button>
        </>
    )
}
ReactDOM.render(<Max />, mountNode);
```
